export interface BingImageMeta {
  url: string
  date: string
  title: string
  copyright: string
  copyrightlink: string
}

export type BingImageResolution =
  | '4k/UHD'
  | '1920x1200'
  | '1920x1080'
  | '1366x768'
  | '1024x768'
  | '768x1280'
