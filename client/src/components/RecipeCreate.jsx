import React, {useState, useEffect}from "react";
import{Link, useHistory} from "react-router-dom"
import {postRecipe , getDiets} from "../actions/index"
import {useDispatch , useSelector} from "react-redux"

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
    })

    useEffect (()=>{ // useeffect del get de dietas para tener todos las dietas
        dispatch(getDiets());
    },[dispatch]);

    function handleChange(event){ //handle de los input y textarea
        setData(prevData=>({
            ...prevData,
            [event.target.name]: event.target.value
        }))
        console.log(data)
    }

    function handleSelect(event){ // handle del select de diets
        setData({
            ...data,
            diets:[...data.diets, event.target.value]
        })
    }

    function handleSubmit(event){
        event.preventDefault();
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
            <h1>Create you recipe</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <input 
                    type="text"
                    value={data.title}
                    name = "title"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Summary: </label>
                    <input 
                    type="text"
                    value={data.summary}
                    name="summary" 
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Health Score: </label>
                    <input type="number" // para que sea solo numeros el type es number
                    value={data.healthScore}
                    name="healthScore"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Score: </label>
                    <input type="number" // para que sea solo numeros el type es number
                    value={data.score}
                    name="score"
                    onChange={handleChange}
                    />
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

