import React from "react";
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { getDetail } from "../actions";
import { useEffect  } from "react";
import styles from "../components/cssComponents/Detail.module.css"

export default function Detail(props){
    // console.log(props);
    const dispatch = useDispatch();
    const myDetail =useSelector(state => state.detail); // traigo mi receta en un objeto

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id)) // de esta forma accedo al id de la receta 
    },[dispatch])

    console.log(myDetail)
    console.log( typeof myDetail === "object")

    return(
        <div>
            <Link to="/home"><button>Back to</button></Link>
            {
                Object.values(myDetail).length > 0 ? // con esto convierto el obejto en array para saber si su largo es mayor a 0
                <div>
                    <h1 className={styles.title}>{myDetail.title}</h1>
                    <img  className={styles.imagen} src={myDetail.image || //con el || (or) si no tiene imagen por defecto que muestre esta imagen =>
                        "https://www.greenpeace.org/static/planet4-colombia-stateless/2020/06/fd2920e2-blog1-1024x683.jpg"} alt="image loading..." width="500px" height="400px" />
                    <h5 className={styles.dish}  >Dish types: {myDetail.dishTypes ? myDetail.dishTypes.map( d => `${d.name} , ` ) : " " }</h5>
                    <h5 className={styles.diets} >Diets: {myDetail.diets ? myDetail.diets.map(d => `${d.name} , `) :" "}</h5>
                    <h5 className={styles.score} >Score: {myDetail.score}</h5>
                    <h5 className={styles.healt} >Healh Score: {myDetail.healthScore}</h5>
                    <h3 className={styles.summary} >Summary: </h3>
                    <div>
                        <p className={styles.Psummary} >{myDetail.summary.replace(/<[^>]*>?/g, '')}</p>  {/* con el .replace() y el regex que coloque ,saca los caracteres que no van y lo remplaza por ""(nada)  */}
                    </div>
                    <h3  className={styles.steps} >Steps: </h3>
                    <div>
                        <p className={styles.Psteps} >{myDetail.steps}</p>
                    </div>

                </div> :  <p>cargando...</p> 
            } 
        </div>
    )

}