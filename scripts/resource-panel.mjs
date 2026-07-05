/**
 * RokuganResourcePanel - Injects the Focus / Favor / Yin-Yang UI panel
 * into dnd5e character sheets.
 *
 * The panel is injected as a fixed-position overlay at the bottom of the
 * character sheet, or as a new tab section depending on the sheet version.
 *
 * Architecture:
 *  - renderActorSheet hook → call injectPanel()
 *  - injectPanel() builds HTML and wires up event handlers
 *  - All data reads via RokuganResources, all writes via RokuganResources
 */

import { RokuganResources } from "./resources.mjs";
import { ROKUGAN_TABLES } from "./tables.mjs";
import { toJQuery, getOpenSheetsFor, promptChoice } from "./compat.mjs";

export class RokuganResourcePanel {

  /** Dock expanded/collapsed state per actor id (session-scoped). */
  static _dockState = new Map();

  // ----------------------------------------
  // Entry point: called from hooks
  // ----------------------------------------

  static inject(sheet, html) {
    const actor = sheet.actor;
    if (!actor) return;

    const type = RokuganResources.getResourceType(actor);
    if (!type) return;

    // Remove any stale dock/panels (also clears pre-3.3.3 in-flow panels)
    html.find(".rokugan-resource-dock, .rokugan-resource-panel").remove();

    let panelHTML = "";

    switch (type) {
      case "focus":   panelHTML = RokuganResourcePanel._buildFocusPanel(actor); break;
      case "favor":   panelHTML = RokuganResourcePanel._buildFavorPanel(actor); break;
      case "yinyang": panelHTML = RokuganResourcePanel._buildYinYangPanel(actor); break;
      case "ninja":   panelHTML = RokuganResourcePanel._buildNinjaPanel(actor); break;
      case "intrigue": panelHTML = RokuganResourcePanel._buildIntriguePanel(actor); break;
    }

    if (!panelHTML) return;

    // v3.3.2 injected the panel into the sheet's own columns, but dnd5e
    // 5.x renders its parts/tab sections stacked in shared grid cells, so
    // ANY in-flow insertion point risks stacking the panel over (or under)
    // the active tab on every page - exactly the reported overlap. The
    // panel is now a self-contained DOCK appended to the application root
    // and absolutely positioned at the bottom of the sheet window:
    // position:absolute removes it from layout entirely, so it cannot
    // disturb the sheet grid or collide with tab content, and its
    // placement no longer depends on dnd5e's internal DOM at all.
    // Collapsed by default to a one-line bar with quick controls; expands
    // upward into the full panel on demand.
    const expanded = RokuganResourcePanel._dockState.get(actor.id) ?? false;
    const bar = RokuganResourcePanel._buildDockBar(actor, type, expanded);
    if (!bar) return;

    const dock = $(`
      <div class="rokugan-resource-dock rokugan-dock-${type}${expanded ? " expanded" : ""}">
        <div class="dock-bar">${bar}</div>
        <div class="dock-full">
          <filigree-box class="rokugan-resource-panel rokugan-panel-${type}">${panelHTML}</filigree-box>
        </div>
      </div>`);
    html.append(dock);

    RokuganResourcePanel._wireDock(html, actor, type);
    RokuganResourcePanel._wireEvents(html, actor, type);
  }

  // ----------------------------------------
  // Dock bar (collapsed one-line summary with quick controls)
  // ----------------------------------------

  static _buildDockBar(actor, type, expanded) {
    const chevron = expanded ? "fa-chevron-down" : "fa-chevron-up";
    const toggleLabel = game.i18n.localize(expanded ? "ROKUGAN.UI.Collapse" : "ROKUGAN.UI.Expand");
    const toggle = `<button type="button" class="dock-btn dock-toggle" aria-label="${toggleLabel}"
      data-tooltip="${toggleLabel}"><i class="fas ${chevron}"></i></button>`;

    if (type === "focus") {
      const d = RokuganResources.getFocusData(actor);
      if (!d) return "";
      return `${toggle}
        <i class="fas fa-wind dock-icon"></i>
        <span class="dock-label">${game.i18n.localize("ROKUGAN.Focus.Focus")}</span>
        <button type="button" class="dock-btn dock-dec" aria-label="-1"><i class="fas fa-minus"></i></button>
        <span class="dock-value">${d.current}</span><span class="dock-sep">/</span><span class="dock-max">${d.max}</span>
        <button type="button" class="dock-btn dock-inc" aria-label="+1"><i class="fas fa-plus"></i></button>`;
    }

    if (type === "favor") {
      const d = RokuganResources.getFavorData(actor);
      if (!d) return "";
      const bonus = d.bonus > 0 ? `<span class="dock-bonus">+${d.bonus}</span>` : "";
      return `${toggle}
        <i class="fas fa-pray dock-icon"></i>
        <span class="dock-label">${game.i18n.localize("ROKUGAN.Favor.Favor")}</span>
        <button type="button" class="dock-btn dock-dec" aria-label="-1"><i class="fas fa-minus"></i></button>
        <span class="dock-value">${d.current}</span><span class="dock-sep">/</span><span class="dock-max">${d.max}</span>${bonus}
        <button type="button" class="dock-btn dock-inc" aria-label="+1"><i class="fas fa-plus"></i></button>`;
    }

    if (type === "ninja") {
      const d = RokuganResources.getNinjaData(actor);
      if (!d) return "";
      return `${toggle}
        <i class="fas fa-user-ninja dock-icon"></i>
        <span class="dock-label">${game.i18n.localize("ROKUGAN.Ninja.NinjaTools")}</span>
        <button type="button" class="dock-btn dock-dec" aria-label="-1"><i class="fas fa-minus"></i></button>
        <span class="dock-value">${d.current}</span><span class="dock-sep">/</span><span class="dock-max">${d.max}</span>
        <button type="button" class="dock-btn dock-inc" aria-label="+1"><i class="fas fa-plus"></i></button>`;
    }

    if (type === "intrigue") {
      const d = RokuganResources.getIntrigueData(actor);
      if (!d) return "";
      return `${toggle}
        <i class="fas fa-comments dock-icon"></i>
        <span class="dock-label">${game.i18n.localize("ROKUGAN.Intrigue.IntrigueDice")}</span>
        <button type="button" class="dock-btn dock-dec" aria-label="-1"><i class="fas fa-minus"></i></button>
        <span class="dock-value">${d.current}</span><span class="dock-sep">/</span><span class="dock-max">${d.max}${d.die}</span>
        <button type="button" class="dock-btn dock-inc" aria-label="+1"><i class="fas fa-plus"></i></button>`;
    }

    const d = RokuganResources.getYinYangData(actor);
    if (!d) return "";
    return `${toggle}
      <i class="fas fa-yin-yang dock-icon"></i>
      <span class="dock-label">${game.i18n.localize("ROKUGAN.YinYang.YinYang")}</span>
      <button type="button" class="dock-btn dock-yin" aria-label="${game.i18n.localize("ROKUGAN.YinYang.ShiftYin")}"><i class="fas fa-moon"></i></button>
      <span class="dock-value dock-state">${game.i18n.localize(d.label)}</span>
      <button type="button" class="dock-btn dock-yang" aria-label="${game.i18n.localize("ROKUGAN.YinYang.ShiftYang")}"><i class="fas fa-sun"></i></button>`;
  }

  static _wireDock(html, actor, type) {
    const dock = html.find(".rokugan-resource-dock");

    dock.find(".dock-toggle").on("click", () => {
      const cur = RokuganResourcePanel._dockState.get(actor.id) ?? false;
      RokuganResourcePanel._dockState.set(actor.id, !cur);
      RokuganResourcePanel._refreshPanel(actor);
    });

    if (type === "focus") {
      dock.find(".dock-dec").on("click", async () => {
        const d = RokuganResources.getFocusData(actor);
        await RokuganResources.setFocus(actor, d.current - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
      dock.find(".dock-inc").on("click", async () => {
        const d = RokuganResources.getFocusData(actor);
        await RokuganResources.setFocus(actor, d.current + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
    } else if (type === "favor") {
      dock.find(".dock-dec").on("click", async () => {
        const d = RokuganResources.getFavorData(actor);
        await RokuganResources.setFavor(actor, d.current - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
      dock.find(".dock-inc").on("click", async () => {
        const d = RokuganResources.getFavorData(actor);
        await RokuganResources.setFavor(actor, d.current + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
    } else if (type === "ninja") {
      dock.find(".dock-dec").on("click", async () => {
        const d = RokuganResources.getNinjaData(actor);
        await RokuganResources.setNinja(actor, d.current - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
      dock.find(".dock-inc").on("click", async () => {
        const d = RokuganResources.getNinjaData(actor);
        await RokuganResources.setNinja(actor, d.current + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
    } else if (type === "intrigue") {
      dock.find(".dock-dec").on("click", async () => {
        const d = RokuganResources.getIntrigueData(actor);
        await RokuganResources.setIntrigue(actor, d.current - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
      dock.find(".dock-inc").on("click", async () => {
        const d = RokuganResources.getIntrigueData(actor);
        await RokuganResources.setIntrigue(actor, d.current + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
    } else if (type === "yinyang") {
      dock.find(".dock-yin").on("click", async () => {
        await RokuganResources.shiftYinYang(actor, -1);
        RokuganResourcePanel._refreshPanel(actor);
      });
      dock.find(".dock-yang").on("click", async () => {
        await RokuganResources.shiftYinYang(actor, +1);
        RokuganResourcePanel._refreshPanel(actor);
      });
    }
  }

  // ----------------------------------------
  // Focus Panel
  // ----------------------------------------

  static _buildFocusPanel(actor) {
    const data = RokuganResources.getFocusData(actor);
    if (!data) return "";

    const pips = Array.from({ length: data.max }, (_, i) => {
      const filled = i < data.current;
      return `<div class="focus-pip ${filled ? "filled" : ""}" data-index="${i}" title="${game.i18n.localize("ROKUGAN.Focus.Focus")} ${i + 1}/${data.max}"></div>`;
    }).join("");

    const className = game.i18n.localize(`ROKUGAN.Class.${data.className.charAt(0).toUpperCase() + data.className.slice(1)}`);

    return `
      <div class="rokugan-panel-inner rokugan-focus-inner">
        <h3 class="rokugan-panel-header icon">
          <i class="fas fa-wind"></i>
          <span class="roboto-upper panel-title">${game.i18n.localize("ROKUGAN.Focus.Focus")}</span>
          <span class="panel-subtitle">${className} ${game.i18n.localize("ROKUGAN.Focus.Level")} ${data.level}</span>
          <span class="panel-info">${game.i18n.localize("ROKUGAN.Focus.Techniques")}: ${data.techniques}</span>
        </h3>
        <div class="focus-pips-row">
          ${pips}
        </div>
        <div class="focus-controls">
          <button class="focus-btn focus-decrease" title="${game.i18n.localize("ROKUGAN.Focus.Spend")}">
            <i class="fas fa-minus"></i>
          </button>
          <span class="focus-value">${data.current}</span>
          <span class="focus-sep">/</span>
          <span class="focus-max">${data.max}</span>
          <button class="focus-btn focus-increase" title="${game.i18n.localize("ROKUGAN.Focus.Gain")}">
            <i class="fas fa-plus"></i>
          </button>
          <button class="focus-btn focus-reset" title="${game.i18n.localize("ROKUGAN.Focus.Reset")}">
            <i class="fas fa-redo"></i> ${game.i18n.localize("ROKUGAN.Focus.Reset")}
          </button>
          <button class="focus-btn focus-turn-end" title="${game.i18n.localize("ROKUGAN.Focus.TurnEnd")}">
            <i class="fas fa-hourglass-half"></i> +1 ${game.i18n.localize("ROKUGAN.Focus.TurnEnd")}
          </button>
        </div>
        <div class="focus-encounter-note">
          <i class="fas fa-info-circle"></i>
          ${game.i18n.localize("ROKUGAN.Focus.EncounterNote")}
        </div>
      </div>
    `;
  }

  // ----------------------------------------
  // Ninja Panel (Shinobi — Ninja Tools + Merciless Strike)
  // Reuses the focus-* visual classes; ninja tools are a prepared pool,
  // expended on use and refreshed on a long rest.
  // ----------------------------------------

  static _buildNinjaPanel(actor) {
    const data = RokuganResources.getNinjaData(actor);
    if (!data) return "";

    const pips = Array.from({ length: data.max }, (_, i) => {
      const filled = i < data.current;
      return `<div class="focus-pip ${filled ? "filled" : ""}" data-index="${i}" title="${game.i18n.localize("ROKUGAN.Ninja.NinjaTools")} ${i + 1}/${data.max}"></div>`;
    }).join("");

    const className = game.i18n.localize(`ROKUGAN.Class.${data.className.charAt(0).toUpperCase() + data.className.slice(1)}`);

    return `
      <div class="rokugan-panel-inner rokugan-ninja-inner">
        <h3 class="rokugan-panel-header icon">
          <i class="fas fa-user-ninja"></i>
          <span class="roboto-upper panel-title">${game.i18n.localize("ROKUGAN.Ninja.NinjaTools")}</span>
          <span class="panel-subtitle">${className} ${game.i18n.localize("ROKUGAN.Focus.Level")} ${data.level}</span>
          <span class="panel-info">${game.i18n.localize("ROKUGAN.Ninja.MercilessStrike")}: ${data.mercStrike}</span>
        </h3>
        <div class="focus-pips-row">
          ${pips}
        </div>
        <div class="focus-controls">
          <button class="focus-btn focus-decrease" title="${game.i18n.localize("ROKUGAN.Ninja.Use")}">
            <i class="fas fa-minus"></i>
          </button>
          <span class="focus-value">${data.current}</span>
          <span class="focus-sep">/</span>
          <span class="focus-max">${data.max}</span>
          <button class="focus-btn focus-increase" title="${game.i18n.localize("ROKUGAN.Ninja.Prepare")}">
            <i class="fas fa-plus"></i>
          </button>
          <button class="focus-btn focus-reset" title="${game.i18n.localize("ROKUGAN.Ninja.Refresh")}">
            <i class="fas fa-redo"></i> ${game.i18n.localize("ROKUGAN.Ninja.Refresh")}
          </button>
        </div>
        <div class="focus-encounter-note">
          <i class="fas fa-info-circle"></i>
          ${game.i18n.localize("ROKUGAN.Ninja.LongRestNote")}
        </div>
      </div>
    `;
  }

  // ----------------------------------------
  // Intrigue Panel (Courtier — Intrigue Dice + Flourishes Known)
  // Intrigue dice are a spendable pool of a given die size; regain half on a
  // short rest and all on a long rest. Reuses the focus-* visual classes.
  // ----------------------------------------

  static _buildIntriguePanel(actor) {
    const data = RokuganResources.getIntrigueData(actor);
    if (!data) return "";

    const pips = Array.from({ length: data.max }, (_, i) => {
      const filled = i < data.current;
      return `<div class="focus-pip ${filled ? "filled" : ""}" data-index="${i}" title="${game.i18n.localize("ROKUGAN.Intrigue.IntrigueDie")} (${data.die}) ${i + 1}/${data.max}"></div>`;
    }).join("");

    const className = game.i18n.localize(`ROKUGAN.Class.${data.className.charAt(0).toUpperCase() + data.className.slice(1)}`);

    return `
      <div class="rokugan-panel-inner rokugan-intrigue-inner">
        <h3 class="rokugan-panel-header icon">
          <i class="fas fa-comments"></i>
          <span class="roboto-upper panel-title">${game.i18n.localize("ROKUGAN.Intrigue.IntrigueDice")} (${data.die})</span>
          <span class="panel-subtitle">${className} ${game.i18n.localize("ROKUGAN.Focus.Level")} ${data.level}</span>
          <span class="panel-info">${game.i18n.localize("ROKUGAN.Intrigue.Flourishes")}: ${data.flourishes}</span>
        </h3>
        <div class="focus-pips-row">
          ${pips}
        </div>
        <div class="focus-controls">
          <button class="focus-btn focus-decrease" title="${game.i18n.localize("ROKUGAN.Intrigue.Spend")}">
            <i class="fas fa-minus"></i>
          </button>
          <span class="focus-value">${data.current}</span>
          <span class="focus-sep">/</span>
          <span class="focus-max">${data.max}</span>
          <button class="focus-btn focus-increase" title="${game.i18n.localize("ROKUGAN.Intrigue.Gain")}">
            <i class="fas fa-plus"></i>
          </button>
          <button class="focus-btn intrigue-short" title="${game.i18n.localize("ROKUGAN.Intrigue.ShortRest")}">
            <i class="fas fa-coffee"></i> ${game.i18n.localize("ROKUGAN.Intrigue.ShortRestShort")}
          </button>
          <button class="focus-btn intrigue-long" title="${game.i18n.localize("ROKUGAN.Intrigue.LongRest")}">
            <i class="fas fa-bed"></i> ${game.i18n.localize("ROKUGAN.Intrigue.LongRestShort")}
          </button>
        </div>
        <div class="focus-encounter-note">
          <i class="fas fa-info-circle"></i>
          ${game.i18n.localize("ROKUGAN.Intrigue.RecoveryNote")}
        </div>
      </div>
    `;
  }

  // ----------------------------------------
  // Favor Panel
  // ----------------------------------------

  static _buildFavorPanel(actor) {
    const data = RokuganResources.getFavorData(actor);
    if (!data) return "";

    const pips = Array.from({ length: data.max }, (_, i) => {
      const filled = i < data.current;
      return `<div class="favor-pip ${filled ? "filled" : ""}" data-index="${i}" title="${game.i18n.localize("ROKUGAN.Favor.Favor")} ${i + 1}/${data.max}"></div>`;
    }).join("");

    const bonusPips = data.bonus > 0
      ? Array.from({ length: data.bonus }, (_, i) =>
          `<div class="favor-pip bonus" title="${game.i18n.localize("ROKUGAN.Favor.BonusFavor")}"></div>`
        ).join("")
      : "";

    return `
      <div class="rokugan-panel-inner rokugan-favor-inner">
        <h3 class="rokugan-panel-header icon">
          <i class="fas fa-pray"></i>
          <span class="roboto-upper panel-title">${game.i18n.localize("ROKUGAN.Favor.Favor")}</span>
          <span class="panel-subtitle">${game.i18n.localize("ROKUGAN.Class.Ritualist")} ${game.i18n.localize("ROKUGAN.Focus.Level")} ${data.level}</span>
          <span class="panel-info">
            ${game.i18n.localize("ROKUGAN.Favor.InvocationTiers")}: T1×${data.tier1} T2×${data.tier2} T3×${data.tier3}
          </span>
        </h3>

        <div class="favor-section">
          <label class="favor-label">${game.i18n.localize("ROKUGAN.Favor.StandardFavor")}</label>
          <div class="favor-pips-row">${pips}</div>
        </div>

        ${data.bonus > 0 ? `
        <div class="favor-section">
          <label class="favor-label">${game.i18n.localize("ROKUGAN.Favor.BonusFavor")}
            <span class="favor-hint">(${game.i18n.localize("ROKUGAN.Favor.BonusFavorHint")})</span>
          </label>
          <div class="favor-pips-row">${bonusPips}</div>
        </div>
        ` : ""}

        <div class="favor-controls">
          <button class="favor-btn favor-decrease" title="${game.i18n.localize("ROKUGAN.Favor.Spend")}">
            <i class="fas fa-minus"></i>
          </button>
          <span class="favor-value">${data.current}</span>
          <span class="favor-sep">/</span>
          <span class="favor-max">${data.max}</span>
          <button class="favor-btn favor-increase" title="${game.i18n.localize("ROKUGAN.Favor.Gain")}">
            <i class="fas fa-plus"></i>
          </button>
          <button class="favor-btn favor-restore" title="${game.i18n.localize("ROKUGAN.Favor.Restore")}">
            <i class="fas fa-sun"></i> ${game.i18n.localize("ROKUGAN.Favor.Restore")}
          </button>
        </div>

        <div class="favor-bonus-controls">
          <label>${game.i18n.localize("ROKUGAN.Favor.BonusFavor")}:</label>
          <button class="favor-btn bonus-decrease" title="${game.i18n.localize("ROKUGAN.Favor.SpendBonus")}">
            <i class="fas fa-minus"></i>
          </button>
          <span class="bonus-favor-value">${data.bonus}</span>
          <button class="favor-btn bonus-increase" title="${game.i18n.localize("ROKUGAN.Favor.GainBonus")}">
            <i class="fas fa-plus"></i>
          </button>
        </div>

        <div class="favor-rest-note">
          <i class="fas fa-info-circle"></i>
          ${game.i18n.localize("ROKUGAN.Favor.RestNote")}
        </div>
      </div>
    `;
  }

  // ----------------------------------------
  // Yin/Yang Panel
  // ----------------------------------------

  static _buildYinYangPanel(actor) {
    const data = RokuganResources.getYinYangData(actor);
    if (!data) return "";

    const states = ROKUGAN_TABLES.yinYangStates;
    const trackSlots = Object.entries(states)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([stateKey, stateData]) => {
        const stateNum = Number(stateKey);
        const active = stateNum === data.state;
        const side = stateNum < 0 ? "yin" : stateNum > 0 ? "yang" : "balanced";
        return `
          <div class="yin-yang-slot ${side} ${active ? "active" : ""}"
               data-state="${stateKey}"
               title="${game.i18n.localize(stateData.label)}">
            <span class="slot-label">${game.i18n.localize(stateData.label)}</span>
          </div>
        `;
      }).join("");

    // Determine available Forms of Enlightenment
    const availableForms = Object.entries(ROKUGAN_TABLES.formsOfEnlightenment)
      .filter(([, formData]) => formData.requiredStates.includes(data.state))
      .map(([formKey]) => formKey);

    const formButtons = availableForms.length > 0
      ? availableForms.map(form => {
          const isActive = data.activeForm === form;
          return `<button class="yin-yang-form-btn ${isActive ? "active" : ""}"
                          data-form="${form}"
                          title="${game.i18n.localize(`ROKUGAN.YinYang.Form.${form.charAt(0).toUpperCase() + form.slice(1)}`)}"
                  >
                    ${game.i18n.localize(`ROKUGAN.YinYang.Form.${form.charAt(0).toUpperCase() + form.slice(1)}`)}
                  </button>`;
        }).join("")
      : `<span class="no-forms">${game.i18n.localize("ROKUGAN.YinYang.NoFormsAvailable")}</span>`;

    const currentStateData = states[String(data.state)];

    return `
      <div class="rokugan-panel-inner rokugan-yinyang-inner">
        <h3 class="rokugan-panel-header icon">
          <i class="fas fa-yin-yang"></i>
          <span class="roboto-upper panel-title">${game.i18n.localize("ROKUGAN.YinYang.YinYang")}</span>
          <span class="panel-subtitle">${game.i18n.localize("ROKUGAN.Class.Pilgrim")} ${game.i18n.localize("ROKUGAN.Focus.Level")} ${data.level}</span>
          <span class="panel-info">${game.i18n.localize("ROKUGAN.YinYang.BonusHitDice")}: ${data.bonusHitDice}</span>
        </h3>

        <div class="yin-yang-track">
          <div class="track-pole yin-pole">
            <i class="fas fa-moon"></i>
            <span>${game.i18n.localize("ROKUGAN.YinYang.Yin")}</span>
          </div>
          <div class="track-slots">
            ${trackSlots}
          </div>
          <div class="track-pole yang-pole">
            <i class="fas fa-sun"></i>
            <span>${game.i18n.localize("ROKUGAN.YinYang.Yang")}</span>
          </div>
        </div>

        <div class="yin-yang-state-display">
          <strong>${game.i18n.localize("ROKUGAN.YinYang.CurrentState")}:</strong>
          <span class="current-state-label">${game.i18n.localize(currentStateData?.label ?? "ROKUGAN.YinYang.Balanced")}</span>
        </div>

        <div class="yin-yang-controls">
          <button class="yy-btn yin-shift" title="${game.i18n.localize("ROKUGAN.YinYang.ShiftYin")}">
            <i class="fas fa-moon"></i> ${game.i18n.localize("ROKUGAN.YinYang.ShiftYin")}
          </button>
          <button class="yy-btn battle-meditation" title="${game.i18n.localize("ROKUGAN.YinYang.BattleMeditation")}">
            <i class="fas fa-yin-yang"></i> ${game.i18n.localize("ROKUGAN.YinYang.BattleMeditation")}
          </button>
          <button class="yy-btn yang-shift" title="${game.i18n.localize("ROKUGAN.YinYang.ShiftYang")}">
            <i class="fas fa-sun"></i> ${game.i18n.localize("ROKUGAN.YinYang.ShiftYang")}
          </button>
          <button class="yy-btn reset-balanced" title="${game.i18n.localize("ROKUGAN.YinYang.ResetBalanced")}">
            <i class="fas fa-redo"></i> ${game.i18n.localize("ROKUGAN.YinYang.ResetBalanced")}
          </button>
        </div>

        ${data.level >= 7 ? `
        <div class="yin-yang-forms">
          <label>${game.i18n.localize("ROKUGAN.YinYang.FormsOfEnlightenment")}:</label>
          <div class="form-buttons">
            ${formButtons}
            ${data.activeForm ? `<button class="yy-btn exit-form">${game.i18n.localize("ROKUGAN.YinYang.ExitForm")}</button>` : ""}
          </div>
        </div>
        ` : ""}
      </div>
    `;
  }

  // ----------------------------------------
  // Wire up event handlers
  // ----------------------------------------

  static _wireEvents(html, actor, type) {
    const panel = html.find(".rokugan-resource-panel");

    if (type === "focus") {
      // Pip clicks (direct set)
      panel.find(".focus-pip").on("click", async (ev) => {
        const data = RokuganResources.getFocusData(actor);
        const index = Number(ev.currentTarget.dataset.index);
        const newVal = data.current === index + 1 ? index : index + 1;
        await RokuganResources.setFocus(actor, newVal);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".focus-decrease").on("click", async () => {
        const data = RokuganResources.getFocusData(actor);
        await RokuganResources.setFocus(actor, data.current - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".focus-increase").on("click", async () => {
        const data = RokuganResources.getFocusData(actor);
        await RokuganResources.setFocus(actor, data.current + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".focus-reset").on("click", async () => {
        await RokuganResources.setFocus(actor, 0);
        RokuganResourcePanel._refreshPanel(actor);
        ui.notifications.info(game.i18n.localize("ROKUGAN.Focus.ResetNotif"));
      });

      panel.find(".focus-turn-end").on("click", async () => {
        const data = RokuganResources.getFocusData(actor);
        const newVal = Math.min(data.current + 1, data.max);
        await RokuganResources.setFocus(actor, newVal);
        RokuganResourcePanel._refreshPanel(actor);
        ChatMessage.create({
          content: game.i18n.format("ROKUGAN.Focus.GainedOnTurnEnd", { total: newVal }),
          speaker: ChatMessage.getSpeaker({ actor }),
        });
      });
    }

    if (type === "ninja") {
      panel.find(".focus-pip").on("click", async (ev) => {
        const data = RokuganResources.getNinjaData(actor);
        const index = Number(ev.currentTarget.dataset.index);
        const newVal = data.current === index + 1 ? index : index + 1;
        await RokuganResources.setNinja(actor, newVal);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".focus-decrease").on("click", async () => {
        const data = RokuganResources.getNinjaData(actor);
        await RokuganResources.setNinja(actor, data.current - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".focus-increase").on("click", async () => {
        const data = RokuganResources.getNinjaData(actor);
        await RokuganResources.setNinja(actor, data.current + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      // "Refresh" = prepare a full set of ninja tools (as after a long rest).
      panel.find(".focus-reset").on("click", async () => {
        const data = RokuganResources.getNinjaData(actor);
        await RokuganResources.setNinja(actor, data.max);
        RokuganResourcePanel._refreshPanel(actor);
        ui.notifications.info(game.i18n.localize("ROKUGAN.Ninja.RefreshNotif"));
      });
    }

    if (type === "intrigue") {
      panel.find(".focus-pip").on("click", async (ev) => {
        const data = RokuganResources.getIntrigueData(actor);
        const index = Number(ev.currentTarget.dataset.index);
        const newVal = data.current === index + 1 ? index : index + 1;
        await RokuganResources.setIntrigue(actor, newVal);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".focus-decrease").on("click", async () => {
        const data = RokuganResources.getIntrigueData(actor);
        await RokuganResources.setIntrigue(actor, data.current - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".focus-increase").on("click", async () => {
        const data = RokuganResources.getIntrigueData(actor);
        await RokuganResources.setIntrigue(actor, data.current + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      // Short rest: regain half of expended dice (rounded down).
      panel.find(".intrigue-short").on("click", async () => {
        const data = RokuganResources.getIntrigueData(actor);
        const regained = Math.floor((data.max - data.current) / 2);
        await RokuganResources.setIntrigue(actor, data.current + regained);
        RokuganResourcePanel._refreshPanel(actor);
      });

      // Long rest: regain all intrigue dice.
      panel.find(".intrigue-long").on("click", async () => {
        const data = RokuganResources.getIntrigueData(actor);
        await RokuganResources.setIntrigue(actor, data.max);
        RokuganResourcePanel._refreshPanel(actor);
      });
    }

    if (type === "favor") {
      panel.find(".favor-pip").on("click", async (ev) => {
        const data = RokuganResources.getFavorData(actor);
        const index = Number(ev.currentTarget.dataset.index);
        const newVal = data.current === index + 1 ? index : index + 1;
        await RokuganResources.setFavor(actor, newVal);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".favor-decrease").on("click", async () => {
        const data = RokuganResources.getFavorData(actor);
        await RokuganResources.setFavor(actor, data.current - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".favor-increase").on("click", async () => {
        const data = RokuganResources.getFavorData(actor);
        await RokuganResources.setFavor(actor, data.current + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".favor-restore").on("click", async () => {
        const data = RokuganResources.getFavorData(actor);
        await RokuganResources.setFavor(actor, data.max, 0);
        RokuganResourcePanel._refreshPanel(actor);
        ui.notifications.info(game.i18n.localize("ROKUGAN.Favor.RestoredNotif"));
      });

      panel.find(".bonus-decrease").on("click", async () => {
        const data = RokuganResources.getFavorData(actor);
        await RokuganResources.setBonusFavor(actor, data.bonus - 1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".bonus-increase").on("click", async () => {
        const data = RokuganResources.getFavorData(actor);
        await RokuganResources.setBonusFavor(actor, data.bonus + 1);
        RokuganResourcePanel._refreshPanel(actor);
      });
    }

    if (type === "yinyang") {
      // Slot clicks (direct state set)
      panel.find(".yin-yang-slot").on("click", async (ev) => {
        const state = Number(ev.currentTarget.dataset.state);
        await RokuganResources.setYinYang(actor, state);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".yin-shift").on("click", async () => {
        await RokuganResources.shiftYinYang(actor, -1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".yang-shift").on("click", async () => {
        await RokuganResources.shiftYinYang(actor, +1);
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".battle-meditation").on("click", async () => {
        // Battle Meditation (2nd level feature): bonus action to move 1 step either way
        // Direction is chosen by the user via a quick dialog
        const choice = await RokuganResourcePanel._battleMeditationDialog();
        if (choice !== null) {
          await RokuganResources.shiftYinYang(actor, choice);
          RokuganResourcePanel._refreshPanel(actor);
          ChatMessage.create({
            content: game.i18n.format("ROKUGAN.YinYang.BattleMeditationUsed", {
              direction: choice < 0
                ? game.i18n.localize("ROKUGAN.YinYang.Yin")
                : game.i18n.localize("ROKUGAN.YinYang.Yang")
            }),
            speaker: ChatMessage.getSpeaker({ actor }),
          });
        }
      });

      panel.find(".reset-balanced").on("click", async () => {
        await RokuganResources.setYinYang(actor, 0, null);
        RokuganResourcePanel._refreshPanel(actor);
      });

      // Form of Enlightenment buttons
      panel.find(".yin-yang-form-btn").on("click", async (ev) => {
        const form = ev.currentTarget.dataset.form;
        const data = RokuganResources.getYinYangData(actor);

        // Toggle: clicking active form exits it
        if (data.activeForm === form) {
          await RokuganResources.setActiveForm(actor, null);
          ChatMessage.create({
            content: game.i18n.format("ROKUGAN.YinYang.ExitedForm", {
              form: game.i18n.localize(`ROKUGAN.YinYang.Form.${form.charAt(0).toUpperCase() + form.slice(1)}`)
            }),
            speaker: ChatMessage.getSpeaker({ actor }),
          });
        } else {
          await RokuganResources.setActiveForm(actor, form);
          ChatMessage.create({
            content: game.i18n.format("ROKUGAN.YinYang.EnteredForm", {
              form: game.i18n.localize(`ROKUGAN.YinYang.Form.${form.charAt(0).toUpperCase() + form.slice(1)}`)
            }),
            speaker: ChatMessage.getSpeaker({ actor }),
          });
        }
        RokuganResourcePanel._refreshPanel(actor);
      });

      panel.find(".exit-form").on("click", async () => {
        const data = RokuganResources.getYinYangData(actor);
        const formName = data.activeForm
          ? game.i18n.localize(`ROKUGAN.YinYang.Form.${data.activeForm.charAt(0).toUpperCase() + data.activeForm.slice(1)}`)
          : "";
        await RokuganResources.setActiveForm(actor, null);
        if (formName) {
          ChatMessage.create({
            content: game.i18n.format("ROKUGAN.YinYang.ExitedForm", { form: formName }),
            speaker: ChatMessage.getSpeaker({ actor }),
          });
        }
        RokuganResourcePanel._refreshPanel(actor);
      });
    }
  }

  // ----------------------------------------
  // Refresh panel without full sheet re-render
  // ----------------------------------------
  static _refreshPanel(actor) {
    // Re-inject the panel into every open sheet for this actor.
    // getOpenSheetsFor scans foundry.applications.instances, where all
    // ApplicationV2 sheets (every dnd5e 5.x sheet) are tracked.
    for (const app of getOpenSheetsFor(actor)) {
      RokuganResourcePanel.inject(app, toJQuery(app.element));
    }
  }

  // ----------------------------------------
  // Battle Meditation dialog
  // ----------------------------------------
  static async _battleMeditationDialog() {
    // Uses DialogV2 on v12/v13 with a legacy fallback via compat.mjs
    return promptChoice({
      title: game.i18n.localize("ROKUGAN.YinYang.BattleMeditation"),
      content: `<p>${game.i18n.localize("ROKUGAN.YinYang.BattleMeditationPrompt")}</p>`,
      choices: [
        {
          action: "yin",
          label: game.i18n.localize("ROKUGAN.YinYang.ShiftYin"),
          icon: "fas fa-moon",
          value: -1,
        },
        {
          action: "yang",
          label: game.i18n.localize("ROKUGAN.YinYang.ShiftYang"),
          icon: "fas fa-sun",
          value: +1,
        },
      ],
    });
  }
}
