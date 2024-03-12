export function resolveAssets(dir: string, name: string, type: string) {
  return `${import.meta.env.BASE_URL}/${dir}/${name}.${type}`
}
