import React from 'react'
import GalleryPreview from './gallery-preview'
import LazyLoader from './lazy-loader/lazyLoader'
import MasonryLayout from './masonry/masonry-layout'
export default class GalleryPreviewLayout extends React.Component {
  constructor(props) {
    super(props)

      this.state = {
         loaded: 10,
         amountToLoad: 10,
         hasMore: true,
      }
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
    let posts = []
    const nodes = this.props.nodes
    for(let i = 0; i < this.state.loaded - 1; i++){
      nodes[i] && posts.push(<GalleryPreview item={nodes[i]} key={nodes[i].id} />)
    }

    return (
      <LazyLoader loadMore={this.loadMore} hasMore={this.state.hasMore}>
        <MasonryLayout gap={20}>
        {posts}
        </MasonryLayout>
      </LazyLoader>
    )
  }
}
