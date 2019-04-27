import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, cn } from '../lib/helpers'
import { responsiveTitle2, uppercase } from '../components/typography.module.css'

export const query = graphql`
  query ProjectsPageQuery {
    projects: allSanityProject(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          mainImage {
            alt
            asset {
              _id
              fluid(maxWidth: 1000, maxHeight: 600) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`
const customGridStyle = {
  gridTemplateColumns: '1fr 1fr'
}

const ProjectsPage = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  console.log(data.projects)
  const projectNodes = data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
  return (
    <Layout>
      <SEO title='Projects' />
      <Container>
        <h1 className={cn(responsiveTitle2, uppercase)}>Projects</h1>
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} gridStyle={customGridStyle} />}
      </Container>
    </Layout>
  )
}

export default ProjectsPage
