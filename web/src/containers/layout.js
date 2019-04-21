import { graphql, StaticQuery } from 'gatsby'
import React, { useState } from 'react'
import Layout from '../components/layout'

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      footerText
    }
    contact: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
      title
      _rawBody
    }
    # personalInfo: sanityPersonalInfo {
    #   name
    #   address1
    #   address2
    #   zipCode
    #   city
    #   country
    # }
  }
`

function LayoutContainer (props) {
  const [showNav, setShowNav] = useState(false)
  function handleShowNav () {
    setShowNav(true)
  }
  function handleHideNav () {
    setShowNav(false)
  }
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          )
        }
        if (!data.contact) {
          throw new Error(
            'Missing "Contact info". Open the studio at http://localhost:3333 and add "Site settings" data'
          )
        }

        // if (!data.personalInfo) {
        //   throw new Error(
        //     'Missing "Company info". Open the studio at http://localhost:3333 and add "Company info" data'
        //   )
        // }
        return (
          <Layout
            {...props}
            showNav={showNav}
            // personalInfo={data.personalInfo}
            siteTitle={data.site.title}
            footerText={data.site.footerText}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
            contactInfo={data.contact}
          />
        )
      }}
    />
  )
}

export default LayoutContainer
