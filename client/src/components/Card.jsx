import React from "react";

export default function Card({title , image , diets}){
    // console.log(diets)   
    return(
        <div>
            <h3>{title}</h3> {/* muestro como h3 el nombre de la receta  */}
            <img src={image || // con el || (or) si no hay imagen por defecto que muestre esta imagen 
                 "https://www.greenpeace.org/static/planet4-colombia-stateless/2020/06/fd2920e2-blog1-1024x683.jpg" } alt="Imagen not found" width="200px" height="200px" />
            <li>Diet/s: {` ${diets} `}</li> {/* muestro en formato parafo la dieta/s */}
        </div>
    )
}