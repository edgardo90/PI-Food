// import './App.css';
import {Route} from "react-router-dom"
import Home from "./components/Home";
import LadingPage from "./components/LandingPage";


function App() {
  return (
    <div>
      <Route exact path="/" component = {LadingPage} />
      <Route path ="/home" component ={Home} />
      
    </div>
  );
}

export default App;
