import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn } from '../lib/helpers'
import ContactPage from './contactPage'
import logoImg from '../images/logo2.png'
import styles from './header.module.css'

const Header = ({ onHideNav, onShowNav, showNav, siteTitle, contactInfo }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logoImg} alt='Logo' />
      <h1 className={styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </h1>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol='hamburger' />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <Link to='/projects/'>Projects</Link>
          </li>
          <li>
            <Link to='/illustrations/'>Illustrations</Link>
          </li>
          <li>
            <Link to='/gallery/'>Gallery</Link>
          </li>
          {/* <li>
            <Link to='/blog/'>Blog</Link>
          </li> */}
          <li>
            <ContactPage contactInfo={contactInfo} />
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Header
