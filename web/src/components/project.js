import { format, distanceInWords, differenceInDays, subYears } from 'date-fns'
import React from 'react'
import { Link } from 'gatsby'
import { cn } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import {RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri'
import styles from './project.module.css'
import { uppercase, responsiveTitle2, border } from './typography.module.css'
class Project extends React.Component {
  render() {
    const {
      _rawBody,
      title
      // categories,
      // publishedAt,
    } = this.props
    const { prev, next, prevTitle, nextTitle } = this.props.pageContext
    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.mainContent}>
            <div className={border} style={{margin: '0 0 0.425em 0'}}>
              <h1 className={cn(styles.title, uppercase)}>{title}</h1>
            </div>
            <div>
              {_rawBody && <BlockContent blocks={_rawBody || []} />}
            </div>
          </div>
          <div className={styles.navWrapper}>

              <Link className={prev ? cn(responsiveTitle2, uppercase) : styles.invisible} to={prev}>
              <div className={styles.navButton}><RiArrowLeftSLine /> Previous</div>
              </Link>


              <Link className={next ? cn(responsiveTitle2, uppercase) : styles.invisible} to={next}>
              <div className={styles.navButton}> Next <RiArrowRightSLine /></div>
              </Link>

          </div>
        </Container>
      </article>
    )
  }
}

export default Project

// Aside - For future reference
/* <aside className={styles.metaContent}>
{publishedAt && (
  <div className={styles.publishedAt}>
    {differenceInDays(new Date(publishedAt), new Date()) > 3
      ? distanceInWords(new Date(publishedAt), new Date())
      : format(new Date(publishedAt), 'MMMM Do YYYY')}
  </div>
)}
{members && <RoleList items={members} title='Authors' />}
{categories && (
  <div className={styles.categories}>
    <h3 className={styles.categoriesHeadline}>Categories</h3>
    <ul>
      {categories.map(category => (
        <li key={category._id}>{category.title}</li>
      ))}
    </ul>
  </div>
)}
{relatedProjects && (
  <div className={styles.relatedProjects}>
    <h3 className={styles.relatedProjectsHeadline}>Related projects</h3>
    <ul>
      {relatedProjects.map(project => (
        <li key={`related_${project._id}`}>
          <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
        </li>
      ))}
    </ul>
  </div>
)}
</aside> */
