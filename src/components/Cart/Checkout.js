import useInput from '../../hooks/use-input'
import classes from './Checkout.module.css'

const isEmpty = (value) => value.trim() !== ''
const isNotZIP = (value) => value.trim().length === 5

const Checkout = (props) => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    inputValueIsInvalid: nameInputIsInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isEmpty)

  const {
    value: street,
    valueIsValid: streetIsValid,
    inputValueIsInvalid: streetInputIsInvalid,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isEmpty)

  const {
    value: ZIP,
    valueIsValid: ZIPIsValid,
    inputValueIsInvalid: ZIPInputIsInvalid,
    valueChangeHandler: ZIPChangeHandler,
    valueBlurHandler: ZIPBlurHandler,
    reset: ZIPReset,
  } = useInput(isNotZIP)

  const {
    value: city,
    valueIsValid: cityIsValid,
    inputValueIsInvalid: cityInputIsInvalid,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isEmpty)

  let formIsValid = false
  if (nameIsValid && streetIsValid && ZIPIsValid && cityIsValid) {
    formIsValid = true
  }

  const resetForm = () => {
    nameReset()
    streetReset()
    ZIPReset()
    cityReset()
  }

  const confirmHandler = async (event) => {
    event.preventDefault()

    if (!formIsValid) {
      return
    }

    props.onConfirm({
      name,
      street,
      ZIP,
      city,
    })

    console.log('Submitted')
    console.log(name, street, ZIP, city)

    resetForm()
    props.onCancel()
  }

  const inputClasses = (inputIsInvalid) => {
    return !inputIsInvalid
      ? classes.control
      : `${classes.control} ${classes.invalid}`
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={inputClasses(nameInputIsInvalid)}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={name}
        />
        {nameInputIsInvalid && (
          <p className={classes['error-text']}>Please enter a name</p>
        )}
      </div>
      <div className={inputClasses(streetInputIsInvalid)}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={street}
        />
        {streetInputIsInvalid && (
          <p className={classes['error-text']}>Please enter a street</p>
        )}
      </div>
      <div className={inputClasses(ZIPInputIsInvalid)}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={ZIPChangeHandler}
          onBlur={ZIPBlurHandler}
          value={ZIP}
        />
        {ZIPInputIsInvalid && (
          <p className={classes['error-text']}>Please enter a postal code</p>
        )}
      </div>
      <div className={inputClasses(cityInputIsInvalid)}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={city}
        />
        {cityInputIsInvalid && (
          <p className={classes['error-text']}>Please enter a city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
