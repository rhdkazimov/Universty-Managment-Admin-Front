import React from "react";
import { Button, Input } from "@chakra-ui/react";
import "./index.scss";

const initialValue = {
  Username: null,
  Password: null,
};

export const Login = () => {
  const [loginData, setLoginData] = React.useState(initialValue);
  const [isError, setIsError] = React.useState(false);

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setLoginData((previous) => ({ ...previous, [name]: value }));

  const handleSumbitLoginData = () => {};

  return (
    <div className="loginBox">
      <div className="inputArea">
        {isError && (
          <span className="error">Username or Password is wrong</span>
        )}
        <Input
          onChange={(e) => handleOnChangeInput(e)}
          placeholder="Username"
          type="text"
        />
        <Input
          onChange={(e) => handleOnChangeInput(e)}
          placeholder="Password"
          type="password"
        />
        <Button onClick={handleSumbitLoginData}>Daxil Ol</Button>
      </div>
      <div className="imgArea">
        <img
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=2000"
          alt="img"
        />
      </div>
    </div>
  );
};
