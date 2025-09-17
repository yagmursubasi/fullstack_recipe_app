const reqFields = [
  "recipeName",
  "category",
  "recipeTime",
  "servingSuggestion",
  "ingredients",
  "instructions",
];

//nesnedeki değişkenlerin en az biri bile eksikse true
//hepsi tamamsa false

const isInValid = (data) => {
  return reqFields.some((field) => !data[field]);
};
export default isInValid;
