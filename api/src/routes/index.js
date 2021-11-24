const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Recipe , Diet} = require("../db")
const axios = require("axios")
const {API_KEY} = process.env
//
require("dotenv").config();
const {Sequelize} = require("sequelize")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const resultUrl = await apiUrl.data.results.map(r =>{
        return {
            id : r.id,
            title : r.title, // esto seria el name
            image : r.image,
            spoonacularScore : r.spoonacularScore, // esto seria puntuacion
            healtScore : r.healtScore, // esto seria el nivel de comida saludable
            summary : r.summary, // esto seria el resumen del plato
            diets : r.diets.map(d =>{ // esto seria tipo de dieta
                return {name: d } // va tener un objeto que "d" va ser el tipo de dieta
            }),
            dishTypes : r.dishTypes.map(d =>{ // esto seria el tipo de plato
                return {name : d }
            }),
            steps : r.analyzedInstructions.map(a =>  // esto seria el Paso a paso
                 a.steps.map(s => s.step ) ).flat(2).join(""), // como "analyzedInstructions" tiene es un array dentro con mas arrays , hago dos map() y flat(2) para aplanar el array por ultimo un join("") para unir todo
        }
    })
    return resultUrl
}

const getDbInfo = async () =>{         //aca voy traer lo que guardo en la base de datos(date base)
    return await Recipe.findAll({
        include :{
            model: Diet,
            attributes:["title"],
            through:{
                attributes: [],
            }
        }
    })
}

const allData = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get("/recipes", async(req, res) =>{
    const name = req.query.name;
    let recetas = await allData();
    if(name){
        let nameReceta = await recetas.filter(r => r.title.toLowerCase().includes(name.toLowerCase()) );
        if(nameReceta.length > 0){
           return res.status(200).send(nameReceta);
        }else{
           return res.status(404).send("No esta la receta ingresada")
        }
    }
   return res.status(200).send(recetas)
})



module.exports = router;
