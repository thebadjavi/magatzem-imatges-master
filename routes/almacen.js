
const imagenes = [

    {
        id: 2,
        "titulo": "Pug",
        "url": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/pug.jpg",
        "data": "12/12/12"
    },

    {
        id: 3,
        "titulo": "Siberian Husky",
        "url": "https://raw.githubusercontent.com/haseebpvt/Animal-API/master/data/dog/images/siberian_husky.jpg",
        "data": "06/02/12"

    },
  

]
// Vamos a gestionar todas las rutas que tienen que ver con gestionar la entidad animal

const express = require('express');
const router = express.Router();

router.get("/category/:type", (req, res) => {
    // En el objeto 'params' tenemos todos los parámetros dinámicos que nos ha pasado el cliente
    const type = req.params.type;

    if (type == "cats") {
        res.render("animals", {
            animalType: 'cats',
            animals: cats
        });
    }

    else if (type == "dogs") {
        res.render("animals", {
            animalType: 'dogs',
            animals: dogs
        });
    }

    else {
        res.render("animals", {
            animalType: 'NO TENEMOS ESTA CATEGORÍA',
            animals: []
        });
    }
});


router.get("/:category/:id", (req, res) => {

    const { category, id } = req.params;
    let result;

    console.log("categoría: ", category)

    if (category == "cats") {
        result = cats.find(item => item.id == id)
    } else if (category == "dogs") {
        result = dogs.find(item => item.id == id)
    } else {
        return res.status(404).send("Categoría no encontrada");
    }

    res.render('animal-details', {
        animal: result
    });
});

router.get("/new-animal", (req, res) => {
    res.render("form");
});

router.post("/new-animal", (req, res) => {
    const { breed, urlImage, category } = req.body;

    if (category == "cat") {
        cats.push({
            name: breed,
            image: urlImage
        })

        res.redirect("/category/cats");
    }

    else {
        dogs.push({
            name: breed,
            image: urlImage
        })
        res.redirect("/category/dogs");

    }
});


module.exports = router;