import React from 'react'
export default class ProductDemo extends React.Component {
  render () {
    return (
      <div>
        <button
          className='snipcart-add-item'
          data-item-id='2'
          data-item-name='Bacon'
          data-item-price='3.00'
          data-item-weight='20'
          data-item-url='https://gustore.netlify.com/productDemo'
          data-item-description='Some fresh bacon'>
        Buy bacon
        </button>
      </div>
    )
  }
}
