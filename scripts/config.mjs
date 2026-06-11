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

import { ROKUGAN_WEAPON_IDS, ROKUGAN_TOOL_IDS, EQUIPMENT_PACK } from "./proficiency-ids.mjs";

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

  // Reference only (live registration is in apply(), driven by the
  // currencyMode setting). Conversions are coins-per-gp from book Table 4-1:
  //   koku = 1 gp, bu = 2 sp (1/5 gp), zeni = 2 cp (1/50 gp).
  static CURRENCY = {
    koku: { label: "ROKUGAN.Currency.Koku", abbr: "ROKUGAN.Currency.KokuAbbr", conversion: 1 },
    bu:   { label: "ROKUGAN.Currency.Bu",   abbr: "ROKUGAN.Currency.BuAbbr",   conversion: 5 },
    zeni: { label: "ROKUGAN.Currency.Zeni", abbr: "ROKUGAN.Currency.ZeniAbbr", conversion: 50 },
    // ep and pp are not used as currency in Rokugan.
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

  // Canonical Adventures in Rokugan language list (reference; the live
  // registration happens in apply()).
  static LANGUAGES = {
    rokugani: "ROKUGAN.Language.Rokugani",
    rokuganiSigned: "ROKUGAN.Language.RokuganiSigned",
    courtlyRokugani: "ROKUGAN.Language.CourtlyRokugani",
    ivindi: "ROKUGAN.Language.Ivindi",
    jindallaean: "ROKUGAN.Language.Jindallaean",
    leafRustle: "ROKUGAN.Language.LeafRustle",
    qamari: "ROKUGAN.Language.QamariLanguages",
    riverSpeech: "ROKUGAN.Language.RiverSpeech",
    skySpeech: "ROKUGAN.Language.SkySpeech",
    stoneClick: "ROKUGAN.Language.StoneClick",
    ujik: "ROKUGAN.Language.UjikLanguages",
    yunFengWen: "ROKUGAN.Language.YunFengWen",
    animalSpeech: "ROKUGAN.Language.AnimalSpeech",
    battleArgot: "ROKUGAN.Language.BattleArgot",
    asakoCipher: "ROKUGAN.Language.AsakoCipher",
    kuniCodes: "ROKUGAN.Language.KuniCodes",
    yogoCipher: "ROKUGAN.Language.YogoCipher",
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
    // Per Adventures in Rokugan (Table 4-1, p. 187), the game uses standard
    // gp/sp/cp by default but provides the Legend of the Five Rings coinage as
    // an option, with these exact relationships:
    //   1 koku = 1 gp   (= 10 sp = 100 cp = 5 bu = 50 zeni)
    //   1 bu   = 2 sp   (= 1/5 gp = 20 cp = 10 zeni)
    //   1 zeni = 2 cp   (= 1/5 sp = 1/50 gp)
    // dnd5e's `conversion` is "how many of this coin equal one gp", so:
    //   koku 1, bu 5, zeni 50 - which is exactly the koku/bu/zeni column of
    //   the book's table. Because the conversions are correct, money entered
    //   in one denomination is valued correctly against the other system, so
    //   switching modes converts on the fly without changing a character's
    //   actual wealth.
    //
    // The "currencyMode" setting chooses the presentation:
    //   "standard" - gp/sp/cp (default, as the book recommends for 5e players)
    //   "rokugan"  - koku/bu/zeni only (the L5R classic coinage)
    //   "both"     - keep gp/sp/cp AND add koku/bu/zeni as extra denominations
    if (cfg.currencies) {
      const mode = game.settings.get("rokugan5e", "currencyMode");

      // dnd5e 5.x currency icons live alongside label/abbreviation/conversion.
      const koku = { label: "ROKUGAN.Currency.Koku", abbreviation: "ROKUGAN.Currency.KokuAbbr", conversion: 1 };
      const bu   = { label: "ROKUGAN.Currency.Bu",   abbreviation: "ROKUGAN.Currency.BuAbbr",   conversion: 5 };
      const zeni = { label: "ROKUGAN.Currency.Zeni", abbreviation: "ROKUGAN.Currency.ZeniAbbr", conversion: 50 };

      // Electrum and platinum are never used in Rokugan.
      if (game.settings.get("rokugan5e", "hideNonRokuganContent")) {
        delete cfg.currencies.ep;
        delete cfg.currencies.pp;
      }

      if (mode === "rokugan") {
        // Rokugani-only presentation. We must NOT change the sp/cp conversion
        // numbers (10/100): item prices and stored wealth are recorded in
        // gp/sp/cp, and altering a slot's conversion would silently revalue
        // them. Because 1 koku = 1 gp exactly, the gp slot is relabeled to
        // Koku at 1:1 with no value change. Bu and zeni are added as their own
        // coins (conversions 5 and 50), and sp/cp are hidden from the wallet
        // so the sheet reads in koku/bu/zeni. Existing sp/cp values remain
        // valued correctly underneath and surface again if the GM switches
        // back, so nothing is ever lost.
        cfg.currencies.gp = { ...cfg.currencies.gp, ...koku };
        cfg.currencies.bu   = { ...bu };
        cfg.currencies.zeni = { ...zeni };
        // Hide sp/cp slots from display without deleting stored amounts.
        if (cfg.currencies.sp) cfg.currencies.sp = { ...cfg.currencies.sp, label: "ROKUGAN.Currency.BuFromSp", abbreviation: "ROKUGAN.Currency.BuAbbr" };
        if (cfg.currencies.cp) cfg.currencies.cp = { ...cfg.currencies.cp, label: "ROKUGAN.Currency.ZeniFromCp", abbreviation: "ROKUGAN.Currency.ZeniAbbr" };
      } else if (mode === "both") {
        // Keep gp/sp/cp exact and add koku/bu/zeni as additional coins on the
        // same gp value scale. This is the true on-the-fly converter: the
        // system's currency-convert tools move value between all six, and
        // prices stay precise in gp/sp/cp.
        cfg.currencies.koku = { ...koku };
        cfg.currencies.bu   = { ...bu };
        cfg.currencies.zeni = { ...zeni };
      }
      // mode === "standard": leave gp/sp/cp untouched (book default).
    }

    // ----- Tools: Add Rokugan-relevant tool proficiencies -----
    cfg.toolTypes = cfg.toolTypes ?? {};
    cfg.toolTypes.rokugan = "ROKUGAN.Tools.RokuganTools";

    // ----- Tool proficiency categories (Adventures in Rokugan) -----
    // AiR groups tools into categories the way 5e does (artisan's tools,
    // gaming sets, musical instruments) plus its own: mystic implements and
    // tools of subterfuge. These appear in the proficiency dropdowns.
    if (cfg.toolProficiencies) {
      cfg.toolProficiencies["art"] = cfg.toolProficiencies["art"] ?? "ROKUGAN.ToolCat.Artisan";
      cfg.toolProficiencies["game"] = cfg.toolProficiencies["game"] ?? "ROKUGAN.ToolCat.Gaming";
      cfg.toolProficiencies["music"] = cfg.toolProficiencies["music"] ?? "ROKUGAN.ToolCat.Musical";
      cfg.toolProficiencies["mystic"] = "ROKUGAN.ToolCat.Mystic";
      cfg.toolProficiencies["subterfuge"] = "ROKUGAN.ToolCat.Subterfuge";
    }

    // Weapon/tool proficiency IDs are registered in registerProficiencies(),
    // called at both init and setup so they survive the dnd5e system's own setup.
    RokuganConfig.registerProficiencies();

    console.log("Rokugan5E | CONFIG.DND5E patched successfully");
  }

  // Register Rokugan languages. Called at i18nInit so game.i18n is ready and
  // labels resolve to readable text instead of raw localization keys.

  // Register AiR weapon/tool proficiency IDs. Called at init AND setup: the
  // dnd5e system may (re)populate CONFIG.DND5E.weaponIds/toolIds from its own
  // compendium during its setup phase, which can drop entries added only at
  // init - so we re-assert them at setup to guarantee specific-weapon and
  // specific-tool proficiency grants resolve when characters are built.
  static registerProficiencies() {
    const cfg = CONFIG.DND5E;
    if (!cfg) return;
    // dnd5e resolves a specific weapon/tool proficiency (and the item
    // "proficient" state) via CONFIG.DND5E.weaponIds / toolIds, each mapping
    // an identifier to a compendium item. We point AiR's weapons and tools at
    // the rokugan5e.equipment pack so those proficiencies resolve to the real
    // items, exactly as the SRD weapons/tools do for the core system.
    cfg.weaponIds = cfg.weaponIds ?? {};
    for (const [key, id] of Object.entries(ROKUGAN_WEAPON_IDS)) {
      cfg.weaponIds[key] = `Compendium.${EQUIPMENT_PACK}.Item.${id}`;
    }
    cfg.toolIds = cfg.toolIds ?? {};
    for (const [key, id] of Object.entries(ROKUGAN_TOOL_IDS)) {
      const uuid = `Compendium.${EQUIPMENT_PACK}.Item.${id}`;
      cfg.toolIds[key] = uuid;
      // Override the equivalent SRD camelCase key so the tool dropdown shows a
      // single Rokugan entry instead of duplicating with the SRD item
      // (e.g. our "disguisekit" vs the SRD "disguiseKit").
      const camel = key.replace(/kit$/, "Kit").replace(/set$/, "Set")
                       .replace(/tools$/, "Tools").replace(/equipment$/, "Equipment");
      if (camel !== key && cfg.toolIds[camel]) cfg.toolIds[camel] = uuid;
    }

    // Languages are registered in registerLanguages() at i18nInit
    // (so labels can be localized).

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
      cfg.itemProperties.defensive = {
        label: "ROKUGAN.WeaponProperty.Defensive",
        abbreviation: "ROKUGAN.WeaponProperty.DefensiveAbbr",
        icon: null
      };
      cfg.itemProperties.snaring = {
        label: "ROKUGAN.WeaponProperty.Snaring",
        abbreviation: "ROKUGAN.WeaponProperty.SnaringAbbr",
        icon: null
      };
      // dnd5e 5.x validates item properties per type; register the custom
      // Rokugan weapon properties so they survive document data cleaning.
      const wprops = cfg.validProperties?.weapon;
      if (wprops?.add) {
        for (const p of ["paired", "ceremonial", "awakened", "defensive", "snaring"]) wprops.add(p);
      }
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

  }

  static registerLanguages() {
    const cfg = CONFIG.DND5E;
    // dnd5e 5.x stores languages as a nested tree: each category has
    // { label, children: { key: { label } | "label" } } and trait keys read
    // "languages:<category>:<key>". We add a "rokugan" category whose children
    // are the canonical AiR languages, and treat Rokugani as the setting's
    // Common. Older flat shapes are tolerated as a fallback.
    if (cfg.languages) {
      const air = {
        rokugani: "ROKUGAN.Language.Rokugani",
        rokuganiSigned: "ROKUGAN.Language.RokuganiSigned",
        courtlyRokugani: "ROKUGAN.Language.CourtlyRokugani",
        ivindi: "ROKUGAN.Language.Ivindi",
        jindallaean: "ROKUGAN.Language.Jindallaean",
        leafRustle: "ROKUGAN.Language.LeafRustle",
        qamari: "ROKUGAN.Language.QamariLanguages",
        riverSpeech: "ROKUGAN.Language.RiverSpeech",
        skySpeech: "ROKUGAN.Language.SkySpeech",
        stoneClick: "ROKUGAN.Language.StoneClick",
        ujik: "ROKUGAN.Language.UjikLanguages",
        yunFengWen: "ROKUGAN.Language.YunFengWen",
        animalSpeech: "ROKUGAN.Language.AnimalSpeech",
        battleArgot: "ROKUGAN.Language.BattleArgot",
        asakoCipher: "ROKUGAN.Language.AsakoCipher",
        kuniCodes: "ROKUGAN.Language.KuniCodes",
        yogoCipher: "ROKUGAN.Language.YogoCipher",
      };

      // Detect nested (5.x) vs flat language config and register accordingly.
      const sample = Object.values(cfg.languages)[0];
      const nested = sample && typeof sample === "object" && ("children" in sample || "label" in sample);

      // Localize now: registration may occur before some i18n-less render
      // paths, and dnd5e expects ready-to-display labels here.
      const loc = (k) => game.i18n.has?.(k) ? game.i18n.localize(k) : k;
      if (nested) {
        // dnd5e 5.x nested shape: { label, children: { key: { label } } }.
        cfg.languages.rokugan = {
          label: loc("ROKUGAN.Language.Category"),
          children: Object.fromEntries(
            Object.entries(air).map(([k, v]) => [k, { label: loc(v) }])),
        };
      } else {
        // Flat fallback (older dnd5e): standard bucket, localized strings.
        cfg.languages.standard = cfg.languages.standard ?? {};
        for (const [k, v] of Object.entries(air)) cfg.languages.standard[k] = loc(v);
      }
    }
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
