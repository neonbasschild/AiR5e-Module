/**
 * RokuganCompat - Helpers for Foundry VTT v13+ with dnd5e 5.x.
 *
 * All dnd5e 5.x sheets (CharacterActorSheet, NPCActorSheet, ItemSheet5e) are
 * ApplicationV2, so render hooks pass a raw HTMLElement. jQuery is still
 * bundled in v13 and used internally for convenience.
 */

/**
 * Normalize a render-hook html argument to a jQuery object.
 * AppV2 hooks pass HTMLElement; jQuery may appear from third-party callers.
 * @param {HTMLElement|HTMLElement[]|jQuery} html
 * @returns {jQuery}
 */
export function toJQuery(html) {
  if (html instanceof jQuery) return html;
  if (html instanceof HTMLElement) return $(html);
  if (Array.isArray(html) && html[0] instanceof HTMLElement) return $(html[0]);
  return $(html);
}

/**
 * Get the document behind a sheet application.
 * @param {ApplicationV2} app
 * @returns {foundry.abstract.Document|null}
 */
export function getSheetDocument(app) {
  return app?.document ?? app?.actor ?? app?.item ?? null;
}

/**
 * Find all open sheet applications rendering a given actor.
 * AppV2 instances are tracked in foundry.applications.instances.
 * @param {Actor} actor
 * @returns {ApplicationV2[]}
 */
export function getOpenSheetsFor(actor) {
  const apps = [];
  for (const app of foundry.applications.instances.values()) {
    const doc = getSheetDocument(app);
    if (doc?.documentName === "Actor" && doc.id === actor.id && app.rendered) apps.push(app);
  }
  return apps;
}

/**
 * Prompt the user for a number via DialogV2.
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.label - HTML prompt text
 * @param {number} opts.min
 * @param {number} opts.max
 * @param {number} opts.value - default value
 * @returns {Promise<number|null>} the chosen number, or null on cancel/close
 */
export async function promptNumber({ title, label, min = 0, max = 99, value = 0 }) {
  const content = `
    <div class="form-group rokugan-number-prompt">
      <label>${label}</label>
      <input type="number" name="amount" min="${min}" max="${max}" value="${value}" step="1" autofocus />
    </div>`;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { title },
    content,
    rejectClose: false,
    buttons: [
      {
        action: "ok",
        label: game.i18n.localize("ROKUGAN.UI.Confirm"),
        icon: "fas fa-check",
        default: true,
        callback: (event, button) => {
          const raw = Number(button.form.elements.amount?.value ?? NaN);
          if (Number.isNaN(raw)) return null;
          return Math.max(min, Math.min(max, raw));
        }
      },
      {
        action: "cancel",
        label: game.i18n.localize("ROKUGAN.UI.Cancel"),
        icon: "fas fa-times",
        callback: () => null
      }
    ]
  });
  return (typeof result === "number") ? result : null;
}

/**
 * Prompt the user to choose between options via DialogV2.
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.content - HTML content
 * @param {Array<{action: string, label: string, icon?: string, value: *}>} opts.choices
 * @returns {Promise<*|null>} the chosen value, or null on cancel/close
 */
export async function promptChoice({ title, content, choices }) {
  const buttons = choices.map((c, i) => ({
    action: c.action,
    label: c.label,
    icon: c.icon,
    default: i === 0,
    callback: () => c.value
  }));
  buttons.push({
    action: "cancel",
    label: game.i18n.localize("ROKUGAN.UI.Cancel"),
    icon: "fas fa-times",
    callback: () => null
  });
  const result = await foundry.applications.api.DialogV2.wait({
    window: { title },
    content,
    rejectClose: false,
    buttons
  });
  return (result === "cancel" || result === undefined) ? null : result;
}
