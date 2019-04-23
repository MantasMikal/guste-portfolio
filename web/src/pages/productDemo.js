import React from 'react'
import Helmet from 'react-helmet'

export default class ProductDemo extends React.Component {
  render () {
    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: 'poop' }]}
          title={'poo'}
          link={[{
            href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
            rel: 'stylesheet',
            type: 'text/css'
          }]}
          script={[{
            type: 'text/javascript',
            url: '',
            id: 'snipcart',
            'data-api-key': 'ODBjMDM3MDItOGY5Zi00Nzk5LWJhYjctMWY2ZDAwMjUxYzA1NjM2OTE2NDM3MjAyODQwODE0',
            src: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js'
          }, {
            type: 'text/javascript',
            src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
          }]} />
        <a
          style={{
            backgroundColor: '#212121',
            borderRadius: '5px',
            color: '#F5F5F5',
            fontWeight: 'bold',
            paddingBottom: '15px',
            paddingTop: '15px',
            paddingRight: '35px',
            paddingLeft: '35px',
            fontSize: '24'
          }}
          id='buyButton'
          href='#'
          className='snipcart-add-item'
          data-item-id='2'
          data-item-name='Bacon'
          data-item-price='3.00'
          data-item-weight='20'
          data-item-url='http://gustevasil.netlify.com/bageDemo'
          data-item-description='Some fresh bacon'>
              Buy bacon
        </a>
      </div>
    )
  }
}
