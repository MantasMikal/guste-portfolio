import React from 'react'
import Image from './image/image'
import BlockContent from './block-content'
import styles from './customer-service.module.css'
import { border } from './typography.module.css'

const CustomerService = ({ _rawBody, title }) => {
  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={border}>
          <h2 className={styles.headline}>{title}</h2>
        </div>
      )}
      <div className={styles.contentWrapper}>
        <BlockContent className={styles.content} blocks={_rawBody} />
      </div>
    </div>
  )
}

CustomerService.propTypes = {}

export default CustomerService
