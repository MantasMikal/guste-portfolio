import React from 'react'
import ImageWithModal from './image/imageWithModal'
import CategoryButton from './button/category-button'
import styles from './art-preview-grid.module.css'

// Filters art gallery items by category and returns
// Array of artwork nodes
const filterArt = (tag, list) => {
  // Return if no tag selected
  if(!tag){
    return list
  }

  return list.filter((item) => {
    let categoryList = item.artworkCategory

    for(item in categoryList){
      const title = categoryList[item].title

      if (title === tag) {
        return title
      }
    }
  })
}

// Takes in artwork nodes and returns list of components
const generate = (list) => {
  return list.map(item => {
    return (
      <ImageWithModal key={item.id} image={item.artwork.asset.fluid} alt={item.artwork.alt} />
    )
  })
}

export default class ArtPrieviewGrid extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      galleryItems: []
    }
  }

  componentWillMount () {
    this.setState({
      galleryItems: filterArt(null, this.props.media)
    })
  }

  // Filters gallery on click
  handleClick = (e) => {
    e.preventDefault()
    const category = e.target.getAttribute('cattitle')
    this.setState({
      galleryItems: filterArt(category, this.props.media)
    })
  }

  render () {
    const { categories } = this.props
    let art = generate(this.state.galleryItems)
    return (
      <div>
        {
          categories.map((item) => {
            return (
              <CategoryButton cattitle={item.title} key={item.id} onClick={this.handleClick}>{item.title}</CategoryButton>
            )
          })
        }
        <div className={styles.grid}>
          {art}
        </div>

      </div>
    )
  }
}
