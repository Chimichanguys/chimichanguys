import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryDetails = () => {
    const [option, setOption] = useState("delivery");
    const userIdFromLocalStorage = localStorage.getItem('userId');
    const [userId, setUserId] = useState(userIdFromLocalStorage);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOptionChange = (e) => {
        const selectedOption = e.target.value;
        setOption(selectedOption);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
     
        let data = {};
        if (option === "delivery") {
            data = { name, address, userId};
        } else {
            data = { name, address:"", userId};
        }

        try {
            console.log(JSON.stringify(data))
            const response = await fetch('/api/saveDeliveryDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resultData = await response.json();
            console.log(resultData);

            
            const estimatedTime = option === 'delivery' ? '30 mins' : '15 mins';
            alert(`Your ${option} will be ready in approximately ${estimatedTime}.`);

            const path = `/loadingPage/${option}`;
            navigate(path);

        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Provide Details</h2>
            <select value={option} onChange={handleOptionChange}>
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
            </select>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {option === "delivery" && (
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Address" 
                                value={address} 
                                onChange={e => setAddress(e.target.value)} 
                            />
                            <button type="submit">Submit</button>
                        </form>
                    )}

                    {option === "pickup" && (
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                            />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
}

export default DeliveryDetails;