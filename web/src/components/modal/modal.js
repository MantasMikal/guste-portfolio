import React from 'react'
import PropTypes from 'prop-types'
import styles from './modal.module.css'

const Modal = ({ children, isOpen, closeModal, color }) => {
  return (
    isOpen
      ? <div onClick={closeModal} className={styles.Overlay}>
        <div className={styles.Content}>
          {children}
        </div>
      </div>
      : <></>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool
}

export default Modal
