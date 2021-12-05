import {GET_RECIPES , GET_DIETS, FILTER_DIETS, ORDER_BY_TITLE , ORDER_BY_SCORE , GET_NAME_RECIPE, POST_RECIPE , GET_DETAIL} from "./types"
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

export function getDetail(id){ // get para mostrar detalle de la receta por id
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: GET_DETAIL,
                payload :json.data,
            })
        }catch(error){
            alert("you cannot enter this recipe") // sale una alerta si no se puede ver la receta
            console.log(error)
        }
    }
}

export function postRecipe(payload){ // post para crear la receta
    return async function(dispatch){
        const json = await axios.post("http://localhost:3001/recipe",payload);
        return dispatch({
            type: POST_RECIPE,
            json
        })
    }
}

export function filterDiets(payload){ // filtrar por tipo de dieta
    // console.log(payload)
    return{
        type: FILTER_DIETS,
        payload
    }
}

export function orderByTitle(payload){  // ordeanar de A-Z or Z-A
    return{
        type: ORDER_BY_TITLE,
        payload,
    }
}

export function orderByScore(payload){ // ordenar de menor a mayor o viceversa
    return{
        type: ORDER_BY_SCORE,
        payload,
    }
}
