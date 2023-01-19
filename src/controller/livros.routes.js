const livrosRouter = require("express").Router(); //cria rota de forma modularizada

const Livros = require("../model/Livro");

//create
livrosRouter.post("/", (req, res) => {
  let livro = new Livros(req.body);
  livro
    .save()
    .then((livro) => {
      res
        .status(201)
        .json({ message: "Livro adicionado com sucesso", livro: livro });
    })
    .catch((err) => {
      res.status(400).send("Erro ao adicionar livro");
    });
});

//read
livrosRouter.get("/", (req, res) => {
  Livros.find((err, livros) => {
    if (err) return res.status(500).send({ status: "erro", message: err });
    return res.status(200).json({ status: "sucesso", livros: livros });
  });
});

//read by id
livrosRouter.get("/:id", async (req, res) => {
  let id = req.params.id; //extract id from request
  try {
    let livro = await Livros.findById(id);
    if (!livro)
      return res
        .status(404)
        .send({ status: "erro", message: "Livro não encontrado" });
    return res.status(200).json({ status: "sucesso", livro: livro });
  } catch (err) {
    return res.status(500).send({ status: "erro", message: err });
  }
});

// update
livrosRouter.patch("/update/:id", (req, res) => {
  Livros.findById(req.params.id, function (err, livro) {
    if (!livro) {
      res.status(400).send({ status: "erro", mssg: "Livro não encontrado" });
    } else {
      livro.titulo = req.body.titulo;
      livro.autor = req.body.autor;
      livro.paginas = req.body.paginas;

      livro.save().then((business) => {
        res.status(200).json({ status: "sucesso", livro: livro });
      });
    }
  });
});

//delete
livrosRouter.delete("/delete/:id", function (req, res) {
  Livros.findByIdAndRemove({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(400).send({ status: "erro", mssg: "Algo deu errado" });
    } else {
      res
        .status(200)
        .json({ status: "sucesso", mssg: "Deletado com sucesso!" });
    }
  });
});

module.exports = livrosRouter;
