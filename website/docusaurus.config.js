module.exports = {
  title: 'Shady',
  tagline: 'A fast, scalable, distributed game server solution for Golang',
  url: 'https://shady.tiennv147.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tiennv147', // Usually your GitHub org/user name.
  projectName: 'shady', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Shady',
      logo: {
        alt: 'Shady Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs',
            },
            {
              label: 'Related Articles',
              to: 'docs/related-articles',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/shady',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/sF3phkVN6k',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/tiennv147/shady',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} tiennv147. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/tiennv147/shady/edit/master/docs/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/tiennv147/shady/edit/master/docs/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
