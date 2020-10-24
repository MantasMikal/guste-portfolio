import React from 'react'
import Modal from './modal/modal'
import Contact from './contact'

export default class Nav extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.handleOverlay = this.handleOverlay.bind(this)
  }

  handleOverlay (e) {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <>
        <a onClick={this.handleOverlay} style={{ cursor: 'pointer'}}>
          Contact
        </a>
        <Modal
          isOpen={this.state.isOpen}
          closeModal={this.handleOverlay}
        >
          <Contact contactInfo={this.props.contactInfo} />
        </Modal>
      </>
    )
  }
}
