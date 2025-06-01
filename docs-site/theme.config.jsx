export default {
  logo: <span style={{ fontWeight: 'bold' }}>Yamify Documentation</span>,
  project: {
    link: 'https://github.com/yamify-org/yamify',
  },
  docsRepositoryBase: 'https://github.com/yamify-org/yamify/tree/main/docs-site',
  footer: {
    text: `© ${new Date().getFullYear()} Yamify - All rights reserved.`,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Yamify Docs'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Yamify: Official Documentation" />
      <meta name="og:title" content="Yamify Documentation" />
    </>
  ),
  navigation: {
    prev: true,
    next: true
  },
  toc: {
    float: true
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent: ({ title, type }) => {
      return <>{title}</>
    }
  },
  darkMode: true
}
