import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn } from '../lib/helpers'
import ContactPage from './contactPage'
import logo from '../images/icon.png'
import styles from './header.module.css'

export default class Header extends React.Component {
  render() {
    const { onHideNav, onShowNav, showNav, siteTitle, contactInfo } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          {/* <Link to='/'>
        <img className={styles.logo} src={logoImg} alt='Logo' />
      </Link> */}

          <h1 className={styles.branding}>
            <Link to="/">{siteTitle}</Link>
          </h1>

          <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
            <Icon symbol="hamburger" />
          </button>

          <nav className={cn(styles.nav, showNav && styles.showNav)}>
            <div className={styles.navWrapper}>
                <Link to="/projects">Projects</Link>
                <Link to="/gallery/">Gallery</Link>
                <Link to="/about/">About</Link>
                <ContactPage contactInfo={contactInfo} />
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
