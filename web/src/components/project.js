import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { Link } from 'gatsby'
import { cn } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import { makeComponents } from '../templates/dynamicComponents'
import typography from './typography.module.css'
import styles from './project.module.css'

class Project extends React.Component {
  componentWillMount () {
    this.components = makeComponents(this.props._rawContent)
  }

  render () {
    const {
      _rawBody,
      _rawContent,
      title,
      categories,
      mainImage,
      members,
      publishedAt,
      relatedProjects
    } = this.props
    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.mainContent}>
            <h1 className={cn(styles.title, typography.uppercase)}>{title}</h1>
            {this.components}
            <div style={{ borderTop: '1px solid black', width: '100%', marginTop: '1em' }} />
            <div>
              {_rawBody && <BlockContent blocks={_rawBody || []} />}
            </div>
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
