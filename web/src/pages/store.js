import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProductPreviewGrid from '../components/product/product-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { CurrencyContext } from '../context/currency-context'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, cn } from '../lib/helpers'
import { responsiveTitle3, uppercase, border } from '../components/typography.module.css'
import Cart from '../components/snipcart/cart'
import CurrencySelector from '../components/currency-selector/currency-selector'

export const query = graphql`
  query StorePageQuery {
    products: allSanityProduct(limit: 20, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          title
          price
          discount
          quantity
          slug {
            current
          }
          mainImage {
            asset {
              url
              fluid(maxWidth: 600) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
        }
      }
    }
  }
`

class Store extends React.Component {
  render() {
    const { data, errors } = this.props
    if (errors) {
      return (
        <Layout>
          <GraphQLErrorList errors={errors} />
        </Layout>
      )
    }
    const productNodes =
      data && data.products && mapEdgesToNodes(data.products).filter(filterOutDocsWithoutSlugs)
    return (
      <Layout>
        <SEO title="Store" />
        {/* <CurrencyProvider> */}
          <CurrencyContext.Consumer>
            {({currency, switchCurrency}) => {
              return (
                <Container>
                  <div className={border} style={{display: 'flex'}}>
                    <h1
                      className={cn(responsiveTitle3, uppercase)}
                      style={{ paddingRight: '1em', margin: 'auto 0', flex: 1 }}
                    >
                      Store
                    </h1>
                    <CurrencySelector currentCurrency={currency} switchCurrency={switchCurrency} />
                    <Cart />
                  </div>
                  {productNodes && productNodes.length > 0 && (
                    <ProductPreviewGrid nodes={productNodes} />
                  )}
                </Container>
            )}
              }
          </CurrencyContext.Consumer>
        {/* </CurrencyProvider> */}
      </Layout>
    )
  }
}

export default Store