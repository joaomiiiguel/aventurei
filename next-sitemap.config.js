/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://aventurei.com',
    generateRobotsTxt: false, // We are using app/robots.ts
    sitemapSize: 7000,
    exclude: ['/server-sitemap.xml'], // Example exclusion
    // outDir: './out', // Only if using static export
}
