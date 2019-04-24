import React from 'react'
import Helmet from 'react-helmet'

export default class ProductDemo extends React.Component {
  render () {
    return (
      <div>
        <Helmet
          link={[
            {
              href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
              rel: 'stylesheet',
              type: 'text/css'
            }
          ]}
          script={[
            {
              type: 'text/javascript',
              url: '',
              id: 'snipcart',
              'data-api-key': 'ODBjMDM3MDItOGY5Zi00Nzk5LWJhYjctMWY2ZDAwMjUxYzA1NjM2OTE2NDM3MjAyODQwODE0',
              src: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js'
            },
            {
              type: 'text/javascript',
              src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
            }
          ]}
        />

        <a
          href='#'
          className='snipcart-add-item'
          data-item-id={1}
          data-item-price={1}
          data-item-name='Baconija'
          data-item-description='Very baconija'
          data-item-url={'http://gustore.netlify.com/productDemo'}
        >
          Buy
        </a>
      </div>
    )
  }
}
