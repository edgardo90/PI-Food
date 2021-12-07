import React, {useState, useEffect}from "react";
import{Link, useHistory} from "react-router-dom"
import {postRecipe , getDiets} from "../actions/index"
import {useDispatch , useSelector} from "react-redux"
import styles from "../components/cssComponents/Recipe.module.css"


function validate(input){ // funcion para validar errores
    const errors={};
    if(!input.title){
        errors.title="You must enter a title"
    }else if ( !/[A-Z\s]+$/i.test(input.title)){
        errors.title = "The title has to be only letters"
        // /^[A-Z]+$/i
    }
    if(!input.summary){
        errors.summary="You must enter a summary"
    }
    if(input.score > 100 || input.score < 0){
        errors.score="The score must be greater than 0 and less than 100"
    }
    if(input.healthScore > 100 || input.healthScore < 0){
        errors.healthScore="The health score must be greater than 0 and less than 100"
    }
    if(input.image.length >0){
        if(!input.image.includes("https://") ){
        errors.image= "no es una dirrecion valida"
    }
    }

    return errors
}

export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory()
    const totalDiets = useSelector(state =>state.diets); // va a tener todas las dietas

    const [data , setData] = useState({
        title:"",
        summary:"",
        score:"",
        healthScore:"",
        image:"",
        steps:"",
        diets:[],
    });
    const [errors, setErrors] = useState({});

    useEffect (()=>{ // useeffect del get de dietas 
        dispatch(getDiets());
    },[dispatch]);

    function handleChange(event){ //handle de los input y textarea
        setData(({
            ...data,
            [event.target.name]: event.target.value
        }))
        // console.log(data)
        setErrors(validate({ // errores
            ...data,
            [event.target.name]: event.target.value
        }))
    }

    function handleSelect(event){ // handle del select de diets
        setData({
            ...data,
            diets:[...data.diets, event.target.value]
        })
    }

    function handleDelete(event){
        setData({
            ...data,
            diets: data.diets.filter(d => d !== event)
        })
    }

     function handleSubmit(event){ // handle para enviar(submit) la receta que quiero crear
        event.preventDefault();
        if(!data.title || !data.summary){ // tira una alerta si no hay title and summary
            return alert("Complete the title and summary information")
        }
        if(Object.values(errors).length > 0){ // tira una alerta si hay  errores
            return alert("Check the errors that are in red !")
        }
        dispatch(postRecipe(data));
        alert("Recipe create!");
        setData({
            title:"",
            summary:"",
            score:"",
            healthScore:"",
            image:"",
            steps:"",
            diets:[],
        })
        history.push("/home")
    }


    return(
        <div>
            <Link to="/home"><button>Back to</button></Link>
            <h1 className={styles.titulo} >Create you recipe</h1>
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <div >
                    <label>Title: </label>
                    <input
                    type="text"
                    value={data.title}
                    name = "title"
                    onChange={handleChange}
                    // required 
                    />
                    {errors.title && (
                        <p style={{color: "red" , fontWeight: 700 , fontSize: 13}} >{errors.title}</p>
                    )}
                </div>
                <br />  {/* dejo un espacio  */}
                <div>
                    <label>Summary: </label>
                    <br />
                    <textarea
                    type="text"
                    value={data.summary}
                    name="summary" 
                    onChange={handleChange}
                    style={{width: 400}}
                    // required
                    />
                    {errors.summary && (
                        <p style={{color: "red" , fontWeight: 700 , fontSize: 13}} >{errors.summary}</p>
                    )}
                </div>
                <br />
                <div>
                    <label>Health Score: </label>
                    <input type="number" // para que sea solo numeros el type es number
                    value={data.healthScore}
                    name="healthScore"
                    onChange={handleChange}
                    />
                    <p style={{color: "red" , fontWeight: 700 , fontSize: 13}}>{errors.healthScore}</p>
                </div>
                <div>
                    <label>Score: </label>
                    <input type="number" // para que sea solo numeros el type es number
                    value={data.score}
                    name="score"
                    onChange={handleChange}
                    />
                    <p style={{color: "red" , fontWeight: 700 , fontSize: 13}}>{errors.score}</p>
                </div>
                <div>
                    <label>Image(https format): </label>
                    <input 
                    type="text"
                    placeholder="example: https..."
                    value={data.image}
                    name="image"
                    onChange={handleChange}
                     />
                     <p style={{color: "red" , fontWeight: 700 , fontSize: 13}}>{errors.image}</p>
                </div>
                <div>
                    <label>Instructions for the recipe steps: </label>
                    <br />
                    <textarea
                    type="text"
                    placeholder="Instructions..."
                    value={data.steps}
                    name="steps"
                    style={{width: 400}}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <br />
                    <select onChange={handleSelect}>
                        <option value="select">Select type/s of diets</option>
                        {totalDiets && totalDiets.map(t =>{
                            return(
                                <option value={t.name} key={t.id}>{t.name}</option>
                            )
                        })}
                    </select>
                </div>
                {/* <ul> <li>{  data.diets.map(d => d!=="select" && d+"  ,") }</li> </ul> */} {/*muestra las dietas que agrego  */}
                <br />

                <button disabled={!data.title} type="submit">Create recipe</button>
            </form>
            <br />
            {data.diets.map(d =>{
                return(
                <div className={styles.eleminar} >
                    <li key={parseInt(d)} >Aggregate diet: {d} <button className={styles.btn} onClick={()=> handleDelete(d)}>X</button></li>
                </div>
                )
            })}

        </div>
    )

}

