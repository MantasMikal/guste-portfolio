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
import { FaArrowRight } from 'react-icons/fa'
import styles from './gallery.module.css'

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
    const firstCategory = this.props.data.categories.edges[0].node.title
    this.state = {
      activeFilter: firstCategory,
      showFilter: true
    }

  }

  handleShowFilter = () => {
    this.setState({showFilter: true})
  }

  handleHideFilter = () => {
    this.setState({showFilter: false})
  }

  handleClick = e => {
    e.preventDefault()
    const category = e.target.getAttribute('cattitle')

    const nextActiveFilter = category !== this.state.activeFilter ? category : null

    this.setState({
      activeFilter: nextActiveFilter
    })
  }

  render() {
    const { data, errors } = this.props
    const galleryNodes = data && data.gallery && mapEdgesToNodes(data.gallery)
    const categories = data && data.categories && mapEdgesToNodes(data.categories)

    //Filter posts if category is seleceted
    const filterdNodes = (() => {
      if (this.state.activeFilter) {
        return galleryNodes.filter(post => {
          for (let i = 0; i < post.artworkCategory.length; i++) {
            if (post.artworkCategory[i].title === this.state.activeFilter) return true
            else return false
          }
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
          <div className={cn(border, styles.wrapper)}>
            <div style={{padding: '0.125em 0 0 0', margin:'0 0 -0.125em 0'}}>
              <h1 className={cn(responsiveTitle3, uppercase, styles.title)}>Gallery</h1>
            </div>
            <div className={styles.filterWrapper}>
              <button onClick={this.state.showFilter ? this.handleHideFilter : this.handleShowFilter}  className={styles.iconWrapper}>
                <FaFilter style={{ margin: 'auto 0'}} />
                <FaArrowRight className={this.state.showFilter ? styles.closeBtn : styles.hide} />
              </button>
              <div className={this.state.showFilter ? styles.categoryWrapper : styles.hide}>
                {categories.map(category => {
                  // Check if filter is active to change its color
                  const isActive = this.state.activeFilter === category.title
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
          </div>

          <GalleryPreviewLayout nodes={filterdNodes} />
        </Container>
      </Layout>
    )
  }
}
