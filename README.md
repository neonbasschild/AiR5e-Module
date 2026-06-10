# Adventures in Rokugan 5E — Foundry VTT Module

A module for Foundry VTT's **dnd5e system** that adapts it for play with **Adventures in Rokugan** (published by Fantasy Flight Games / Edge Studio). Inspired by [ZWinther's lotr5e-module](https://github.com/ZWinther/lotr5e-module).

---

## Installation

1. Make sure you have the **dnd5e system** installed (v3.x or v4.x recommended).
2. In Foundry's **Add-on Modules** tab, click **Install Module**.
3. Paste the manifest URL or install from the module browser.
4. Enable the module in your world from the **Manage Modules** menu.

---

## What This Module Does

This module is a **framework overlay** — it does not include copyrighted content descriptions (you must own the Adventures in Rokugan book). It provides:

### Terminology Changes
| Standard D&D 5e | Adventures in Rokugan |
|---|---|
| Spells | Invocations (Ritualist) / Techniques (martial classes) |
| Spell Slots | Favor (Ritualist) / Focus (martial classes) |
| Cantrips | Tier 0 Invocations |
| Spell Level | Invocation Tier |
| Spell School | Element (Air / Earth / Fire / Water) |
| Copper Pieces (cp) | Zeni |
| Silver Pieces (sp) | Bu |
| Gold Pieces (gp) | Koku |
| Electrum / Platinum | Hidden (not used in Rokugan) |

### Classes
The following Adventures in Rokugan classes are registered (for use with compendium content):
- **Bushi** — front-line combatant (uses Focus + Techniques)
- **Duelist** — blade master (uses Focus + Techniques)
- **Courtier** — diplomat / investigator (uses Focus + Techniques)
- **Shinobi** — spy / assassin (uses Focus + Ninjutsu Techniques)
- **Ritualist** — spirit-communing priest (uses Favor + Invocations)
- **Pilgrim** — ki-balance seeker (uses Focus + Kihō Techniques)
- **Acolyte** — supernatural-mark bearer (uses Focus + Techniques)

### Species (Races)
- Human, Naga, Nezumi, Mazoku, Specter, Tengu, Animal Yōkai, Unique Existence

### Backgrounds
Organized by Great Clan (Crab, Crane, Dragon, Lion, Phoenix, Scorpion, Unicorn), Imperial Court, Minor Clans, Monasteries, Commoners, Non-Rokugani, and Non-Human backgrounds.

### Rokugan Character Sheet Tab
A new **Rokugan** tab is injected into every character sheet, providing:
- **Clan Affiliation** (Crab, Crane, Dragon, Lion, Phoenix, Scorpion, Unicorn, Imperial, Minor Clans, Rōnin)
- **Social Standing**: Honor, Glory, and Status scores (0–100)
- **Shadow / Taint tracker**: 20-pip tracker for Shadowlands corruption
- **Motivations**: Replaces Personality Traits / Ideals / Bonds / Flaws with Rokugan's six Motivations: *Bond, Desire, Duty, Fear, Ideal, Regret*

### Weapons & Armor
Adds Rokugan-specific weapons and armor to the CONFIG for use in compendium items:
- **Simple Melee**: Knife, Swordbreaker (Jitte), Nunchaku, Three-Section Staff, Tiger Hook Swords, etc.
- **Martial Melee**: Katana, Wakizashi, Nodachi, Naginata, Bisento, Warspear (Yari), Whip Sword (Urumi), Kusarigama, etc.
- **Ranged**: Longbow (Yumi), Greatbow (Daikyū), Shinjo Horsebow, Repeating Crossbow, Shuriken, Blowgun, etc.
- **Armor**: Concealed Armor, Shark Leather, Silk Armor, Field Gear, Lacquered Armor, Segmented Plate, Outfits
- **Weapon Properties**: Paired, Ceremonial, Awakened

### Invocation Elements (Spell Schools)
Four elemental spell schools are added: **Air**, **Earth**, **Fire**, **Water**, with appropriate icons. Ritualist invocations should use these elements; martial Techniques use the existing school slots.

### New Conditions
- **Disoriented** — Cannot make opportunity attacks
- **Compromised** — Suffers penalties from wounds or loss of focus
- **Miserable** — Disadvantage on certain Charisma checks (Shadow-related)
- **Anguished** — Disadvantage on Wisdom saving throws (deep crisis)

### Languages
Rokugani, Nezumi, Naga, Tengu Speech, Ivory Kingdoms Trade Tongue, Burning Sands, Celestial (Spirit Speech), Rokugani Signed

### Creature Types
Spirit, Oni, Mazoku, Yōkai (added to the standard list)

### Tools & Arts
Rokugan-relevant proficiencies: Shamisen, Biwa, Shakuhachi, Taiko, Koto, Calligrapher's Supplies, Tea Ceremony Implements, Ikebana Supplies, Shōgi Set, Go Set, Origami Supplies

---

## Module Settings

| Setting | Default | Description |
|---|---|---|
| Use Rokugan Terminology | On | Replaces D&D 5e labels with Rokugan equivalents throughout the UI |
| Hide Non-Rokugan Content | On | Hides electrum/platinum coins and other non-Rokugan elements |

---

## Compatibility

| Software | Version |
|---|---|
| Foundry VTT | v11–v12 |
| dnd5e System | v3.x–v4.x |

> **Note:** This module patches the dnd5e system via JavaScript hooks. Updates to the dnd5e system may occasionally break some patches. Please report issues on the project's GitHub page.

---

## File Structure

```
rokugan5e/
├── module.json               # Module manifest
├── scripts/
│   ├── rokugan5e.mjs         # Entry point; registers hooks & settings
│   ├── config.mjs            # CONFIG.DND5E modifications
│   ├── hooks.mjs             # Foundry hook handlers & sheet patches
│   └── sheets.mjs            # Sheet registration (future custom sheets)
├── styles/
│   └── rokugan5e.css         # Module CSS
└── lang/
    └── en.json               # English localization
```

---

## Content Notes

This module contains **no copyrighted descriptions** from Adventures in Rokugan. All game mechanics listed here are adapted from Open Game Content as designated in the Adventures in Rokugan book. Background descriptions, class lore, and setting content must be referenced from your copy of the source book.

This module is a fan project and is not affiliated with Fantasy Flight Games, Edge Studio, or any of the rights holders for Adventures in Rokugan or the Legend of the Five Rings setting.

---

## Credits

- **Adventures in Rokugan** by Max Brooke, Fantasy Flight Games / Edge Studio
- Module structure inspired by [lotr5e-module](https://github.com/ZWinther/lotr5e-module) by ZWinther
- Foundry VTT dnd5e system by the Foundry VTT community

---

## Version 2.0 — The AiR Magic System & Foundry v13

Version 2.0 mechanically implements the three Adventures in Rokugan resource systems and adds full Foundry **v13** compatibility (works on v12 and v13; dnd5e 3.x through 5.x).

### Focus (Bushi, Duelist, Courtier, Shinobi, Acolyte)
- Per-class Focus Maximum progression tables (e.g. Bushi 4 → 10 across levels 1–20)
- A **Focus panel** on the character sheet with clickable pips, +/- buttons, and a turn-end button
- **Combat automation** (GM-side, toggleable): Focus resets to **0 at combat start**, gains **+1 at the end of each of the character's turns** via `combatTurnChange`, and unspent Focus is **wiped when the combat ends** — exactly per the book. Stance-based bonus generation is added manually (it depends on table-state the module can't see).

### Favor (Ritualist)
- Favor Maximum and Tier 1/2/3 Invocations-Known progression from Table 2-5
- A **Favor panel** with a standard pool plus a separate **Bonus Favor** pool (Resonances, Elemental Alignment, Stirring Performance, etc.) — bonus favor is spent **first** and **only on empowerments**, per the rules
- Favor **automatically restores on a long rest** (`dnd5e.restCompleted`), with a manual "Restore All" button to represent the 4-hour shrine-meditation alternative

### Yin/Yang (Pilgrim)
- The full **7-state balance track** (Yin Apex ↔ Balanced ↔ Yang Apex), rendered as a clickable gradient track
- **Battle Meditation** button (bonus-action 1-step shift, with a direction dialog)
- **Forms of Enlightenment** (7th+): the panel shows only the forms legal in your current state (Air/Water need Yin Flowing or Yin Apex; Earth/Fire need Yang Rising or Yang Apex; Void needs near-balance) and tracks the active form
- Cultivated Potential bonus Hit Dice display; track resets to Balanced when combat ends

### Invocation & Technique Items
Open any **spell or feat item** and a new **"Adventures in Rokugan"** fieldset appears. Mark the item as:
- **Invocation** — set Element, Tier (0–3), and Base Favor Cost
- **Technique** — set Technique Type (Strike/Kata/Kihō/Ninjutsu), Minimum Focus Cost, Mandatory Movement, Weapon Used, and Multitarget
- **Externalization** — posts a Hit-Dice/energy-shift reminder on use

When the item is **used**, the module automatically:
1. Spends the base Favor cost (Invocations) or prompts for Focus to spend, minimum enforced (Techniques)
2. Optionally prompts for **Empowerment favor** (bonus favor consumed first)
3. Posts a chat card recording the expenditure
4. Blocks usage messaging with a warning if the pool is insufficient

### New Module Settings
| Setting | Scope | Default |
|---|---|---|
| Automatic Resource Spending | world | On |
| Prompt for Empowerments | client | On |
| Automate Focus in Combat | world | On |

### Foundry v13 Compatibility
- All sheet hooks are normalized through a compat layer (`scripts/compat.mjs`): AppV2 render hooks (dnd5e 4.x/5.x sheets) pass raw `HTMLElement`s, AppV1 hooks pass jQuery — both are handled
- A generic `renderApplicationV2` listener catches the dnd5e v13 sheets regardless of class name (AppV2 fires hooks for the entire inheritance chain), with injection guards preventing duplicates
- `DialogV2` is used for all prompts, with a legacy `Dialog` fallback
- Panel refresh scans both `ui.windows` (AppV1) and `foundry.applications.instances` (AppV2)
- Status effects use the v12+ `{ id, name, img }` format with core Foundry icons
- Combat automation runs only on the **active GM's client** (`game.users.activeGM`) to avoid duplicate writes and player permission errors
- dnd5e version detection: usage automation binds `dnd5e.postUseActivity` on 4.x/5.x and `dnd5e.useItem` on 3.x — never both, so resources are never double-spent

---

## Version 3.0 — dnd5e 5.x (release-5.3.3) & Foundry v13+

Version 3.0 retargets the module exclusively at **Foundry VTT v13+** with **dnd5e 5.x**, verified against **release-5.3.3**. Legacy v12 / dnd5e 3.x-4.x code paths have been removed.

### Targeted dnd5e 5.x integration
- Sheet hooks now bind to the exact ApplicationV2 sheet classes registered by dnd5e 5.x (confirmed against the 5.3.x source): `renderCharacterActorSheet`, `renderNPCActorSheet`, and `renderItemSheet5e`
- The injected Rokugan tab uses AppV2 tab markup (`data-action="tab"`) so the system's own tab handling drives it
- Usage automation rides the activities pipeline exclusively (`dnd5e.postUseActivity`)
- All prompts use `DialogV2`; open sheets are tracked via `foundry.applications.instances`
- Currency: gp/sp/cp are renamed to Koku/Bu/Zeni with proper `label` + `abbreviation` localization keys; ep/pp are removed by deleting their `CONFIG.DND5E.currencies` entries (the supported method in 5.x), gated on the "Hide Non-Rokugan Content" setting
- Status effects follow the 5.x convention of carrying a deterministic 16-character `_id`

### Native dnd5e 5.x styling
- Focus / Favor / Yin-Yang panels render inside dnd5e's **`<filigree-box>`** custom element — the same gold-corner card component the 5.x sheets use — with a plain-card CSS fallback if the element is unavailable
- All module CSS is rebuilt on dnd5e's CSS custom properties (`--dnd5e-color-gold`, `--dnd5e-color-maroon`, `--dnd5e-color-olive`, `--dnd5e-font-roboto-condensed`, `--dnd5e-font-roboto-slab`, …) with fallbacks matching the system's palette, so the module restyles itself automatically with system theme updates
- Headers use the sheets' Roboto Condensed uppercase treatment (`roboto-upper`); values use Roboto Slab
- Full light/dark support via the system's `.theme-dark` scoping

### Compatibility
| Software | Version |
|---|---|
| Foundry VTT | v13+ |
| dnd5e System | 5.0.0 – 5.3.3 (verified) |

---

## Version 3.1 — Compendium Packs

Version 3.1 adds six compendium packs, generated from the Adventures in Rokugan book and grouped under an "Adventures in Rokugan" compendium folder:

| Pack | Contents |
|---|---|
| AiR Classes | 7 classes with hit dice, saving-throw advancement, and ScaleValue advancements (`@scale.bushi.focus-maximum`, `@scale.ritualist.favor-maximum`, Tier 1–3 invocations known, Pilgrim Cultivated Potential) |
| AiR Species | 8 species with size, speed, senses, and creature type |
| AiR Backgrounds | 35 family backgrounds across the Great Clans and Imperial families |
| AiR Weapons & Armor | 48 weapons (full damage, price, weight, range, and properties incl. the new Defensive, Paired, and Snaring properties), 9 armors/shields, 4 outfits |
| AiR Techniques | 21 martial techniques as feat items, pre-wired with `rokugan5e.magic` flags (focus cost, mandatory movement, weapon used) so the module's automatic Focus spending works out of the box |
| AiR Invocations | 42 invocations as spell items with tier (level), element (school), and `rokugan5e.magic` flags (base favor cost) feeding the automatic Favor spending and empowerment prompts |

### Content policy
Pack documents contain **mechanical statistics** (dice, costs, weights, properties, tiers) and brief original summaries, each with a **page reference** to the book for the full text. The book's descriptive text is not included — you need your own copy of Adventures in Rokugan, which you already have.

### How seeding works
The packs are declared in `module.json`; Foundry v13 creates the empty databases automatically. On the first world load, the active GM's client populates them from the bundled `packs-source/*.json` files (one-time, version-tracked via the `packsSeededVersion` setting — bump `RokuganPacks.DATA_VERSION` to force a reseed). The JSON sources keep `_key` fields, so they are also directly compatible with `foundryvtt-cli` (`fvtt package pack`) if you prefer compiling static packs.

### Known approximations
The Courtier, Shinobi, and Acolyte Focus progression scale values follow the standard progression pattern and should be verified against the book's class tables; Bushi, Duelist, Ritualist, and Pilgrim progressions were extracted directly. Technique/invocation casting times, costs, ranges, and durations were parsed from the book's stat blocks.

---

## Version 3.2 — Full Light/Dark Theme Support

All module UI now follows the dnd5e 5.x light/dark theming system end-to-end: the Focus/Favor/Yin-Yang panels, the Rokugan character-sheet tab (sections, inputs, selects, textareas, Shadow pips), the item-sheet magic fieldset, chat cards, and dialog prompts.

### How it works
- **Semantic tokens, single flip.** Every CSS rule references only semantic `--rokugan-*` tokens (heading, label, text, surface, input background, borders, pips, buttons). Tokens are defined once with light values, then redefined in one `.theme-dark`-scoped block — the same architecture dnd5e uses, so the two themes can never drift out of sync rule-by-rule.
- **Automatic theme detection.** Foundry v13 places `themed theme-light`/`theme-dark` classes on application roots (sheets, chat, dialogs), so descendant scoping picks up the active theme automatically — including per-window theme overrides and "Browser Default" mode.
- **System variable passthrough.** Tokens resolve through dnd5e and core variables where they exist (`--dnd5e-color-gold/maroon/olive`, `--color-text-primary/secondary`, dnd5e font stacks) with fallbacks mirroring the system palette, so future dnd5e palette tweaks restyle the module automatically.
- **Native widget theming.** `color-scheme: light|dark` is set per theme so native form controls (number spinners, dropdowns, scrollbars) render correctly in both modes.
- **Readability choices.** In dark mode, maroon headings shift to gold and pips fill gold (maroon-on-dark fails contrast); the Shadow tracker uses a brightened crimson. The Yin/Yang track gradients stay fixed by design — ink-dark Yin and parchment Yang are the iconography and remain readable on both themes, while their borders, rings, and glows are tokenized.

---

## Version 3.3 — Rokugan Sheet Theme

An opt-in, per-user **sheet theme** that reskins the dnd5e character, NPC, and item sheets in a feudal-Japanese fantasy style — washi paper surfaces, sumi-ink text, vermillion lacquer, gilded gold, a seigaiha wave-crest header banner, and a subtle kumiko lattice texture. **Cosmetic only**: nothing about the sheet's structure, layout, or behavior changes.

### How it works
- A client setting (**Rokugan Sheet Theme**, default on) toggles a `rokugan-theme` class on the sheet application root; turning it off live-rerenders open sheets back to stock dnd5e styling.
- Because the dnd5e 5.x sheets are driven by CSS custom properties, the theme works primarily by **retargeting the system's own variables** under that class (`--dnd5e-color-gold` → gilded brass, `--dnd5e-color-maroon` → shu vermillion, `--dnd5e-color-olive` → sumi ink, `--dnd5e-color-blue` → ai-zome indigo, display font → a mincho serif stack with graceful fallbacks). Everything built on those variables — the whole sheet *and* this module's Focus/Favor/Yin-Yang panels — recolors in one move.
- Targeted structural touches: lacquered window title bar with a gold rule, vermillion seigaiha header banner, scroll-frame portrait (gold inner frame on lacquer), noren-style tab markers, paper filigree cards, hanko-seal primary buttons, and lacquer-on-paper scrollbars.
- **Full light/dark support**: light is washi-and-ink; dark is night lacquer with gilded gold and an ember vermillion (the lacquer red is brightened for contrast on dark). Theme classes are detected the same way as v3.2.
- Decorative patterns are **original inline SVGs** of traditional public-domain geometric motifs (seigaiha, kumiko) — no external assets, fonts, or artwork are fetched or bundled.

### A note on fonts
The display font prefers locally installed Japanese mincho serifs (Shippori Mincho, Yu Mincho, Hiragino Mincho ProN, Noto Serif JP) and falls back to dnd5e's Modesto Condensed when none are present, so the sheet always renders correctly offline.

---

## Version 3.3.1 — Bugfix: Disappearing Rokugan Tab

Fixed the Rokugan tab vanishing from the sheet nav after actor updates (including edits made *inside* the tab) until the sheet was closed and reopened. Cause: dnd5e 5.x sheets perform ApplicationV2 **partial re-renders** that can replace the nav part and the tab-body part independently; the old "already injected?" presence check looked at only one piece, so when the nav was wiped while the content survived, injection skipped and the button stayed gone. The tab button and tab content are now removed and re-injected together on every render (fully idempotent), and the active-tab state is restored from `tabGroups`, so editing a field while on the Rokugan tab no longer dumps you onto an empty sheet body.

---

## Version 3.3.2 — Graphics Fixes

Three rendering bugs fixed, all reported against Foundry v13 / dnd5e 5.3.3:

1. **Missing window-header icons (top-right).** Foundry v13 header controls are `<button>` elements carrying Font Awesome classes on the button itself; the theme's display-font rule on buttons replaced the icon glyphs with missing-glyph boxes. Text buttons keep the mincho display font, icon-class buttons are excluded, and a defensive rule re-asserts the Font Awesome families on any element that *is* an icon.
2. **Active tab swallowing its icon.** dnd5e's active tab uses a gold background with an ink-colored icon; the theme (and the module's own torii tab) recolored active icons gold — invisible on the gold background. Hover tinting now applies to inactive tabs only and active tabs inherit the system's own contrast styling, so this can't regress with future palette changes.
3. **Tab content sliding under the portrait / sidebar not reflowing.** The dnd5e 5.x `.sheet-body` is a CSS grid whose children are auto-placed by source order; the Focus/Favor/Yin-Yang panel was being prepended as a foreign first child, shifting every grid child and pushing the tab body underneath the sidebar. The panel now injects **inside the sidebar column** (layout-safe, and visible on every tab beneath Hit Dice/Favorites), with main-column and append-only fallbacks. The sidebar dock/expand reflow behaves natively again since the grid is no longer disturbed.

---

## Version 3.3.3 — Resource Dock (layout overlap fix)

Fixed the Favor/Focus/Yin-Yang panel overlapping the sheet content and appearing "on every page" behind the tabs. Root cause: dnd5e 5.x renders its parts and tab sections stacked in shared grid cells, so *any* in-flow injection point (sidebar, main column, tab body) risks the panel landing in the same grid cell as the active tab — v3.3.2's sidebar selector missed in 5.3.3 and the fallback dropped the panel into the stacked tab container.

The panel is now a **Resource Dock**: appended to the application root and absolutely positioned at the bottom of the sheet window. Being out of document flow, it cannot disturb the sheet grid or collide with tab content, and its placement no longer depends on dnd5e's internal DOM at all. It renders as a slim bar — icon, current/max value, and quick controls (−/+ for Focus and Favor; Yin/Yang shift buttons for the Pilgrim) — and expands upward into the full panel (pips, restore, Battle Meditation, Forms of Enlightenment) via the chevron. Expanded/collapsed state is remembered per actor for the session, the dock hides when the window is minimized, it stays clear of the resize handle, and it is visible on every tab by design rather than by accident.

---

## Version 3.4.0 — Self-Healing Compendiums & Major Content Expansion

### Fixed: compendiums vanishing after module updates
Foundry deletes and replaces the module folder on update, wiping the runtime-built LevelDB packs inside it — and the seeder trusted the stored "already seeded" version, so packs stayed empty until a brand-new world reset it. The seeder is now **self-healing**: it reseeds whenever the data version changes *or any pack is empty*, so existing worlds repair automatically on the next load after an update. (On the YAML question: dnd5e's YAML files are *build sources* compiled into LevelDB with `foundryvtt-cli` at release — Foundry never reads YAML at runtime, so the format wasn't the cause. This module's JSON sources remain CLI-compatible if you ever want to compile static packs yourself.)

### Content expansion
- **Backgrounds: 35 → 75**, now covering the full chapter — all Great Clan and Imperial families, the Minor Clans, Monastic, Commoner, Non-Rokugani, and Non-Human backgrounds — each with its skill proficiencies and organized into 13 clan/category folders.
- **New: AiR Feats pack (59 feats)** with prerequisites captured as requirements. (The book designates feat names and game statistics as Open Game Content; entries without a Prerequisite line aren't auto-captured.)
- **New: AiR Class Features pack (72 features)** foldered by class, each granted automatically by its class.
- **Classes rebuilt with full advancement tracks**: HitPoints, saving throws, ScaleValues, **ItemGrant** advancements delivering every feature at the right level, **Ability Score Improvement** advancements at each class's actual ASI levels, and a **Subclass (Archetype) advancement slot** at the correct level per class (Acolyte 1st, Ritualist Tradition 2nd, others 3rd) — so level-up prompts for features, ASIs/feats, and archetype selection. Archetype/subclass *items* (with their feature trees) are the main remaining gap, deferred to a future pass.
- **Species now carry their ability score increases** as Ability Score Improvement advancements (Human: all +1 fixed; others: point-buy matching each species' rule), plus their trait names listed in the description with page references.
- **Folders everywhere**: backgrounds by clan/category, class features by class, equipment split Weapons/Armor/Outfits, invocations by element (Air/Earth/Fire/Water/Universal).

Pack documents remain mechanical statistics and original summaries with page references — the book's descriptive text (designated closed content) is not included.

---

## Version 3.5.0 — Archetypes, Feat-on-Level Choices & the Human Variant

Three fixes driven by the D&D 5e SRD (the base ruleset AiR builds on):

### Archetypes added (19 subclasses)
The classes pack now includes every archetype as a proper dnd5e **subclass** item, each linked to its parent class and sorted into a per-class "<Class> Archetypes" folder, so the Archetype advancement slot finally has options to choose from:
- **Bushi**: Samurai, Protector, Vanguard, Coiling Serpent
- **Duelist**: Blademaster, Adept, Deathdancer
- **Courtier**: Diplomat, Investigator
- **Shinobi**: Saboteur, Infiltrator
- **Ritualist**: Artisan, Elementalist, Medium
- **Pilgrim**: Path of Redemption, Path of Harmony, Path of Justice
- **Acolyte**: Acolyte of Togashi, Acolytes of Shadow

(The 7 class items now live in a "Classes" folder alongside these.) Archetype *feature* trees — the individual features each archetype grants at its levels — remain a future pass; the subclass items are selectable and carry page references for now.

### Ability Score Improvement OR feat
Per the SRD, an ASI lets you increase ability scores **or take a feat**. The class ASI advancements previously pre-filled an ability increase, hiding the feat option. They now leave the choice open, so every ASI level (at each class's correct levels) prompts the standard "ability scores or a feat" decision and can draw from the new AiR Feats pack.

### Human variant
The Human species rule offers two options: every score +1, **or** two different scores +1 **and one feat**. Only the first was modeled. The Human now carries an Ability Score Improvement advancement (two points, max +1 each) plus a **feat ItemChoice** drawing on the 59-feat AiR Feats pack, modeling the variant; the description documents the all-six-scores option for manual assignment when chosen. (dnd5e can't express a single either/or advancement set, so the more mechanically active variant is the one wired up.)

---

## Version 3.6.0 — Full Class Proficiency Automation

Classes were carrying only hit dice, saves, and scale values. Following the dnd5e module's own SRD-class pattern, every class now has its **complete proficiency advancement tree**, so character creation auto-prompts for everything the book grants:

- **Armor proficiencies** — granted where they map to a base 5e category (e.g. Shinobi/Acolyte light armor; Bushi light and medium).
- **Weapon proficiencies** — granted as base categories (simple/martial); class-specific weapons that aren't a base category (e.g. the Shinobi's shuriken, chain sickle, katana, nunchaku, sai, swordbreaker) are listed in the class description since dnd5e grants weapons by category, not individually.
- **Saving throw proficiencies** — granted (e.g. Shinobi Dexterity & Intelligence).
- **Skill proficiencies** — as a proper **player choice** drawing from each class's exact list (e.g. Shinobi: choose 3 from Acrobatics, Athletics, Deception, Intimidation, Investigation, Medicine, Perception, Stealth, Survival).
- **Tool proficiencies** — base-category tools granted where applicable; Rokugan-specific tool sets (ninja tools, tools of subterfuge, mystic implements, bowyer's kit, etc.) are noted in the description.

These use the same Trait grant/choice advancement format the dnd5e system uses for its SRD classes, so they behave identically in the level-up and character-creation flows. Combined with the existing ItemGrant (features), ASI/feat, ScaleValue, and Subclass advancements, the classes are now automated about as fully as the dnd5e advancement engine allows.

---

## Version 3.7.0 — Complete Mundane Equipment

The equipment pack previously held only weapons and armor. It now includes **all of Chapter 4's mundane equipment** — **132 items** across **14 folders**:

- **Adventuring Gear** (Table 4-6): Book, Field Medicine Kit, Finger of Jade, Mask, Personal Seal/Chop, Portable Tea Set, Quiver, Ritual Pouch, Rope, Tents (S/M/L), Umbrella, Whetstone.
- **Arrows** (Table 4-4): Willow-Leaf, Armor-Piercing, Demon-Breaking, Fire-Blossom, Flesh-Cutter, Humming-Bulb, and Soul-Star arrows, as ammunition consumables.
- **Tools** (Table 4-7), foldered by category: Artisan (Blacksmith's, Bowyer's, Calligraphy, Ceremonial Tea Set, Chemist's, Cooking, Fishing, Makeup, Mason's, Painter's, Potter's, Sword Maintenance, Tailor's, Tattoo, Weaver's), Gaming sets, Musical instruments (Drums, Flute, Lute, Zither), Mystic implements (Alchemist's, Divination), and Tools of Subterfuge (Disguise, Infiltrator's Equipment, Invisible Ink) — created as proper dnd5e **tool** items.
- **Mounts** (Table 4-8): Camel, Elephant, Ox, Pony, Warhorse, Utaku Steed — with speeds/capacities noted.
- **Tack & Vehicles**: saddles, carts, palanquin.
- **Ships & Boats**: Ferry Raft, Mantis Trading Ship, Performer's Boat, Water-Spider, Tub-Boat.
- **Food, Drink & Lodging** (Table 4-12): basic/luxury foods and drink, consumer goods, and inn stays, with countryside/city pricing noted.

Each item carries its price, weight, and the correct dnd5e item type (loot, consumable, tool, container) so it behaves properly in inventories. The self-healing seeder's data version was bumped, so existing worlds receive the new items automatically on next load.

---

## Version 3.8.0 — Class Starting Equipment

Every class now includes its **starting equipment** as a dnd5e 5.x **StartingEquipment** advancement, so creating a character at 1st level prompts the book's equipment choices and links real items from the AiR equipment compendium. Examples:

- **Shinobi**: (katana / single-edged sword / two sickles / chain sickle / nunchaku / two sai), then (10 shuriken / 4 daggers), concealed armor, unremarkable garb, and (disguise kit / infiltrator's equipment).
- **Bushi**: (field gear + a martial weapon / animal-hide armor + a martial weapon / silk armor + longbow + arrows), plus a simple weapon or two daggers.
- **Ritualist**: vestment choice, a simple melee weapon or hunting bow package, one artisan tool, and one mystic implement.

All linked items resolve to real equipment-pack UUIDs (verified zero broken links across all seven classes); weapon/armor/tool *category* choices (e.g. "any one martial weapon") use dnd5e's category grants.

### Known approximations
A few AiR equipment options don't map cleanly to a dnd5e category key and are approximated: "any two light melee weapons" and "one heavy martial melee weapon" (Duelist) fall back to martial/simple-melee category grants, and "any two sets of tools from [four lists]" (Courtier) grants two artisan-tool choices. The book's exact wording is preserved in each class description for reference. The self-healing seeder's data version was bumped, so existing worlds get the updated classes automatically.

---

## Version 3.9.0 — Background Automation

Backgrounds were inert descriptions. They now carry full dnd5e advancement, so adding one to a character grants what the book specifies:

- **Skill proficiencies** — fixed grants plus the "choose one other" choice, with the correct constrained pool (e.g. Doji Family: History + choose one Charisma-based skill; Hida Family: Athletics + choose one Wisdom-based skill).
- **Languages** — granted (Rokugani for clan backgrounds; Nezumi/Naga/Tengu/etc. for the relevant non-human and regional backgrounds), with a free-choice language grant where the book offers one.
- **Starting equipment** — a StartingEquipment advancement linking real items from the AiR equipment compendium, with "A or B" choices as selectable options and coin (e.g. 10 gp) as starting wealth. All 151 linked items across the backgrounds resolve to real compendium UUIDs (verified zero broken).

The background set also grew from recovering the **Minor Clan** backgrounds (Cat, Centipede, Deer, Falcon, Fox, Hare, Moth, Sparrow, Tortoise, Wasp) whose titles sit in a decorative font — their names are recovered from the body text — for **58 fully-automated backgrounds** across 13 clan/category folders.

### Known approximations
Weapon proficiencies (AiR backgrounds grant specific weapons like the wakizashi) and Rokugan-specific tool sets are listed in each background's description rather than granted mechanically, since dnd5e grants weapons by category and AiR's tool sets don't all map to base tool keys — the same parity approach used for classes. The self-healing seeder's data version was bumped, so existing worlds update automatically.

---

## Version 3.10.0 — Choosing Between Variant Options (Human ASI)

### Level-up Ability Score Improvement or feat (levels 4/8/12/16/19…)
This was already in place and is confirmed working: every class carries Ability Score Improvement advancements at its book-specified levels (the standard 4/8/12/16/19 for most; the Bushi/Duelist/Shinobi/Courtier follow their own tables) with an unfilled value, so dnd5e presents the standard **"improve ability scores or take a feat"** choice at each of those level-ups. No change was needed.

### Human: choose Standard or Versatile
The Human's two options can't live in one race item — dnd5e applies a race's fixed ability increases automatically and can't offer an "either this whole set or that whole set" toggle. Following how official dnd5e content handles the variant Human, the Human is now **two race items**:
- **Human (Standard)** — each ability score increases by 1 (applied automatically).
- **Human (Versatile)** — increase two different ability scores by 1 (you distribute the points) **and** choose one feat from the AiR Feats pack.

The player simply picks whichever Human they want at character creation, so both options are fully supported instead of one being forced. (The Human is the only AiR species with this either/or ability-score option, so no other races needed splitting.)
