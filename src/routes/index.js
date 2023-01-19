//inicio
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const livrosRouter = require("../controller/livros.routes");

app.use(bodyParser.json());
app.use("/", livrosRouter);
app.use("/add", livrosRouter);
app.use("/update/:id", livrosRouter);
app.use("/delete/:id", livrosRouter);

//conecto ao banco de dados
mongoose
  .connect("mongodb://localhost:27017/nodeapi", {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err);
  });
