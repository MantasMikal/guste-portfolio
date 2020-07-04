import React from 'react'
import { graphql } from 'gatsby'

import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import CustomerService from '../components/customer-service'

export const query = graphql`
  query CustomerPageQuery {
    page: sanityCustomerServicePage(_id: { regex: "/(drafts.|)customerServicePage/" }) {
      id
      _id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`

const AboutPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data && data.page
  if (!page) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <CustomerService title={page.title} _rawBody={page._rawBody || []} />
      </Container>
    </Layout>
  )
}

export default AboutPage
