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
        basePath: '/',
        contentPath: 'content',
        logo: '/img/logo.png',
        showDescriptionInSidebar: true,
        gitRepoContentPath: 'https://github.com/pkolt/pkolt_site/tree/master/content/',
        showThemeInfo: false,
        // mdxOtherwiseConfigured: false,
        // flexSearchEngineOptions: {},
      },
    },
  ],
}
