import React from "react";
import styles from "../components/cssComponents/Paginado.module.css"


export default function Paginado({  allRecipes, paginado,recipesPerPage  }){ // me traigo  allRecipes, paginado,recipesPerPage de Home.jsx , por destructuring
    const pageNumbers = [] 
    let number = Math.ceil(allRecipes/recipesPerPage) // esto me va dar la cantidades de pagina que necesito
    // console.log("este "+number)
    for(let i=1; i <= number; i++){ // itero para guardar en un array los numeros de can
        pageNumbers.push(i);
    }
    // console.log(pageNumbers)
    return( // este componenete va hacer que renderize los numeroa
        <nav>  {/*solamente es componente de navegacion  */}
            <ul> {/* hace una lista desordenada */}
                {pageNumbers && // si hay pageNUmbers que haga un map
                 pageNumbers.map(p =>{
                     return( // como es un map acordarse de poner un return
                     <button key={p} className={styles.btn}  onClick={()=>paginado(p)}> {p} </button>
                     )
                 })}
            </ul>
        </nav>
    )
}