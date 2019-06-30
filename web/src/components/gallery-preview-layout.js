import React from 'react'
import GalleryPreview from './gallery-preview'
import InfiniteScroll from 'react-infinite-scroller'
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

    // console.log("W: ", this.state.width, " H: ", this.state.height)
    return (
      <InfiniteScroll pageStart={0} loadMore={this.loadMore} hasMore={this.state.hasMore} threshold={1250} initialLoad={true}>
        <MasonryLayout gap={20}>
            {posts}
        </MasonryLayout>
      </InfiniteScroll>
    )
  }
}
