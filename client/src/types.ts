export interface IGetMeResponseDto {
  data: {
    user: IUser
  }
}

export interface IUser {
  avatar: string
  profileUrl: string
  steamId: string
}

export interface IAuthState {
  isLoading: boolean
  user: IUser | null
}
