import { Link } from 'gatsby'
import React from 'react'
import ProjectPreview from './project-preview'
import { cn } from '../lib/helpers'
import styles from './project-preview-grid.module.css'
import { border } from './typography.module.css'
function ProjectPreviewGrid (props) {
  const { colCount } = props
  /* TODO FIX THIS NASTY THING */
  const gridStyle = colCount === 2 ? cn(styles.grid, styles.twoColGrid) : styles.grid
  return (
    <div className={styles.root}>
      {props.title && (
        <h2 className={cn(styles.headline, border)}>
          {props.browseMoreHref ? (
            <Link to={props.browseMoreHref}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h2>
      )}
      <ul className={gridStyle}>
        {props.nodes &&
          props.nodes.map((node, idx) => (
            <li key={node.id}>
              <ProjectPreview {...node} index={idx} />
            </li>
          ))}
      </ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>BROWSE MORE</Link>
        </div>
      )}
    </div>
  )
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProjectPreviewGrid
