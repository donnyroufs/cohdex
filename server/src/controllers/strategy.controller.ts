import { HttpContext } from '@kondah/http-context'
import {
  Controller,
  Delete,
  Get,
  Middleware,
  Patch,
  Post,
  Put,
} from '@kondah/http-controller'
import { StrategyService } from '../services/strategy.service'
import {
  AddCommandToStrategyUnitDto,
  ChooseSpawnPointDto,
  CreateStrategyDto,
  CreateStrategyUnitDto,
  GetOneStrategyDto,
  RemoveCommandFromStrategyUnitDto,
  UpdateStrategyVisibilityDto,
} from '../dtos'
import { IsAuthGuard } from '../guards/is-auth.guard'
import { ValidateBody } from '../lib'
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
import { UpdateStrategyUnitColourDto } from '../dtos/update-strategy-unit-colour.dto'
import { RemoveUnitFromStrategyDto } from '../dtos/remove-unit-from-strategy.dto'

@Controller('/strategies')
export class StrategyController {
  constructor(private readonly _strategyService: StrategyService) {}

  @Get('/')
  @Middleware([IsAuthGuard])
  async index({ req, res }: HttpContext) {
    const strategies = await this._strategyService.all(req.user!.id)
    return res.json(
      new BaseHttpResponse<IGetAllUserStrategiesResponseDto>({
        strategies,
      })
    )
  }

  // api/strategy/iamchets/my-slug
  @Get('/:id/:slug')
  @Middleware([ValidateBody.with(GetOneStrategyDto, true)])
  async show({ req, res, data }: HttpContext<GetOneStrategyDto>) {
    const strategy = await this._strategyService.findOne(data)

    return res.json(
      new BaseHttpResponse<IGetStrategyResponseDto>({
        // @ts-ignore
        strategy: strategy,
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
  @Middleware([IsAuthGuard, ValidateBody.with(CreateStrategyDto)])
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
  @Middleware([IsAuthGuard, ValidateBody.with(CreateStrategyUnitDto)])
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
  @Middleware([IsAuthGuard, ValidateBody.with(AddCommandToStrategyUnitDto)])
  async addCommandToStrategy(ctx: HttpContext<AddCommandToStrategyUnitDto>) {
    const command = await this._strategyService.addCommandToStrategyUnit(
      ctx.data
    )

    return ctx.res.json(
      new BaseHttpResponse<IAddCommandToStrategyUnitResponseDto>({
        command,
      })
    )
  }

  @Patch('/unit/:id/colour')
  @Middleware([
    IsAuthGuard,
    ValidateBody.with(UpdateStrategyUnitColourDto, true),
  ])
  async updateColour(ctx: HttpContext<UpdateStrategyUnitColourDto>) {
    await this._strategyService.updateStrategyUnitColour(ctx.data)

    return ctx.res.sendStatus(204)
  }

  @Delete('/unit/:id')
  @Middleware([IsAuthGuard, ValidateBody.with(RemoveUnitFromStrategyDto, true)])
  async removeUnitFromStrategy(ctx: HttpContext<RemoveUnitFromStrategyDto>) {
    await this._strategyService.removeUnitFromStrategy(ctx.data)

    ctx.res.sendStatus(204)
  }

  @Delete('/command/:id')
  @Middleware([
    IsAuthGuard,
    ValidateBody.with(RemoveCommandFromStrategyUnitDto, true),
  ])
  async removeCommandFromUnit(ctx: HttpContext) {
    await this._strategyService.removeCommandFromStrategyUnit(ctx.data)
    ctx.res.sendStatus(204)
  }

  @Patch('/:strategyId/spawnpoint')
  @Middleware([IsAuthGuard, ValidateBody.with(ChooseSpawnPointDto, true)])
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

  @Patch('/:id/visibility')
  @Middleware([
    IsAuthGuard,
    ValidateBody.with(UpdateStrategyVisibilityDto, true),
  ])
  async updateVisibility(ctx: HttpContext<UpdateStrategyVisibilityDto>) {
    await this._strategyService.updateStrategyVisibility(ctx.data)

    return ctx.res.sendStatus(204)
  }
}
