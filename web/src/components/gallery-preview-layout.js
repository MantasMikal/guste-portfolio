import React from 'react'
import ZoomableImage from './image/zoomableImage'
// import CategoryButton from './button/category-button'
import styles from './gallery-preview-layout.module.css'
import { responsiveTitle3 } from './typography.module.css'
import { makeMediaComponent } from '../templates/dynamicComponents'
import BlockContent from '../components/block-content'
import { cn } from '../lib/helpers'
// Filters art gallery items by category and returns
// Array of artwork nodes
// const filterArt = (tag, list) => {
//   // Return if no tag selected
//   if (!tag) {
//     return list
//   }

//   return list.filter(item => {
//     let categoryList = item.artworkCategory

//     for (item in categoryList) {
//       const title = categoryList[item].title

//       if (title === tag) {
//         return title
//       }
//     }
//   })
// }

// Takes in artwork nodes and returns list of components
const generate = list => {
  return list.map(item => {
    if (item._rawBody) {
      return (
        <div className={styles.itemWrapper} key={item.id}>
          <h1 className={cn(responsiveTitle3, styles.title)}>{item.title}</h1>
          <div className={styles.item}>
            <BlockContent blocks={item._rawBody || []} />
          </div>
        </div>
      )
    }
  })
}

export default class GalleryPreviewLayout extends React.Component {
  render () {
    const art = generate(this.props.nodes)
    console.log(this.props.nodes)
    return (
      <>
        <div className={styles.masonry}>{art}</div>
      </>
    )
  }
}
