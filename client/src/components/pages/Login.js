import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const {username, password} = user;

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData("/user/login", user, "POST")
    .then((data) => {
      if(!data.message) {
        console.log(data)
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/Profile")
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
    return (
        <div>
        <form onSubmit={onSubmit}>
  <div className="mb-3">
    <label for="exampleUsername" className="form-label">Username</label>
    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" name='username' onChange={onChange} value={username}/>
  </div>
    <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={password}/>
  </div>
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-warning">Login</button>
</form>
        </div>
    );
}

export default Login;