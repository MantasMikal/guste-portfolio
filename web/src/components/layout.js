import React from 'react'
import Header from './header'
import Head from './head/head'
import '../styles/layout.css'
import styles from './layout.module.css'
import StoreContextProvider from '../provider/StoreContextProvider'

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
        {/* <div className={styles.personalInfo}>
          {personalInfo && (
            <div>
              {personalInfo.name}
              <br />
              {personalInfo.address1}
              <br />
              {personalInfo.address2 && (
                <span>
                  {personalInfo.address2}
                  <br />
                </span>
              )}
              {personalInfo.zipCode} {personalInfo.city}
              {personalInfo.country && <span>, {personalInfo.country}</span>}
            </div>
          )}
        </div> */}
        <div className={styles.siteInfo}>
          © {new Date().getFullYear()} {footerText}
        </div>
      </div>
    </footer>
  </>
)

export default Layout
