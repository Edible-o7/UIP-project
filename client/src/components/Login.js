const Login = () => {
    return (
        <div>
        <form>
  <div className="mb-3">
    <label for="exampleUsername" className="form-label">Username</label>
    <input type="username" className="form-control" id="exampleUsername" aria-describedby="usernameHelp"/>
  </div>
    <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-warning">Login</button>
</form>
        </div>
    );
}

export default Login;