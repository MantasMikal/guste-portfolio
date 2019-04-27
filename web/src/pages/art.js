import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, cn } from '../lib/helpers'
import ImageWithModal from '../components/image/imageWithModal'
import { responsiveTitle2, uppercase } from '../components/typography.module.css'
import ArtPreviewGrid from '../components/art-preview-grid'

export const query = graphql`
  query ArtPageQuery {
    art: allSanityArt(
      limit: 18
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          publishedAt
          id
          title
          artwork {
            alt
            caption
            asset{
              fluid(maxWidth: 1000, maxHeight: 1000){
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`

const Art = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const artNodes = data && data.art && mapEdgesToNodes(data.art)
  return (
    <Layout>
      <SEO title='Art' />
      <Container>
        <h1 className={cn(responsiveTitle2, uppercase)}>Art</h1>
        <ArtPreviewGrid media={artNodes} />
      </Container>
    </Layout>
  )
}

export default Art
