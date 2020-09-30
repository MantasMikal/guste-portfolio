import React from 'react'
import Header from './header'
import Head from './head/head'
import '../styles/layout.css'
import styles from './layout.module.css'
import StoreContextProvider from '../provider/StoreContextProvider'
import { Link } from 'gatsby'

import { FaPinterestP, FaFacebookF, FaArrowUp } from 'react-icons/fa'
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
    <ScrollTop />
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        {/* <div className={styles.footerLogo}>GUSTE.DESIGN</div> */}
        <div className={styles.footerNav}>
          <Link to="/customer-service" className={styles.footerNavLink}>
            <span>DELIVERY & RETURNS</span>
          </Link>
        </div>
        <div className={styles.siteInfo}>© {new Date().getFullYear()} GUSTE.DESIGN</div>
      </div>
    </footer>
  </>
)

export default Layout

const ScrollTop = () => {
  return (
    <button
      onClick={() => typeof window !== 'undefined' && window.scrollTo(0, 0)}
      className={styles.scrollTop}
    >
      <FaArrowUp size="1.5rem" className={styles.scrollTopIcon} />
    </button>
  )
}
