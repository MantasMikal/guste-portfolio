import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { cn } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import Image from './image/image'
import { makeComponents } from '../templates/dynamicComponents'
import typography from './typography.module.css'
import styles from './blog-post.module.css'

class BlogPost extends React.Component {
  componentWillMount () {
    this.components = makeComponents(this.props._rawContent)
  }

  render () {
    console.log('Produced components: ', this.components)
    const { _rawBody, authors, categories, title, mainImage, publishedAt } = this.props
    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.mainContent}>
            <h1 className={cn(styles.title, typography.uppercase)}>{title}</h1>
            {this.components}
            <div style={{ borderTop: '1px solid black', width: '100%', marginTop: '1em' }} />
            {_rawBody && <BlockContent blocks={_rawBody} className={typography.paragraphLimited} />}
            <div style={{ borderTop: '1px solid black', width: '100%' }} />
          </div>
        </Container>
      </article>
    )
  }
}

export default BlogPost
