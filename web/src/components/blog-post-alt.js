// import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { cn } from '../lib/helpers'
import BlockContent from './block-content'
import { Link } from 'gatsby'
import Container from './container'
import { makeComponents } from '../templates/dynamicComponents'
import { uppercase, responsiveText1 } from './typography.module.css'
import styles from './blog-post.module.css'

class BlogPost extends React.Component {

  componentWillMount () {
    console.log("Mounting blog...")
    this.components = makeComponents(this.props._rawContent)
  }

  componentWillReceiveProps () {
    console.log("Receiving new Props!")
    this.components = makeComponents(this.props._rawContent)
  }

  render () {
    // console.log("Blog rerender")
    // console.log("Components: ", this.components)
    const { _rawBody, title, date } = this.props

    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.mainContent}>
            <h1 className={cn(styles.title, uppercase)}>{title}</h1>
            <div>{this.components}</div>
            {_rawBody && (
              <div className={styles.content}>
                <BlockContent blocks={_rawBody} />
                <i>{date}</i>
              </div>
            )}
          </div>
        </Container>
      </article>
    )
  }
}

export default BlogPost
