import { PrismaClient, Map } from '@prisma/client'

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
        { id: 1, name: 'langres' },
        { id: 2, name: 'semoisky' },
        { id: 3, name: 'crossroads' },
      ],
    })
  }
}
