/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://centerhub.netlify.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/api/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/sobre'),
    await config.transform(config, '/como-funciona'),
    await config.transform(config, '/para-comerciantes'),
    await config.transform(config, '/para-entregadores'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://centerhub.netlify.app/sitemap.xml',
    ],
  },
};
