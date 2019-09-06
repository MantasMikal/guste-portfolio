import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, cn } from '../lib/helpers'
import { responsiveTitle3, uppercase, border } from '../components/typography.module.css'

export const query = graphql`
  query ProjectsPageQuery {
    projects: allSanityProject(limit: 12, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          title
          _rawExcerpt
          slug {
            current
          }
          mainImages {
            alt
            asset {
              fluid(maxWidth: 1000, maxHeight: 600) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`

const ProjectsPage = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
  return (
    <Layout>
      <SEO title='Projects' />
      <Container>
        <div className={border}> 
          <h1 className={cn(responsiveTitle3, uppercase)} style={{margin: '0.125em 0 0 0'}}>Projects</h1>
        </div>
        {projectNodes && projectNodes.length > 0 && (
          <ProjectPreviewGrid nodes={projectNodes} colCount={3} />
        )}
      </Container>
    </Layout>
  )
}

export default ProjectsPage
