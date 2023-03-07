import logo from './logo.svg';
import './App.css';
import {Home} from './Home'
import {Grade} from './Grade'
import {Testing} from './Testing'
import {Navigation} from './Navigation'


import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';



function App() {
  return (
    <>
    <Router>
    <div className="container">


     <Navigation/>
     
      <Routes>
        <Route path='/' element={<Home />} exact/>
        <Route path='/grade' element={<Grade />}/>
        <Route path='/testing' element={<Testing />}/>
      </Routes>
      

    </div>
    </Router>
    </>
  );

}

export default App;
