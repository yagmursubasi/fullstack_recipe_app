import { readRecipes } from "../model/recipeModel.js";

const data = readRecipes();

export const getAllRecipes = (req, res) => {
  //tarif verisinin bir kopyasını oluştur
  let recipes = [...data];

  //aratılan kelime
  const search = req.query?.search;
  const order = req.query?.order;

  //eğer search parametresi geldiyse filtreleme yap
  if (search) {
    recipes = recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search.toLowerCase())
    );
  }
  //eğer order parametresi geldiyse sıralama yap
  if (order) {
    recipes.sort((a, b) =>
      order.toLowerCase() === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  //client'a cevap gönder

  res.status(200).json({
    status: "success",
    results: recipes.length,
    recipes: recipes,
  });
};
export const createRecipe = (req, res) => {};
export const getRecipe = (req, res) => {};

export const deleteRecipe = (req, res) => {};
export const updateRecipe = (req, res) => {};
