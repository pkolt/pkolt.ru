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
    'gatsby-plugin-sitemap',
  ],
}
