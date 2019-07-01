import React from 'react'
import GalleryPreview from './gallery-preview'
import LazyLoader from './lazy-loader/lazyLoader'
import MasonryLayout from './masonry/masonry-layout'
import CategoryButton from './button/button'
import styles from './gallery-preview-layout.module.css'
export default class GalleryPreviewLayout extends React.Component {
  constructor(props) {
    super(props)

      this.state = {
         loaded: 10,
         amountToLoad: 10,
         hasMore: true,
         activeFilters: [],
         filterOn: false
      }
    }

    handleClick = e => {
      e.preventDefault()
      const category = e.target.getAttribute('cattitle')

      let willAdd = true // If the category does not exist it should add
      // Filter categories and exclude/include recently selected
      const nextActiveFilters = this.state.activeFilters.filter((item) => {
        if(item === category){
          willAdd = false // Same category exist, so dont add
          return false // Remove
        }else {
          return true // Not category we're looking from, add
        }
      })

      if(willAdd) nextActiveFilters.push(category) // Check if category was found and include if not
        const shouldFilter = nextActiveFilters.length > 0 ? true : false
      this.setState({
        activeFilters: nextActiveFilters,
        filterOn: shouldFilter
      })
    }

    loadMore = () => {
      const postsLeft = this.props.nodes.length - this.state.loaded // Posts left
      const totalAmount = this.state.loaded + this.state.amountToLoad // Total amount of posts to load

      if(postsLeft > 0){
          this.setState({
              loaded: totalAmount,
              hasMore: true
          })
      }else {
          this.setState({
              hasMore: false
          })
      }
  }

  render () {
    const posts = []
    let nodes = this.props.nodes
    const { categories } = this.props

    //Filter if filters selected
    if(this.state.filterOn){
      nodes = nodes.filter(post => {
        for(let i = 0; i < this.state.activeFilters.length; i++){
          for(let j = 0; j < post.artworkCategory.length; j++){
            if(post.artworkCategory[j].title === this.state.activeFilters[i]) return true
          }
        }
        return false
      })
    }

    for(let i = 0; i < this.state.loaded - 1; i++){
      nodes[i] && posts.push(<GalleryPreview item={nodes[i]} key={nodes[i].id} />)
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.categoryWrapper}>
        {categories.map(item => {
            // Check if filter is active to change its color
            let isActive = false
            this.state.activeFilters.forEach((category) => {
              if(category === item.title) isActive = true
            })

            return (
              <CategoryButton
                isActive={isActive}
                cattitle={item.title}
                key={item.id}
                onClick={this.handleClick}
              >
                {item.title}
              </CategoryButton>
            )
          })}
        </div>
        <LazyLoader loadMore={this.loadMore} hasMore={this.state.hasMore}>
          <MasonryLayout gap={10}>
          {posts}
          </MasonryLayout>
        </LazyLoader>
      </div>
    )
  }
}
