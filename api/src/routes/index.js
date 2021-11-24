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
            healthScore : r.healthScore, // esto seria el nivel de comida saludable
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

const getDbInfo = async () =>{    //aca voy traer lo que guardo en la base de datos(date base)
    return await Recipe.findAll({
        include :{
            model: Diet,
            attributes:["name"],
            through:{
                attributes: [],
            }
        }
    })
}

const allData = async () =>{ // con esto creo una funcion que trae todo lo que venga por la api de food
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get("/recipes", async(req, res) =>{
    const name = req.query.name; // busco por query name
    let recetas = await allData(); // creo una varieble "recetas" que traiga todo con la funcion allData() que cree , "recetas" va ser un array con toda la informacion
    if(name){ // si hay algo en name
        let nameReceta = await recetas.filter(r => r.title.toLowerCase().includes(name.toLowerCase()) ); // hago un filter que traiga lo que tenga ese "name"
        if(nameReceta.length > 0){ // como "nameReceta" es un array , me fijo si hay algo
           return res.status(200).send(nameReceta); // si hay lo retorno con res.status()
        }else{
           return res.status(404).send("No esta la receta ingresada") // sino envio un error
        }
    }
   return res.status(200).send(recetas) // si no hay nada por query , muestra todas las "recetas"
})

router.get("/types",async(req, res) =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const totalDiets = apiUrl.data.results.map(a => a.diets).flat(2); // hago un map sobre el apiUrl.data.results que gaurde todas las dietas , como diets van hacer un array de array hago un flat()  
    // console.log(totalDiets)
    totalDiets.forEach(t =>{ // hago un forEach para iterar cada elemento =>"t"
        Diet.findOrCreate({ // traigo el modelo Diet.js , utilizo el findOrCreate() para crear el elemento en mi base de datos, si ya esta no lo crea
            where: {name : t} // creo el objeto where que tenga cada elemento => "t"
        })
    })
    const allDiets = await Diet.findAll(); // guarda en "allDites" lo que esta en la tabla Diet.js con la funcion findall()
    return res.send(allDiets); 
})

router.post("/recipe", async(req, res) =>{
    let {title,summary ,steps ,score,   } = req.body;
})

module.exports = router;
