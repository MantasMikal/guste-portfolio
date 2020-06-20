import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Product from '../components/product/product'
import SEO from '../components/seo'
import Layout from '../containers/layout'

const ProductTemplate = props => {
  const { data, errors } = props
  const product = data && data.product
  
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {product && <SEO title={product.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {product && <Product product={product} />}
    </Layout>
  )
}

export const query = graphql`
  query($handle: String!) {
    product: shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        priceV2 {
            amount
            currencyCode
          }
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductTemplate
