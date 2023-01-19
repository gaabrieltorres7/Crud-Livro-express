const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LivroSchema = new Schema({
  titulo: {
    type: String,
  },
  autor: {
    type: String,
    required: true,
  },
  paginas: {
    type: Number,
  },
});

module.exports = mongoose.model("Livro", LivroSchema);
