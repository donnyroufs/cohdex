import { PrismaClient } from '@prisma/client'
import * as Utils from './seed.utils'

const prisma = new PrismaClient()

async function seed(prisma: PrismaClient) {
  await Utils.seedFactions(prisma)
  await Utils.seedMaps(prisma)
}

seed(prisma)
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
