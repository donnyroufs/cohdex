import { HttpContext } from '@kondah/http-context'
import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
  Put,
} from '@kondah/http-controller'
import { StrategyService } from '../services/strategy.service'
import {
  AddCommandToStrategyUnitDto,
  ChooseSpawnPointDto,
  CreateStrategyDto,
  CreateStrategyUnitDto,
  RemoveCommandFromStrategyUnitDto,
} from '../dtos'
import { isAuthGuard } from '../guards/is-auth.guard'
import { paramsToInt, validateBody, validateBodyWithParamsToInt } from '../lib'
import { BadRequestException } from '../exceptions'
import { BaseHttpResponse } from '../lib/base-http-response'
import {
  ICreateStrategyResponseDto,
  IGetAllUserStrategiesResponseDto,
  IGetFactionsResponseDto,
  IGetMapsResponseDto,
  IGetStrategyResponseDto,
  ICreateStrategyUnitResponseDto,
  IAddCommandToStrategyUnitResponseDto,
} from '@cohdex/shared'

@Controller('/strategies')
export class StrategyController {
  constructor(private readonly _strategyService: StrategyService) {}

  @Get('/')
  @Middleware(isAuthGuard)
  async index({ req, res }: HttpContext) {
    // @ts-expect-error because kondah does not handle types properly yet.
    const strategies = await this._strategyService.all(req.user.id)
    return res.json(
      new BaseHttpResponse<IGetAllUserStrategiesResponseDto>({
        strategies,
      })
    )
  }

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
    const strategy = await this._strategyService.create(ctx.data).catch((e) => {
      throw new BadRequestException(e.message)
    })

    ctx.res.status(201).json(
      new BaseHttpResponse<ICreateStrategyResponseDto>({
        strategy,
      })
    )
  }

  @Post('/unit')
  @Middleware(isAuthGuard, validateBody(CreateStrategyUnitDto))
  async addUnit(ctx: HttpContext<CreateStrategyUnitDto>) {
    const { id } = await this._strategyService
      .addUnitToStrategy(ctx.data)
      .catch((e) => {
        throw new BadRequestException(e.message)
      })

    ctx.res.json(
      new BaseHttpResponse<ICreateStrategyUnitResponseDto>({
        strategyUnit: {
          id,
        },
      })
    )
  }

  @Post('/command')
  @Middleware(isAuthGuard, validateBody(AddCommandToStrategyUnitDto))
  async addCommandToStrategy(ctx: HttpContext<AddCommandToStrategyUnitDto>) {
    const strategyUnit = await this._strategyService.addCommandToStrategyUnit(
      ctx.data
    )

    return ctx.res.json(
      new BaseHttpResponse<IAddCommandToStrategyUnitResponseDto>({
        strategyUnit,
      })
    )
  }

  @Delete('/command/:id')
  @Middleware(
    isAuthGuard,
    validateBodyWithParamsToInt(RemoveCommandFromStrategyUnitDto)
  )
  async removeCommandFromUnit(ctx: HttpContext) {
    await this._strategyService.removeCommandFromStrategyUnit(ctx.data)
    ctx.res.sendStatus(204)
  }

  @Put('/:strategyId/spawnpoint')
  @Middleware(isAuthGuard, validateBodyWithParamsToInt(ChooseSpawnPointDto))
  async updateSpawnpoint(ctx: HttpContext<ChooseSpawnPointDto>) {
    const result = await this._strategyService
      .chooseSpawnpoint(ctx.data)
      .catch((err) => {
        throw new BadRequestException(err.message)
      })

    if (!result) {
      throw new BadRequestException('Could not update spawnpoint')
    }

    return ctx.res.sendStatus(204)
  }

  @Get('/:slug')
  @Middleware(isAuthGuard)
  async show({ req, res }: HttpContext) {
    const strategy = await this._strategyService.findOne(
      // @ts-expect-error because kondah does not handle types properly yet.
      req.user!.id,
      req.params.slug
    )

    return res.json(
      new BaseHttpResponse<IGetStrategyResponseDto>({
        // @ts-ignore
        strategy: strategy,
      })
    )
  }
}
