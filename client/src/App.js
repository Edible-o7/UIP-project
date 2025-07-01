
import './App.css';
import Navbar from './components/Navbar.js';
import Register from './components/Register.js';
import Login from './components/Login.js'
import Text from './components/Text.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      Ignore this mess, I'm just throwing stuff at the wall
      <Text />
      <br />
      <h2>Register here</h2>
      <Register />
      <br />
      <h2>Login here</h2>
      <Login />

      Hello World!!
    </div>
  );
}

export default App;
