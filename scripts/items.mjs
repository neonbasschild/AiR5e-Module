/**
 * RokuganItems - Invocation & Technique item integration.
 *
 * Approach: rather than registering custom Item document subtypes (which the
 * dnd5e sheets would not know how to render or group), Rokugan magic data is
 * stored in item flags ("rokugan5e.magic") on standard dnd5e "spell" and
 * "feat" items. A configuration fieldset is injected into the item sheet, and
 * item usage is intercepted to automatically spend Focus / Favor.
 *
 * Magic data shape:
 * {
 *   kind: "none" | "invocation" | "technique" | "externalization",
 *   // invocation fields
 *   element: "any" | "air" | "earth" | "fire" | "water",
 *   tier: 0-3,
 *   favorCost: number,        // base favor cost
 *   // technique fields
 *   techniqueType: "strike" | "kata" | "kiho" | "ninjutsu",
 *   focusCost: number,        // minimum focus cost ("1+", "2+", etc.)
 *   mandatoryMovement: string,
 *   requiredWeapon: string,
 *   multitarget: boolean
 * }
 *
 * Usage automation: dnd5e 5.x routes all item usage through activities,
 * so spending hooks ride Hooks.on("dnd5e.postUseActivity").
 */

import { RokuganResources } from "./resources.mjs";
import { promptNumber } from "./compat.mjs";

export class RokuganItems {

  static FLAG_SCOPE = "rokugan5e";
  static FLAG_KEY = "magic";

  static DEFAULTS = {
    kind: "none",
    element: "any",
    tier: 1,
    favorCost: 1,
    techniqueType: "strike",
    focusCost: 1,
    mandatoryMovement: "",
    requiredWeapon: "",
    multitarget: false,
  };

  static getMagicData(item) {
    const data = item?.getFlag?.(RokuganItems.FLAG_SCOPE, RokuganItems.FLAG_KEY);
    if (!data) return null;
    return foundry.utils.mergeObject(foundry.utils.deepClone(RokuganItems.DEFAULTS), data);
  }

  // ----------------------------------------
  // Item Sheet Injection
  // ----------------------------------------

  /**
   * Inject the Rokugan magic configuration fieldset into an item sheet.
   * Works for both AppV1 (dnd5e 3.x) and AppV2 (dnd5e 4.x+/5.x) item sheets;
   * html is already normalized to jQuery by the caller.
   */
  static injectItemSheet(sheet, html) {
    const item = sheet.item ?? sheet.document;
    if (!item || item.documentName !== "Item") return;
    if (!["spell", "feat"].includes(item.type)) return;
    if (html.find(".rokugan-magic-config").length) return; // already injected

    const data = RokuganItems.getMagicData(item) ?? foundry.utils.deepClone(RokuganItems.DEFAULTS);
    const loc = (k) => game.i18n.localize(k);

    const elementOptions = ["any", "air", "earth", "fire", "water"].map(e =>
      `<option value="${e}" ${data.element === e ? "selected" : ""}>${loc(`ROKUGAN.Invocation.Element.${e.charAt(0).toUpperCase() + e.slice(1)}`)}</option>`
    ).join("");

    const tierOptions = [0, 1, 2, 3].map(t =>
      `<option value="${t}" ${Number(data.tier) === t ? "selected" : ""}>${loc(`ROKUGAN.Invocation.Tier.${t}`)}</option>`
    ).join("");

    const techniqueTypeOptions = ["strike", "kata", "kiho", "ninjutsu"].map(t =>
      `<option value="${t}" ${data.techniqueType === t ? "selected" : ""}>${loc(`ROKUGAN.Technique.Type.${t.charAt(0).toUpperCase() + t.slice(1)}`)}</option>`
    ).join("");

    const kindOptions = [
      ["none", "ROKUGAN.Item.KindNone"],
      ["invocation", "ROKUGAN.Item.KindInvocation"],
      ["technique", "ROKUGAN.Item.KindTechnique"],
      ["externalization", "ROKUGAN.Item.KindExternalization"],
    ].map(([v, key]) =>
      `<option value="${v}" ${data.kind === v ? "selected" : ""}>${loc(key)}</option>`
    ).join("");

    const invocationSection = data.kind === "invocation" ? `
      <div class="rokugan-magic-row">
        <div class="form-group">
          <label>${loc("ROKUGAN.Item.Element")}</label>
          <select name="element">${elementOptions}</select>
        </div>
        <div class="form-group">
          <label>${loc("ROKUGAN.Item.Tier")}</label>
          <select name="tier">${tierOptions}</select>
        </div>
        <div class="form-group">
          <label>${loc("ROKUGAN.Item.BaseFavorCost")}</label>
          <input type="number" name="favorCost" value="${data.favorCost}" min="0" max="10" step="1" />
        </div>
      </div>` : "";

    const techniqueSection = data.kind === "technique" ? `
      <div class="rokugan-magic-row">
        <div class="form-group">
          <label>${loc("ROKUGAN.Item.TechniqueType")}</label>
          <select name="techniqueType">${techniqueTypeOptions}</select>
        </div>
        <div class="form-group">
          <label>${loc("ROKUGAN.Item.FocusCost")}</label>
          <input type="number" name="focusCost" value="${data.focusCost}" min="0" max="10" step="1" />
        </div>
        <div class="form-group">
          <label class="checkbox">
            <input type="checkbox" name="multitarget" ${data.multitarget ? "checked" : ""} />
            ${loc("ROKUGAN.Item.Multitarget")}
          </label>
        </div>
      </div>
      <div class="rokugan-magic-row">
        <div class="form-group">
          <label>${loc("ROKUGAN.Item.MandatoryMovement")}</label>
          <input type="text" name="mandatoryMovement" value="${data.mandatoryMovement}" placeholder="None" />
        </div>
        <div class="form-group">
          <label>${loc("ROKUGAN.Item.RequiredWeapon")}</label>
          <input type="text" name="requiredWeapon" value="${data.requiredWeapon}" placeholder="Any weapon" />
        </div>
      </div>` : "";

    const externalizationSection = data.kind === "externalization" ? `
      <div class="rokugan-magic-row">
        <p class="rokugan-magic-hint">${loc("ROKUGAN.Item.ExternalizationHint")}</p>
      </div>` : "";

    const fieldset = $(`
      <fieldset class="rokugan-magic-config">
        <legend><i class="fas fa-torii-gate"></i> ${loc("ROKUGAN.Item.RokuganMagic")}</legend>
        <div class="rokugan-magic-row">
          <div class="form-group">
            <label>${loc("ROKUGAN.Item.Kind")}</label>
            <select name="kind">${kindOptions}</select>
          </div>
        </div>
        ${invocationSection}
        ${techniqueSection}
        ${externalizationSection}
      </fieldset>
    `);

    // Insertion target: details tab if present, otherwise sheet body / form
    let target = html.find(".tab[data-tab='details']").first();
    if (!target.length) target = html.find(".sheet-body").first();
    if (!target.length) target = html.find(".window-content form").first();
    if (!target.length) return;
    target.prepend(fieldset);

    // Wire changes → item flags (sheet re-renders, re-injecting with new kind)
    fieldset.find("[name]").on("change", async (ev) => {
      const el = ev.currentTarget;
      let value;
      if (el.type === "checkbox") value = el.checked;
      else if (el.type === "number" || el.name === "tier") value = Number(el.value);
      else value = el.value;

      const current = foundry.utils.mergeObject(
        foundry.utils.deepClone(RokuganItems.DEFAULTS),
        RokuganItems.getMagicData(item) ?? {}
      );
      current[el.name] = value;
      await item.setFlag(RokuganItems.FLAG_SCOPE, RokuganItems.FLAG_KEY, current);
      sheet.render(false);
    });
  }

  // ----------------------------------------
  // Usage Automation
  // ----------------------------------------

  /**
   * Register the item-use hook. dnd5e 5.x routes all item usage through
   * activities, firing "dnd5e.postUseActivity" after a successful use.
   * This fires on the client that initiated the use, so the user has
   * permission to update their own actor's flags.
   */
  static registerUsageHooks() {
    Hooks.on("dnd5e.postUseActivity", (activity) => {
      RokuganItems._handleUse(activity?.item);
    });
    console.log("Rokugan5E | Usage automation registered (dnd5e 5.x activities)");
  }

  /**
   * Handle the use of an item: spend Favor (invocations) or Focus (techniques).
   * Fires on the client that initiated the use, so the user has permission to
   * update their own actor's flags.
   */
  static async _handleUse(item) {
    if (!item?.actor) return;
    if (!game.settings.get("rokugan5e", "autoSpendResources")) return;

    const magic = RokuganItems.getMagicData(item);
    if (!magic || magic.kind === "none") return;

    const actor = item.actor;

    switch (magic.kind) {
      case "invocation":   return RokuganItems._handleInvocation(actor, item, magic);
      case "technique":    return RokuganItems._handleTechnique(actor, item, magic);
      case "externalization": return RokuganItems._handleExternalization(actor, item, magic);
    }
  }

  /**
   * Invocation: spend base favor cost, then optionally prompt for empowerment
   * favor. Bonus favor (from Resonances, Elemental Alignment, etc.) is spent
   * first on empowerments, per the AiR rules.
   */
  static async _handleInvocation(actor, item, magic) {
    const favorData = RokuganResources.getFavorData(actor);
    if (!favorData) return; // not a ritualist; let the GM handle edge cases

    // Base cost
    const baseCost = Math.max(0, Number(magic.favorCost ?? 0));
    if (baseCost > 0) {
      const ok = await RokuganResources.spendFavor(actor, baseCost, false);
      if (!ok) return; // insufficient favor; warning already shown
      await RokuganResources.chatSpendResource(actor, "favor", baseCost, item.name);
    }

    // Empowerment prompt
    if (!game.settings.get("rokugan5e", "promptEmpowerments")) return;
    const updated = RokuganResources.getFavorData(actor);
    const available = (updated?.current ?? 0) + (updated?.bonus ?? 0);
    if (available <= 0) return;

    const extra = await promptNumber({
      title: game.i18n.localize("ROKUGAN.Item.EmpowermentTitle"),
      label: game.i18n.format("ROKUGAN.Item.EmpowermentPrompt", { name: item.name }),
      min: 0,
      max: available,
      value: 0,
    });

    if (extra && extra > 0) {
      const ok = await RokuganResources.spendFavor(actor, extra, true);
      if (ok) {
        await RokuganResources.chatSpendResource(
          actor, "favor", extra,
          `${item.name} (${game.i18n.localize("ROKUGAN.Item.EmpowermentLabel")})`
        );
      }
    }
  }

  /**
   * Technique: spend at least the minimum focus cost; prompt for additional
   * focus if the technique allows variable spending ("1+", "2+" costs).
   */
  static async _handleTechnique(actor, item, magic) {
    const focusData = RokuganResources.getFocusData(actor);
    if (!focusData) return;

    const minCost = Math.max(0, Number(magic.focusCost ?? 0));
    if (minCost === 0) return;

    if (focusData.current < minCost) {
      ui.notifications.warn(game.i18n.format("ROKUGAN.Focus.InsufficientFocus", { amount: minCost }));
      return;
    }

    let spend = minCost;
    if (game.settings.get("rokugan5e", "promptEmpowerments") && focusData.current > minCost) {
      const chosen = await promptNumber({
        title: game.i18n.localize("ROKUGAN.Item.FocusSpendTitle"),
        label: game.i18n.format("ROKUGAN.Item.FocusSpendPrompt", { name: item.name, min: minCost }),
        min: minCost,
        max: focusData.current,
        value: minCost,
      });
      spend = chosen ?? minCost;
    }

    const ok = await RokuganResources.spendFocus(actor, spend);
    if (ok) await RokuganResources.chatSpendResource(actor, "focus", spend, item.name);
  }

  /**
   * Externalization (Pilgrim): post a reminder about Hit Dice costs and
   * Yin/Yang energy shifts. These vary per externalization, so they are not
   * auto-applied; the player adjusts the track on the resource panel.
   */
  static async _handleExternalization(actor, item, magic) {
    const yyData = RokuganResources.getYinYangData(actor);
    if (!yyData) return;
    await ChatMessage.create({
      content: `<div class="rokugan-chat-resource">${game.i18n.format("ROKUGAN.Item.ExternalizationUsed", { name: item.name })}</div>`,
      speaker: ChatMessage.getSpeaker({ actor }),
    });
  }
}
