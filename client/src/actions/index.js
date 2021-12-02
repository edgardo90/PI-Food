import {GET_RECIPES , GET_DIETS, FILTER_DIETS, ORDER_BY_TITLE , ORDER_BY_SCORE , GET_NAME_RECIPE, POST_RECIPE} from "./types"
import axios from "axios"; // importo axios


export function getRecipes(){  // get para traer todas las recetas 
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function getDiets(){ // get para traer todas las dietas de mi base de datos
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/types");
        return dispatch({
            type :GET_DIETS,
            payload: json.data,
        })
    }
}

export function getNameRecipe(name){ // get para buscar por nombre de la receta
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch({
                type: GET_NAME_RECIPE,
                payload: json.data
            })
        }catch(error){
            alert("There is no recipe with that name") // sale una alerta si no se encuentra por el nombre ingresado
            console.log(error)
        }
    }
}

export function postRecipe(payload){ // post para crear la receta
    return async function(dispatch){
        const json = await axios.post("http://localhost:3001/recipe",payload);
        return json
    }
}

export function filterDiets(payload){
    // console.log(payload)
    return{
        type: FILTER_DIETS,
        payload
    }
}

export function orderByTitle(payload){ 
    return{
        type: ORDER_BY_TITLE,
        payload,
    }
}

export function orderByScore(payload){
    return{
        type: ORDER_BY_SCORE,
        payload,
    }
}
