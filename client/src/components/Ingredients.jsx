import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom"
import { useCart } from './useCart'


const Ingredients = ({ token }) => {
    const { cartItems, setCartItems } = useCart();
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([])
    // const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        const fetchIngredients = async () => {
            const result = await fetch("/api/ingredients", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await result.json();
            setIngredients(data)
        };
        fetchIngredients();
    }, []);

    const handleAddIngredient = (ingredient) => {
        // Update selected ingredients
        const updatedIngredients = [...selectedIngredients, ingredient];
        setSelectedIngredients(updatedIngredients);
        
        // Also update the cart items
        setCartItems(updatedIngredients);
    }
    
    const deleteIngredient = (ingredientId) => {
        const updatedIngredients = selectedIngredients.filter(ingredient => ingredient.id !== ingredientId);
        
        // Update selected ingredients
        setSelectedIngredients(updatedIngredients);
    
        // Also update the cart items
        setCartItems(updatedIngredients);
    }


    const totalCalories = selectedIngredients.reduce((total, ingredient) => total + ingredient.calories, 0);
    const totalPrice = selectedIngredients.reduce((total, ingredient) => total + parseFloat(ingredient.price), 0)
    return (
        <>
  
            <h1>hello</h1>
            <h1>Here are your current choices for Chimichanga Fillings!</h1>
            {selectedIngredients.map((ingredient) => {
                return (
                    <>
                        <h3>{ingredient.name}</h3>
                        <p>{ingredient.calories}</p>
                        {/* <button onClick={<Cart selectedIngredients={selectedIngredients} />}>Proceed to Checkout</button> */}
                    </>
                )
            })}
            <h2>Calorie total: {totalCalories}</h2>
            <h2>Total Price: {totalPrice.toFixed(2)}</h2>

            {ingredients.map((ingredient) => {
                return (
                    <div key={`Ingredient_${ingredient.id}`}>
                        <h2>{ingredient.name}</h2>
                        <ul>
                            <li>{ingredient.calories}</li>
                            <li>Price: {ingredient.price}</li>
                            <li> {ingredient.type}</li>
                            <li>{ingredient.imageUrl}</li>
                        </ul>
                        <button onClick={() => handleAddIngredient(ingredient)}>Add Ingredient</button>
                        <button onClick={() => deleteIngredient(ingredient.id)}>Delete Ingredient</button>
                    </div>
                )

            })}



        </>

    );
};



export default Ingredients;