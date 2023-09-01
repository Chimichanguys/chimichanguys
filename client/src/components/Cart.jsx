import React, { useEffect, useState } from 'react';
import { useCart } from './useCart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const token = localStorage.getItem("token");
  const { cartItems, setCartItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching cart items
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart'); 
        const data = await response.json();
        setCartItems(data.chimichangas);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    // Fetching order history
    const fetchOrderHistory = async () => {
        const response = await fetch('/api/orderHistory', { 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setOrders(data);
    };

    // Call both functions
    fetchCartItems();
    fetchOrderHistory();
    
    // Set loading to false after both fetches are done
    setLoading(false);
}, [setCartItems]);

  const removeItem = async (chimichangaId) => {
    try {
      await fetch(`/api/cart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chimichanga: chimichangaId })
      }); 
      const updatedCart = cartItems.filter(item => item.id !== chimichangaId);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, chimichanga) => acc + chimichanga.price, 0);
  };

  if (loading) {
    return <p>Loading...</p>
  }

  const orderHandler = async () => {
    const ingredientIds = cartItems.map((item) => {return item.id});
    console.log(token);
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ingredients: ingredientIds})
    });
    const result = await response.json();
    console.log(result);
    navigate('/delivery');
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(chimichanga => (
          <li key={chimichanga.id}>
            {chimichanga.name} - ${chimichanga.price}
            <button onClick={() => removeItem(chimichanga.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${getTotalPrice()}</h3>
      <button onClick={orderHandler}>Check Out</button> {/* Check Out button */}
    </div>
  );
}

export default Cart;