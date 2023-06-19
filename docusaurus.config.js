// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const fs = require('fs');
const path = require('path');

const getMostRecentJournalLink = () => {
  const today = new Date()
  console.log("today :", today)

  today.setDate(today.getDate() + 2)
  console.log("today :", today)

  let file = ''
  while ((file = today.toISOString().split('T')[0])) {
    console.log("file :", file)

    const filePath = path.join(__dirname, 'docs', 'log', file + '.md')
    console.log("filePath :", filePath)

    if (fs.existsSync(filePath)) {
      console.log("filePath success :", file)

      return `docs/log/${file}`
    }
    today.setDate(today.getDate() - 1)

    console.log("today down:", today)

  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Woongcheol Business',
  tagline: '창업에 대한 경험과 지식을 남겨요 🧠',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      // docs: {
      //   sidebar: {
      //     hideable: true,
      //     autoCollapseCategories: false,
      //   },
      // },
      navbar: {
        title: '신웅철',
        logo: {
          alt: 'Woong Cheol Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: getMostRecentJournalLink(),
            label: 'Today',
            position: 'left'
          },
          {
            to: 'docs/startup/intro',
            label: '스타트업',
            position: 'left'
          },
          {
            to: 'docs/develop/intro',
            label: '프로그래밍',
            position: 'left'
          },
          {
            to: 'docs/book/intro',
            label: '독서',
            position: 'left'
          },
          {
            to: 'docs/property/intro',
            label: '부동산',
            position: 'left'
          },
          {
            to: 'docs/product/intro',
            label: '생산성',
            position: 'left'
          },
          {
            href: 'https://github.com/woongcheol',
            position: 'right',
            className: 'navbar-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           to: '/blog',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //       ],
      //     },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
