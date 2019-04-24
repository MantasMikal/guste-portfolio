import React from 'react'
export default class ProductDemo extends React.Component {
  render () {
    return (
      <div>
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

        <a
          href='#'
          className='snipcart-add-item'
          data-item-id={1}
          data-item-price={1}
          data-item-name='Baconija'
          data-item-description='Very baconija'
          data-item-url={'http://gustore.netlify.com/productDemo'}
        >
          Buy2
        </a>
      </div>
    )
  }
}
