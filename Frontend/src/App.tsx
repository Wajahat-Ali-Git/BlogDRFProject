import Login from './pages/Login';
import { Signup } from './pages/Signup';
import { Route,Routes } from 'react-router-dom';


function App() {
  

  return (
    <Routes>
      <Route element={<Login/>} path='/login'></Route>
      <Route element={<Signup/>} path='/signup'></Route>
    </Routes>
    
    
   
    
  )
}

export default App;
