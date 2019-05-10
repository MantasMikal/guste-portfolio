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
    console.log('PREV', prev, 'Next', next)
    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.mainContent}>
            <h1 className={cn(styles.title, uppercase)}>{title}</h1>
            <div className={styles.gridLayout}>
              <div>{this.components}</div>
              {_rawBody && (
                <div className={styles.content}>
                  <BlockContent blocks={_rawBody} />
                  <i>{date}</i>
                </div>
              )}
            </div>
          </div>
          <Link to={prev || '#'}>Previous</Link>
          <Link to={next || '#'}>Next</Link>
          <div style={{ height: '23vh' }} />
        </Container>
      </article>
    )
  }
}

export default BlogPost
