import reactDom from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = (props) => (
  <div className={classes.backdrop} onClick={props.onClose} />
)

const ModalOverlay = (props) => (
  <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
)

const portalElement = document.getElementById('modal-root')

const Modal = (props) => (
  <>
    {reactDom.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
    {reactDom.createPortal(
      <ModalOverlay>{props.children}</ModalOverlay>,
      portalElement,
    )}
  </>
)

export default Modal
