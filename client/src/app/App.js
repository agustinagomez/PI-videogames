
import {Switch, Route} from "react-router-dom"
import Landing from '../components/Landing/Landing.jsx'
import Home from '../components/Home/Home.jsx'
import Create from '../components/Create/Create.jsx'
import Detail from '../components/Detail/Detail.jsx'
import Error from "../components/Error/Error.jsx"
import s from './App.css'
function App() {
  return (
    <>
      <Switch>

        <Route exact path='/'>
          <Landing/>
        </Route>

        <Route exact path='/home'>
          <Home/>
        </Route>

        <Route exact path= '/videogame/:id' component={Detail}/>

        <Route exact path='/videogames/create' component={Create}/>
        
        <Route path='/:x' component={Error}/>
{/* 
        <Route exact path='/videogame/:id'>
          <Detail/>
        </Route> */}

      </Switch>
    </>
  );
}

export default App;
