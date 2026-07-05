/**
 * RokuganTables - Progression tables for Rokugan class resources.
 *
 * Focus (martial classes): Starts at 0 each encounter, gained each turn,
 *   spent on Techniques. Lost at end of encounter.
 * Favor (Ritualist): Pool restored on long rest or 4h shrine meditation.
 *   Spent on Invocations + Empowerments. Bonus favor from Resonances.
 * Yin/Yang (Pilgrim): 7-state track (-3 Yin Apex to +3 Yang Apex).
 *   Used for Externalizations and Forms of Enlightenment.
 */

export const ROKUGAN_TABLES = {

  // ----------------------------------------
  // Bushi: Focus Maximum & Techniques Known
  // ----------------------------------------
  bushi: {
    1:  { focusMax: 4,  techniques: 1 },
    2:  { focusMax: 4,  techniques: 2 },
    3:  { focusMax: 4,  techniques: 2 },
    4:  { focusMax: 5,  techniques: 2 },
    5:  { focusMax: 5,  techniques: 3 },
    6:  { focusMax: 5,  techniques: 3 },
    7:  { focusMax: 6,  techniques: 3 },
    8:  { focusMax: 6,  techniques: 3 },
    9:  { focusMax: 6,  techniques: 4 },
    10: { focusMax: 7,  techniques: 4 },
    11: { focusMax: 7,  techniques: 5 },
    12: { focusMax: 7,  techniques: 5 },
    13: { focusMax: 8,  techniques: 5 },
    14: { focusMax: 8,  techniques: 5 },
    15: { focusMax: 8,  techniques: 6 },
    16: { focusMax: 9,  techniques: 6 },
    17: { focusMax: 9,  techniques: 6 },
    18: { focusMax: 9,  techniques: 7 },
    19: { focusMax: 10, techniques: 7 },
    20: { focusMax: 10, techniques: 7 },
  },

  // ----------------------------------------
  // Duelist: Focus Maximum & Techniques Known
  // (same progression as Bushi per the PDF)
  // ----------------------------------------
  duelist: {
    1:  { focusMax: 4,  techniques: 1 },
    2:  { focusMax: 4,  techniques: 2 },
    3:  { focusMax: 4,  techniques: 2 },
    4:  { focusMax: 5,  techniques: 2 },
    5:  { focusMax: 5,  techniques: 3 },
    6:  { focusMax: 5,  techniques: 3 },
    7:  { focusMax: 6,  techniques: 3 },
    8:  { focusMax: 6,  techniques: 3 },
    9:  { focusMax: 6,  techniques: 4 },
    10: { focusMax: 7,  techniques: 4 },
    11: { focusMax: 7,  techniques: 5 },
    12: { focusMax: 7,  techniques: 5 },
    13: { focusMax: 8,  techniques: 5 },
    14: { focusMax: 8,  techniques: 5 },
    15: { focusMax: 8,  techniques: 6 },
    16: { focusMax: 9,  techniques: 6 },
    17: { focusMax: 9,  techniques: 6 },
    18: { focusMax: 9,  techniques: 7 },
    19: { focusMax: 10, techniques: 7 },
    20: { focusMax: 10, techniques: 7 },
  },

  // ----------------------------------------
  // Courtier: Intrigue Dice (a spendable pool that fuels rhetorical flourishes;
  // regain half on a short rest, all on a long rest), the Intrigue Die size, and
  // Total Flourishes Known (Adventures in Rokugan, Table 2-3, p. 66). Courtiers
  // do NOT use Focus.
  // ----------------------------------------
  courtier: {
    1:  { intrigueDice: 2, intrigueDie: "d6",  flourishes: 1 },
    2:  { intrigueDice: 2, intrigueDie: "d6",  flourishes: 3 },
    3:  { intrigueDice: 3, intrigueDie: "d6",  flourishes: 4 },
    4:  { intrigueDice: 3, intrigueDie: "d6",  flourishes: 4 },
    5:  { intrigueDice: 3, intrigueDie: "d8",  flourishes: 4 },
    6:  { intrigueDice: 4, intrigueDie: "d8",  flourishes: 5 },
    7:  { intrigueDice: 4, intrigueDie: "d8",  flourishes: 5 },
    8:  { intrigueDice: 4, intrigueDie: "d8",  flourishes: 5 },
    9:  { intrigueDice: 5, intrigueDie: "d8",  flourishes: 6 },
    10: { intrigueDice: 5, intrigueDie: "d10", flourishes: 6 },
    11: { intrigueDice: 5, intrigueDie: "d10", flourishes: 6 },
    12: { intrigueDice: 5, intrigueDie: "d10", flourishes: 7 },
    13: { intrigueDice: 6, intrigueDie: "d10", flourishes: 7 },
    14: { intrigueDice: 6, intrigueDie: "d10", flourishes: 7 },
    15: { intrigueDice: 6, intrigueDie: "d10", flourishes: 8 },
    16: { intrigueDice: 6, intrigueDie: "d10", flourishes: 8 },
    17: { intrigueDice: 7, intrigueDie: "d10", flourishes: 8 },
    18: { intrigueDice: 7, intrigueDie: "d10", flourishes: 9 },
    19: { intrigueDice: 7, intrigueDie: "d12", flourishes: 9 },
    20: { intrigueDice: 8, intrigueDie: "d12", flourishes: 10 },
  },

  // ----------------------------------------
  // Shinobi: Ninja Tools (prepared, expended on use, refreshed on a long rest)
  // & Merciless Strike damage (Adventures in Rokugan, Table 2-4, p. 78). The
  // shinobi's system is Ninjutsu (Dexterity-based); they do NOT use Focus.
  // ----------------------------------------
  shinobi: {
    1:  { ninjaTools: 2, mercStrike: "1d4 (max 2d4)" },
    2:  { ninjaTools: 2, mercStrike: "1d4 (max 2d4)" },
    3:  { ninjaTools: 2, mercStrike: "2d4 (max 4d4)" },
    4:  { ninjaTools: 2, mercStrike: "2d4 (max 4d4)" },
    5:  { ninjaTools: 2, mercStrike: "2d4 (max 6d4)" },
    6:  { ninjaTools: 3, mercStrike: "2d4 (max 6d4)" },
    7:  { ninjaTools: 3, mercStrike: "2d6 (max 6d6)" },
    8:  { ninjaTools: 3, mercStrike: "2d6 (max 6d6)" },
    9:  { ninjaTools: 3, mercStrike: "3d4 (max 9d4)" },
    10: { ninjaTools: 3, mercStrike: "3d4 (max 9d4)" },
    11: { ninjaTools: 4, mercStrike: "2d8 (max 6d8)" },
    12: { ninjaTools: 4, mercStrike: "2d8 (max 6d8)" },
    13: { ninjaTools: 4, mercStrike: "3d6 (max 9d6)" },
    14: { ninjaTools: 4, mercStrike: "3d6 (max 9d6)" },
    15: { ninjaTools: 4, mercStrike: "3d6 (max 12d6)" },
    16: { ninjaTools: 5, mercStrike: "3d6 (max 12d6)" },
    17: { ninjaTools: 5, mercStrike: "3d8 (max 12d8)" },
    18: { ninjaTools: 5, mercStrike: "3d8 (max 12d8)" },
    19: { ninjaTools: 5, mercStrike: "4d6 (max 16d6)" },
    20: { ninjaTools: 5, mercStrike: "4d6 (max 16d6)" },
  },

  // ----------------------------------------
  // Ritualist: Favor Maximum & Invocations Known
  // Source: Table 2-5, Adventures in Rokugan p.88
  // ----------------------------------------
  ritualist: {
    1:  { favorMax: 3, tier1: 2,  tier2: 0, tier3: 0 },
    2:  { favorMax: 3, tier1: 3,  tier2: 0, tier3: 0 },
    3:  { favorMax: 3, tier1: 4,  tier2: 1, tier3: 0 },
    4:  { favorMax: 3, tier1: 5,  tier2: 1, tier3: 0 },
    5:  { favorMax: 4, tier1: 5,  tier2: 2, tier3: 0 },
    6:  { favorMax: 4, tier1: 5,  tier2: 2, tier3: 1 },
    7:  { favorMax: 4, tier1: 6,  tier2: 2, tier3: 1 },
    8:  { favorMax: 4, tier1: 6,  tier2: 3, tier3: 1 },
    9:  { favorMax: 5, tier1: 7,  tier2: 3, tier3: 1 },
    10: { favorMax: 5, tier1: 7,  tier2: 4, tier3: 1 },
    11: { favorMax: 5, tier1: 7,  tier2: 4, tier3: 2 },
    12: { favorMax: 5, tier1: 8,  tier2: 4, tier3: 2 },
    13: { favorMax: 6, tier1: 8,  tier2: 5, tier3: 2 },
    14: { favorMax: 6, tier1: 8,  tier2: 5, tier3: 3 },
    15: { favorMax: 6, tier1: 9,  tier2: 5, tier3: 3 },
    16: { favorMax: 6, tier1: 9,  tier2: 6, tier3: 3 },
    17: { favorMax: 7, tier1: 9,  tier2: 6, tier3: 4 },
    18: { favorMax: 7, tier1: 10, tier2: 6, tier3: 4 },
    19: { favorMax: 7, tier1: 10, tier2: 7, tier3: 4 },
    20: { favorMax: 7, tier1: 10, tier2: 7, tier3: 5 },
  },

  // ----------------------------------------
  // Pilgrim: Cultivated Potential (bonus Hit Dice)
  // Yin/Yang uses a 7-state track, no separate table needed.
  // Source: Table 2-7, Adventures in Rokugan p.99
  // ----------------------------------------
  pilgrim: {
    1:  { bonusHitDice: 1 },
    2:  { bonusHitDice: 1 },
    3:  { bonusHitDice: 2 },
    4:  { bonusHitDice: 2 },
    5:  { bonusHitDice: 3 },
    6:  { bonusHitDice: 3 },
    7:  { bonusHitDice: 4 },
    8:  { bonusHitDice: 4 },
    9:  { bonusHitDice: 5 },
    10: { bonusHitDice: 5 },
    11: { bonusHitDice: 6 },
    12: { bonusHitDice: 6 },
    13: { bonusHitDice: 7 },
    14: { bonusHitDice: 7 },
    15: { bonusHitDice: 8 },
    16: { bonusHitDice: 8 },
    17: { bonusHitDice: 9 },
    18: { bonusHitDice: 9 },
    19: { bonusHitDice: 10 },
    20: { bonusHitDice: 10 },
  },

  // ----------------------------------------
  // Yin/Yang Balance Track
  // States: -3 (Yin Apex) to +3 (Yang Apex)
  // Center (0) = Balanced/Centered
  // Source: Adventures in Rokugan p.100-101
  // ----------------------------------------
  yinYangStates: {
    "-3": {
      label: "ROKUGAN.YinYang.YinApex",
      yinValue: 3,
      yangValue: 0,
      passiveBonus: "ROKUGAN.YinYang.YinApexBonus",
    },
    "-2": {
      label: "ROKUGAN.YinYang.YinFlowing",
      yinValue: 2,
      yangValue: 0,
      passiveBonus: "ROKUGAN.YinYang.YinFlowingBonus",
    },
    "-1": {
      label: "ROKUGAN.YinYang.YinRising",
      yinValue: 1,
      yangValue: 0,
      passiveBonus: "ROKUGAN.YinYang.YinRisingBonus",
    },
    "0": {
      label: "ROKUGAN.YinYang.Balanced",
      yinValue: 2,
      yangValue: 2,
      passiveBonus: "ROKUGAN.YinYang.BalancedBonus",
    },
    "1": {
      label: "ROKUGAN.YinYang.YangFlowing",
      yinValue: 0,
      yangValue: 1,
      passiveBonus: "ROKUGAN.YinYang.YangFlowingBonus",
    },
    "2": {
      label: "ROKUGAN.YinYang.YangRising",
      yinValue: 0,
      yangValue: 2,
      passiveBonus: "ROKUGAN.YinYang.YangRisingBonus",
    },
    "3": {
      label: "ROKUGAN.YinYang.YangApex",
      yinValue: 0,
      yangValue: 3,
      passiveBonus: "ROKUGAN.YinYang.YangApexBonus",
    },
  },

  // Forms of Enlightenment eligibility by Yin/Yang state
  formsOfEnlightenment: {
    air:   { requiredStates: [-3, -2], element: "air" },
    earth: { requiredStates: [2, 3],   element: "earth" },
    fire:  { requiredStates: [2, 3],   element: "fire" },
    water: { requiredStates: [-3, -2], element: "water" },
    void:  { requiredStates: [-1, 0, 1], element: "void" },
  },

  // ----------------------------------------
  // Martial classes that use Focus
  // ----------------------------------------
  focusClasses: ["bushi", "duelist"],
  ninjaClasses: ["shinobi"],
  intrigueClasses: ["courtier"],

  // ----------------------------------------
  // Classes that use Favor
  // ----------------------------------------
  favorClasses: ["ritualist"],

  // ----------------------------------------
  // Classes that use Yin/Yang
  // ----------------------------------------
  yinYangClasses: ["pilgrim"],
};
