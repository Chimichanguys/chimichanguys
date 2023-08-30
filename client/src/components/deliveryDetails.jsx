import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryDetails = () => {
    const [option, setOption] = useState("delivery");
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
            data = { name, address };
        } else {
            data = { name };
        }

        try {
            const response = await fetch('http://localhost:8000/api/saveDeliveryDetails', {
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

            // After successful data submission, show the estimated time alert and navigate to the LoadingPage
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