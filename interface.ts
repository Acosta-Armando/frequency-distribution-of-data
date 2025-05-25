export interface DirectDataFrequency {
  X: number
  f: number
  F?: number
  h?: number
  p?: number
  H?: number
  P?: number
  fxX?: number
  XminProd?: number
  XminProd2?: number
  fxminProd2?: number
}

export interface GroupedDataFrequency {
  XiXs: number[]
  LiLs: number[]
  f: number
  F: number
  h: number
  p: number
  H: number
  P: number
}
