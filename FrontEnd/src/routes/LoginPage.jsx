import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../Context/StateContext";
import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login() {
  const { handleUserAuthentication,loginUser, resetLoginUser } =
    useContext(StateContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
const [userNotFound,setUserNotFound] = useState(false)
  const history = useHistory();


  useEffect(() => redirectUser(), [loginUser]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "userName":
        setUserName(value);

        break;

      case "password":
        setPassword(value);

        break;

      default:
        break;
    }
  }

  function handleLogin(e) {
    handleUserAuthentication(userName, password);

    e.preventDefault();

  }

  function redirectUser() {
    if (loginUser) {
      history.push("/");
       resetLoginUser();

    }else if(loginUser === false){ 

setUserNotFound(true)

}
  }

  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={(e) => handleLogin(e)}   >
          <h1>Sign In </h1>

          <input
            type="text"
            name="userName"
            onChange={(e) => handleInputChange(e)}
            placeholder="User Name"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />

          <button type="submit"> Submit</button>
        </form>

<br />

<div>{userNotFound && "userName or password Does not Exist"}</div>

<br />

        <Link to="/create_account">create Account</Link>
      </div>
    </div>
  );
}

export default Login;
