/**
 * RokuganHooks - Foundry VTT hook handlers for Adventures in Rokugan.
 *
 * Handles:
 *  - Actor sheet rendering patches (rename spell slots → Focus/Favor)
 *  - Character sheet label overrides
 *  - Motivation tracking (replaces Personality Traits / Ideals / Bonds / Flaws)
 *  - Shadow/Taint tracking (replaces Exhaustion in some contexts)
 *  - Clan affiliation on actor sheets
 */

import { toJQuery, getSheetDocument } from "./compat.mjs";
import { RokuganResourcePanel } from "./resource-panel.mjs";
import { RokuganItems } from "./items.mjs";

export class RokuganHooks {

  static onReady() {
    // ----------------------------------------
    // Unified dispatchers. All render hooks funnel through these with
    // html normalized to jQuery (AppV2 hooks pass raw HTMLElement).
    // ----------------------------------------

    // Toggle the opt-in L5R sheet theme class on the application root.
    // Purely cosmetic: the class scopes styles/l5r-theme.css, which reskins
    // the dnd5e sheet via its CSS custom properties without touching
    // structure or behavior.
    const applyTheme = (app) => {
      const root = app.element instanceof HTMLElement ? app.element : app.element?.[0];
      root?.classList.toggle("rokugan-theme",
        !!game.settings.get("rokugan5e", "l5rSheetTheme"));
    };

    const dispatchActor = (app, html) => {
      applyTheme(app);
      const $html = toJQuery(html);
      const doc = getSheetDocument(app);
      if (!doc || doc.documentName !== "Actor") return;

      if (doc.type === "character") {
        RokuganHooks.onRenderCharacterSheet(app, $html, {});
        RokuganResourcePanel.inject(app, $html);
      } else if (doc.type === "npc") {
        RokuganHooks.onRenderNPCSheet(app, $html, {});
      }
    };

    const dispatchItem = (app, html) => {
      applyTheme(app);
      const $html = toJQuery(html);
      const doc = getSheetDocument(app);
      if (!doc || doc.documentName !== "Item") return;

      RokuganHooks.onRenderItemSheet(app, $html, {});
      RokuganItems.injectItemSheet(app, $html);
    };

    // ----------------------------------------
    // dnd5e 5.x sheet hooks (confirmed from dnd5e.mjs on the 5.3.x branch):
    //   - applications.actor.CharacterActorSheet → renderCharacterActorSheet
    //   - applications.actor.NPCActorSheet       → renderNPCActorSheet
    //   - applications.item.ItemSheet5e          → renderItemSheet5e
    // All are ApplicationV2 and pass a raw HTMLElement, which the dispatchers
    // normalize to jQuery. AppV2 may partially re-render parts of a sheet, so
    // every injector guards against duplicates.
    // ----------------------------------------
    Hooks.on("renderCharacterActorSheet", (app, element) => dispatchActor(app, element));
    Hooks.on("renderNPCActorSheet", (app, element) => dispatchActor(app, element));
    Hooks.on("renderItemSheet5e", (app, element) => dispatchItem(app, element));
  }

  // ----------------------------------------
  // Character Sheet Patches
  // ----------------------------------------

  static onRenderCharacterSheet(sheet, html, data) {
    if (!game.settings.get("rokugan5e", "useRokuganTerminology")) return;

    RokuganHooks._patchSpellTerminology(html);
    RokuganHooks._patchCurrencyLabels(html);
    RokuganHooks._injectRokuganTab(sheet, html, data);
  }

  static onRenderNPCSheet(sheet, html, data) {
    if (!game.settings.get("rokugan5e", "useRokuganTerminology")) return;
    RokuganHooks._patchSpellTerminology(html);
    RokuganHooks._patchCurrencyLabels(html);
  }

  static onRenderItemSheet(sheet, html, data) {
    if (!game.settings.get("rokugan5e", "useRokuganTerminology")) return;

    const item = sheet.item;
    if (!item) return;

    // Rename "Spell" labels on item sheets based on class context
    RokuganHooks._patchItemSheetLabels(html, item);
  }

  static onRenderApplication(app, html, data) {
    if (!game.settings.get("rokugan5e", "useRokuganTerminology")) return;
    RokuganHooks._patchSpellTerminology(html);
  }

  // ----------------------------------------
  // Terminology Patches
  // ----------------------------------------

  /**
   * Replace "Spell"/"Spells"/"Spellcasting" labels with Rokugan equivalents.
   *
   * The Ritualist class uses Invocations + Favor.
   * Martial classes (Bushi, Duelist, Pilgrim, Shinobi) use Techniques + Focus.
   *
   * Since we can't always tell which class a character is from the sheet render
   * alone, we use generic "Invocation/Technique" language. A more sophisticated
   * version would inspect actor.classes to pick the right term.
   */
  static _patchSpellTerminology(html) {
    const replacements = [
      // Tab labels
      { selector: ".tab-spells .item-name", from: /\bSpells?\b/g, to: "Invocations & Techniques" },
      // Section headers
      { selector: "h3.spell-level", from: /\bCantrips?\b/g, to: "Tier 0" },
      // Slot labels  
      { selector: ".spell-slots label", from: /Spell Slots?/g, to: "Favor / Focus" },
      { selector: ".spell-slot-uses", from: /Spell Slots?/g, to: "Favor / Focus" },
      // Spellcasting ability
      { selector: ".spellcasting-ability label", from: /Spellcasting Ability/g, to: "Casting Ability" },
      // Generic "Spell" label on items
      { selector: ".item-type-spell", from: /\bSpell\b/g, to: "Invocation" },
    ];

    for (const r of replacements) {
      html.find(r.selector).each((i, el) => {
        el.innerHTML = el.innerHTML.replace(r.from, r.to);
      });
    }

    // Replace text nodes containing "Spell" in the whole sheet
    // (a broader sweep for any missed labels)
    RokuganHooks._replaceTextNodes(html[0], {
      "Spellcasting": "Invocation Casting",
      "Spell Slots": "Favor / Focus",
      "Spell Slot": "Favor / Focus",
      "Cantrips": "Tier 0 Invocations",
      "Cantrip": "Tier 0 Invocation",
    });
  }

  /**
   * Replace currency labels with Rokugan equivalents.
   * gp → Koku, sp → Bu, cp → Zeni
   * ep and pp are hidden (not used in Rokugan).
   */
  static _patchCurrencyLabels(html) {
    const map = {
      " gp": " koku",
      " sp": " bu",
      " cp": " zeni",
    };

    // Hide electrum and platinum fields
    html.find(".currency.ep, .currency.pp").closest(".currency").hide();

    // Replace abbreviation labels
    html.find(".currency .denomination").each((i, el) => {
      const text = el.textContent.trim().toLowerCase();
      if (text === "gp") el.textContent = "koku";
      else if (text === "sp") el.textContent = "bu";
      else if (text === "cp") el.textContent = "zeni";
      else if (text === "ep" || text === "pp") el.closest(".currency")?.style.setProperty("display", "none");
    });
  }

  /**
   * Patch item sheet labels depending on item type.
   */
  static _patchItemSheetLabels(html, item) {
    const type = item.type;

    if (type === "spell") {
      // Determine if this is an Invocation (Ritualist) or Technique (martial)
      // We check the item's system data for clues, or fall back to generic
      const school = item.system?.school;
      const isElemental = ["air", "earth", "fire", "water"].includes(school);
      const label = isElemental ? "Invocation" : "Technique";

      html.find(".sheet-header h1 .item-type-label").each((i, el) => {
        if (el.textContent.includes("Spell")) el.textContent = label;
      });

      // Rename "Spell Level" → "Invocation Tier" or "Focus Cost"
      html.find("label[for='system.level']").each((i, el) => {
        el.textContent = isElemental ? "Invocation Tier" : "Focus Cost";
      });

      // Rename "School" → "Element" for invocations
      if (isElemental) {
        html.find("label[for='system.school']").each((i, el) => {
          el.textContent = "Element";
        });
      } else {
        html.find("label[for='system.school']").each((i, el) => {
          el.textContent = "Technique Type";
        });
      }

      // Rename "Components" → "Requirements" (techniques have weapon requirements)
      html.find(".spell-components label, label.components").each((i, el) => {
        if (!isElemental) el.textContent = "Requirements";
      });
    }
  }

  // ----------------------------------------
  // Rokugan Tab Injection
  // ----------------------------------------

  /**
   * Inject a "Rokugan" tab into the character sheet for tracking:
   *  - Clan affiliation
   *  - Honor / Glory / Status
   *  - Motivations (Bond, Desire, Duty, Fear, Ideal, Regret)
   *  - Shadow/Taint (for Shadowlands corruption)
   */
  static _injectRokuganTab(sheet, html, data) {
    const actor = sheet.actor;
    if (!actor) return;

    // AppV2 sheets perform PARTIAL re-renders: any actor update (including
    // this tab's own flag writes) may replace the nav part, the body part,
    // or both. A presence check on one piece desyncs them - e.g. the nav is
    // wiped while the content survives, the check returns early, and the
    // tab button vanishes until the sheet is reopened. Instead, remove BOTH
    // pieces and re-inject fresh on every render, so the result is
    // identical no matter which parts the system replaced.
    html.find(".tabs[data-group='primary'] [data-tab='rokugan']").remove();
    html.find(".tab.rokugan[data-group='primary']").remove();

    const tabNav = html.find(".tabs[data-group='primary']");
    if (!tabNav.length) return;

    // Preserve the active tab across re-renders: the sheet remembers
    // tabGroups.primary === "rokugan", so freshly injected pieces must
    // carry the active class or the body renders empty after an edit.
    const isActive = sheet.tabGroups?.primary === "rokugan";

    tabNav.append(`
      <a class="item control${isActive ? " active" : ""}" data-action="tab"
         data-group="primary" data-tab="rokugan"
         data-tooltip aria-label="Adventures in Rokugan">
        <i class="fas fa-torii-gate"></i>
      </a>
    `);

    // Get saved Rokugan flags
    const flags = actor.getFlag("rokugan5e", "rokuganData") ?? {};
    const clan = flags.clan ?? "";
    const honor = flags.honor ?? 0;
    const glory = flags.glory ?? 0;
    const status = flags.status ?? 0;
    const shadow = flags.shadow ?? 0;
    const motivations = flags.motivations ?? {
      bond: "", desire: "", duty: "", fear: "", ideal: "", regret: ""
    };

    // Build tab content
    const tabContent = `
      <div class="tab rokugan${isActive ? " active" : ""}" data-group="primary" data-tab="rokugan">
        <div class="rokugan-section">
          <h3 class="rokugan-section-title">
            <i class="fas fa-shield-alt"></i>
            ${game.i18n.localize("ROKUGAN.Sheet.ClanAffiliation")}
          </h3>
          <div class="rokugan-field">
            <label>${game.i18n.localize("ROKUGAN.Sheet.Clan")}</label>
            <select class="rokugan-clan" name="flags.rokugan5e.rokuganData.clan">
              <option value="" ${!clan ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.None")}</option>
              <option value="crab" ${clan === "crab" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Crab")}</option>
              <option value="crane" ${clan === "crane" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Crane")}</option>
              <option value="dragon" ${clan === "dragon" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Dragon")}</option>
              <option value="lion" ${clan === "lion" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Lion")}</option>
              <option value="phoenix" ${clan === "phoenix" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Phoenix")}</option>
              <option value="scorpion" ${clan === "scorpion" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Scorpion")}</option>
              <option value="unicorn" ${clan === "unicorn" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Unicorn")}</option>
              <option value="imperial" ${clan === "imperial" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Imperial")}</option>
              <option value="minorClans" ${clan === "minorClans" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.MinorClans")}</option>
              <option value="ronin" ${clan === "ronin" ? "selected" : ""}>${game.i18n.localize("ROKUGAN.Clan.Ronin")}</option>
            </select>
          </div>
        </div>

        <div class="rokugan-section">
          <h3 class="rokugan-section-title">
            <i class="fas fa-star"></i>
            ${game.i18n.localize("ROKUGAN.Sheet.SocialStanding")}
          </h3>
          <div class="rokugan-stats">
            <div class="rokugan-stat">
              <label>${game.i18n.localize("ROKUGAN.Sheet.Honor")}</label>
              <input type="number" name="flags.rokugan5e.rokuganData.honor"
                     value="${honor}" min="0" max="100" />
            </div>
            <div class="rokugan-stat">
              <label>${game.i18n.localize("ROKUGAN.Sheet.Glory")}</label>
              <input type="number" name="flags.rokugan5e.rokuganData.glory"
                     value="${glory}" min="0" max="100" />
            </div>
            <div class="rokugan-stat">
              <label>${game.i18n.localize("ROKUGAN.Sheet.Status")}</label>
              <input type="number" name="flags.rokugan5e.rokuganData.status"
                     value="${status}" min="0" max="100" />
            </div>
          </div>
        </div>

        <div class="rokugan-section">
          <h3 class="rokugan-section-title">
            <i class="fas fa-moon"></i>
            ${game.i18n.localize("ROKUGAN.Sheet.ShadowTaint")}
            <span class="rokugan-hint">${game.i18n.localize("ROKUGAN.Sheet.ShadowTaintHint")}</span>
          </h3>
          <div class="rokugan-shadow">
            <label>${game.i18n.localize("ROKUGAN.Sheet.Shadow")}</label>
            <input type="number" name="flags.rokugan5e.rokuganData.shadow"
                   value="${shadow}" min="0" max="20" />
            <div class="rokugan-shadow-pips">
              ${Array.from({length: 20}, (_, i) =>
                `<div class="pip ${i < shadow ? "filled" : ""}" data-index="${i}"></div>`
              ).join("")}
            </div>
          </div>
        </div>

        <div class="rokugan-section">
          <h3 class="rokugan-section-title">
            <i class="fas fa-heart"></i>
            ${game.i18n.localize("ROKUGAN.Sheet.Motivations")}
            <span class="rokugan-hint">${game.i18n.localize("ROKUGAN.Sheet.MotivationsHint")}</span>
          </h3>
          <div class="rokugan-motivations">
            ${["bond", "desire", "duty", "fear", "ideal", "regret"].map(m => `
              <div class="rokugan-motivation">
                <label>${game.i18n.localize("ROKUGAN.Motivation." + m.charAt(0).toUpperCase() + m.slice(1))}</label>
                <textarea name="flags.rokugan5e.rokuganData.motivations.${m}"
                          placeholder="${game.i18n.localize("ROKUGAN.Motivation." + m.charAt(0).toUpperCase() + m.slice(1) + "Placeholder")}"
                >${motivations[m] ?? ""}</textarea>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    // Insert after the system's last primary tab; fall back to the sheet
    // body if a partial render context exposes no tab sections.
    const lastTab = html.find(".tab[data-group='primary']").last();
    if (lastTab.length) lastTab.after(tabContent);
    else html.find(".sheet-body").first().append(tabContent);

    // Handle save on change
    html.find(".tab.rokugan input, .tab.rokugan select, .tab.rokugan textarea").on("change", async (ev) => {
      const name = ev.currentTarget.name;
      const value = ev.currentTarget.type === "number"
        ? Number(ev.currentTarget.value)
        : ev.currentTarget.value;

      // Build update path from name attribute
      if (name.startsWith("flags.rokugan5e.rokuganData.")) {
        const path = name.replace("flags.rokugan5e.rokuganData.", "");
        const parts = path.split(".");
        const current = foundry.utils.deepClone(actor.getFlag("rokugan5e", "rokuganData") ?? {});

        // Set nested path
        let obj = current;
        for (let i = 0; i < parts.length - 1; i++) {
          obj[parts[i]] = obj[parts[i]] ?? {};
          obj = obj[parts[i]];
        }
        obj[parts[parts.length - 1]] = value;

        await actor.setFlag("rokugan5e", "rokuganData", current);
      }
    });

    // Handle shadow pip clicks
    html.find(".tab.rokugan .rokugan-shadow-pips .pip").on("click", async (ev) => {
      const index = Number(ev.currentTarget.dataset.index);
      const current = actor.getFlag("rokugan5e", "rokuganData") ?? {};
      const newShadow = (current.shadow ?? 0) === index + 1 ? index : index + 1;
      await actor.setFlag("rokugan5e", "rokuganData", { ...current, shadow: newShadow });
      sheet.render(false);
    });
  }

  // ----------------------------------------
  // Utility: Replace text nodes
  // ----------------------------------------

  /**
   * Walk the DOM and replace text node content.
   * Only replaces exact label text, not partial matches inside complex nodes.
   * @param {HTMLElement} root
   * @param {Object} replacements - { "old text": "new text" }
   */
  static _replaceTextNodes(root, replacements) {
    if (!root) return;

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          // Skip script and style nodes
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName?.toLowerCase();
          if (tag === "script" || tag === "style") return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    for (const node of nodes) {
      let text = node.textContent;
      let changed = false;
      for (const [from, to] of Object.entries(replacements)) {
        if (text.includes(from)) {
          text = text.replaceAll(from, to);
          changed = true;
        }
      }
      if (changed) node.textContent = text;
    }
  }
}
