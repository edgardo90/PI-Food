import React from "react";
import styles from "../components/cssComponents/card.module.css"

export default function Card({title , image , diets ,healthScore}){
    // console.log(diets)   
    return(
        <div className={styles.card}>
            <div className={styles.nuevo} >

            <h3 className={styles.title} >{title}</h3> {/* muestro como h3 el nombre de la receta  */}
            <img className={styles.imagen} src={image || // con el || (or) si no hay imagen por defecto que muestre esta imagen 
                 "https://www.greenpeace.org/static/planet4-colombia-stateless/2020/06/fd2920e2-blog1-1024x683.jpg" } alt="Imagen not found" width="200px" height="300px" />
                 <h3 className={styles.title} >HealthScore: {healthScore}</h3>
            <p className={styles.dietas}>Diet/s: {` ${diets} `}</p> {/* muestro en formato parafo la dieta/s */}
            </div>
        </div>
    )
}