import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import BlogPost from '../components/blog-post'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
      _rawContent(resolveReferences: { maxDepth: 5 })
      title
      slug {
        current
      }
      _rawBody
    }
  }
`

const BlogPostTemplate = props => {
  const { data, errors } = props
  const post = data && data.post
  const date = post.publishedAt.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {post && <SEO title={post.title || 'Untitled'} />}
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {post && <BlogPost {...post} pageContext={props.pageContext} date={date} />}
    </Layout>
  )
}

export default BlogPostTemplate
