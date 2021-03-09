module.exports = {
  siteMetadata: {
    title: 'Заметки разработчика',
    description: '',
    author: 'Pavel Koltyshev',
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
  ],
}
