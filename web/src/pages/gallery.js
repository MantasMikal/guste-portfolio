import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, cn } from '../lib/helpers'
import { responsiveTitle2, uppercase } from '../components/typography.module.css'
import GalleryPreviewLayout from '../components/gallery-preview-layout'

export const query = graphql`
  query GalleryPageQuery {
    gallery: allSanityGallery(limit: 100, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          publishedAt
          id
          title
          mainImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
          _rawExcerpt
          _rawBody(resolveReferences: {maxDepth: 5})
          artworkCategory {
            title
          }
        }
      }
    }

    categories: allSanityArtworkCategory {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

const Gallery = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const galleryNodes = data && data.gallery && mapEdgesToNodes(data.gallery)
  const categories = data && data.categories && mapEdgesToNodes(data.categories)
  return (
    <Layout>
      <SEO title='Gallery' />
      <Container>
        <h1 className={cn(responsiveTitle2, uppercase)}>Gallery</h1>
        <GalleryPreviewLayout categories={categories} nodes={galleryNodes} />
      </Container>
    </Layout>
  )
}

export default Gallery
