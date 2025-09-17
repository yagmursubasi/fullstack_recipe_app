import fs from "fs";

export const readRecipes = () => {
  try {
    const text = fs.readFileSync("./data.json", "utf-8");
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const writeRecipes = (data) => {
  try {
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.log(error);
  }
};
