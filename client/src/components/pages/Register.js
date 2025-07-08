import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: ''
  });

  const {username, password, email} = user;

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData("/user/register", user, "POST")
    .then((data) => {
      if(!data.message) {
        console.log(data)
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/profile")
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
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} value={email}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputUsername" className="form-label">Username</label>
    <input type="text" className="form-control" id="username" name='username' onChange={onChange} value={username}/>
  </div>
    <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={password}/>
  </div>
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>
        </div>
    );
}

export default Register;