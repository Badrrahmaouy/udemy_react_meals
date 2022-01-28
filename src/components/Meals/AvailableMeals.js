import { useState, useCallback, useEffect } from 'react'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem'
import Card from '../UI/Card/Card'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMeals = useCallback(async () => {
    setError(null)
    try {
      const response = await fetch(
        'https://react-http-1169f-default-rtdb.firebaseio.com/Meals.json',
      )

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data = await response.json()
      console.log(data)

      const loadedMeals = []
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(loadedMeals)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMeals()
  }, [fetchMeals])

  let content = <p>No meals found.</p>

  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (meals.length > 0) {
    content = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ))
  }

  return (
    <section className={classes.meals}>
      <ul>
        <Card>{content}</Card>
      </ul>
    </section>
  )
}

export default AvailableMeals
