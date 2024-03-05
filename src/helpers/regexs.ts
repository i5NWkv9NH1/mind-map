export const isUrl = (str: string) => /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(str)
export const isImage = (url: string) => /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(url)

export function isImageUrl(str: string) {
  if (!isUrl(str))
    return false
  if (!isImage(str))
    return false
  return true
}
