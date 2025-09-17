//const express = require("express") //Eski nesil import
import express from "express"; // Yeni nesil import
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes.js";

//express kurulumu
const app = express();
const port = 4004;

//cors hatalarını önleyen mw (otomatik header ekler)
app.use(cors());
//body'deki json verilerini çeviren mw
app.use(express.json());

//tarifler için crud operasyonlarını gerçekleştireceğimiz endpointleri tanımla
app.use(recipeRouter);

//dinlenecek portu belirle
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışmaya başladı`);
});
