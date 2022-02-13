import './App.css';

import { Component } from 'react/cjs/react.production.min';
import Nav from "./components/Nav"
import Battle from "./pages/Battle"
import Home from "./pages/Home"
import Collection from './pages/Collection';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


class App extends Component {
  
  render(){
    return (
      <BrowserRouter>
        <div className='main-app'>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
            <Nav/>

            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/battle" element={<Battle/>}/>
              <Route path="/collection" element={<Collection/>}/>
            </Routes>

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
