export type requestRegisterUser = {
  full_name: string
  email: string
  password: string
}

export type requestLoginUser = {
  email: string
  password: string
}

export type requestTVSymbol = {
  s: string
}

export type requestUpdateWatchlist = {
  list: Array<string>
}
