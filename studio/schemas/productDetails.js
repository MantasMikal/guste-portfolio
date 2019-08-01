export default {
  name: 'productDetails',
  title: 'Product Details',
  type: 'object',
  fields: [
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    {
      name: 'instock',
      title: 'In Stock',
      type: 'number'
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string'
    }
  ],
  preview: {
    select: {
      price: 'price',
      instock: 'instock',
      size: 'size'
    },
    prepare ({ price = 'Unpriced', instock = 'Unspecified', size = 'Unspecified' }) {
      return {
        title: `Price: ${price}, In Stock: ${instock} Size: ${size}`
      }
    }
  }
}
