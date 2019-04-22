import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'
import ImageWithModal from '../components/image/imageWithModal'
import { responsiveTitle1 } from '../components/typography.module.css'
import Grid from '../components/grid/grid'

export const query = graphql`
  query ArtPageQuery {
    art: allSanityArt(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
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
  console.log(artNodes)
  return (
    <Layout>
      <SEO title='Art' />
      <Container>
        <h1 className={responsiveTitle1}>Art</h1>
        <Grid>
          {
            artNodes.map((item) => {
              // item && item.artwork && item.artwork.asset?
              return (
                <ImageWithModal key={item.id} image={item.artwork.asset.fluid} alt={item.artwork.alt} />
              )
            })
          }
        </Grid>
        {/* {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />} */}
      </Container>
    </Layout>
  )
}

export default Art
