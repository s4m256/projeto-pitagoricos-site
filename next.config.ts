import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryBasePath = "/projeto-pitagoricos-site";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? repositoryBasePath : "",
  assetPrefix: isGitHubPages ? repositoryBasePath : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
