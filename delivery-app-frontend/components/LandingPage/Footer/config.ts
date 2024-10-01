interface FooterRoute {
  name: string
  path?: string
}

export const footerLinks1: FooterRoute[] = [
  {
    name: 'Platform'
  },
  {
    name: 'Resources'
  },
  {
    name: 'Plans & Pricing',
    path: '/'
  },
  {
    name: 'Documentation',
    path: '/'
  },
  {
    name: 'Features',
    path: '/'
  },
  {
    name: 'Source Code',
    path: '/'
  },
  {
    name: 'Customer Service',
    path: '/'
  },
  {
    name: 'Project Guidelines',
    path: '/'
  }
]

export const footerLinks2: FooterRoute[] = [
  {
    name: 'Terms Of Service',
    path: '/terms-of-service'
  },
  {
    name: 'Privacy Notice',
    path: '/privacy-notice'
  },
  {
    name: 'Cookies',
    path: '/cookies'
  }
]
