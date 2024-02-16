
import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StickyFooter from './components/Footer';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/SignIn' element={<SignIn></SignIn>}/>
        <Route path='/SignUp' element={<SignUp></SignUp>}/>
        <Route path='/' element={<Home></Home>}/>
      </Routes>
      <StickyFooter/>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
