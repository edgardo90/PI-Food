import {GET_RECIPES, GET_DIETS, FILTER_DIETS, ORDER_BY_TITLE} from "../actions/types"

const  initialState ={
    recipes:[],
    copyRecipes:[], 
    diets:[],
}

function reducer(state=initialState,{type , payload} ){
    switch(type){
        case GET_RECIPES:
            return {
                ...state , 
                recipes:payload,
                copyRecipes: payload, 

            } // lo que hago es que de mi state(estado) recipes es que un array vacio  manda todo lo que hace la funcion get_recipes, que va traer todas las recetas

        case GET_DIETS:
            return{
                ...state,
                diets:payload,
            }

        case FILTER_DIETS: // caso para filtrar por dieatas
            const allRecipes = state.copyRecipes;
            const filtered = payload === "All" ? allRecipes : allRecipes.map(a => { // payload es distinto que "All" hago un map para iterar sobre el arrra de todas las recetas
                for(let i in a.diets){ // hago un for in para iterar sobre el array objetos de dietas
                    if(a.diets[i].name === payload)   return a // hago un if si diets.name si coincide con el payload, si coincide hago un return para que se guarde en filtered
                }
            })
            const statusFiltered = filtered.filter(f => f) // esto lo hago para eleminar los undefined
            return{
                ...state, // siempre se concatena el estado(state) anterior
                recipes: statusFiltered,
            }

        case ORDER_BY_TITLE: // caso para ordenar el nombre de la receta
            let orderTitle = payload === "asc" ?
            state.recipes.sort(function(a,b){
                if(a.title.toLowerCase() > b.title.toLowerCase()){
                    return 1
                }
                if(b.title.toLowerCase() > a.title.toLowerCase()){
                    return -1
                }
                return 0
            }) :
            state.recipes.sort(function(a,b){
                if(a.title.toLowerCase() < b.title.toLowerCase()){
                    return 1
                }
                if(b.title.toLowerCase() > a.title.toLowerCase()){
                    return -1
                }
                return 0
            })
            return{
                ...state,
                recipes: orderTitle  
            }
            
            
        default: return state
    }
}


export default reducer