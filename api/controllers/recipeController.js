import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import isInValid from "../utils/isInValid.js";
import crypto from "crypto";

const data = readRecipes();

export const getAllRecipes = (req, res) => {
  //tarif verisinin bir kopyasını oluştur
  let recipes = [...data];

  //aratılan kelime
  const search = req.query?.search;
  const order = req.query?.order?.toLowerCase();

  //eğer search parametresi geldiyse filtreleme yap
  if (search) {
    recipes = recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
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
export const createRecipe = (req, res) => {
  //isteğin body bölümünden gelen veriye eriş
  let newRecipe = req.body;

  console.log(newRecipe);

  //veri bütünlüğünü  kontrol et
  if (isInValid(newRecipe)) {
    return res
      .status(400)
      .json({ message: "Lütfen bütün değerleri tanımlayın" });
  }
  // veriye id ve fotoğraf ekle
  newRecipe = {
    ...newRecipe,
    id: crypto.randomUUID(),
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
  };

  //tarif verisini dizieye ekle
  data.push(newRecipe);

  //json dosyasını güncelle
  writeRecipes(data);

  //cevap gönder
  res
    .status(201)
    .json({ message: "Yeni tarif oluşturuldu.", recipe: newRecipe });
};
export const getRecipe = (req, res) => {
  res
    .status(200)
    .json({ message: "Aradığınız tarif bulundu.", found: req.foundRecipe });
};

export const deleteRecipe = (req, res) => {
  //silinecek elemanın sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);
  //elemanı diziden kaldır
  data.splice(index, 1);
  //json dosyasını güncelle
  writeRecipes(data);
  //cevap gönder
  res.status(204).json({});
};
export const updateRecipe = (req, res) => {
  //eski tarif nesnesini güncelle
  const updated = { ...req.foundRecipe, ...req.body };

  //güncellenecek elemanın sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);

  //diziyi güncelle
  data.splice(index, 1, updated);

  //json dosyasını güncelle
  writeRecipes(data);

  //client'e cevap gönder
  res
    .status(200)
    .json({ message: "Tarif başarıyla güncellendi", recipe: updated });
};
