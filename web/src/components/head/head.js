import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import schemaGenerator from '../../lib/schemaGenerator'

const Head = ({
  title,
  siteDescription,
  siteUrl,
  pageTitle,
  pageTitleFull = pageTitle ? `${title}: ${pageTitle}` : title,
  themeColor,
  social,
  logo,
  location,
  canonical = siteUrl + (location.pathname || '')
}) => {
  return (
    <Helmet>
      <html lang='en' />
      <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
      <meta content='width=device-width,initial-scale=1.0,user-scalable=yes' name='viewport' />

      <meta content={title} name='apple-mobile-web-app-title' />
      <meta content={pageTitleFull} property='og:title' />
      <meta content={pageTitleFull} name='twitter:title' />
      <title>{pageTitleFull}</title>

      <meta content={siteDescription} name='description' />
      <meta content={siteDescription} property='og:description' />
      <meta content={siteDescription} name='twitter:description' />

      <meta content='yes' name='apple-mobile-web-app-capable' />
      <meta content='black-translucent' name='apple-mobile-web-app-status-bar-style' />
      <meta content={themeColor} name='theme-color' />
      <meta content={title} name='application-name' />
      <meta content='website' property='og:type' />
      <meta content={title} property='og:site_name' />
      <meta content={pageTitleFull} name='twitter:text:title' />
      <meta content={canonical} property='og:url' />
      <meta content={canonical} name='twitter:url' />
      <link rel='canonical' href={canonical} />
      <meta content={logo} property='og:image' />
      <meta content='1024' property='og:image:width' />
      <meta content='512' property='og:image:height' />
      <meta content={logo} name='twitter:image' />
      <meta content='1024' name='twitter:image:width' />
      <meta content='512' name='twitter:image:height' />
      <meta content={logo} property='og:image' />
      <meta content='1024' property='og:image:width' />
      <meta content='512' property='og:image:height' />

      <link href='/manifest.json' rel='manifest' />

      <link rel='stylesheet' href='https://use.typekit.net/ehl7qpa.css' />
      <script type='application/ld+json'>
        {JSON.stringify(
          schemaGenerator({
            location,
            canonical,
            siteUrl,
            pageTitle,
            title,
            pageTitleFull
          })
        )}
      </script>
    </Helmet>
  )
}
export default props => (
  <StaticQuery
    query={graphql`
      query SiteSettings {
        allSanitySiteSettings {
          nodes {
            title
            titleShort
            description
            siteUrl
            themeColor
            backgroundColor
            logo {
              asset {
                url
                label
                id
                size
                url
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Location>
        {({ location }) => {
          return (
            <Head
              {...data.allSanitySiteSettings.nodes}
              logo={data.allSanitySiteSettings.nodes[0].logo.asset.url}
              {...props}
              location={location}
            />
          )
        }}
      </Location>
    )}
  />
)
