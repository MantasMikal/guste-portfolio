import React from 'react'
import { FaBehanceSquare, FaEnvelope, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import styles from './contact.module.css'
import SEO from '../components/seo'

const Contacts = props => {
  const { title, _rawBody } = props.contactInfo
  return (
    <div className={styles.wrapper}>
      <SEO title='About' />

      <div className={styles.grid}>
        <h1 className={styles.title}>Hi!</h1>
        <div className={styles.iconGrid}>
          <a
            className={styles.icon}
            href='mailto:hi@guste.design'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaEnvelope size='2em' />
          </a>
          <a
            className={styles.icon}
            href='https://www.instagram.com/guste.design'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagramSquare size='2em' />
          </a>
          <a
            className={styles.icon}
            href='https://www.behance.net/GusteDesign'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaBehanceSquare size='2em' />
          </a>
          <a
            className={styles.icon}
            href='https://www.linkedin.com/in/guste-vasil/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin size='2em' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contacts
