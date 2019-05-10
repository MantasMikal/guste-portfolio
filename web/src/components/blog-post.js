// import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { cn } from '../lib/helpers'
import BlockContent from './block-content'
import { Link } from 'gatsby'
import Container from './container'
import { makeComponents } from '../templates/dynamicComponents'
import { uppercase } from './typography.module.css'
import styles from './blog-post.module.css'

class BlogPost extends React.Component {
  componentWillMount () {
    this.components = makeComponents(this.props._rawContent)
  }

  render () {
    const { _rawBody, title, date } = this.props
    const { prev, next } = this.props.pageContext

    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.mainContent}>
            <h1 className={cn(styles.title, uppercase)}>{title}</h1>
            <div className={styles.gridLayout}>
              {_rawBody && (
                <div className={styles.content}>
                  <BlockContent blocks={_rawBody} />
                  <i>{date}</i>
                </div>
              )}
              <div>{this.components}</div>
            </div>
          </div>
          <div className={styles.navWrapper}>
            <Link className={prev ? null : styles.invisible} to={prev}>Previous</Link>
            <Link className={next ? null : styles.invisible} to={next}>Next</Link>
          </div>
          {/* <div style={{ height: '23vh' }} /> */}
        </Container>
      </article>
    )
  }
}

export default BlogPost
