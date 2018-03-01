import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import marked from 'marked'

const renderer = new marked.Renderer()

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/containers/Home',
    },
    {
      path: '/lodash',
      component: 'src/containers/Lodash',
    },
    {
      path: '/lodash/missing',
      component: 'src/containers/LodashMissing',
    },
    {
      path: '/css',
      component: 'src/containers/Css',
    },
  ],
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta name="description" content="A collection of &quot;You might not need&quot; resources" />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
  webpack: [config => {
    config.module.rules.push({
      test: /\/content\/(.*).js$/,
      use: 'raw-loader',
    })

    config.module.rules[0].oneOf.unshift({
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader',
        },
        {
          loader: 'markdown-loader',
          options: {
            renderer,
          },
        },
      ],
    })

    return config
  }],
}