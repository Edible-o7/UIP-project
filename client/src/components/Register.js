const Register = () => {
    return (
        <div>
        <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputUsername" className="form-label">Username</label>
    <input type="password" className="form-control" id="exampleInputUsername"/>
  </div>
    <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>
        </div>
    );
}

export default Register;