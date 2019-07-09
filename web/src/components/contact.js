import React from 'react'
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa'
import styles from './contact.module.css'
import BlockContent from './block-content'
import typography from './typography.module.css'
import SEO from '../components/seo'

const Contacts = props => {
  const { title, _rawBody } = props.contactInfo
  return (
    <div className={styles.wrapper}>
      <SEO title={title} />
      <h2 className={typography.responsiveTitle1}>{title}</h2>
      <BlockContent blocks={_rawBody || []} />

      <div className={styles.iconGrid}>
        <a
          className={styles.icon}
          href='tel:+447501714439'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaPhone size={'4em'} />
        </a>
        <a
          className={styles.icon}
          href='mailto:guste.vasil@gmail.com, vasilia2@coventry.ac.uk'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaEnvelope size={'4em'} />
        </a>
        <a
          className={styles.icon}
          href='https://www.messenger.com/t/guste.vasiliauskaite'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaFacebook size={'4em'} />
        </a>
        <a
          className={styles.icon}
          href='https://www.instagram.com/vasssil'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaInstagram size={'4em'} />
        </a>
      </div>
    </div>
  )
}

export default Contacts
