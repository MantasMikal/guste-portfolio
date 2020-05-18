import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn } from '../lib/helpers'
import ContactPage from './contactPage'
import logoImg from '../images/logo2.png'
import styles from './header.module.css'

export default class Header extends React.Component {
  render () {
    const { onHideNav, onShowNav, showNav, siteTitle, contactInfo } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          {/* <Link to='/'>
        <img className={styles.logo} src={logoImg} alt='Logo' />
      </Link> */}

          <h1 className={styles.branding}>
            <Link to="/about/">{siteTitle}</Link>
          </h1>

          <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
            <Icon symbol="hamburger" />
          </button>

          <nav className={cn(styles.nav, showNav && styles.showNav)}>
            <ul>
              <div>
                <Link to="/">Projects</Link>
              </div>
              {/* <div>
            <Link to='/illustrations/'>Illustrations</Link>
          </div> */}
              <div>
                <Link to="/gallery/">Gallery</Link>
              </div>
              {/* <div>
                <Link to="/store/">Store</Link>
              </div> */}
              {/* <div>
                <Link to="/store/">Store</Link>
              </div> */}
              {/* <li>
            <Link to='/blog/'>Blog</Link>
          </li> */}
              <div>
                <ContactPage contactInfo={contactInfo} />
              </div>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
