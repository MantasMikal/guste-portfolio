import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import Slider from '../components/slider/slider'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }

    projects: allSanityProject(limit: 6, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          publishedAt
          mainImages {
            alt
            asset {
              id
              fluid(maxHeight: 165, maxWidth: 290) {
                ...GatsbySanityImageFluid
              }
            }
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }

    # posts: allSanityPost(limit: 4, sort: { fields: [publishedAt], order: DESC }) {
    #   edges {
    #     node {
    #       id
    #       publishedAt
    #       mainImage {
    #         alt
    #         asset {
    #           fluid(maxWidth: 500) {
    #             ...GatsbySanityImageFluid
    #           }
    #         }
    #       }
    #       title
    #       _rawExcerpt
    #       slug {
    #         current
    #       }
    #     }
    #   }
    # }

    # slides: allSanitySlide {
    #   edges {
    #     node {
    #       title
    #       _rawBody(resolveReferences: { maxDepth: 5 })
    #     }
    #   }
    # }
  }
`

const IndexPage = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  // const postNodes = (data || {}).posts
  //   ? mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs)
  //   : []
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
    : []
  // const slideNodes = (data || {}).slides ? mapEdgesToNodes(data.slides)
  //   : []
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }
  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {/* <Slider slides={slideNodes} /> */}
        {projectNodes && (
          <ProjectPreviewGrid
            title="Latest projects"
            nodes={projectNodes}
            browseMoreHref="/projects/"
          />
        )}
        <div style={{ height: '5vw' }} />
        {/* {postNodes && (
          <BlogPostPreviewGrid
            title='Latest blog posts'
            nodes={postNodes}
            browseMoreHref='/blog/'
          />
        )} */}
      </Container>
    </Layout>
  )
}

export default IndexPage
