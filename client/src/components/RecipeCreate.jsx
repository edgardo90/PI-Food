import React, {useState, useEffect}from "react";
import{Link, useHistory} from "react-router-dom"
import {postRecipe , getDiets} from "../actions/index"
import {useDispatch , useSelector} from "react-redux"


function validate(input){
    const errors={};
    if(!input.title){
        errors.title="You must enter a title"
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
    if(!input.image.includes("https://") ){
        errors.image= "no es una dirrecion valida"
    }

    return errors
}

export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory()
    const totalDiets = useSelector(state =>state.diets);

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

    useEffect (()=>{ // useeffect del get de dietas para tener todos las dietas
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

     function handleSubmit(event){
        event.preventDefault();
        if(!data.title || !data.summary){
            alert("Completa la informacion solicitada")
        }else{
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
    }

    // function handleSubmit(event){
    //     if(data.title && data.summary){
    //         event.preventDegault();
    //         dispatch(postRecipe(data));
    //         alert("Recipe create!");
    //         setData({
    //         title:"",
    //         summary:"",
    //         score:"",
    //         healthScore:"",
    //         image:"",
    //         steps:"",
    //         diets:[],
    //     })
    //     history.push("/home")
    //     }else{
    //         alert("completa la informacion")
    //     }
    // }

    return(
        <div>
            <Link to="/home"><button>Back to</button></Link>
            <h1>Create you recipe</h1>
            <form onSubmit={handleSubmit}>
                <div>
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
                <div>
                    <label>Summary: </label>
                    <input 
                    type="text"
                    value={data.summary}
                    name="summary" 
                    onChange={handleChange}
                    // required
                    />
                    {errors.summary && (
                        <p style={{color: "red" , fontWeight: 700 , fontSize: 13}} >{errors.summary}</p>
                    )}
                </div>
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
                    <select onChange={handleSelect}>
                        {totalDiets && totalDiets.map(a =>{
                            return(
                                <option value={a.name} key={a.id}>{a.name}</option>
                            )
                        })}
                    </select>
                </div>
                <ul><li>{  data.diets.map(d => d+"  ,") }</li> </ul>

                <button  type="submit">Create recipe</button>
            </form>
        </div>
    )

}

