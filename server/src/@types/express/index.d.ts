// @types/express/index.d.ts
import express = require('express') // Import namespace
import { User } from '.prisma/client'

declare module 'express' {
  interface Request {
    user?: Pick<
      User,
      'id' | 'avatar' | 'profileUrl' | 'displayName' | 'hasConfirmedDisplayName'
    >
  }
}
