import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forgot from './pages/auth/Forgot';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Home from './pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}>
          Register
        </Route>
        <Route path='/login' element={<Login />}>
          Login
        </Route>
        <Route path='/resetpassword/:resetToken' element={<Reset />}>
          Reset
        </Route>
        <Route path='/forgot' element={<Forgot />}>
          Forgot
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
