import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar';
import Projects from './components/pages/Projects';
import Footer from './components/layout/Footer';
import Project from './components/pages/Project';

function App() {

  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/company' element={<Company/>}/>
          <Route path='/newproject' element={<NewProject/>}/>
          <Route path= '/project/:id' element={<Project/>}/>
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
