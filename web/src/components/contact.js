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
      <SEO title="Hi" />

      <div className={styles.grid}>
      <h1 className={styles.title}>Hi!</h1>
        <div className={styles.iconGrid}>
          <a
            className={styles.icon}
            href='tel:+447501714439'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaPhone size={'2em'} />
            <span>+447501714439</span>
          </a>
          <a
            className={styles.icon}
            href='mailto:hi@guste.design'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaEnvelope size={'2em'} />
            <span>Hi@guste.design</span>
          </a>
          <a
            className={styles.icon}
            href='https://www.messenger.com/t/guste.vasiliauskaite'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebook size={'2em'} />
            <span>Guste vasiliauskaite</span>
          </a>
          <a
            className={styles.icon}
            href='https://www.instagram.com/guste.vasiliauskaite'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram size={'2em'} />
            <span>Guste.Vasiliauskaite</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contacts
