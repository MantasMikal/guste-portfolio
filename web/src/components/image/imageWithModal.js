import React, { Component } from 'react'
import Modal from '../modal/modal'
import Img from 'gatsby-image'
import styles from './imageWithModal.module.css'

// const Overlay = styled('div')`
//     /*  */
// `

// const BigImg = styled(Img)`

//   width: 47rem;
//   margin: auto auto;

//   ${MEDIA.TABLET`
//     width: 52vh;

//   `}

//   ${MEDIA.TABLET`
//     width: 50vh;

//   `}
// `

// const FadeIn = keyframes`
//   0%{
//     opacity: 0;
//   }

//   100%{
//     opacity: 1;
//   }
// `

// const StyledImg = styled(Img)`

//   animation: ${FadeIn} 0.25s ease-in-out;

//   &:hover{
//       filter: ${hoverEffect => hoverEffect.hoverEffect ? `hue-rotate(90deg) contrast(1.1)` : `none`};
//       transition: 0.25s;
//   }
// `

// const Wrapper = styled.div`
//   position: relaitive;
//   height: 100%;
//   display: flex;
//   justify-content: center;
// `

export default class ModalImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   // console.log(this.state.modalIsOpen, nextState.modalIsOpen)
  //   if (this.state.modalIsOpen === nextState.modalIsOpen) {
  //     console.log('NO UPDATE FOR YOU')
  //     console.log('Prev: ', this.state)
  //     console.log("Next: ", nextState)
  //     return false
  //   } else {
  //     console.log('UPDATE')
  //     return true
  //   }
  // }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  render () {
    const image = this.props.image ? this.props.image : ''
    const caption = this.props.caption ? this.props.caption : 'Image '
    return (
      <>
        <div onClick={this.openModal} className={styles.Overlay}>
          <Img fluid={image} alt={caption} className={styles.hoverEffect} />
        </div>

        <Modal isOpen={this.state.modalIsOpen} closeModal={this.closeModal}>
          <div className={styles.wrapper}>
            <Img fluid={image} alt={caption} className={styles.zoomedImage} />
          </div>
        </Modal>
      </>
    )
  }
}
