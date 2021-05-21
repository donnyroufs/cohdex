import { HttpContext } from '@kondah/http-context'
import { Controller, Middleware, Post } from '@kondah/http-controller'
import { StrategyService } from '../services/strategy.service'
import { CreateStrategyDto } from '../dtos/create-strategy.dto'
import { isAuthGuard } from '../guards/is-auth.guard'
import { validateBody } from '../lib'
import { BadRequestException } from '../exceptions'

@Controller('/strategy')
export class StrategyController {
  constructor(private readonly _strategyService: StrategyService) {}

  @Post('/')
  @Middleware(isAuthGuard, validateBody(CreateStrategyDto))
  async store(ctx: HttpContext<CreateStrategyDto>) {
    await this._strategyService.create(ctx.data).catch((e) => {
      throw new BadRequestException(e.message)
    })

    ctx.res.sendStatus(201)
  }
}
