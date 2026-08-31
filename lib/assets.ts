const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function assetUrl(path: string) {
  return `${basePath}${path}`;
}
