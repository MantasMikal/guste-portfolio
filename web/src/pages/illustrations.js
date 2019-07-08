import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, cn } from '../lib/helpers'
import { responsiveTitle2, uppercase, border } from '../components/typography.module.css'
import IllustrationsPreviewGrid from '../components/illustrations-preview-grid'

export const query = graphql`
  query IllustrationsPageQuery {
    illustrations: allSanityIllustrations(
      limit: 100
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          publishedAt
          id
          title
          illustration {
            alt
            asset {
              fluid(maxWidth: 1000, maxHeight: 1000) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`

const Illustrations = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const illustrationsNodes = data && data.illustrations && mapEdgesToNodes(data.illustrations)
  return (
    <Layout>
      <SEO title='Illustrations' />
      <Container>
        <h1 className={cn(responsiveTitle2, uppercase, border)}>Illustrations</h1>
        <IllustrationsPreviewGrid media={illustrationsNodes} />
      </Container>
    </Layout>
  )
}

export default Illustrations
