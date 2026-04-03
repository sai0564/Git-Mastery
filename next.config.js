/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const hasCustomDomain = Boolean(process.env.GITHUB_PAGES_CUSTOM_DOMAIN);
const useRepoBasePath = isGitHubActions && repositoryName && !hasCustomDomain;
const basePath = useRepoBasePath ? `/${repositoryName}` : "";

/** @type {import("next").NextConfig} */
const config = {
    // Static export for GitHub Pages
    output: "export",

    // GitHub project pages are served from /<repo-name>/
    basePath,
    assetPrefix: basePath || undefined,

    // Exported pages work best with folder-style routes
    trailingSlash: true,

    // next/image optimization requires a server runtime
    images: {
        unoptimized: true,
    },

    // Enable React 19 features
    experimental: {
        // Better development experience with server components HMR
        serverComponentsHmrCache: true,
    },
};

export default config;
