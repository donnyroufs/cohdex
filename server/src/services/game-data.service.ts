import { Injectable } from '@kondah/core'
import { v2 as cloudinary } from 'cloudinary'
import {
  ICloudinaryResponse,
  ICloudinaryResponseUrls,
  IModifiedCloudinaryResource,
  IParsedContent,
  IResult,
} from '../types'
import parser from 'luaparse'
import axios, { AxiosResponse } from 'axios'

@Injectable()
export class GameDataService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  /*
   * scenarioname (for replays)
   * maxplayers
   * version
   * mapsize
   * point_positions
   */
  public async syncMaps() {
    const maps = await this.getMaps()

    for (const map of maps) {
      const file = await axios.get(map.infoUrl)
      const data = this.parseInfoFile(file)
      const tableEntries = (data as any)[0].init[0].fields

      const fieldsToPick = [
        'scenarioname',
        'maxplayers',
        'version',
        'point_positions',
        'mapsize',
      ]

      const fields = tableEntries.filter((entry: any) =>
        fieldsToPick.some((f) => f === entry.key.name)
      )

      const result = fields.reduce((acc: IResult, curr: IParsedContent) => {
        acc.name = map.id
        if (curr.key.name === 'mapsize') {
          // @ts-ignore
          const [h, w] = curr.value.fields
          acc.height = h.value.value
          acc.width = w.value.value

          return acc
        }

        if (curr.key.name === 'scenarioname') {
          acc.scenarioName = this.removeSurroundingQuotesFromRaw(curr.value.raw)
          return acc
        }

        if (curr.key.name === 'point_positions') {
          // @ts-expect-error not typed
          const pointPositions = curr.value.fields.reduce((acc, curr) => {
            const pointPosition = curr.value.fields.reduce(
              (acc: any, curr: any) => {
                const operator = curr.value.operator || ''
                const value = curr.value.argument
                  ? curr.value.argument.value
                  : curr.value.value

                if (curr.key.name === 'ebp_name') {
                  acc.fileName = this.removeSurroundingQuotesFromRaw(
                    curr.value.raw
                  )
                  return acc
                }

                if (curr.key.name === 'owner_id') {
                  acc.ownerId = value
                  return acc
                }

                acc[curr.key.name] = Number(operator + value)

                return acc
              },
              {}
            )

            acc.push(pointPosition)

            return acc
          }, [])

          acc.pointPositions = pointPositions

          return acc
        }

        const value = curr.value.value
          ? curr.value.value
          : this.removeSurroundingQuotesFromRaw(curr.value.raw)
        // @ts-expect-error didnt type this
        acc[curr.key.name] = value

        return acc
      }, {})
      console.log(result)
    }
  }

  private removeSurroundingQuotesFromRaw(raw: string) {
    return raw.substring(1).substring(0, raw.length - 2)
  }

  private parseInfoFile(file: AxiosResponse) {
    return parser.parse(file.data).body
  }

  private async getMaps() {
    const maps = await this.getAllMapImages()
    const metadata = await this.getAllMapMetadata()

    return maps.reduce(
      (acc: ICloudinaryResponseUrls[], curr: IModifiedCloudinaryResource) => {
        const alreadyExists = acc.find((resource) => resource.id === curr.id)

        if (alreadyExists) return acc

        const relatedMetadata = metadata.find(
          (resource) => resource.id === curr.id
        )

        // TODO: Add proper exception
        if (!relatedMetadata) throw new Error('Something happend.')

        const { secure_url: tgaUrl } = curr
        const { secure_url: infoUrl } = relatedMetadata

        acc.push({
          id: curr.id,
          tgaUrl,
          infoUrl,
        })

        return acc
      },
      []
    )
  }

  private async getAllMapImages() {
    const response = (await cloudinary.api.resources({
      type: 'upload',
      prefix: 'maps',
    })) as ICloudinaryResponse

    return this.attachIdToResource(response)
  }

  private async getAllMapMetadata() {
    const response = (await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'raw',
      prefix: 'maps',
    })) as ICloudinaryResponse

    return this.attachIdToResource(response)
  }

  private attachIdToResource(response: ICloudinaryResponse) {
    return response.resources.map((resource) => ({
      ...resource,
      id: resource.public_id.split('/')[1],
    }))
  }
}
