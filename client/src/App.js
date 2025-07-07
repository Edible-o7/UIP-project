
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/pages/Navbar.js';
import Register from './components/pages/Register.js';
import Login from './components/pages/Login.js'
import Text from './components/pages/Text.js'

function App() {
  return (
    <div className="App">

<BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Text />}/>
        <Route path="register" element={<Register />}/>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
