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

export interface IValidationError {
  value: string
  property: string
  children: unknown[]
  constraints: {
    [key: string]: string
  }
}

export interface IValidationErrorResponse {
  property: string
  messages: Record<string, string>
}
