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
