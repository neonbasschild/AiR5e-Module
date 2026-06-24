/**
 * RokuganPacks - Seeds the module's compendium packs from bundled JSON.
 *
 * Foundry v13 auto-creates empty LevelDB databases for packs declared in
 * module.json whose folders don't exist yet. On the first world load (or
 * after a data-version bump), the active GM's client populates them from
 * /packs-source/*.json. This avoids needing the foundryvtt-cli build step
 * while keeping the JSON sources CLI-compatible (each document carries a
 * "_key" field, stripped before import, so `fvtt package pack` can compile
 * real static packs from the same sources if preferred).
 *
 * Content note: pack documents contain mechanical statistics and original
 * summaries with page references to the Adventures in Rokugan book - not
 * the book's descriptive text.
 */

export class RokuganPacks {

  /** Bump to force a reseed on the next world load. */
  static DATA_VERSION = "1.29.0";

  static PACKS = ["classes", "classfeatures", "species", "backgrounds", "feats",
                  "equipment", "techniques", "invocations", "externalizations", "charms", "awakened", "npcs", "modifiers",
                  "conditions"];

  /**
   * Seed all packs if the stored data version is stale.
   * Runs only for the active GM to avoid duplicate writes.
   */
  static async seed() {
    if (!game.users.activeGM?.isSelf) return;

    // SELF-HEALING: Foundry deletes and replaces the module folder on
    // update, which wipes the runtime-created LevelDB packs inside it.
    // Checking only the stored version therefore left the compendiums
    // empty after every module update. Reseed when the data version
    // changes OR when any pack is empty, so updates repair themselves on
    // the next world load.
    const seeded = game.settings.get("rokugan5e", "packsSeededVersion");
    const anyEmpty = RokuganPacks.PACKS.some(n =>
      (game.packs.get(`rokugan5e.${n}`)?.index.size ?? 0) === 0);
    if (seeded === RokuganPacks.DATA_VERSION && !anyEmpty) return;

    let total = 0;
    for (const name of RokuganPacks.PACKS) {
      const pack = game.packs.get(`rokugan5e.${name}`);
      if (!pack) {
        console.warn(`Rokugan5E | Compendium rokugan5e.${name} not found; skipping`);
        continue;
      }
      try {
        const resp = await fetch(`modules/rokugan5e/packs-source/${name}.json`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const source = await resp.json();

        // Sources are { folders, entries }; legacy array sources are
        // normalized for safety. _key is foundryvtt-cli metadata.
        const folders = Array.isArray(source) ? [] : (source.folders ?? []);
        const entries = Array.isArray(source) ? source : (source.entries ?? []);

        await pack.configure({ locked: false });

        // Use the document class matching the pack type. Actor packs need
        // Actor.createDocuments, JournalEntry packs (e.g. conditions) need
        // JournalEntry.createDocuments; everything else is an Item pack.
        const DocClass = pack.documentName === "Actor" ? Actor
          : pack.documentName === "JournalEntry" ? JournalEntry
          : Item;

        // Clear existing documents AND folders for a clean reseed
        const existing = pack.index.map(e => e._id);
        if (existing.length) {
          await DocClass.deleteDocuments(existing, { pack: pack.collection });
        }
        const oldFolders = pack.folders?.map(f => f.id) ?? [];
        if (oldFolders.length) {
          await Folder.deleteDocuments(oldFolders, { pack: pack.collection });
        }

        if (folders.length) {
          await Folder.createDocuments(folders.map(({ _key, ...f }) => f),
            { pack: pack.collection, keepId: true });
        }
        const data = entries.map(({ _key, ...d }) => d);
        await DocClass.createDocuments(data, { pack: pack.collection, keepId: true });

        await pack.configure({ locked: true });
        total += data.length;
        console.log(`Rokugan5E | Seeded rokugan5e.${name} (${data.length} documents)`);
      } catch (err) {
        console.error(`Rokugan5E | Failed to seed rokugan5e.${name}:`, err);
        ui.notifications.error(`Rokugan5E: failed to build the "${name}" compendium - see console.`);
        return; // leave version unset so the next load retries
      }
    }

    await game.settings.set("rokugan5e", "packsSeededVersion", RokuganPacks.DATA_VERSION);
    ui.notifications.info(`Adventures in Rokugan: ${total} compendium documents ready.`);
  }
}
