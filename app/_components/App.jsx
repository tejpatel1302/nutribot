import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";


const RecipeCard = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [complexity, setComplexity] = useState("");

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    onSubmit(recipeData);
  };

  return (
    <div className="w-[300px] border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-4 text-black">NutriBot</div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ingredients"
          >
            Weight
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ingredients"
            type="text"
            placeholder="Enter Weight"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mealType"
          >
            Height
          </label>
         <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mealType"
            type="text"
            placeholder="Enter Height"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cuisine"
          >
            Disease
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="cuisine"
            type="text"
            placeholder="Disease"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cookingTime"
          >
            Gender
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="complexity"
          >
           Body Type
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <option value="">Select Body Type</option>
            <option value="ectomorph">Ectomorph</option>
            <option value="endomorph">Endomorph</option>
            <option value="mesomorph">Mesomorph</option>
          </select>
        </div>
        <div className="px-6 py-4 text-center">
          <Button
            className=" hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");

  async function onSubmit(data) {
    setRecipeText("Generating....");

    try {
      const queryParams = new URLSearchParams(data).toString();
      const response = await fetch(`https://nutribotbackend.vercel.app/recipeStream?${queryParams}`);

      if (response.ok) {
        const result = await response.json();
        setRecipeText(result.recipe || "No recipe generated.");
      } else {
        setRecipeText("Error: Unable to fetch recipe.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipeText("Error: Unable to fetch recipe.");
    }
  }

  return (
    <div className=" min-h-screen flex flex-col items-center py-10 ">
    <div className="flex flex-col md:flex-col h-full my-4 gap-6 justify-center items-start  md:w-[300px]">
      <RecipeCard onSubmit={onSubmit} />
     
      <Dialog>
  <DialogTrigger asChild><Button className={'ml-[60px]'}>Open Generated Plan</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription asChild>
       <div className="w-[400px] h-[565px] text-sm text-gray-700 p-6 border rounded-lg shadow-xl bg-white whitespace-pre-line overflow-y-auto">
      <div  dangerouslySetInnerHTML={{ __html: recipeText}} />
      </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  </div>
  );
}

export default App;
