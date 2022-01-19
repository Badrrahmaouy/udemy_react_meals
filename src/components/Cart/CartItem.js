import classes from './CartItem.module.css'

const CartItem = (props) => (
  <li className={classes['cart-item']}>
    <div>
      <h2>{props.item.name}</h2>
      <div className={classes.summary}>
        <span className={classes.price}>${props.item.price.toFixed(2)}</span>
        <span className={classes.amount}>{props.item.amount}</span>
      </div>
    </div>
    <div className={classes.actions}>
      <button onClick={props.onRemove}>-</button>
      <button onClick={props.onAdd}>+</button>
    </div>
  </li>
)

export default CartItem
