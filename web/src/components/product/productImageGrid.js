/* eslint-disable react/jsx-no-bind */
import React from 'react'
import Grid from '../grid/grid'
import Image from '../image/image'

export default function productImageGrid (props) {
  const { images, handleClick } = props

  return (
    <Grid colCount={4} colWidth='1fr' rowHeight='30%'>
      {
        images && images.map((img, i) => {
          console.log(i)
          return (
            <div key={img.asset.id} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }} onClick={handleClick.bind(this)} imgid={i} />
              <Image fluid={img.asset.fluid} alt={img.asset.alt} imageStyles={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          )
        })
      }
    </Grid>
  )
}
