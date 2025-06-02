import { useState } from "react";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:300/meals");

      if (!response.ok) {
        //TODO
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, [fetchMeals]);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
