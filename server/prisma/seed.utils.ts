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
          id: 1,
          name: 'pioneer',
          image: '/public/pioneer.png',
          factionId: 1,
        },
        {
          id: 2,
          name: 'sturm pioneers',
          image: '/public/sturm_pioneers.png',
          factionId: 2,
        },
        {
          id: 3,
          name: 'rear echelons',
          image: '/public/rear_echelons.png',
          factionId: 3,
        },
        {
          id: 4,
          name: 'infantry section',
          image: '/public/infantry_section.png',
          factionId: 4,
        },
        {
          id: 5,
          name: 'combat engineers',
          image: '/public/combat_engineers.png',
          factionId: 5,
        },
      ],
    })
  }
}
