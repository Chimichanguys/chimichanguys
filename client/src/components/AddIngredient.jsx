import { useEffect, useState } from "react";



const AddIngredient = ({ token }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [type, setType] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientData = {
      name: name,
      calories: Number(calories),
      type: type,
      price: Number(price),
      imageUrl: imageUrl,

    };
    console.log(ingredientData)
    console.log("admin token:", token)

    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(ingredientData),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        console.log("Ingredient added successfully");
        // Reset form fields
        
        setName("");
        setType("");
        setCalories("");
        setPrice("");
        setImageUrl("");
      } else {
        
        console.error("Error adding ingredient:", data.message);
      }
    } catch (error) {
      console.error("Error adding ingredient:", error.message);
    }
  };

  return (
    <>
    <h1>Welcome Admin, add an ingredient in the form below:</h1>
      <form id="addIngredient" onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Calories:
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Type:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step=".01"
              required
            />
          </label>
        </div>
        <button type="submit">Add Ingredient</button>
      </form>
    </>
  );
};

export default AddIngredient;
