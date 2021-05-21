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
        },
        {
          name: 'Oberkommando West',
          abbreviation: 'OKW',
          team: 'AXIS',
        },
        {
          name: 'US Forces',
          abbreviation: 'USF',
          team: 'ALLIES',
        },
        {
          name: 'British Forces',
          abbreviation: 'UKF',
          team: 'ALLIES',
        },
        {
          name: 'Soviet Union',
          abbreviation: 'SOV',
          team: 'ALLIES',
        },
      ],
    })
  }

  // not implemented yet but required for strategies.
  await prisma.map.create({
    data: {},
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
