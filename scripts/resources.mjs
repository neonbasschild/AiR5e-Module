/**
 * RokuganResources - Manages Focus, Favor, and Yin/Yang on actor documents.
 *
 * All three resources are stored in actor flags under "rokugan5e.resources".
 * This module provides:
 *  - Getters/setters for each resource
 *  - Computed max values from class level + progression tables
 *  - Hook handlers for combat start/end (Focus resets)
 *  - Chat message helpers for spending resources
 */

import { ROKUGAN_TABLES } from "./tables.mjs";

export class RokuganResources {

  // ----------------------------------------
  // Resource key paths in actor flags
  // ----------------------------------------
  static FLAG_SCOPE = "rokugan5e";
  static FLAG_KEY   = "resources";

  // ----------------------------------------
  // Get the full resources object for an actor
  // ----------------------------------------
  static get(actor) {
    return actor.getFlag(RokuganResources.FLAG_SCOPE, RokuganResources.FLAG_KEY) ?? {};
  }

  // ----------------------------------------
  // Detect which Rokugan class(es) an actor has
  // Returns: { className, level } for the primary Rokugan class, or null
  // ----------------------------------------
  static getRokuganClass(actor) {
    if (!actor?.items) return null;

    const classItems = actor.items.filter(i => i.type === "class");
    for (const cls of classItems) {
      const identifier = (cls.system?.identifier ?? cls.name ?? "").toLowerCase();
      const name = cls.name?.toLowerCase() ?? "";
      const key = identifier || name;

      const allClasses = [
        ...ROKUGAN_TABLES.focusClasses,
        ...ROKUGAN_TABLES.favorClasses,
        ...ROKUGAN_TABLES.yinYangClasses,
        ...ROKUGAN_TABLES.ninjaClasses,
        ...ROKUGAN_TABLES.intrigueClasses,
      ];

      for (const rClass of allClasses) {
        if (key.includes(rClass)) {
          return { className: rClass, level: cls.system?.levels ?? 1 };
        }
      }
    }
    return null;
  }

  // ----------------------------------------
  // Determine resource type for this actor
  // ----------------------------------------
  static getResourceType(actor) {
    const cls = RokuganResources.getRokuganClass(actor);
    if (!cls) return null;
    if (ROKUGAN_TABLES.focusClasses.includes(cls.className))  return "focus";
    if (ROKUGAN_TABLES.favorClasses.includes(cls.className))  return "favor";
    if (ROKUGAN_TABLES.yinYangClasses.includes(cls.className)) return "yinyang";
    if (ROKUGAN_TABLES.ninjaClasses.includes(cls.className))  return "ninja";
    if (ROKUGAN_TABLES.intrigueClasses.includes(cls.className)) return "intrigue";
    return null;
  }

  // ----------------------------------------
  // FOCUS: Compute max focus for a class/level
  // ----------------------------------------
  static getFocusMax(className, level) {
    const table = ROKUGAN_TABLES[className];
    if (!table) return 0;
    const row = table[Math.min(level, 20)];
    return row?.focusMax ?? 0;
  }

  // ----------------------------------------
  // FAVOR: Compute max favor for ritualist level
  // ----------------------------------------
  static getFavorMax(level) {
    const table = ROKUGAN_TABLES.ritualist;
    const row = table[Math.min(level, 20)];
    return row?.favorMax ?? 0;
  }

  // ----------------------------------------
  // NINJA: Max prepared ninja tools for shinobi level
  // ----------------------------------------
  static getNinjaMax(level) {
    const row = ROKUGAN_TABLES.shinobi?.[Math.min(level, 20)];
    return row?.ninjaTools ?? 0;
  }

  // ----------------------------------------
  // INTRIGUE: Max intrigue dice for courtier level
  // ----------------------------------------
  static getIntrigueMax(level) {
    const row = ROKUGAN_TABLES.courtier?.[Math.min(level, 20)];
    return row?.intrigueDice ?? 0;
  }

  // ----------------------------------------
  // Get invocation tier limits for ritualist
  // ----------------------------------------
  static getInvocationTiers(level) {
    const table = ROKUGAN_TABLES.ritualist;
    const row = table[Math.min(level, 20)];
    return {
      tier1: row?.tier1 ?? 0,
      tier2: row?.tier2 ?? 0,
      tier3: row?.tier3 ?? 0,
    };
  }

  // ----------------------------------------
  // FOCUS: Get current focus for actor
  // ----------------------------------------
  static getCurrentFocus(actor) {
    const res = RokuganResources.get(actor);
    return res.focus?.current ?? 0;
  }

  // ----------------------------------------
  // FOCUS: Get focus data for actor
  // ----------------------------------------
  static getFocusData(actor) {
    const cls = RokuganResources.getRokuganClass(actor);
    if (!cls || !ROKUGAN_TABLES.focusClasses.includes(cls.className)) return null;

    const max = RokuganResources.getFocusMax(cls.className, cls.level);
    const res = RokuganResources.get(actor);
    const current = res.focus?.current ?? 0;

    return {
      current: Math.min(current, max),
      max,
      className: cls.className,
      level: cls.level,
      techniques: ROKUGAN_TABLES[cls.className]?.[cls.level]?.techniques ?? 0,
    };
  }

  // ----------------------------------------
  // FAVOR: Get favor data for actor
  // ----------------------------------------
  static getFavorData(actor) {
    const cls = RokuganResources.getRokuganClass(actor);
    if (!cls || !ROKUGAN_TABLES.favorClasses.includes(cls.className)) return null;

    const max = RokuganResources.getFavorMax(cls.level);
    const res = RokuganResources.get(actor);
    const current = res.favor?.current ?? max; // starts full
    const bonusFavor = res.favor?.bonus ?? 0;

    return {
      current: Math.min(current, max),
      bonus: bonusFavor,
      max,
      level: cls.level,
      ...RokuganResources.getInvocationTiers(cls.level),
    };
  }

  // ----------------------------------------
  // YIN/YANG: Get yin/yang data for actor
  // ----------------------------------------
  static getYinYangData(actor) {
    const cls = RokuganResources.getRokuganClass(actor);
    if (!cls || !ROKUGAN_TABLES.yinYangClasses.includes(cls.className)) return null;

    const res = RokuganResources.get(actor);
    const state = res.yinyang?.state ?? 0; // 0 = Balanced/Centered
    const stateData = ROKUGAN_TABLES.yinYangStates[String(state)];
    const bonusHitDice = ROKUGAN_TABLES.pilgrim?.[cls.level]?.bonusHitDice ?? 0;
    const activeForm = res.yinyang?.activeForm ?? null;

    return {
      state,
      stateData,
      label: stateData?.label ?? "ROKUGAN.YinYang.Balanced",
      activeForm,
      bonusHitDice,
      level: cls.level,
    };
  }

  // ----------------------------------------
  // NINJA: Get ninja-tools data for a shinobi actor
  // ----------------------------------------
  static getNinjaData(actor) {
    const cls = RokuganResources.getRokuganClass(actor);
    if (!cls || !ROKUGAN_TABLES.ninjaClasses.includes(cls.className)) return null;

    const max = RokuganResources.getNinjaMax(cls.level);
    const res = RokuganResources.get(actor);
    const current = res.ninja?.current ?? max; // prepared full after a long rest

    return {
      current: Math.min(current, max),
      max,
      className: cls.className,
      level: cls.level,
      mercStrike: ROKUGAN_TABLES.shinobi?.[Math.min(cls.level, 20)]?.mercStrike ?? "",
    };
  }

  // ----------------------------------------
  // INTRIGUE: Get intrigue-dice data for a courtier actor
  // ----------------------------------------
  static getIntrigueData(actor) {
    const cls = RokuganResources.getRokuganClass(actor);
    if (!cls || !ROKUGAN_TABLES.intrigueClasses.includes(cls.className)) return null;

    const row = ROKUGAN_TABLES.courtier?.[Math.min(cls.level, 20)];
    const max = row?.intrigueDice ?? 0;
    const res = RokuganResources.get(actor);
    const current = res.intrigue?.current ?? max; // start full

    return {
      current: Math.min(current, max),
      max,
      die: row?.intrigueDie ?? "d6",
      flourishes: row?.flourishes ?? 0,
      className: cls.className,
      level: cls.level,
    };
  }

  // ----------------------------------------
  // SETTERS
  // ----------------------------------------

  static async setFocus(actor, value) {
    const focusData = RokuganResources.getFocusData(actor);
    if (!focusData) return;
    const clamped = Math.max(0, Math.min(value, focusData.max));
    const res = foundry.utils.deepClone(RokuganResources.get(actor));
    res.focus = { ...res.focus, current: clamped };
    await actor.setFlag(RokuganResources.FLAG_SCOPE, RokuganResources.FLAG_KEY, res);
    return clamped;
  }

  static async setNinja(actor, value) {
    const ninjaData = RokuganResources.getNinjaData(actor);
    if (!ninjaData) return;
    const clamped = Math.max(0, Math.min(value, ninjaData.max));
    const res = foundry.utils.deepClone(RokuganResources.get(actor));
    res.ninja = { ...res.ninja, current: clamped };
    await actor.setFlag(RokuganResources.FLAG_SCOPE, RokuganResources.FLAG_KEY, res);
    return clamped;
  }

  static async setIntrigue(actor, value) {
    const data = RokuganResources.getIntrigueData(actor);
    if (!data) return;
    const clamped = Math.max(0, Math.min(value, data.max));
    const res = foundry.utils.deepClone(RokuganResources.get(actor));
    res.intrigue = { ...res.intrigue, current: clamped };
    await actor.setFlag(RokuganResources.FLAG_SCOPE, RokuganResources.FLAG_KEY, res);
    return clamped;
  }

  static async setFavor(actor, value, bonus = null) {
    const favorData = RokuganResources.getFavorData(actor);
    if (!favorData) return;
    const clamped = Math.max(0, Math.min(value, favorData.max));
    const res = foundry.utils.deepClone(RokuganResources.get(actor));
    res.favor = {
      ...res.favor,
      current: clamped,
      bonus: bonus !== null ? Math.max(0, bonus) : (res.favor?.bonus ?? 0),
    };
    await actor.setFlag(RokuganResources.FLAG_SCOPE, RokuganResources.FLAG_KEY, res);
    return clamped;
  }

  static async setBonusFavor(actor, value) {
    const res = foundry.utils.deepClone(RokuganResources.get(actor));
    res.favor = { ...res.favor, bonus: Math.max(0, value) };
    await actor.setFlag(RokuganResources.FLAG_SCOPE, RokuganResources.FLAG_KEY, res);
  }

  static async setYinYang(actor, state, activeForm = null) {
    const clamped = Math.max(-3, Math.min(3, state));
    const res = foundry.utils.deepClone(RokuganResources.get(actor));
    res.yinyang = {
      ...res.yinyang,
      state: clamped,
      activeForm: activeForm !== null ? activeForm : (res.yinyang?.activeForm ?? null),
    };
    await actor.setFlag(RokuganResources.FLAG_SCOPE, RokuganResources.FLAG_KEY, res);
    return clamped;
  }

  static async setActiveForm(actor, form) {
    const res = foundry.utils.deepClone(RokuganResources.get(actor));
    res.yinyang = { ...res.yinyang, activeForm: form };
    await actor.setFlag(RokuganResources.FLAG_SCOPE, RokuganResources.FLAG_KEY, res);
  }

  // ----------------------------------------
  // Spend resources (with validation)
  // ----------------------------------------

  /**
   * Spend focus points. Returns false if insufficient.
   */
  static async spendFocus(actor, amount) {
    const current = RokuganResources.getCurrentFocus(actor);
    if (current < amount) {
      ui.notifications.warn(game.i18n.format("ROKUGAN.Focus.InsufficientFocus", { amount }));
      return false;
    }
    await RokuganResources.setFocus(actor, current - amount);
    return true;
  }

  /**
   * Spend favor. Bonus favor is spent first (it can only be used on empowerments),
   * then standard favor. Returns false if insufficient.
   */
  static async spendFavor(actor, amount, isEmpowerment = false) {
    const data = RokuganResources.getFavorData(actor);
    if (!data) return false;

    let remaining = amount;

    if (isEmpowerment && data.bonus > 0) {
      const fromBonus = Math.min(data.bonus, remaining);
      remaining -= fromBonus;
      await RokuganResources.setBonusFavor(actor, data.bonus - fromBonus);
    }

    if (remaining > 0) {
      if (data.current < remaining) {
        ui.notifications.warn(game.i18n.format("ROKUGAN.Favor.InsufficientFavor", { amount }));
        return false;
      }
      await RokuganResources.setFavor(actor, data.current - remaining);
    }
    return true;
  }

  /**
   * Shift Yin/Yang state by delta (-1, +1, etc.)
   */
  static async shiftYinYang(actor, delta) {
    const data = RokuganResources.getYinYangData(actor);
    if (!data) return;
    const newState = Math.max(-3, Math.min(3, data.state + delta));
    await RokuganResources.setYinYang(actor, newState);
    return newState;
  }

  // ----------------------------------------
  // Combat Hook Handlers
  // ----------------------------------------

  /**
   * On combat start: Focus resets to 0 for all combatants.
   * This implements the AiR rule: "You start each encounter with 0 focus points."
   */
  static async onCombatStart(combat, updateData) {
    for (const combatant of combat.combatants) {
      const actor = combatant.actor;
      if (!actor) continue;
      if (RokuganResources.getResourceType(actor) === "focus") {
        await RokuganResources.setFocus(actor, 0);
      }
    }
  }

  /**
   * On combat end: Focus is lost (reset to 0), Yin/Yang returns to resting position.
   * This implements: "At the end of an encounter, unspent focus points are lost."
   */
  static async onCombatEnd(combat) {
    for (const combatant of combat.combatants) {
      const actor = combatant.actor;
      if (!actor) continue;

      const type = RokuganResources.getResourceType(actor);
      if (type === "focus") {
        await RokuganResources.setFocus(actor, 0);
      }
      if (type === "yinyang") {
        // Return to resting position (Balanced = 0) and clear active form
        await RokuganResources.setYinYang(actor, 0, null);
      }
    }
  }

  /**
   * On turn end: Gain 1 focus point (plus stance bonuses handled separately by players).
   * This implements: "You gain 1 focus point at the end of each of your turns."
   * Only auto-gains base 1 point; stance bonuses require manual input.
   */
  static async onTurnEnd(combat, combatant) {
    const actor = combatant?.actor;
    if (!actor) return;
    if (RokuganResources.getResourceType(actor) === "focus") {
      const data = RokuganResources.getFocusData(actor);
      if (!data) return;
      const newFocus = Math.min(data.current + 1, data.max);
      await RokuganResources.setFocus(actor, newFocus);
    }
  }

  // ----------------------------------------
  // Long Rest: Restore Favor
  // ----------------------------------------

  /**
   * On long rest completion: Favor is fully restored.
   * This implements: "Spent favor is restored after you complete a long rest."
   */
  static async onLongRest(actor) {
    const type = RokuganResources.getResourceType(actor);
    if (type === "favor") {
      const data = RokuganResources.getFavorData(actor);
      await RokuganResources.setFavor(actor, data.max, 0);
    }
  }

  // ----------------------------------------
  // Chat message: log resource spending
  // ----------------------------------------

  static async chatSpendResource(actor, resourceType, amount, techniqueName = null) {
    const label = resourceType === "favor"
      ? game.i18n.localize("ROKUGAN.Favor.Favor")
      : game.i18n.localize("ROKUGAN.Focus.Focus");

    const content = techniqueName
      ? game.i18n.format("ROKUGAN.Chat.SpentResourceFor", { amount, label, name: techniqueName })
      : game.i18n.format("ROKUGAN.Chat.SpentResource", { amount, label });

    await ChatMessage.create({
      content: `<div class="rokugan-chat-resource">${content}</div>`,
      speaker: ChatMessage.getSpeaker({ actor }),
      flags: { "rokugan5e": { resourceSpend: { type: resourceType, amount, technique: techniqueName } } },
    });
  }
}
