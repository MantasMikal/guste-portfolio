import React, { useState, useEffect } from 'react'
import _debounce from 'lodash/debounce'

import styles from './masonry-layout.module.css'
import PropTypes from 'prop-types'

function getColCount (width) {
  if (width > 750) {
    if (width > 900) {
      return 3
    } else return 2
  } else return 1
}

export default function MasonryLayout (props) {

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = _debounce(() => {
      setWidth(window.innerWidth)
    }, 100)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const columnWrapper = {}
  const result = []
  let colCount = getColCount(width)
  // create columns
  for (let i = 0; i < colCount; i++) {
    columnWrapper[`column${i}`] = []
  }

  // divide children into columns
  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % colCount
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${props.gap}px` }} key={`column-${columnIndex}-${i}`}>
        {props.children[i]}
      </div>
    )
  }
  // wrap children in each column with a div
  for (let i = 0; i < colCount; i++) {
    result.push(
      <div
        style={{
          margin: '0 5px',
          flex: 1
        }}
        key={`masonry-column-${i}`}>
        {columnWrapper[`column${i}`]}
      </div>
    )
  }
  console.log(getColCount(width))
  return (
    <div className={styles.masonryLayout}>
      {result}
    </div>
  )
}

MasonryLayout.propTypes = {
  gap: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
}

MasonryLayout.defaultProps = {
  gap: 20
}
