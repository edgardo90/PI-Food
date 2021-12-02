import {GET_RECIPES, GET_DIETS, FILTER_DIETS, ORDER_BY_TITLE, ORDER_BY_SCORE , GET_NAME_RECIPE, POST_RECIPE} from "../actions/types"

const  initialState ={
    recipes:[],
    copyRecipes:[], 
    diets:[],
}

function reducer(state=initialState,{type , payload} ){
    switch(type){
        case GET_RECIPES: // obtengo todas las recetas 
            return {
                ...state , 
                recipes:payload,
                copyRecipes: payload, 

            } 

        case GET_DIETS: // obtengo todas mis dietas de mi base de datos
            return{
                ...state,
                diets:payload,
            }

        case GET_NAME_RECIPE: // get para buscar receta por nombre
            return{
                 ...state,
                recipes: payload,
            }

        case POST_RECIPE: // post para crear receta
            return{
                ...state
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

        case ORDER_BY_TITLE: // caso para ordenar el nombre de la receta de a-z or z-a
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

            case ORDER_BY_SCORE: // caso para ordenar segun el healthscore de mayor a menor or menor a mayor
                let orderScore = payload === "men" ?
                state.recipes.sort(function(a,b){return a.healthScore - b.healthScore})
                :
                state.recipes.sort(function(a,b){return b.healthScore - a.healthScore})
                return{
                    ...state,
                    recipes: orderScore
                }
            
            
        default: return state
    }
}


export default reducer