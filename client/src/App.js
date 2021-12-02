// import './App.css';
import {BrowserRouter ,Route, Switch} from "react-router-dom"
import Home from "./components/Home";
import LadingPage from "./components/LandingPage";
import RecipeCreate from "./components/RecipeCreate"


function App() {
  return (
    // <BrowserRouter>
    <div>
      {/* <Switch> */}
      <Route exact path="/" component = {LadingPage} />
      <Route path ="/home" component ={Home} />
      <Route path="/recipe" component={RecipeCreate} />
      {/* </Switch> */}
    </div>
    // {/* </BrowserRouter> */}
  );
}

export default App;
