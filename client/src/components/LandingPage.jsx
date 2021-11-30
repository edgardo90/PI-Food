import React from "react";
import { Link } from "react-router-dom";

import  styles from "./Landing.module.css"

function LadingPage(){
    return(
        <div className={styles.landing}>
            <h1 className={styles.h1}>Welcome to my food app</h1>
            <Link to="/home" > <button  className={styles.btn}>Login</button> </Link>
        </div>
    )
}

export default LadingPage;