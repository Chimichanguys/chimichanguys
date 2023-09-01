import { useEffect, useState } from "react";

import React, { useState } from "react";

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
      calories: calories,
      type: type,
      price: price, 
      imageUrl: imageUrl, 

    };

    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ingredientData),
      });

      if (response.ok) {
        console.log("Ingredient added successfully");
        // Reset form fields
        setName("");
        setType("");
        setCalories("");
        setPrice("");
        setImageUrl("");
      } else {
        const data = await response.json();
        console.error("Error adding ingredient:", data.message);
      }
    } catch (error) {
      console.error("Error adding ingredient:", error.message);
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit}>

        </form>
    </>
  );
};

export default AddIngredient;
