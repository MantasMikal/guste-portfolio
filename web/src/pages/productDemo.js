import React from 'react'
export default class ProductDemo extends React.Component {
  render () {
    return (
      <div>
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
          data-item-url='https://gustore.netlify.com/productDemo'
          data-item-description='Some fresh bacon'>
              Buy bacon
        </a>
      </div>
    )
  }
}
