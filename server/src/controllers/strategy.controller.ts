import { HttpContext } from '@kondah/http-context'
import { Controller, Get, Middleware, Post } from '@kondah/http-controller'
import { StrategyService } from '../services/strategy.service'
import { CreateStrategyDto } from '../dtos/create-strategy.dto'
import { isAuthGuard } from '../guards/is-auth.guard'
import { validateBody } from '../lib'
import { BadRequestException } from '../exceptions'
import { BaseHttpResponse } from '../lib/base-http-response'
import { IGetFactionsResponseDto, IGetMapsResponseDto } from '@cohdex/shared'

@Controller('/strategies')
export class StrategyController {
  constructor(private readonly _strategyService: StrategyService) {}

  @Get('/maps')
  async allMaps(ctx: HttpContext) {
    const maps = await this._strategyService.getAllMaps()

    ctx.res.json(
      new BaseHttpResponse<IGetMapsResponseDto>({
        maps,
      })
    )
  }

  @Get('/factions')
  async allFactions(ctx: HttpContext) {
    const factions = await this._strategyService.getAllFactions()

    ctx.res.json(
      new BaseHttpResponse<IGetFactionsResponseDto>({
        factions,
      })
    )
  }

  @Post('/')
  @Middleware(isAuthGuard, validateBody(CreateStrategyDto))
  async store(ctx: HttpContext<CreateStrategyDto>) {
    await this._strategyService.create(ctx.data).catch((e) => {
      throw new BadRequestException(e.message)
    })

    ctx.res.sendStatus(201)
  }
}
