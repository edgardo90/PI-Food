import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../actions";

export default function SearchBar(){
    const dispacth = useDispatch();
    const[data ,setdata] =useState("");

    function handleChange(event){
        event.preventDefault();
        setdata(event.target.value);
        console.log(data)
    }

    function handleSubmit(event){
        event.preventDefault();
        dispacth(getNameRecipe(data));
        setdata("");
    }

    return(
        <div>
            <input 
            type="text"
            placeholder="Search..."
            value={data}
            onChange = {handleChange}
             />
             <button type="submit" onClick={handleSubmit}>Search</button>
        </div>
    )
}