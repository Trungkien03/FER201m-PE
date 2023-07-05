import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import  Navigation from './components/Navigation';
import {Home} from "./pages/Home";
import {Contact} from "./pages/Contact";
import {Dashboard} from "./pages/Dashboard";
import {Detail} from "./pages/Detail";
import { Footer } from './components/Footer';
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
