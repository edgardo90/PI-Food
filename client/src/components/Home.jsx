import React from "react";
import {useState , useEffect} from "react";
import {useDispatch , useSelector} from "react-redux"; // son Hooks de redux
import {getDiets, getRecipes, filterDiets, orderByTitle} from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card"; 
// import { Fragment } from "react";
import Paginado from "./Paginado"

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes); // esto seria hacer lo mismo que el mapStateToProps, va ser un array con todas las recetas
    const allDiets = useSelector(state => state.diets) // esto seria hacer lo mismo que el mapStateToProps, va ser un array con todas las dietas
    const [order , setOrder] = useState("")
    // aca empiezo para hacer el paginado
    const [currentPage , setCurrentPage] = useState(1); // creo un estadoLocal con el estado(useState())  de la pagina actual , lo que hago es guardar mi pagina actual  en un estadoLocal
    const [recipesPerPage , setRecipesPerPage] = useState(9); // en este estadoLocal guardo cuantos quiero por paginas , en este caso 9
    const indexOfLastRecipes = currentPage * recipesPerPage ; // voy a tener el ultimo indice de mi receta , que me va dar en este caso 9
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage  // voy a tener el primer indice de mi receta , que va hacer 0
    const currentRecites = allRecipes.slice(indexOfFirstRecipes , indexOfLastRecipes ) //  esto va tener las recetas que va tener cada pagina

    const paginado = (pageNumber) =>{ // esto me va ayudar hacer el renderizado
        setCurrentPage(pageNumber)
    }
    // aca termino el paginado


    useEffect (()=>{ // useEffect del get de recetas
        dispatch(getRecipes());
    },[dispatch]) // pongo un array con dispatch para que no se haga un bucle infinito

    useEffect (()=>{ // useeffect del get de dietas
        dispatch(getDiets());
    },[dispatch])

    function handleClick(event){ // handle para recargar la pagina
        event.preventDefault();
        dispatch(getRecipes())
    }

    function handleFilterDiets(event){ // handle para filtrar por dietas
        dispatch(filterDiets(event.target.value))
    }

    function handleSort(event){ // handle para ordenar por nombre de la recta
        event.preventDefault();
        dispatch(orderByTitle(event.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${event.target.value}`)
    }

    // console.log(allDiets)
    return(
        <div>
            <Link to= "/recite">Create recite</Link>
            <h1>Food</h1>
            <button onClick={event => {handleClick(event)}} >Reload recites</button> {/* recargo la pagina  */}
            <div>
                <select onChange={event => handleFilterDiets(event) } >
                    <option  value="All">All diets</option>
                    {allDiets && allDiets.map(a =>{ // utilizo allDiets  para rendirizar todas las dietas de las base de datos para filtrar
                        return(
                            <option value={a.name} key={a.id}>{a.name}</option>
                        )
                    })}
                </select>
                <select onChange={event => handleSort(event)} >
                    <option label="Order by name" value="All"></option>
                    <option value="asc">Ascendant</option>
                    <option value="des">Descending</option>
                </select>
                <select >
                    <option label="Order by score" value="All"></option>
                    <option value="may" >Ascendant</option>
                    <option value="men" >Descending</option>
                </select>

                <Paginado // traigo Paginado.jsx para renderizar
                recipesPerPage ={recipesPerPage} // paso el estado que creee arriba
                allRecipes={allRecipes.length} // aca paso el largo de todas las recetas 
                paginado= {paginado} // paso la const paginado que cree arriba  
                />

                { currentRecites && currentRecites.map(a =>{ // si hay currentRecites  hago un map para que renderize los componentes que quiero mostrar
                // console.log(a.diets)
                // console.log(a.id)
                    return( // aca empiezo para renderizar Card
                     <Link to={`/home/${a.id}`}> {/*   */}
                        <Card title={a.title} 
                        image={a.image}
                        key={a.id} 
                        diets={a.diets.map(d => <p key={d.name}>{d.name}</p> )}
                        />
                     </Link>
                        )
                    }) }
            </div>
        </div>
    )

}