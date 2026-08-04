const basePath = process.env.GITHUB_ACTIONS === "true" ? "/projeto-pitagoricos-site" : "";

export function assetUrl(path: string) {
  return `${basePath}${path}`;
}
