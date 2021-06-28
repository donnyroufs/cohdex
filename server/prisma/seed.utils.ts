import { PrismaClient, Map, Prisma } from '@prisma/client'

export async function seedFactions(prisma: PrismaClient | any) {
  if ((await prisma.faction.count()) <= 0) {
    await prisma.faction.createMany({
      data: [
        {
          id: 1,
          name: 'Wehrmacht',
          abbreviation: 'WEHR',
          team: 'AXIS',
          imgUrl: '/public/wehr.svg',
        },
        {
          id: 2,
          name: 'Oberkommando West',
          abbreviation: 'OKW',
          team: 'AXIS',
          imgUrl: '/public/okw.svg',
        },
        {
          id: 3,
          name: 'US Forces',
          abbreviation: 'USF',
          team: 'ALLIES',
          imgUrl: '/public/usf.svg',
        },
        {
          id: 4,
          name: 'British Forces',
          abbreviation: 'UKF',
          team: 'ALLIES',
          imgUrl: '/public/ukf.svg',
        },
        {
          id: 5,
          name: 'Soviet Union',
          abbreviation: 'SOV',
          team: 'ALLIES',
          imgUrl: '/public/soviets.svg',
        },
      ],
    })
  }
}

export async function seedMaps(prisma: PrismaClient | any) {
  if ((await prisma.map.count()) <= 0) {
    await prisma.map.createMany({
      data: [
        {
          id: 1,
          name: 'langres',
          scenarioName: 'langres',
          height: 20,
          width: 20,
          maxPlayers: 2,
          version: 1,
          url: 'https://',
        },
        {
          id: 2,
          name: 'semoisky',
          scenarioName: 'semoisky',
          height: 20,
          width: 20,
          maxPlayers: 2,
          version: 1,
          url: 'https://',
        },
        {
          id: 3,
          name: 'crossroads',
          scenarioName: 'crossroads',
          height: 20,
          width: 20,
          maxPlayers: 2,
          version: 1,
          url: 'https://',
        },
      ],
    })
  }
}

// TODO: Shouldn't be seeded. Data should be coming from the original game files.
export async function seedUnits(prisma: PrismaClient) {
  if ((await prisma.unit.count()) <= 0) {
    await prisma.unit.createMany({
      data: [
        {
          name: 'pioneer',
          image: '/wehr/icons_units_unit_german_pioneer.png',
          factionId: 1,
          startingUnit: true,
        },
        {
          name: 'sturm pioneers',
          image: '/okw/icons_units_unit_west_german_sturmpioneers.png',
          factionId: 2,
          startingUnit: true,
        },
        {
          name: 'rear echelons',
          image: '/usf/icons_units_unit_aef_rear_echelon_troops.png',
          factionId: 3,
          startingUnit: true,
        },
        {
          name: 'infantry section',
          image: '/ukf/icons_units_unit_british_tommy_with_tommy.png',
          factionId: 4,
          startingUnit: true,
        },
        {
          name: 'combat engineers',
          image: '/sov/icons_units_unit_soviet_engineer.png',
          factionId: 5,
          startingUnit: true,
        },

        {
          name: 'volksgrenadiers',
          image: '/okw/icons_units_unit_west_german_volksgrenadiers.png',
          factionId: 2,
        },
        {
          name: 'mg34',
          image: '/okw/icons_units_unit_west_german_mg34_hmg.png',
          factionId: 2,
        },
        {
          name: 'panzerfusilier',
          image: '/okw/icons_units_unit_west_german_panzerfusilier.png',
          factionId: 2,
        },
        {
          name: 'conscripts',
          image: '/sov/icons_units_unit_soviet_conscript_03.png',
          factionId: 5,
        },
        {
          name: 'maxim mg',
          image: '/sov/icons_units_unit_soviet_mg.png',
          factionId: 5,
        },
        {
          name: 'mortar',
          image: '/sov/icons_units_unit_soviet_mortar.png',
          factionId: 5,
        },
        {
          name: 'penal battalion',
          image: '/sov/icons_units_unit_soviet_penal_battalion.png',
          factionId: 5,
        },
        {
          name: 'sniper',
          image: '/sov/icons_units_unit_soviet_sniper.png',
          factionId: 5,
        },
        {
          name: 'smg section',
          image: '/ukf/icons_units_brit_smg_section_8.png',
          factionId: 4,
        },
        {
          name: 'sappers',
          image: '/ukf/icons_units_unit_british_engineer.png',
          factionId: 4,
        },
        {
          name: 'sniper',
          image: '/ukf/icons_units_unit_british_sniper.png',
          factionId: 4,
        },
        {
          name: 'vickers hmg',
          image: '/ukf/icons_units_unit_british_vickers_hmg.png',
          factionId: 4,
        },
        {
          name: 'assault engineers',
          image: '/usf/icons_units_unit_aef_assault_engineers.png',
          factionId: 3,
        },
        {
          name: 'cavalry riflement',
          image: '/usf/icons_units_unit_aef_cavalry_riflemen.png',
          factionId: 3,
        },
        {
          name: 'hmg',
          image: '/usf/icons_units_unit_aef_hmg_m2hb.png',
          factionId: 3,
        },
        {
          name: 'mortar',
          image: '/usf/icons_units_unit_aef_mortar_crew.png',
          factionId: 3,
        },
        {
          name: 'captain',
          image: '/usf/icons_units_unit_aef_officer_captain.png',
          factionId: 3,
        },
        {
          name: 'lieutenant',
          image: '/usf/icons_units_unit_aef_officer_lieutenant.png',
          factionId: 3,
        },
        {
          name: 'pathfinders',
          image: '/usf/icons_units_unit_aef_pathfinders.png',
          factionId: 3,
        },
        {
          name: 'pathfinders I&R',
          image: '/usf/icons_units_unit_aef_pathfinders_i_and_r.png',
          factionId: 3,
        },
        {
          name: 'riflemen',
          image: '/usf/icons_units_unit_aef_riflemen.png',
          factionId: 3,
        },
        {
          name: 'assault grenadiers',
          image: '/wehr/icons_units_unit_german_assault_grenadier.png',
          factionId: 1,
        },
        {
          name: 'mortar',
          image: '/wehr/icons_units_unit_german_granatwerfer_34_mortar.png',
          factionId: 1,
        },
        {
          name: 'grenadiers',
          image: '/wehr/icons_units_unit_german_grenadier.png',
          factionId: 1,
        },
        {
          name: 'hmg',
          image: '/wehr/icons_units_unit_german_m1910_hmg.png',
          factionId: 1,
        },
        {
          name: 'ostruppen',
          image: '/wehr/icons_units_unit_german_ostruppen.png',
          factionId: 1,
        },
        {
          name: 'panzer grenadiers',
          image: '/wehr/icons_units_unit_german_panzer_grenadier.png',
          factionId: 1,
        },
        {
          name: 'sniper',
          image: '/wehr/icons_units_unit_german_sniper.png',
          factionId: 1,
        },
      ],
    })
  }
}
