import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Cart from '../components/Cart'

const StorePage = () => {
  return (
    <Layout>
      <SEO title='Cart' />
      <Container>
        <Cart />
      </Container>
    </Layout>
  )
}

export default StorePage
