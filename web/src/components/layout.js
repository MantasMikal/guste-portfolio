import React from 'react'
import Header from './header'
import Head from './head/head'
import '../styles/layout.css'
import styles from './layout.module.css'
import StoreContextProvider from '../provider/StoreContextProvider'
import { Link } from 'gatsby'

import { FaArrowUp } from 'react-icons/fa'
const Layout = ({
  children,
  contactInfo,
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
        <div className={styles.footerNav}>
          <Link to='/customer-service' className={styles.footerNavLink}>
            <span>DELIVERY & RETURNS</span>
          </Link>
        </div>
        <div className={styles.siteInfo}>© {new Date().getFullYear()} GUSTE.DESIGN <br /> <span>All rights reserved</span></div>
      </div>
    </footer>
  </>
)

export default Layout

const ScrollTop = () => {
  return (
    <button
      onClick={() => typeof window !== 'undefined' && window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      className={styles.scrollTop}
      aria-label='Scroll to Top'
    >
      <FaArrowUp size='1.5rem' className={styles.scrollTopIcon} />
    </button>
  )
}
