import React, {useState, useEffect,useContext} from 'react'
import { StateContext } from '../Context/StateContext';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";




function CreateAccount (){
	const { handleCreateUserAccount,loginUser,resetLoginUser,userConfirm } = useContext(StateContext);
  const [userName, setUserName] = useState("");
const[password,setPassword]= useState("")
const[passwordSecond,setPasswordSecond]= useState("")
const [userNameExist,setUserNameExist] = useState(false)
  const history = useHistory();



  useEffect(() => redirectUser(), [loginUser]);



function handleInputChange(e){

const { name, value } = e.target;
switch (name) {
    case "userName":
       setUserName(value)

        break;

 case "password":
     setPassword(value)

        break;

 case "passwordSecond":
     setPasswordSecond(value)
if(password !== passwordSecond){

}
        break;

    default:
        break;
}
}

function createAccount (e){

handleCreateUserAccount(userName,password)
 e.preventDefault();

}


  function redirectUser() {
    if (loginUser) {
      history.push("/");
       resetLoginUser();

    }else if(loginUser === false){

setUserNameExist(true)

}
  }


    return ( 
 <div className="create-account-container">
      <div className="form-container">
        <form onSubmit={(e) => createAccount(e)}>
          <h1>Create Account </h1>

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

 <input
            type="password"
            name="passwordSecond"
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />

          <button type="submit"> Submit</button>
        </form>
        <Link to="/login">
          <li>login</li>
        </Link>
      </div>

      <div>{
userNameExist && "user name already exist"

}</div>
    </div>
 );
}
 
export default CreateAccount;