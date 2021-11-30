import {GET_RECIPES , GET_DIETS, FILTER_DIETS, ORDER_BY_TITLE} from "./types"
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
