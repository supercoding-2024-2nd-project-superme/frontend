import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { loadDaumAddressAPI } from "../common/DaumAddressApi";

const ModifyWrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
  min-width: 700px;
  height: 700px;
  overflow: auto;
`;

const ModifyHeader = styled.div`
  margin-bottom: 50px;
  letter-spacing: 1.5px;
`;

const ModifyTitle = styled.h1`
  text-align: center;
  font-weight: 400;
`;

const ModifyForm = styled.div`
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
  color: gray; /* 변경: 비밀번호 정보 스타일 변경 */
  font-size: 14px;
  margin-top: -20px;
  padding-bottom: 20px;
  white-space: pre-line;
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

const Modify = () => {
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
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError("Your password does not meet the required conditions.");
    } else {
      setPasswordError("");
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

  const openAddressSearch = () => {
    if (!isAddressAPIInitialized) {
      setIsAddressAPIInitialized(true);
      new window.daum.Postcode({
        oncomplete: function (data) {
          const { address } = data;
          setAddress(address);
        },
      }).open();
    }
  };

  useEffect(() => {
    loadDaumAddressAPI().then(() => {
      document.getElementById("customer-address").onclick = openAddressSearch;
    });
  }, []);

  const handleAddressDetailChange = (event) => {
    setAddressDetail(event.target.value);
  };

  return (
    <ModifyWrapper>
      <ModifyHeader>
        <ModifyTitle>Modify Account Information</ModifyTitle>
      </ModifyHeader>
      <ModifyForm>
        <form method="post" id="modify" onSubmit={handleSubmit}>
          <InputTitle htmlFor="firstName">FIRST NAME</InputTitle>
          <InputSpace
            type="text"
            name="first-name"
            id="customer-firstName"
            placeholder="Please enter your first name."
            value={firstName}
            onChange={handleFirstNameChange}
            disabled
          />
          <InputTitle htmlFor="lastName">LAST NAME</InputTitle>
          <InputSpace
            type="text"
            name="last-name"
            id="customer-lastName"
            placeholder="Please enter your last name."
            value={lastName}
            onChange={handleLastNameChange}
            disabled
          />
          <InputTitle htmlFor="email">EMAIL</InputTitle>
          <InputSpace
            type="email"
            name="customer-email"
            id="customer-email"
            placeholder="Please enter your email."
            value={email}
            disabled
          />
          <InputTitle htmlFor="password">PASSWORD</InputTitle>
          <InputSpace
            type="password"
            name="customer-password"
            id="customer-password"
            placeholder="Please enter your password."
            value={password}
            onChange={handlePasswordChange}
          />
          <PasswordInfo>
            * Must include both letters and numbers
            <br />* Must be between 8 and 20 characters long.
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
            onClick={openAddressSearch}
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
          {requiredFieldsError && (
            <ErrorMessage>{requiredFieldsError}</ErrorMessage>
          )}
          <FormBtns>
            <CreateBtn type="submit" value="Update">
              Update
            </CreateBtn>
          </FormBtns>
        </form>
      </ModifyForm>
    </ModifyWrapper>
  );
};

export default Modify;
