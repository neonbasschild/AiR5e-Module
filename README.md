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

---

## Version 3.11.0 — Page Reference Corrections

Page references in compendium entries were inaccurate, most visibly the class features: every feature inherited its parent class's starting page (e.g. all Shinobi features pointed to p. 74) rather than the page where the feature is actually printed. Expert Prowler, for instance, listed p. 74 but is on p. 81.

The root issue was twofold: class features were assigned the class's start page wholesale, and the PDF's internal page count is offset from the book's printed page numbers. Page references are now resolved against the **printed** page numbers using the book's page breaks, constrained to each entry's own chapter so a name mentioned in two places (e.g. a feat referenced in a class writeup) resolves to its real location:

- **Class features**: now span 22 distinct pages instead of 7 — each feature points to its actual page (Expert Prowler → p. 81, Merciless Strikes → p. 79, etc.).
- **Classes, backgrounds, feats, species, equipment**: 64 additional page references corrected (e.g. several Imperial-family backgrounds, the Aerie backgrounds, and a number of feats were 2 pages off).
- The correction is built into the pack generator, so future rebuilds stay accurate automatically.

The self-healing seeder's data version was bumped, so existing worlds pick up the corrected references on next load.

---

## Version 3.12.0 — Languages, Weapon & Tool Proficiencies Registered

The proficiency grants on backgrounds and classes previously referenced languages, weapons, and tools that weren't registered in the system, so they resolved to blanks. All three are now properly registered in `CONFIG.DND5E`.

### Languages
The module now registers the **canonical Adventures in Rokugan languages** (replacing earlier placeholder names) as a "Languages of Rokugan" category in dnd5e 5.x's nested language tree: Rokugani and Rokugani (Signed), Courtly Rokugani, Ivindi, Jindallaean, Leaf-Rustle (Shinomen nezumi), Qamari Languages, River Speech (naga), Sky Speech (tengu), Stone-Click (Shadowlands nezumi), Ujik Languages, Yún Fēng Wén, Animal Speech, Battle Argot, and the Asako Cipher / Kuni Codes / Yogo Cipher. Backgrounds now grant these real language keys (and free-language choices draw from the correct list), so they appear and apply correctly. The registration auto-detects nested (5.x) vs. flat language config for forward/backward compatibility.

### Weapon & Tool Proficiencies
All AiR weapons (47) and tools (26) are registered into `CONFIG.DND5E.weaponIds` and `toolIds`, each mapped to its item in the `rokugan5e.equipment` compendium — the same mechanism the core system uses for SRD gear. This makes specific weapon/tool proficiencies resolve to the real items and lets the proficiency checkbox on those items work. AiR's tool **categories** — Artisan's Tools, Gaming Sets, Musical Instruments, and AiR's own Mystic Implements and Tools of Subterfuge — are registered as tool-proficiency categories so they appear in the proficiency dropdowns.

The self-healing seeder's data version was bumped (backgrounds changed), so existing worlds update on next load.

---

## Version 3.13.0 — Full Weapon & Tool Proficiency Automation (Classes + Backgrounds)

Now that the weapons and tools are registered (3.12.0), the weapon and tool proficiencies that backgrounds and classes grant are applied **mechanically** instead of being left as description notes. Using the Shosuro Family background as the example, adding it to a character now grants: Deception + a choice of one stealth-type skill, **the wakizashi weapon proficiency**, **the disguise kit tool proficiency**, **a choice of one artisan tool or musical instrument**, languages, and starting equipment — all automatically.

- **Backgrounds**: 43 of 58 now grant weapon proficiencies (mostly the wakizashi; some hunting bow, curved saber, or "any one martial weapon" as a choice) and 54 of 58 grant tool proficiencies. Specific tools are granted directly; "any one artisan tool," "A or B," and "choose one/two of the following" become proper choices; mounts/vehicles (which are item-use proficiencies, not tool keys) remain noted in the description.
- **Classes**: specific weapon and tool proficiencies beyond the base categories are now granted — most notably the **Shinobi's shuriken, chain sickle, katana, nunchaku, sai, and swordbreaker**, the Courtier's two-tool choice and silk armor, the Duelist's bowyer's/sword-maintenance kit choice, the Ritualist's mystic implement, and the Pilgrim's artisan tool.

All proficiency keys resolve against the registered `weaponIds`/`toolIds` and tool categories (verified zero unresolvable keys). The self-healing seeder's data version was bumped, so existing worlds update on next load.

---

## Version 3.14.0 — Currency System Options (gp/sp/cp ↔ koku/bu/zeni)

Adventures in Rokugan uses standard gold/silver/copper by default but provides the Legend of the Five Rings koku/bu/zeni coinage with a conversion table (p. 187). A world setting, **Currency System**, now lets the GM choose:

- **Standard (gold / silver / copper)** — the book's default; gp/sp/cp untouched.
- **Rokugan (koku / bu / zeni)** — the L5R classic coinage on the sheet.
- **Both** — gp/sp/cp and koku/bu/zeni together; the true on-the-fly converter.

### Correct, lossless conversions
The earlier build relabeled cp→zeni and sp→bu 1:1, which was **wrong** — per Table 4-1, 1 bu = 2 sp and 1 zeni = 2 cp, not 1:1. The coins are now registered with their real conversion factors (koku = 1, bu = 5, zeni = 50 per gp), reproducing all 18 relationships in the book's table exactly (verified). Because dnd5e values every coin on the shared gp scale, money keeps its true value across modes — switching presentation converts a character's wealth on the fly rather than changing it.

To stay lossless, "Rokugan" mode relabels the gp slot to Koku (exact 1:1) and adds bu/zeni as their own coins without altering the sp/cp conversion numbers (so item prices and stored amounts, which are recorded in gp/sp/cp, are never silently revalued). "Both" mode is the cleanest for mixing the two, since the system's own currency-conversion tools then move value between all six denominations. Electrum and platinum remain removed (not used in Rokugan).

---

## Version 3.15.0 — Functional Class Features (Merciless Strikes, Ninjutsu)

Class features were inert descriptions. This release begins making them *work*, starting with the two flagship Shinobi abilities, and adds a framework for automating more:

### Merciless Strikes (Shinobi's Sneak-Attack analogue)
The Shinobi class now carries a **dice ScaleValue** (`@scale.shinobi.merciless-strikes`) encoding the per-condition damage progression from the class table (1d4 at level 1, up through 2d6, 3d6, to 3d8). The Merciless Strikes feature item has a **damage activity** that rolls this scaling die, so it can be used directly from the sheet — add it per negative condition on the target, up to three instances, once per creature per turn.

### Ninjutsu (Focus-based casting analogue)
The Ninjutsu feature now surfaces its **attack modifier** (proficiency + Dexterity) and **save DC** (8 + proficiency + Dexterity) on the item, and the Shinobi gains a **Ninja Tools Prepared** ScaleValue tracking how many ninja tools can be prepared per long rest (2 rising to 5). This integrates with the existing Focus pool and technique-item system (the ninja tools are consumable technique items that spend Focus). 

### Core features restored
Sixteen foundational 1st-level features that were lost during table extraction (because they sit in the table's merged "special" column) are now present as items across all classes — including Focus Points, Martial Techniques, Combat Stance, Invocations, Favor, Yin and Yang, Externalizations, and the Shinobi's Merciless Strikes and Ninjutsu — bringing the class-features pack to 88 entries.

This establishes the pattern (ScaleValue for progressions + an activity on the feature item) for automating further features; passive riders and save/attack abilities can be wired the same way in future passes.

---

## Version 3.16.0 — Critical Bugfixes: Advancement IDs, Languages, Human Versatile

Three bugs, two sharing a single root cause.

### Duplicate advancement IDs (Mirumoto with no automation, Human Versatile missing its ability increase)
The ID generator truncated names to 16 characters, so advancements with similar name-prefixes on the same item collided — and dnd5e silently drops advancements that share an `_id`. This is why the Mirumoto Family background appeared to have no automation (its trait advancements collided away) and why Human (Versatile) granted only the feat (its ability-score-increase advancement collided with the feat advancement). IDs are now derived from a hash of the full identifier, and a dedup safety net runs at build time, guaranteeing every advancement on every item has a unique ID. Audited across all packs: **zero duplicate advancement IDs remain**. This fixes automation on **37 backgrounds**, all **7 classes**, and **2 species** that were affected.

### Languages showing as "ROKUGAN.Language.…"
The language labels displayed as raw localization keys because the languages were registered at `init` — before Foundry's localization is ready — and stored as bare key strings in the wrong tree shape. Language registration now happens at `i18nInit` (when `game.i18n` is populated), localizes each label, and uses dnd5e 5.x's correct nested `{ label, children: { key: { label } } }` shape. Languages now display by name.

### Apply the fixes to an existing world
The seeder's data version was bumped, so on the next world load the compendiums are cleared and re-imported with the corrected data — no new world needed. (If a character already has the old Mirumoto background or old Human applied, re-drag the corrected version from the compendium to pick up the automation.)

---

## Version 3.17.0 — Starting Equipment & Gold Fixed

Starting equipment wasn't being granted because the weapon-category choices used invalid keys, and there was no gold alternative.

### Invalid weapon category keys (the main bug)
StartingEquipment "any one martial/simple weapon" choices were built with the weapon **type** values (`simpleM`, `martialM`, `simpleR`) instead of dnd5e's weapon **proficiency category** keys, which are only `sim` and `mar`. dnd5e couldn't resolve those entries, breaking the equipment step. All weapon-category choices now use the correct `sim`/`mar` keys (melee/ranged distinctions collapse to the base category, since dnd5e grants starting weapons by proficiency category). Linked items (specific weapons, armor, tools) were already resolving correctly; this fixes the category *choices* that sat alongside them.

### Gold alternative (take starting wealth instead of equipment)
Adventures in Rokugan lists only equipment packages, with no per-class "gold instead" option, so the wealth field was empty and the gold choice never appeared. Each class now carries a standard 5e-style starting-wealth roll (e.g. Bushi 2d4×10, Duelist 5d4×10, Shinobi 4d4×10, Pilgrim 5d4) so players who prefer to buy their own gear get the **"take gold instead"** option at character creation, exactly as the core dnd5e classes offer.

### Verified
Across all classes and backgrounds: zero broken equipment links, zero duplicate pool/advancement IDs, all weapon-category keys valid, 56 of 58 backgrounds carry their equipment (the other two list none in the book). The seeder's data version was bumped, so existing worlds reseed on next load — drag the class/background onto a character (or use a character-builder) to get the equipment/gold prompt.

---

## Version 3.18.0 — Weapon/Tool Auto-Proficiency Fixed

The automatic proficiency system wasn't recognizing AiR weapons and tools. Several linked causes:

### Items didn't declare their proficiency key (the main bug)
dnd5e matches a physical item on the sheet to a proficiency via the item's `system.type.baseItem` field, which must equal the registered `weaponIds`/`toolIds` key. Every AiR weapon and tool had an empty `baseItem`, so adding (for example) a wakizashi never triggered the proficiency check even when the character had wakizashi proficiency. Every weapon and tool now declares `baseItem` = its registered key, so the full chain — grant (`weapon:wakizashi`) → registration (`weaponIds.wakizashi`) → item (`baseItem: "wakizashi"`) — connects. Verified across all 47 weapons and 26 tools.

### Duplicate SRD tool entries ("two disguise kits")
The SRD registers tool keys like `disguiseKit`; this module registered `disguisekit`, so both appeared in the tool dropdown. AiR tools now override the equivalent SRD camelCase key, collapsing each to a single Rokugan entry pointing at the AiR item.

### Missing Rokugani Signed
Clan-tongue backgrounds list read/sign/speak/write, but only the spoken form was granted. A Rokugani grant now also grants **Rokugani Signed** (e.g. Shosuro Family now correctly gives Rokugani, Rokugani Signed, and Courtly Rokugani plus the free choice).

### Result
Weapon and tool proficiencies granted by classes and backgrounds now register on the sheet and drive the auto-proficiency checkmark when the matching item is added. All grant keys across every class and background resolve to a registered weapon/tool ID or a valid category (verified zero unresolvable). The seeder's data version was bumped; existing worlds reseed on next load. As with all advancement-applied data, re-drag a class/background already on a character (or rebuild via a character builder) to pick up the corrected items.

---

## Version 3.19.0 — Specific Weapon/Tool Proficiencies Apply on Build

Specific weapon and tool proficiencies (e.g. the Shinobi's shuriken, chain sickle, katana, nunchaku, sai, swordbreaker) appeared in the advancement list during character creation but weren't written to the sheet — only the category grant ("Simple weapons") applied.

The cause was registration timing. AiR's specific weapons/tools are registered into `CONFIG.DND5E.weaponIds`/`toolIds`, and dnd5e validates a Trait advancement's specific-item grants against those keys when the advancement is applied. The dnd5e system repopulates these maps during its own `setup` phase, which could drop entries that were only added at `init` — so by the time a character build applied the Trait grant, the custom keys weren't recognized and were silently dropped, while the built-in category key ("sim") survived.

Weapon/tool ID registration now runs in a dedicated method called at **both `init` and `setup`** (after the dnd5e system finishes its own setup), so the custom keys persist through to character-creation time and the specific-weapon/tool grants resolve and write to the sheet. All Shinobi specific-weapon grant keys verified present in `weaponIds`.

If a character was built before this fix, re-drag the class/background to re-run the advancement and pick up the proficiencies.

---

## Version 3.20.0 — The Real Fix: Weapon/Tool Registration Location (dnd5e 4.0+ API)

This is the actual root cause behind AiR weapons/tools showing as plain text (instead of with an icon) during character creation and not applying as proficiencies.

**dnd5e 4.0 moved specific weapon/tool registration to a new location.** The old `CONFIG.DND5E.weaponIds` / `toolIds` flat maps are deprecated; specific items now live in `CONFIG.DND5E.weapons` and `CONFIG.DND5E.tools` as objects (tools carry `{ ability, id }`, where `id` is the compendium UUID). Per dnd5e issue #4223, once the system has populated its maps, writing to the deprecated `*Ids` maps is a no-op — so this module's registration was effectively invisible to the system. When the Trait advancement tried to resolve `katana`/`shuriken`, it found nothing, so the proficiency couldn't be linked to an item (the missing icon) and wasn't applied to the sheet.

Registration now writes to `CONFIG.DND5E.weapons` and `CONFIG.DND5E.tools` (the 4.0+ locations) with the correct object shape, while still writing the legacy `weaponIds`/`toolIds` for older dnd5e. It runs at both `init` and `setup` (guarded for when the maps don't yet exist) so the entries survive the system's own setup. Tools are registered with a sensible default check ability (e.g. Disguise Kit → Charisma, Calligraphy Set → Intelligence), and the duplicate SRD camelCase entries are collapsed onto the AiR items.

With the items now resolvable, the specific weapon/tool proficiencies (the Shinobi's shuriken, chain sickle, katana, nunchaku, sai, swordbreaker, etc.) display with their icons during the advancement and apply to the sheet.

If a character was built before this fix, re-drag the class/background to re-run the advancement.

---

## Version 3.21.0 — Proficiency Links Resolved Against the Live Pack (real fix)

Two compounding problems were keeping AiR weapon/tool proficiencies from working.

### The seeder never reseeded since 3.18.0
The compendium seeder reseeds only when its internal `DATA_VERSION` changes — and that constant was accidentally left at `3.18.0` through 3.19 and 3.20, while only the module version advanced. So none of those releases' fixes ever reached an existing world: the packs were never rebuilt. The seeder version is now `3.21.0` (matched to the module), forcing a clean reseed.

### Proficiency UUIDs are now read from the live pack index
Previously the module registered proficiency items using precomputed compendium UUIDs. If anything about the imported document IDs differed at runtime, those links broke — which matches the "the link is broken / it's calling items that don't exist" symptom. Registration now happens at `ready`, after seeding, by looking up each AiR weapon and tool in the **live equipment-pack index by its `identifier`** and registering the actual runtime `uuid` from that index into `CONFIG.DND5E.weapons[key].id` / `tools[key].id` (the dnd5e v5 location). The link is therefore guaranteed to point at the real seeded item, never a stale precomputed path. Every AiR weapon and tool carries a `system.identifier` exactly matching its proficiency key (verified), so the lookup resolves for all of them.

This targets dnd5e v5 + Foundry v13 (the module's minimum), using the current `CONFIG.DND5E.weapons`/`tools` API with no legacy fallback paths in the resolution.

After updating, load the world once as GM so the reseed and registration run, then re-drag the class/background onto a character to apply the now-resolvable proficiencies.

---

## Version 3.22.0 — Proficiency Registration to Both Config Locations + Diagnostic

You confirmed the katana's in-world UUID is exactly `Compendium.rokugan5e.equipment.Item.rwkatana00000000` — which matches what the module registers. So the item link is correct and `keepId` is preserving IDs properly; the earlier "broken link / item doesn't exist" path is not an ID mismatch.

This release does two things:

1. **Registers to both config locations.** The `ready`-time, index-resolved registration now writes each weapon/tool's real UUID into **both** the dnd5e v5 location (`CONFIG.DND5E.weapons[key].id` / `tools[key].id`) **and** the historical map (`weaponIds[key]` / `toolIds[key]`). Depending on the exact dnd5e build, the Trait advancement derives its set of valid specific-weapon/tool keys from one or the other; writing both with the confirmed-correct UUID covers it.

2. **Adds a diagnostic** (`DIAGNOSTIC.md`). Running the included console snippet with a character selected reports each link in the chain: whether the registration is present, whether the UUID resolves, whether the system considers e.g. "katana" a valid weapon-proficiency choice, and what proficiencies are actually stored on the actor. This pinpoints exactly which step succeeds or fails so the remaining issue (if any) can be fixed precisely rather than by trial.

Please load the updated world as GM (so the reseed and registration run), then run the diagnostic from `DIAGNOSTIC.md` and share the output.

---

## Version 3.23.0 — Correct Proficiency Keys & Starting Equipment Format (from dnd5e pack source)

Using the dnd5e pack-source examples provided, two structural errors were corrected across all classes and backgrounds.

### Weapon proficiency keys are namespaced by category
Specific weapon proficiencies were written as `weapon:shuriken`, but dnd5e namespaces them under their category: `weapon:mar:shuriken`. This is why specific weapon grants never applied — the key format was wrong. All specific weapon proficiencies are now emitted as `weapon:<sim|mar>:<id>` (e.g. the Shinobi grants `weapon:mar:shuriken`, `weapon:mar:chainsickle`, `weapon:mar:katana`, `weapon:mar:nunchaku`, `weapon:mar:sai`, `weapon:mar:swordbreaker`; backgrounds grant `weapon:mar:wakizashi`). Bare category grants (`weapon:sim`, `weapon:mar`) are unchanged.

### Starting equipment uses system.startingEquipment, not an advancement
Starting equipment was being written as a `StartingEquipment` *advancement*, but dnd5e 5.x stores it as a flat array at `system.startingEquipment`. Each entry has `_id`, `group` (`""` for top level, or a parent entry's `_id`), `sort` (100000 increments), `type` (`AND`/`OR`/`linked`/`weapon`/`armor`/`tool`/`focus`/`currency`), `key`, `count`, and `requiresProficiency`. Gold is now a `currency` entry inside the tree (e.g. `{type:"currency", key:"gp", count:50}`) rather than a separate wealth roll. All 7 classes and 56 backgrounds now carry correctly-structured `system.startingEquipment`, and Trait advancements use the proper `value:{chosen:[]}` shape with `allowReplacements` set on background skills.

Validated: zero broken equipment links, zero dangling group references, all weapon keys correctly namespaced. The seeder data version was bumped; existing worlds reseed on next load.

---

## Version 1.0.0 — First Release

Feature-complete first public release. The module manifest is finalized for distribution:

- **Version** set to `1.0.0`.
- **System relationship** now includes the dnd5e manifest URL so Foundry can auto-install/verify the required system (dnd5e, minimum 5.0.0, verified 5.3.3).
- **Author**: Neon.
- **Project URL**, **manifest URL** (latest-release), and **download URL** (v1.0.0) point at the `neonbasschild/AiR5e-Module` repository.
- Seeder data version aligned to `1.0.0`, so the compendiums seed cleanly on first install.

### Packaging note
The `download` URL expects the release asset to be named **`module.zip`**. When creating the GitHub release tagged `v1.0.0`, upload the packaged module as `module.zip` so the manifest's download link resolves.
