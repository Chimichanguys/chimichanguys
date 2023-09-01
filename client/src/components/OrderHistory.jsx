import { useState, useEffect } from 'react';

const OrderHistory = () => {
    
    const userIdFromLocalStorage = localStorage.getItem('userId');
    const [userId, setUserId] = useState(userIdFromLocalStorage);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await fetch(`/api/orderHistory/${userId}`);
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch order history:", error);
                setLoading(false);
            }
        }

        fetchOrderHistory();
    }, [userId]);

    return (
        <div>
            <h2>Order History</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}> 
                            Total Price: ${order.totalPrice} - 
                            Address: {order.address}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrderHistory;