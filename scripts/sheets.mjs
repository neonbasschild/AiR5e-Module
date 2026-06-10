/**
 * RokuganSheets - Optional custom sheet registration for Adventures in Rokugan.
 *
 * Rather than replacing the dnd5e sheets entirely, this module patches the
 * existing dnd5e character sheet (as lotr5e-module does). Custom sheet classes
 * can be registered here if deeper customization is needed in the future.
 */

export class RokuganSheets {

  static register() {
    // Currently we use the dnd5e default sheets and patch them via hooks.
    // If a fully custom sheet is desired in a future version, register it here:
    //
    // DocumentSheetConfig.registerSheet(Actor, "rokugan5e", RokuganCharacterSheet, {
    //   types: ["character"],
    //   makeDefault: false,
    //   label: "ROKUGAN.Sheet.CharacterSheetLabel"
    // });

    console.log("Rokugan5E | Sheets registered (using dnd5e default sheets with Rokugan patches)");
  }
}
