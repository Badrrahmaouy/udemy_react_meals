import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
  const [showDetails, setShowDetails] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const ctx = useContext(CartContext)

  const hasItems = ctx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 })
  }

  const showDetailsHandler = () => {
    setShowDetails(true)
  }

  const hideDetailsHandler = () => {
    setShowDetails(false)
  }

  const submitOrderHandler = async (userData) => {
    try {
      setIsSubmitting(true)
      const response = await fetch(
        'https://react-http-1169f-default-rtdb.firebaseio.com/Orders.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: userData,
            items: ctx.items,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data = await response.json()
      console.log(data)
      setIsSubmitting(false)
      setDidSubmit(true)
      ctx.resetCart()
    } catch (error) {
      console.log(error.message)
    }
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  const cartActions = !showDetails && (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={showDetailsHandler}>
          Order
        </button>
      )}
    </div>
  )

  const cartContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      {cartActions}
      {showDetails && (
        <Checkout
          onCancel={hideDetailsHandler}
          onConfirm={submitOrderHandler}
        />
      )}
    </>
  )

  const isSubmittingContent = <p>Sending order data...</p>

  const didSubmitContent = <p>Successfully sent order!</p>

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartContent}
      {isSubmitting && !didSubmit && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  )
}

export default Cart
