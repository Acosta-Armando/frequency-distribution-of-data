export interface DirectDataFrequency {
  X: number
  f: number
  F?: number
  h?: number
  p?: number
  H?: number
  P?: number | string
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
  Xm: number
  fxXm: number
  XmminProd?: number
  XmminProd2?: number
  fXmminProd2?: number
}
