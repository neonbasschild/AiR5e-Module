/**
 * RokuganConfig - Modifies CONFIG.DND5E to reflect Rokugan terminology and content.
 *
 * Key changes:
 *  - Classes: Bushi, Duelist, Courtier, Shinobi, Ritualist, Pilgrim, Acolyte
 *  - Species: Human, Naga, Nezumi, Mazoku, Specter, Tengu, Animal Yōkai, Unique Existence
 *  - Backgrounds: Clan-based (Crab, Crane, Dragon, Lion, Phoenix, Scorpion, Unicorn), Imperial, etc.
 *  - Spells → Invocations (for Ritualists) / Techniques (for martial classes)
 *  - Spell slots → Favor (Ritualists) / Focus (martial classes)
 *  - Currencies: Koku (gp), Bu (sp), Zeni (cp); no ep or pp
 *  - Armor: Rokugan-specific sets
 *  - Weapons: Rokugan/Japanese-inspired weapon names
 */

export class RokuganConfig {

  // ----------------------------------------
  // Class Definitions
  // ----------------------------------------

  static CLASSES = {
    bushi: "ROKUGAN.Class.Bushi",
    duelist: "ROKUGAN.Class.Duelist",
    courtier: "ROKUGAN.Class.Courtier",
    shinobi: "ROKUGAN.Class.Shinobi",
    ritualist: "ROKUGAN.Class.Ritualist",
    pilgrim: "ROKUGAN.Class.Pilgrim",
    acolyte: "ROKUGAN.Class.Acolyte"
  };

  // Subclasses organized by parent class
  static SUBCLASSES = {
    // Bushi Archetypes (Clan Traditions)
    bushi: {
      hida_defender: "ROKUGAN.Subclass.Bushi.HidaDefender",
      hiruma_scout: "ROKUGAN.Subclass.Bushi.HiramaScout",
      kaiu_engineer: "ROKUGAN.Subclass.Bushi.KaiuEngineer",
      daidoji_iron_warrior: "ROKUGAN.Subclass.Bushi.DaidojiIronWarrior",
      mirumoto_swordmaster: "ROKUGAN.Subclass.Bushi.MirumotoSwordmaster",
      akodo_war_college: "ROKUGAN.Subclass.Bushi.AkodoWarCollege",
      shiba_protector: "ROKUGAN.Subclass.Bushi.ShibaProtector",
      bayushi_bully: "ROKUGAN.Subclass.Bushi.BayushiBully",
      shinjo_outrider: "ROKUGAN.Subclass.Bushi.ShinjoOutrider",
    },
    // Duelist Archetypes
    duelist: {
      kakita_duelist: "ROKUGAN.Subclass.Duelist.KakitaDuelist",
      iaijutsu_master: "ROKUGAN.Subclass.Duelist.IaijutsuMaster",
      archery_master: "ROKUGAN.Subclass.Duelist.ArcheryMaster",
    },
    // Courtier Archetypes
    courtier: {
      doji_ambassador: "ROKUGAN.Subclass.Courtier.DojiAmbassador",
      imperial_herald: "ROKUGAN.Subclass.Courtier.ImperialHerald",
      yasuki_merchant: "ROKUGAN.Subclass.Courtier.YasukiMerchant",
    },
    // Shinobi Archetypes
    shinobi: {
      scorpion_shadow: "ROKUGAN.Subclass.Shinobi.ScorpionShadow",
      shadow_brand: "ROKUGAN.Subclass.Shinobi.ShadowBrand",
      kunoichi: "ROKUGAN.Subclass.Shinobi.Kunoichi",
    },
    // Ritualist Archetypes
    ritualist: {
      isawa_shugenja: "ROKUGAN.Subclass.Ritualist.IsawaShugenja",
      kuni_purifier: "ROKUGAN.Subclass.Ritualist.KuniPurifier",
      agasha_mystic: "ROKUGAN.Subclass.Ritualist.AgashaMystic",
      kitsu_sodan: "ROKUGAN.Subclass.Ritualist.KitsuSodan",
    },
    // Pilgrim Archetypes
    pilgrim: {
      togashi_tattooed: "ROKUGAN.Subclass.Pilgrim.TogashiTattooed",
      fortune_seeker: "ROKUGAN.Subclass.Pilgrim.FortuneSeekerMonk",
      enlightened_fist: "ROKUGAN.Subclass.Pilgrim.EnlightenedFist",
    },
    // Acolyte Archetypes
    acolyte: {
      togashi_order: "ROKUGAN.Subclass.Acolyte.TogashiOrder",
      shadow_brand_agent: "ROKUGAN.Subclass.Acolyte.ShadowBrandAgent",
      celestial_mark: "ROKUGAN.Subclass.Acolyte.CelestialMark",
    }
  };

  // ----------------------------------------
  // Species (Races)
  // ----------------------------------------

  static SPECIES = {
    human: "ROKUGAN.Species.Human",
    naga: "ROKUGAN.Species.Naga",
    nezumi: "ROKUGAN.Species.Nezumi",
    mazoku: "ROKUGAN.Species.Mazoku",
    specter: "ROKUGAN.Species.Specter",
    tengu: "ROKUGAN.Species.Tengu",
    animal_yokai: "ROKUGAN.Species.AnimalYokai",
    unique_existence: "ROKUGAN.Species.UniqueExistence"
  };

  // ----------------------------------------
  // Backgrounds (Clan-based)
  // ----------------------------------------

  static BACKGROUNDS = {
    // Great Clans
    crab_defender: "ROKUGAN.Background.CrabDefender",
    crab_engineer: "ROKUGAN.Background.CrabEngineer",
    crane_diplomat: "ROKUGAN.Background.CraneDiplomat",
    crane_artisan: "ROKUGAN.Background.CraneArtisan",
    dragon_monk: "ROKUGAN.Background.DragonMonk",
    dragon_mystic: "ROKUGAN.Background.DragonMystic",
    lion_soldier: "ROKUGAN.Background.LionSoldier",
    lion_historian: "ROKUGAN.Background.LionHistorian",
    phoenix_scholar: "ROKUGAN.Background.PhoenixScholar",
    phoenix_ritualist: "ROKUGAN.Background.PhoenixRitualist",
    scorpion_spy: "ROKUGAN.Background.ScorpionSpy",
    scorpion_courtier: "ROKUGAN.Background.ScorpionCourtier",
    unicorn_rider: "ROKUGAN.Background.UnicornRider",
    unicorn_scout: "ROKUGAN.Background.UnicornScout",
    // Imperial Court
    imperial_herald: "ROKUGAN.Background.ImperialHerald",
    imperial_magistrate: "ROKUGAN.Background.ImperialMagistrate",
    // Minor Clans
    minor_clan_samurai: "ROKUGAN.Background.MinorClanSamurai",
    // Monasteries
    monastery_pilgrim: "ROKUGAN.Background.MonasteryPilgrim",
    // Commoners
    merchant: "ROKUGAN.Background.Merchant",
    farmer: "ROKUGAN.Background.Farmer",
    artisan: "ROKUGAN.Background.Artisan",
    // Non-Rokugani
    ivory_kingdoms: "ROKUGAN.Background.IvoryKingdoms",
    burning_sands: "ROKUGAN.Background.BurningSands",
    // Non-Human
    naga_wanderer: "ROKUGAN.Background.NagaWanderer",
    nezumi_warrener: "ROKUGAN.Background.NezumiWarrener",
    tengu_emissary: "ROKUGAN.Background.TenguEmissary",
  };

  // ----------------------------------------
  // Currency (replaces gp/sp/cp labels)
  // ----------------------------------------

  static CURRENCY = {
    cp: { label: "ROKUGAN.Currency.Zeni", abbr: "ROKUGAN.Currency.ZeniAbbr" },
    sp: { label: "ROKUGAN.Currency.Bu", abbr: "ROKUGAN.Currency.BuAbbr" },
    gp: { label: "ROKUGAN.Currency.Koku", abbr: "ROKUGAN.Currency.KokuAbbr" },
    ep: null,   // Not used in Rokugan
    pp: null    // Not used in Rokugan
  };

  // ----------------------------------------
  // Armor (Rokugan-specific)
  // ----------------------------------------

  static ARMOR = {
    // Light Armor
    concealedArmor: "ROKUGAN.Armor.ConcealedArmor",
    sharkLeatherArmor: "ROKUGAN.Armor.SharkLeatherArmor",
    silkArmor: "ROKUGAN.Armor.SilkArmor",
    // Medium Armor
    animalHideArmor: "ROKUGAN.Armor.AnimalHideArmor",
    fieldGear: "ROKUGAN.Armor.FieldGear",
    lacqueredArmor: "ROKUGAN.Armor.LacqueredArmor",
    // Heavy Armor
    segmentedPlate: "ROKUGAN.Armor.SegmentedPlate",
    // Shields
    roundShield: "ROKUGAN.Armor.RoundShield",
    wallShield: "ROKUGAN.Armor.WallShield",
    // Outfits (no AC bonus, provide other benefits)
    resplendentRegalia: "ROKUGAN.Armor.ResplendentRegalia",
    sanctifiedVestments: "ROKUGAN.Armor.SanctifiedVestments",
    travelingClothes: "ROKUGAN.Armor.TravelingClothes",
    unremarkableGarb: "ROKUGAN.Armor.UnremarkableGarb",
  };

  // ----------------------------------------
  // Weapons (Rokugan-specific, by category)
  // ----------------------------------------

  static WEAPONS = {
    // Simple Melee
    carpenterHammer: "ROKUGAN.Weapon.CarpenterHammer",
    knife: "ROKUGAN.Weapon.Knife",
    nunchaku: "ROKUGAN.Weapon.Nunchaku",
    quarterstaff: "ROKUGAN.Weapon.Quarterstaff",
    sickle: "ROKUGAN.Weapon.Sickle",
    spear: "ROKUGAN.Weapon.Spear",
    swordbreaker: "ROKUGAN.Weapon.Swordbreaker",   // jitte
    threeSectionStaff: "ROKUGAN.Weapon.ThreeSectionStaff",
    tigerHookSwords: "ROKUGAN.Weapon.TigerHookSwords",
    // Martial Melee
    bisento: "ROKUGAN.Weapon.Bisento",       // glaive-like
    katana: "ROKUGAN.Weapon.Katana",
    nodachi: "ROKUGAN.Weapon.Nodachi",       // greatsword equivalent
    naginata: "ROKUGAN.Weapon.Naginata",     // polearm
    tridentPolearm: "ROKUGAN.Weapon.TridentPolearm",
    wakizashi: "ROKUGAN.Weapon.Wakizashi",   // short sword equivalent
    warspear: "ROKUGAN.Weapon.Warspear",     // yari
    whipSword: "ROKUGAN.Weapon.WhipSword",   // urumi
    tonfa: "ROKUGAN.Weapon.Tonfa",
    kusarigama: "ROKUGAN.Weapon.Kusarigama",
    // Martial Ranged
    ballista: "ROKUGAN.Weapon.Ballista",
    blowgun: "ROKUGAN.Weapon.Blowgun",
    crossbow: "ROKUGAN.Weapon.Crossbow",
    greatbow: "ROKUGAN.Weapon.Greatbow",           // daikyū
    heavyCrossbow: "ROKUGAN.Weapon.HeavyCrossbow",
    longbow: "ROKUGAN.Weapon.Longbow",             // yumi
    repeatingCrossbow: "ROKUGAN.Weapon.RepeatingCrossbow",
    shinjoHorsebow: "ROKUGAN.Weapon.ShinjoHorsebow",
    shuriken: "ROKUGAN.Weapon.Shuriken",
    // Ninja Tools (Shinobi weapons)
    kunai: "ROKUGAN.Weapon.Kunai",
    smokeBomb: "ROKUGAN.Weapon.SmokeBomb",
    caltrops: "ROKUGAN.Weapon.Caltrops",
  };

  // ----------------------------------------
  // Techniques (replacing Spells for martial classes)
  // Focus replaces spell slots for Bushi/Duelist/Pilgrim/Shinobi
  // ----------------------------------------

  static TECHNIQUE_TYPES = {
    strike: "ROKUGAN.Technique.Type.Strike",
    kata: "ROKUGAN.Technique.Type.Kata",
    kiho: "ROKUGAN.Technique.Type.Kiho",
    ninjutsu: "ROKUGAN.Technique.Type.Ninjutsu",
  };

  // ----------------------------------------
  // Invocations (replacing Spells for Ritualist)
  // Favor replaces spell slots for Ritualist
  // ----------------------------------------

  static INVOCATION_ELEMENTS = {
    air: "ROKUGAN.Invocation.Element.Air",
    earth: "ROKUGAN.Invocation.Element.Earth",
    fire: "ROKUGAN.Invocation.Element.Fire",
    water: "ROKUGAN.Invocation.Element.Water",
    any: "ROKUGAN.Invocation.Element.Any",
  };

  static INVOCATION_TIERS = {
    0: "ROKUGAN.Invocation.Tier.0",
    1: "ROKUGAN.Invocation.Tier.1",
    2: "ROKUGAN.Invocation.Tier.2",
    3: "ROKUGAN.Invocation.Tier.3",
  };

  static INVOCATION_TYPES = {
    augmentation: "ROKUGAN.Invocation.Type.Augmentation",
    mending: "ROKUGAN.Invocation.Type.Mending",
    purification: "ROKUGAN.Invocation.Type.Purification",
    scrying: "ROKUGAN.Invocation.Type.Scrying",
    smite: "ROKUGAN.Invocation.Type.Smite",
    summoning: "ROKUGAN.Invocation.Type.Summoning",
  };

  // ----------------------------------------
  // New Conditions (from Adventures in Rokugan)
  // ----------------------------------------

  static CONDITIONS = {
    // Standard 5e conditions remain; Rokugan adds:
    disoriented: "ROKUGAN.Condition.Disoriented",
    compromised: "ROKUGAN.Condition.Compromised",
    anguished: "ROKUGAN.Condition.Anguished",
    miserable: "ROKUGAN.Condition.Miserable",
  };

  // ----------------------------------------
  // Skills (Rokugan doesn't remove skills but
  // we note the ones most relevant to Rokugan)
  // ----------------------------------------

  static SKILLS_NOTE = `
    Adventures in Rokugan uses standard 5e skills.
    Note that Arcana covers knowledge of spirits and the supernatural in Rokugan.
    Religion covers knowledge of the Fortunes, ancestors, and Rokugani cosmology.
    Performance is particularly valued in Crane Clan contexts.
  `;

  // ----------------------------------------
  // Languages of Rokugan
  // ----------------------------------------

  static LANGUAGES = {
    rokugani: "ROKUGAN.Language.Rokugani",
    nezumi: "ROKUGAN.Language.Nezumi",
    naganese: "ROKUGAN.Language.Naganese",
    tenguspeech: "ROKUGAN.Language.TenguSpeech",
    ivoryKingdoms: "ROKUGAN.Language.IvoryKingdoms",
    burningSands: "ROKUGAN.Language.BurningSands",
    celestial: "ROKUGAN.Language.Celestial",
    // Sign language
    rokuganiSigned: "ROKUGAN.Language.RokuganiSigned",
  };

  // ----------------------------------------
  // Great Clans of Rokugan
  // ----------------------------------------

  static GREAT_CLANS = {
    crab: "ROKUGAN.Clan.Crab",
    crane: "ROKUGAN.Clan.Crane",
    dragon: "ROKUGAN.Clan.Dragon",
    lion: "ROKUGAN.Clan.Lion",
    phoenix: "ROKUGAN.Clan.Phoenix",
    scorpion: "ROKUGAN.Clan.Scorpion",
    unicorn: "ROKUGAN.Clan.Unicorn",
    // Imperial families
    imperial: "ROKUGAN.Clan.Imperial",
    // Minor Clans
    minorClans: "ROKUGAN.Clan.MinorClans",
    // Non-affiliated
    ronin: "ROKUGAN.Clan.Ronin",
  };

  // ----------------------------------------
  // Apply all CONFIG.DND5E changes
  // ----------------------------------------

  static apply() {
    if (!game.settings.get("rokugan5e", "useRokuganTerminology")) return;

    const cfg = CONFIG.DND5E;

    // ----- Terminology: Spells → Invocations/Techniques -----
    // The dnd5e system uses localization keys; we override labels where possible.
    // For deep system terminology ("Spell Slots", "Spellcasting", etc.), we use
    // the language file overrides in lang/en.json.

    // ----- Currency -----
    // dnd5e 5.x currencies carry { label, abbreviation, conversion, icon }.
    // Renames are gated on the terminology setting; removal of electrum and
    // platinum (not used in Rokugan) is gated on hideNonRokuganContent and
    // done by deleting the config entries, which is how dnd5e expects
    // currencies to be removed.
    if (cfg.currencies) {
      if (cfg.currencies.cp) {
        cfg.currencies.cp.label = "ROKUGAN.Currency.Zeni";
        cfg.currencies.cp.abbreviation = "ROKUGAN.Currency.ZeniAbbr";
      }
      if (cfg.currencies.sp) {
        cfg.currencies.sp.label = "ROKUGAN.Currency.Bu";
        cfg.currencies.sp.abbreviation = "ROKUGAN.Currency.BuAbbr";
      }
      if (cfg.currencies.gp) {
        cfg.currencies.gp.label = "ROKUGAN.Currency.Koku";
        cfg.currencies.gp.abbreviation = "ROKUGAN.Currency.KokuAbbr";
      }
      if (game.settings.get("rokugan5e", "hideNonRokuganContent")) {
        delete cfg.currencies.ep;
        delete cfg.currencies.pp;
      }
    }

    // ----- Tools: Add Rokugan-relevant tool proficiencies -----
    cfg.toolTypes = cfg.toolTypes ?? {};
    cfg.toolTypes.rokugan = "ROKUGAN.Tools.RokuganTools";

    if (cfg.toolProficiencies) {
      // Musician tools relevant to Rokugan
      cfg.toolProficiencies["shamisen"] = "ROKUGAN.Tool.Shamisen";
      cfg.toolProficiencies["biwa"] = "ROKUGAN.Tool.Biwa";
      cfg.toolProficiencies["shakuhachi"] = "ROKUGAN.Tool.Shakuhachi";
      cfg.toolProficiencies["taiko"] = "ROKUGAN.Tool.Taiko";
      cfg.toolProficiencies["koto"] = "ROKUGAN.Tool.Koto";
      // Artisan tools
      cfg.toolProficiencies["calligrapher"] = "ROKUGAN.Tool.Calligrapher";
      cfg.toolProficiencies["origami"] = "ROKUGAN.Tool.Origami";
      cfg.toolProficiencies["tea_ceremony"] = "ROKUGAN.Tool.TeaCeremony";
      cfg.toolProficiencies["ikebana"] = "ROKUGAN.Tool.Ikebana";
      // Gaming
      cfg.toolProficiencies["shogi"] = "ROKUGAN.Tool.Shogi";
      cfg.toolProficiencies["go"] = "ROKUGAN.Tool.Go";
    }

    // ----- Languages -----
    if (cfg.languages) {
      cfg.languages.standard = cfg.languages.standard ?? {};
      cfg.languages.standard.rokugani = "ROKUGAN.Language.Rokugani";
      cfg.languages.standard.nezumi = "ROKUGAN.Language.Nezumi";
      cfg.languages.standard.naganese = "ROKUGAN.Language.Naganese";
      cfg.languages.standard.tenguspeech = "ROKUGAN.Language.TenguSpeech";
      cfg.languages.standard.ivoryKingdoms = "ROKUGAN.Language.IvoryKingdoms";
      cfg.languages.standard.burningSands = "ROKUGAN.Language.BurningSands";
      cfg.languages.standard.celestial = "ROKUGAN.Language.Celestial";
      cfg.languages.standard.rokuganiSigned = "ROKUGAN.Language.RokuganiSigned";
    }

    // ----- Creature Types: Add Rokugan-specific types -----
    if (cfg.creatureTypes) {
      cfg.creatureTypes.spirit = "ROKUGAN.CreatureType.Spirit";
      cfg.creatureTypes.oni = "ROKUGAN.CreatureType.Oni";
      cfg.creatureTypes.mazoku = "ROKUGAN.CreatureType.Mazoku";
      cfg.creatureTypes.yokai = "ROKUGAN.CreatureType.Yokai";
    }

    // ----- Damage Types: Add Rokugan-relevant types -----
    if (cfg.damageTypes) {
      // Void damage (advanced concept in Rokugan)
      cfg.damageTypes.void = "ROKUGAN.DamageType.Void";
    }

    // ----- Spell Schools → Invocation Elements -----
    // In Rokugan, the Ritualist uses Invocations organized by element.
    // We map the dnd5e spell school labels to Rokugan elements for Ritualists.
    if (cfg.spellSchools) {
      // Keep standard schools but add element-based ones
      cfg.spellSchools.air = { label: "ROKUGAN.Invocation.Element.Air", icon: "systems/dnd5e/icons/svg/schools/abjuration.svg" };
      cfg.spellSchools.earth = { label: "ROKUGAN.Invocation.Element.Earth", icon: "systems/dnd5e/icons/svg/schools/conjuration.svg" };
      cfg.spellSchools.fire = { label: "ROKUGAN.Invocation.Element.Fire", icon: "systems/dnd5e/icons/svg/schools/evocation.svg" };
      cfg.spellSchools.water = { label: "ROKUGAN.Invocation.Element.Water", icon: "systems/dnd5e/icons/svg/schools/divination.svg" };
    }

    // ----- Item Properties: Add Rokugan-specific weapon properties -----
    if (cfg.itemProperties) {
      cfg.itemProperties.paired = {
        label: "ROKUGAN.WeaponProperty.Paired",
        abbreviation: "ROKUGAN.WeaponProperty.PairedAbbr",
        icon: null
      };
      cfg.itemProperties.ceremonial = {
        label: "ROKUGAN.WeaponProperty.Ceremonial",
        abbreviation: "ROKUGAN.WeaponProperty.CeremonialAbbr",
        icon: null
      };
      cfg.itemProperties.awakened = {
        label: "ROKUGAN.WeaponProperty.Awakened",
        abbreviation: "ROKUGAN.WeaponProperty.AwakenedAbbr",
        icon: null
      };
    }

    // ----- Status Effects / Conditions -----
    // dnd5e 5.x assigns each status effect a static 16-character _id (see
    // dnd5e's _configureStatusEffects). Doing the same keeps effect creation
    // deterministic. Core Foundry icons are used so no SVG assets ship.
    const staticId = (id) => `rokugan${id}`.padEnd(16, "0").slice(0, 16);
    const rokuganConditions = [
      { id: "disoriented",    name: "ROKUGAN.Condition.Disoriented",    img: "icons/svg/daze.svg" },
      { id: "compromised",    name: "ROKUGAN.Condition.Compromised",    img: "icons/svg/downgrade.svg" },
      { id: "miserable",      name: "ROKUGAN.Condition.Miserable",      img: "icons/svg/stoned.svg" },
      { id: "anguished",      name: "ROKUGAN.Condition.Anguished",      img: "icons/svg/terror.svg" },
      { id: "markedForDeath", name: "ROKUGAN.Condition.MarkedForDeath", img: "icons/svg/target.svg" },
      { id: "bleedingAiR",    name: "ROKUGAN.Condition.Bleeding",       img: "icons/svg/blood.svg" },
    ].map(e => ({ ...e, _id: staticId(e.id) }));

    CONFIG.statusEffects.push(...rokuganConditions);

    console.log("Rokugan5E | CONFIG.DND5E patched successfully");
  }

  // ----------------------------------------
  // Patch labels in rendered HTML
  // Called on renderApplication to catch dynamic content
  // ----------------------------------------

  static patchLabels() {
    if (!game.settings.get("rokugan5e", "useRokuganTerminology")) return;

    // Replace visible text labels in the UI (non-localization approach for
    // labels that the dnd5e system renders directly without localization keys)
    const labelReplacements = [
      // Spell terminology → Rokugan terminology
      // Note: These are rough text replacements for labels that dnd5e renders
      // as hard-coded English. Use with caution; may affect some UI elements.
      { selector: ".spell-level-label", from: "Cantrip", to: "Tier 0" },
      { selector: ".spellbook-header", from: "Spells", to: "Invocations & Techniques" },
    ];

    // This is intentionally minimal. Most terminology is handled via lang/en.json
    // overrides which are cleaner and more reliable.
  }
}
