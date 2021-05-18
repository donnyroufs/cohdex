import { SteamProfile } from '../../../types'

export class CreateUserDto {
  steamId: string
  avatar: string
  profileUrl: string

  constructor(props: CreateUserDto) {
    this.steamId = props.steamId
    this.avatar = props.avatar
    this.profileUrl = props.profileUrl
  }

  static from(props: SteamProfile) {
    return new CreateUserDto({
      avatar: props._json.avatarfull,
      profileUrl: props._json.profileurl,
      steamId: props._json.steamid,
    })
  }
}
