/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://fleetx.ae", // tumhari live domain
  generateRobotsTxt: true, // robots.txt generate karega
  sitemapSize: 7000, // optional
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/fleetxmng/*", "/api/*"], // yahan private routes block karwa lo
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://fleetx.ae/sitemap.xml", // agar multiple sitemaps ho
    ],
  },
};
