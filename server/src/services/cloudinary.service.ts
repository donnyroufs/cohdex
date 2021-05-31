import { Injectable } from '@kondah/core'
import { v2 as cloudinary } from 'cloudinary'
import {
  ICloudinaryResponse,
  ICloudinaryResponseUrls,
  IModifiedCloudinaryResource,
} from '../types'

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  public async getMaps() {
    const maps = await this.getAllMapImages()
    const metadata = await this.getAllMapMetadata()

    return maps.reduce(
      (acc: ICloudinaryResponseUrls[], curr: IModifiedCloudinaryResource) => {
        const alreadyExists = acc.find((resource) => resource.id === curr.id)

        if (alreadyExists) return acc

        const relatedMetadata = metadata.find(
          (resource) => resource.id === curr.id
        )

        if (!relatedMetadata) throw new Error('fkin broke')

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
