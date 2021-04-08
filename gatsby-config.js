module.exports = {
  siteMetadata: {
    title: 'Заметки разработчика',
    description: '',
    author: 'Pavel Koltyshev',
    siteUrl: `https://pkolt.ru`,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-code-notes',
      options: {
        contentPath: 'content',
        basePath: '/',
        gitRepoContentPath: 'https://github.com/pkolt/pkolt_site/tree/master/content/',
        showDescriptionInSidebar: true,
        showThemeInfo: false,
        logo: '/img/logo.png',
        showDate: true,
      },
    },
    {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        // The ID of yandex metrika.
        trackingId: 42089099,
        // Enabled a webvisor. The default value is `false`.
        webvisor: false,
        // Enables tracking a hash in URL. The default value is `false`.
        trackHash: false,
        // Defines where to place the tracking script - `false` means before body (slower loading, more hits)
        // and `true` means after the body (faster loading, less hits). The default value is `false`.
        afterBody: true,
        // Use `defer` attribute of metrika script. If set to `false` - script will be loaded with `async` attribute.
        // Async enables earlier loading of the metrika but it can negatively affect page loading speed. The default value is `false`.
        defer: false,
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        createLinkInHead: false,
        addUncaughtPages: false,
      },
    },
    'gatsby-plugin-robots-txt',
  ],
}
