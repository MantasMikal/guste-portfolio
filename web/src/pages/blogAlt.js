import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, cn } from '../lib/helpers'
import BlogPostAlt from '../components/blog-post-alt'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import styles from './blogAlt.module.css'
import { makeComponents } from '../templates/dynamicComponents'

import { responsiveTitle2, uppercase } from '../components/typography.module.css'

export const query = graphql`
  query BlogAltPageQuery {
    posts: allSanityPost(limit: 12, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          publishedAt
          mainImage {
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
          _rawBody
          _rawContent(resolveReferences: { maxDepth: 5 })
          slug {
            current
          }
        }
      }
    }
  }
`

export default class BlogPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
       currentPostIdx: 0
    }
  }

  componentWillMount () {
    this.components = makeComponents(this.props._rawContent)
  }

  handleClick = (e) => {
    const nextIdx = e.target.getAttribute('postidx')
    this.setState({
      currentPostIdx: nextIdx
    })
  }

  render () {
    const { data, errors } = this.props
    if (errors) {
      return (
        <Layout>
          <GraphQLErrorList errors={errors} />
        </Layout>
      )
    }

    const postNodes = data && data.posts && mapEdgesToNodes(data.posts)
    const blogView = postNodes[this.state.currentPostIdx]
    console.log("Current post: ", blogView)
    return (
      <Layout>
        <SEO title='Blog' />
        <Container>
          <div className={styles.blogGrid} >
            <div>
              {
                postNodes.map((item, i) => {
                  return (
                    <div postidx={i} onClick={this.handleClick} key={item.id}>{item.title}</div>
                  )
                })
              }
            </div>
            <div>
              <BlogPostAlt {...blogView} />
            </div>
          </div>
        </Container>
      </Layout>
    )
  }
}
