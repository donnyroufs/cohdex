export interface SteamProfile {
  provider: string
  _json: JSON
  id: string
  displayName: string
  photos: Photo[]
}

export interface JSON {
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  commentpermission: number
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  lastlogoff: number
  personastate: number
  primaryclanid: string
  timecreated: number
  personastateflags: number
  loccountrycode: string
}

export interface Photo {
  value: string
}

export type ErrorDetail<T> = string | T

export type DoneFn = (
  err: any,
  user?: false | Express.User | null | undefined
) => void
export interface ICloudinaryResponse {
  resources: ICloudinaryResource[]
  rate_limit_allowed: number
  rate_limit_reset_at: Date
  rate_limit_remaining: number
}

export interface ICloudinaryResource {
  asset_id: string
  public_id: string
  format: string
  version: number
  resource_type: string
  type: string
  created_at: Date
  bytes: number
  width: number
  height: number
  url: string
  secure_url: string
}

export interface IModifiedCloudinaryResource extends ICloudinaryResource {
  id: string
  metadataUrl?: string
}

export interface ICloudinaryResponseUrls {
  id: string
  tgaUrl: string
  infoUrl: string
}
