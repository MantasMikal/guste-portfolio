import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, cn } from '../lib/helpers'
import { responsiveTitle3, uppercase, border } from '../components/typography.module.css'
import GalleryPreviewLayout from '../components/gallery-preview-layout'
import CategoryButton from '../components/button/button'
import { FaFilter } from 'react-icons/fa'
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
          _rawBody(resolveReferences: { maxDepth: 5 })
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

export default class Gallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeFilters: [],
      shouldFilter: false
    }
  }

  handleClick = e => {
    e.preventDefault()
    const category = e.target.getAttribute('cattitle')

    let willAdd = true // If the category does not exist it should add

    //Filter categories and exclude/include recently selected
    const nextActiveFilters = this.state.activeFilters.filter(item => {
      if (item === category) {
        willAdd = false // Same category exist, so dont add
        return false // Remove
      } else {
        return true // Not category we're looking from, add
      }
    })

    if (willAdd) nextActiveFilters.push(category) // Check if category was found and include if not

    this.setState({
      activeFilters: nextActiveFilters
    })
  }

  render() {
    const { data, errors } = this.props

    const galleryNodes = data && data.gallery && mapEdgesToNodes(data.gallery)
    const categories = data && data.categories && mapEdgesToNodes(data.categories)

    //Filter posts if category is seleceted
    const filterdNodes = (() => {
      if (this.state.activeFilters.length > 0) {
        return galleryNodes.filter(post => {
          for (let i = 0; i < post.artworkCategory.length; i++) {
            if (this.state.activeFilters.includes(post.artworkCategory[i].title)) return true
          }
          return false
        })
      } else {
        return galleryNodes
      }
    })()

    if (errors) {
      return (
        <Layout>
          <GraphQLErrorList errors={errors} />
        </Layout>
      )
    }

    // TODO
    // Fix this prototype mess
    return (
      <Layout>
        <SEO title="Gallery" />
        <Container>
          <div
            className={border}
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'space-between'
            }}
          >
            <h1
              className={cn(responsiveTitle3, uppercase)}
              style={{ paddingRight: '1em', margin: 'auto 0', flex: 1 }}
            >
              Gallery
            </h1>
            <div style={{ display: 'flex', margin: '0 0.25em 0' }}>
              <FaFilter style={{ margin: 'auto 0' }} />
            </div>
            <div style={{display: 'flex',               alignContent: 'center',
              justifyContent: 'space-around', flexWrap: 'wrap', paddingRight: '0.125em',  }}>
              {categories.map(category => {
                // Check if filter is active to change its color
                const isActive = this.state.activeFilters.includes(category.title) ? true : false
                return (
                  <CategoryButton
                    isActive={isActive}
                    cattitle={category.title}
                    key={category.id}
                    onClick={this.handleClick}
                  >
                    {category.title}
                  </CategoryButton>
                )
              })}
            </div>
          </div>
          <GalleryPreviewLayout nodes={filterdNodes} />
        </Container>
      </Layout>
    )
  }
}
