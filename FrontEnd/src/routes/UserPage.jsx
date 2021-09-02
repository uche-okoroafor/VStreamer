import React, { useContext, useState, useEffect } from "react";
// import Nav from "../components/Nav";

import axios from "axios"

function User(params) {
  const [users, setUsers] = useState([]);

  // useEffect(() => {

  // axios
  //     .get("/users/")
  //     .then((response) => {
      
  // // console.log(response)
  //      setUsers(response.data.usersList);
  //     })
  //     .catch((err) => console.log(err));


//     fetch("/users/")
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       // .catch((err) => console.log(err, 1))
//       .then((jsonRes) => {
// setUsers(jsonRes.usersList)});

    //
  // });

  return (
    <React.Fragment>
          {/* <Nav /> */}
<h1>hello user</h1>
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </React.Fragment>
  );
}

export default User;
