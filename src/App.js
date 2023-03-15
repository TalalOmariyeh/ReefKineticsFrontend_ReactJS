import logo from './logo.svg';
import React, { Component, useState, useEffect } from 'react';
import './App.css';
import RobotList from './components/robot-list';
import axios from "axios";

//var database=[];
function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [Username, setFirstName] = useState();
  const [Password, setLastName] = useState(null);
  const [users, setUsers] = useState([]);

  axios.interceptors.request.use(
    (request) => {
      // we can appends the headers here instead of the components
      // we can handle (show) the loader view here instead of the components
      let accessToken = localStorage.getItem("token");

      if (accessToken) {
        request.headers['Authorization'] = 'Bearer ' + accessToken;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );





  axios.interceptors.response.use(
    (response) => {
        // we can handle the success messages here instead of the components
        // we can handle (hide) the loader view here instead of the components
        return response;
    },
    (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401) {
           setIsSubmitted(false);
           localStorage.removeItem("token");
            return;
        }

        return Promise.reject(error);
    }
);




  React.useEffect(() => {
    let accessToken = localStorage.getItem("token");
    setIsSubmitted(accessToken ? true : false);
    // fetch('http://localhost:29835/api/tbUsers/GetUsers')
    //   .then(results => results.json())
    //   .then(data => {
    //     console.log(data);
    //     //const [name] = data;
    //     setUsers(data)
    //     //database= data;
    //     //console.log(name);
    //     console.log(users);
    //     //setFirstName(name.UserName);
    //     //setLastName(name.Password);
    //     console.log(Username);
    //   });
  }, []);




  // const database = [
  //   {
  //     username: "user1",
  //     password: "pass1"
  //   },
  //   {
  //     username: "user2",
  //     password: "pass2"
  //   }
  // ];

  const errors = {
    pass: "invalid UserName or password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    const userLogin = {

      Username: uname.value,
      Password: pass.value,

    }
    const res = axios.post('http://localhost:29835/api/tbUsers/Login', userLogin)
  
    res.then(data => {
    

      if (data.data)
      {
        localStorage.setItem("token", data.data);
        setIsSubmitted(true);
        setErrorMessages({});
      }
      else
      {
        setIsSubmitted(false);
        setErrorMessages({ message: errors.pass });
      }
      
    });

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) => (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title"></div>
        {isSubmitted ? <div><RobotList /></div> : renderForm}
      </div>
    </div>
  );
}

export default App;
