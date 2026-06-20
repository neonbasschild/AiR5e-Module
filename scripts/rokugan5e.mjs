/**
 * Adventures in Rokugan 5E - Foundry VTT Module
 * Requires Foundry VTT v13+ with dnd5e 5.x (verified against release-5.3.3).
 *
 * This module adapts the dnd5e system for play with Adventures in Rokugan:
 *   - Renames/replaces class lists, species/races, backgrounds
 *   - Replaces spell terminology with Invocation/Technique terminology
 *   - Implements the AiR magic system mechanically:
 *       Focus (martial classes) - per-encounter pool, resets at combat start/end
 *       Favor (Ritualist) - long-rest pool with bonus favor for empowerments
 *       Yin/Yang (Pilgrim) - 7-state balance track with Forms of Enlightenment
 *   - Automatic resource spending when Invocations/Techniques are used
 *   - Rokugan tab (Clan, Honor/Glory/Status, Shadow, Motivations)
 *
 * dnd5e 5.x integration notes:
 *   - Sheet hooks target the 5.x ApplicationV2 classes by name:
 *     renderCharacterActorSheet / renderNPCActorSheet / renderItemSheet5e
 *   - Resource panels render inside dnd5e's <filigree-box> custom element
 *     and use the system's CSS custom properties to match the 5.x sheets
 *   - Item usage automation rides the activities pipeline
 *     (dnd5e.postUseActivity)
 */

import { RokuganConfig } from "./config.mjs";
import { RokuganHooks } from "./hooks.mjs";
import { RokuganSheets } from "./sheets.mjs";
import { RokuganResources } from "./resources.mjs";
import { RokuganItems } from "./items.mjs";
import { RokuganPacks } from "./packs.mjs";

Hooks.once("init", () => {
  console.log("Rokugan5E | Initializing Adventures in Rokugan module");

  // Settings names/hints are localization keys; Foundry localizes them
  // automatically, which avoids calling game.i18n before i18nInit.
  game.settings.register("rokugan5e", "useRokuganTerminology", {
    name: "ROKUGAN.Settings.UseRokuganTerminology",
    hint: "ROKUGAN.Settings.UseRokuganTerminologyHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => foundry.utils.debouncedReload
      ? foundry.utils.debouncedReload()
      : window.location.reload()
  });

  game.settings.register("rokugan5e", "hideNonRokuganContent", {
    name: "ROKUGAN.Settings.HideNonRokuganContent",
    hint: "ROKUGAN.Settings.HideNonRokuganContentHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => foundry.utils.debouncedReload
      ? foundry.utils.debouncedReload()
      : window.location.reload()
  });

  game.settings.register("rokugan5e", "currencyMode", {
    name: "ROKUGAN.Settings.CurrencyMode",
    hint: "ROKUGAN.Settings.CurrencyModeHint",
    scope: "world",
    config: true,
    type: String,
    default: "standard",
    choices: {
      standard: "ROKUGAN.Settings.CurrencyStandard",
      rokugan: "ROKUGAN.Settings.CurrencyRokugan",
      both: "ROKUGAN.Settings.CurrencyBoth"
    },
    onChange: () => foundry.utils.debouncedReload
      ? foundry.utils.debouncedReload()
      : window.location.reload()
  });

  game.settings.register("rokugan5e", "autoSpendResources", {
    name: "ROKUGAN.Settings.AutoSpendResources",
    hint: "ROKUGAN.Settings.AutoSpendResourcesHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register("rokugan5e", "promptEmpowerments", {
    name: "ROKUGAN.Settings.PromptEmpowerments",
    hint: "ROKUGAN.Settings.PromptEmpowermentsHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register("rokugan5e", "automateCombatFocus", {
    name: "ROKUGAN.Settings.AutomateCombatFocus",
    hint: "ROKUGAN.Settings.AutomateCombatFocusHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register("rokugan5e", "l5rSheetTheme", {
    name: "ROKUGAN.Settings.L5RSheetTheme",
    hint: "ROKUGAN.Settings.L5RSheetThemeHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => {
      // Re-render open sheets so the theme class is applied/removed live
      for (const app of foundry.applications.instances.values()) {
        const doc = app.document ?? app.actor ?? app.item;
        if (doc?.documentName === "Actor" || doc?.documentName === "Item") app.render();
      }
    }
  });

  game.settings.register("rokugan5e", "packsSeededVersion", {
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  // Apply Rokugan config changes to CONFIG.DND5E
  RokuganConfig.apply();

  // Register the Settings-sidebar copyright hook now (at init) so it is
  // listening before the sidebar first renders during startup.
  RokuganHooks.registerCopyrightNotice();
});

Hooks.once("i18nInit", () => {
  // Languages are registered here (not at init) so their labels can be
  // localized; registering at init left them showing as raw keys.
  RokuganConfig.registerLanguages();
});

Hooks.once("setup", () => {
  RokuganSheets.register();
  // Re-assert weapon/tool proficiency IDs after the dnd5e system's own setup,
  // so specific-weapon/tool proficiency grants resolve during character builds.
  RokuganConfig.registerProficiencies();
});

Hooks.once("ready", () => {
  console.log("Rokugan5E | Ready");

  // Sheet rendering hooks (AppV1 + AppV2, normalized in hooks.mjs)
  RokuganHooks.onReady();

  // Item usage automation (Favor/Focus spending)
  RokuganItems.registerUsageHooks();

  // Seed the Adventures in Rokugan compendium packs (GM, first load only),
  // then register weapon/tool proficiencies against the LIVE pack index so the
  // proficiency UUIDs are guaranteed to resolve to the seeded items.
  Promise.resolve(RokuganPacks.seed()).then(() => {
    RokuganConfig.registerProficienciesFromPack();
  });

  // ----------------------------------------
  // Combat automation: Focus lifecycle
  // These hooks fire on every client; only the active GM executes the
  // updates to avoid duplicate writes and permission errors.
  // ----------------------------------------

  Hooks.on("combatStart", (combat) => {
    if (!game.settings.get("rokugan5e", "automateCombatFocus")) return;
    if (!game.users.activeGM?.isSelf) return;
    RokuganResources.onCombatStart(combat);
  });

  Hooks.on("deleteCombat", (combat) => {
    if (!game.settings.get("rokugan5e", "automateCombatFocus")) return;
    if (!game.users.activeGM?.isSelf) return;
    RokuganResources.onCombatEnd(combat);
  });

  // combatTurnChange (v12+): prior = the turn that just ended.
  // Implements "You gain 1 focus point at the end of each of your turns."
  Hooks.on("combatTurnChange", (combat, prior, current) => {
    if (!game.settings.get("rokugan5e", "automateCombatFocus")) return;
    if (!game.users.activeGM?.isSelf) return;
    const priorCombatant = combat.combatants.get(prior?.combatantId);
    if (priorCombatant) RokuganResources.onTurnEnd(combat, priorCombatant);
  });

  // ----------------------------------------
  // Rest automation: Favor restoration on long rest
  // dnd5e 3.x result: { longRest: true }; dnd5e 4.x+: { type: "long" }
  // ----------------------------------------

  Hooks.on("dnd5e.restCompleted", (actor, result) => {
    const isLong = result?.type === "long" || result?.longRest === true;
    if (isLong) RokuganResources.onLongRest(actor);
  });
});
