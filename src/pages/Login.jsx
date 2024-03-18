import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LoginWrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 20px;
  width: 400px;
  height: 700px;
  margin-top: 90px;
`;

const LoginHeader = styled.div`
  margin-bottom: 50px;
  letter-spacing: 1.5px;
`;

const LoginTitle = styled.h1`
  text-align: center;
  font-weight: 400;
`;

const LoginForm = styled.div`
  margin-bottom: 20px;
`;

const InputTitle = styled.label`
  cursor: pointer;
  display: block;
  margin-bottom: 15px;
  letter-spacing: 2px;
  font-size: 12px;
`;

const InputSpace = styled.input`
  display: block;
  margin-bottom: 30px;
  width: 100%;
  background-color: transparent;
  color: inherit;
  border: 1px solid #e8e8e1;
  max-width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
`;

const AccountBtn = styled.input`
  display: inline-block;
  margin-bottom: 30px;
  cursor: pointer;
  width: 100%;
  padding: 10px 20px;
  font-size: 18px;
  background-image: none;
  transition: opacity 1s;
  line-height: 1.42;
  letter-spacing: 1.5px;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  background-color: #111111;
  color: #fff;
`;

const LoginGrid = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 0;
`;

const GridItem = styled.div`
  float: left;
  min-height: 1px;
  width: 50%;
`;

const LabelInfo = styled.small`
  display: block;
  margin-bottom: 10px;
`;

const FormBtns = styled.p`
  margin: 0 0 20px 0;
`;

const CreateAccount = styled.a`
  font-size: 14px;
`;

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attemptLogin, setAttemptLogin] = useState(false);

  useEffect(() => {
    if (attemptLogin) {
      // 로그인 시도가 있을 때만 실행되는 로직
      const loginSuccess = false; // 로그인 실패를 가정

      if (!loginSuccess) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("");

        localStorage.setItem("token", "your_jwt_token_here");
      }

      setAttemptLogin(false);
    }
  }, [attemptLogin]);

  const handelSubmit = async (event) => {
    event.preventDefault();
    setAttemptLogin(true);
  };

  return (
    <LoginWrapper>
      <LoginHeader>
        <LoginTitle>LOGIN</LoginTitle>
      </LoginHeader>
      <LoginForm>
        <form method="post" id="login" onSubmit={handelSubmit}>
          {errorMessage && (
            <div
              style={{
                color: "#d02e2e",
                backgroundColor: "#fff6f6",
                borderColor: "#d02e2e",
                borderRadius: "0",
                padding: "6px 12px",
                marginBottom: "20px",
                border: "1px solid transparent",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </div>
          )}
          <InputTitle htmlFor="email">EMAIL</InputTitle>
          <InputSpace
            type="email"
            name="customer-email"
            id="customer-email"
            placeholder="Please enter your e-mail."
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <LoginGrid>
            <GridItem>
              <InputTitle htmlFor="password">PASSWORD</InputTitle>
            </GridItem>
            <GridItem style={{ textAlign: "right" }}>
              <LabelInfo>
                <a href="#">Forgot password?</a>
              </LabelInfo>
            </GridItem>
          </LoginGrid>
          <InputSpace
            type="password"
            name="customer-password"
            id="customer-password"
            placeholder="Please enter your password."
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <FormBtns>
            <AccountBtn type="submit" value="SIGN IN" />
          </FormBtns>
          <FormBtns>
            <CreateAccount href="/Signup">Create Account</CreateAccount>
          </FormBtns>
        </form>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
