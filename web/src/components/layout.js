import React from 'react'
import Header from './header'
import Head from './head/head'
import '../styles/layout.css'
import styles from './layout.module.css'
import StoreContextProvider from '../provider/StoreContextProvider'
import { Link } from 'gatsby'

import { FaPinterestP, FaFacebookF } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'
import { IoMdMail } from 'react-icons/io'

const Layout = ({
  children,
  personalInfo,
  contactInfo,
  footerText,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle
}) => (
  <>
    <Head />
    <Header
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
      contactInfo={contactInfo}
    />
    <StoreContextProvider>
      <div className={styles.content}>{children}</div>
    </StoreContextProvider>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerLogo}>GUSTE.DESIGN</div>
        <div className={styles.socialWrapper}>
          <a className={styles.socialLink} href='https://www.pinterest.co.uk/7d92dd8c2b39b140904e223db3da1d/' target='_blank noopener'>
            <FaPinterestP size='2rem' />
          </a>
          <a
            className={styles.socialLink}
            href='https://www.instagram.com/guste.vasiliauskaite'
            target='_blank noopener'
          >
            <TiSocialInstagram size='2rem' />
          </a>
          <a
            className={styles.socialLink}
            href='https://www.messenger.com/t/guste.vasiliauskaite'
            target='_blank noopener'
          >
            <FaFacebookF size='2rem' />
          </a>
          <a className={styles.socialLink} href='mailto:hi@guste.design' target='_blank noopener'>
            <IoMdMail size='2rem' />
          </a>
        </div>
        <div className={styles.siteInfo}>© {new Date().getFullYear()} Guste Design</div>
        <div className={styles.footerNav}>
          <Link to='/' className={styles.footerNavLink}>
            <span>HOME</span>
          </Link>
          <Link to='/contact' className={styles.footerNavLink}>
            <span>CONTACT</span>
          </Link>
          <Link to='/customer-service' className={styles.footerNavLink}>
            <span>CUSTOMER SERVICE</span>
          </Link>
        </div>
      </div>
    </footer>
  </>
)

export default Layout
