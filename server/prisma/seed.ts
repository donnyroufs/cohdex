import { PrismaClient } from '@prisma/client'
import faker from 'faker'

const prisma = new PrismaClient()

async function seed() {
  if ((await prisma.faction.count()) <= 0) {
    await prisma.faction.createMany({
      data: [
        {
          name: 'Wehrmacht',
          abbreviation: 'WEHR',
          team: 'AXIS',
          imgUrl: '/public/wehr.svg',
        },
        {
          name: 'Oberkommando West',
          abbreviation: 'OKW',
          team: 'AXIS',
          imgUrl: '/public/okw.svg',
        },
        {
          name: 'US Forces',
          abbreviation: 'USF',
          team: 'ALLIES',
          imgUrl: '/public/usf.svg',
        },
        {
          name: 'British Forces',
          abbreviation: 'UKF',
          team: 'ALLIES',
          imgUrl: '/public/ukf.svg',
        },
        {
          name: 'Soviet Union',
          abbreviation: 'SOV',
          team: 'ALLIES',
          imgUrl: '/public/soviets.svg',
        },
      ],
    })
  }

  // not implemented yet but required for strategies.
  // add real maps.
  await prisma.map.createMany({
    data: [{ name: 'langres' }, { name: 'semoisky' }, { name: 'crossroads' }],
  })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
