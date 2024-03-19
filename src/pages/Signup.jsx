import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { loadDaumAddressAPI } from "../common/DaumAddressApi";
import axios from "axios";
import { SHA256 } from "crypto-js";

const SignupWrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 90px;
`;

const SignupHeader = styled.div`
  margin-bottom: 50px;
  letter-spacing: 1.5px;
`;

const SignupTitle = styled.h1`
  text-align: center;
  font-weight: 400;
`;

const SignupForm = styled.div`
  margin: 0 auto;
  width: 400px;
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

const CreateBtn = styled.button`
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

const FormBtns = styled.p`
  margin: 0 0 20px 0;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -20px;
  padding-bottom: 20px;
`;

const PasswordInfo = styled.div`
  color: ${({ isValid }) => (isValid ? "green" : "red")};
  font-size: 14px;
  margin-top: -20px;
  padding-bottom: 20px;
  white-space: pre-line;
`;

const PasswordRequirement = styled.span`
  font-size: 14px;
  white-space: pre-line;
  color: black;
`;

const RadioButtonLabel = styled.label`
  margin-right: 30px;
  display: inline-block;
  margin-bottom: 30px;
`;

const ProfileFormWrapper = styled.div`
  max-width: 400px;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  margin-top: 20px;
  margin-left: 10px;
`;

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [requiredFieldsError, setRequiredFieldsError] = useState("");
  const [isAddressAPIInitialized, setIsAddressAPIInitialized] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value.replace(/\D/g, "");

    let formattedPhoneNumber;
    if (inputPhoneNumber.length <= 3) {
      formattedPhoneNumber = inputPhoneNumber;
    } else if (inputPhoneNumber.length <= 7) {
      formattedPhoneNumber = `${inputPhoneNumber.slice(
        0,
        3
      )}-${inputPhoneNumber.slice(3)}`;
    } else {
      formattedPhoneNumber = `${inputPhoneNumber.slice(
        0,
        3
      )}-${inputPhoneNumber.slice(3, 7)}-${inputPhoneNumber.slice(7, 11)}`;
    }

    setPhoneNumber(formattedPhoneNumber);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 주소와 상세 주소를 합친다음 제출을 합니다. (확실치는 않음, 백엔드에서 테스트 해봐야 할듯)
    const fullAddress = `${address} ${addressDetail}`;

    // 해시화한 비번을 전송.
    const hashedPassword = SHA256(password).toString();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !gender ||
      !phoneNumber ||
      !address
    ) {
      setRequiredFieldsError(
        "Please ensure all required fields are filled out to proceed with account creation."
      );
      return;
    }

    const existingEmail = "example@example.com";

    if (email === existingEmail) {
      setEmailError(
        "This email is already in use. Please use a different email."
      );
      return;
    }

    // JWT 요청
    axios
      .post("/api/authenticate", { email, password })
      .then((response) => {
        const { token } = response.data;
        // 토큰을 쿠키에 저장.
        localStorage.setItem("token", token);
        // 토큰을 전송.
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // 백엔드로 전송.
        axios
          .post("/api/signup", {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender,
            phoneNumber,
            address: fullAddress,
          })
          .then((response) => {
            // 회원가입 성공 처리
          })
          .catch((error) => {
            // 회원가입 실패 처리
          });
      })
      .catch((error) => {
        // 인증 오류 처리
      });
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // 해시화 함수
    const hashedPassword = SHA256(newPassword).toString();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordMessage(
        "Your password does not meet the required conditions."
      );
      setIsValidPassword(false);
    } else {
      setPasswordMessage("Your password meets the required conditions.");
      setIsValidPassword(true);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // 이미지를 미리보기할 URL 생성
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    // 프로필 사진 업로드 로직을 구현해주세요.
  };

  const handleAddressSearch = () => {
    if (!isAddressAPIInitialized) {
      setIsAddressAPIInitialized(true);
      new window.daum.Postcode({
        oncomplete: function (data) {
          const { address } = data;
          setAddress(address);

          // 비동기 방식, 백엔드에서 파일 생성 후 서버 코드를 작성해주세요.
          axios.post("/api/submitAddress", { address: address });
        },
      }).open();
    }
  };

  useEffect(() => {
    loadDaumAddressAPI().then(() => {
      document.getElementById("customer-address").onclick = handleAddressSearch;
    });
  }, []);

  const handleAddressDetailChange = (event) => {
    setAddressDetail(event.target.value);
  };

  return (
    <SignupWrapper>
      <SignupHeader>
        <SignupTitle>Create Account</SignupTitle>
      </SignupHeader>
      <SignupForm>
        <form method="post" id="sign-up" onSubmit={handleSubmit}>
          <InputTitle htmlFor="firstName">FIRST NAME</InputTitle>
          <InputSpace
            type="text"
            name="first-name"
            id="customer-firstName"
            placeholder="Please enter your first name."
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <InputTitle htmlFor="lastName">LAST NAME</InputTitle>
          <InputSpace
            type="text"
            name="last-name"
            id="customer-lastName"
            placeholder="Please enter your last name."
            value={lastName}
            onChange={handleLastNameChange}
          />
          <InputTitle htmlFor="email">EMAIL</InputTitle>
          <InputSpace
            type="email"
            name="customer-email"
            id="customer-email"
            placeholder="Please enter your email."
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <InputTitle htmlFor="password">PASSWORD</InputTitle>
          <InputSpace
            type="password"
            name="customer-password"
            id="customer-password"
            placeholder="Please enter your password."
            value={password}
            onChange={handlePasswordChange}
            maxLength={20}
          />
          <PasswordInfo isValid={isValidPassword}>
            {passwordMessage}
            {"\n"}
            <PasswordRequirement>
              * Must include both letters and numbers
            </PasswordRequirement>
            {"\n"}
            <PasswordRequirement>
              * Must be between 8 and 20 characters long
            </PasswordRequirement>
          </PasswordInfo>
          <ProfileFormWrapper>
            <InputTitle>Upload Profile Image</InputTitle>
            <FileInput
              type="file"
              id="profile-image"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileInputChange}
            />
            <FileInputLabel htmlFor="profile-image">
              Choose Image
            </FileInputLabel>
            {previewUrl && <PreviewImage src={previewUrl} alt="Preview" />}
          </ProfileFormWrapper>
          <InputTitle htmlFor="phoneNumber">PHONE NUMBER</InputTitle>
          <InputSpace
            type="tel"
            name="customer-phone"
            id="customer-phone"
            placeholder="ex) 010-0000-0000"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <InputTitle htmlFor="address">ADDRESS</InputTitle>
          <InputSpace
            type="text"
            name="customer-address"
            id="customer-address"
            placeholder="Please enter your address."
            value={address}
            onClick={handleAddressSearch}
            readOnly
          />
          <InputSpace
            type="text"
            name="customer-address-detail"
            id="customer-address-detail"
            placeholder="Please enter your detail address"
            value={addressDetail}
            onChange={handleAddressDetailChange}
          />
          <InputTitle htmlFor="gender">Gender</InputTitle>
          <RadioButtonLabel>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={handleGenderChange}
            />
            <span style={{ paddingLeft: "8px" }}>Male</span>
          </RadioButtonLabel>
          <RadioButtonLabel>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={handleGenderChange}
            />
            <span style={{ paddingLeft: "8px" }}>Female</span>
          </RadioButtonLabel>
          <RadioButtonLabel>
            <input
              type="radio"
              name="gender"
              value="others"
              checked={gender === "others"}
              onChange={handleGenderChange}
            />
            <span style={{ paddingLeft: "8px" }}>others</span>
          </RadioButtonLabel>
          {requiredFieldsError && (
            <ErrorMessage>{requiredFieldsError}</ErrorMessage>
          )}
          <FormBtns>
            <CreateBtn type="submit" value="Create">
              Create
            </CreateBtn>
          </FormBtns>
        </form>
      </SignupForm>
    </SignupWrapper>
  );
};

export default Signup;
