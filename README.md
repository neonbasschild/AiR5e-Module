# Adventures in Rokugan 5E — Foundry VTT Module

A module for Foundry VTT's **dnd5e system** that adapts it for play with **Adventures in Rokugan** (published by Edge Studio / Fantasy Flight Games).

This module is a **framework and content overlay**: it provides game mechanics, automation, and compendium entries with original summaries and page references. It does **not** reproduce the book's descriptive text — you must own *Adventures in Rokugan* to play.

---

## Requirements

- **Foundry VTT** v13 or later
- **dnd5e system** v5.0.0 or later (verified through 5.3.3)

## Installation

1. Install the **dnd5e system** in Foundry if you don't already have it.
2. In Foundry's **Add-on Modules** tab, click **Install Module**.
3. Paste the manifest URL, or find the module in the package browser.
4. Enable the module in your world from the **Manage Modules** menu.

On first load, the module automatically builds its compendium packs.

---

## What This Module Provides

### Compendium Content

- **Classes** — Bushi, Duelist, Courtier, Shinobi, Ritualist, Pilgrim, and Acolyte, each with full advancement (hit dice, saving throws, armor/weapon/tool proficiencies, skill choices, subclass/archetype selection, ability-score-improvement or feat choices, scale values, feature grants, and starting equipment).
- **Archetypes / Subclasses** — the archetype options for each class.
- **Species** — Human (Standard and Versatile), Naga, Nezumi, Mazoku, Specter, Tengu, Animal Yōkai, and Unique Existence.
- **Backgrounds** — organized by Great Clan, Imperial families, Minor Clans, monastic orders, commoners, non-Rokugani, and non-human origins, with skill/tool/weapon proficiencies, languages, and starting equipment.
- **Feats** — the Adventures in Rokugan feats, with prerequisites.
- **Equipment** — Rokugan weapons, armor, adventuring gear, tools, arrows, mounts, vehicles, ships, and food/lodging.
- **Techniques & Invocations** — martial techniques and elemental invocations.

### Automation & Systems

- **Resource tracking** — Focus, Favor, and Yin/Yang pools, with automatic spending when techniques and invocations are used, and a resource dock on the character sheet.
- **Combat & rest automation** — Focus gained at the end of each turn, Focus reset at the start of combat, and Favor restored on a long rest (optional, toggleable).
- **Proficiency registration** — Rokugan weapons and tools are registered so class and background proficiency grants apply correctly.
- **Languages** — the Adventures in Rokugan languages are registered for use in proficiency grants.

### Terminology

| Standard D&D 5e | Adventures in Rokugan |
|---|---|
| Spells | Invocations (Ritualist) / Techniques (martial classes) |
| Spell Slots | Favor (Ritualist) / Focus (martial classes) |
| Spell Level | Invocation Tier |
| Spell School | Element (Air / Earth / Fire / Water) |

### Currency

A world setting lets the GM choose the coinage:

- **Standard** — gold / silver / copper (the book's default)
- **Rokugan** — koku / bu / zeni
- **Both** — both sets together, with conversions on the shared value scale

Conversions follow the book's table (1 koku = 1 gp, 1 bu = 2 sp, 1 zeni = 2 cp). Electrum and platinum are not used in Rokugan.

### Character Sheet

An optional **Rokugan** tab adds clan affiliation, social standing (Honor, Glory, Status), a Shadowlands Taint tracker, and Rokugan's Motivations. An opt-in feudal-Japanese sheet theme is also available.

---

## Settings

Module settings (under **Configure Settings → Adventures in Rokugan 5E**) include the currency system, combat Focus automation, and resource-spending automation.

---

## Credits

Adventures in Rokugan is published by Edge Studio / Fantasy Flight Games. This module is an unofficial, fan-made framework and is not affiliated with or endorsed by the publisher. You must own the *Adventures in Rokugan* book to use this module as intended.

### Icons

Compendium icons are from [game-icons.net](https://game-icons.net), used under the
[Creative Commons Attribution 3.0 license](https://creativecommons.org/licenses/by/3.0/)
(some are CC0). Icons made by: Carl Olsen, Delapouite, Lorc, Sbed, Skoll, Willdabeast.
