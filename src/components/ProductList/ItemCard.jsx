// components/common/ItemCard.jsx
import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  cursor: pointer;
  width: 270px;
  height: 300px;
  margin-bottom: 10px;
  position: relative;
  // ... 추가 스타일 ...
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 70%;
`;

const Name = styled.h3`
  font-size: 19px;
  text-align: left;
  width: 100%;
  margin-top: 10px;
`;

const Price = styled.p`
  font-size: 14px;
  color: #333;
  text-align: left;
  margin-top: 10px;
  width: 100%;
`;

const ColorOptionsContainer = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 10px; // Adjust spacing as needed
`;

const ColorOption = styled.span`
  width: 15px; // 버튼 너비
  height: 15px; // 버튼 높이
  margin-right: 10px; // 버튼 사이 간격
  border: 1px solid #ddd; // 기본 테두리
  display: inline-block;
  background-color: ${(props) => props.color}; // 배경색 props로 설정
  cursor: pointer;
  &:hover {
    border: 2px solid #333;
  }
  // 선택된 색상에 대한 스타일
  ${(props) =>
    props.$isSelected &&
    `
border: 2px solid black; // 선택 시 테두리 굵게
`}
`;

export const ItemCard = ({
  id,
  images,
  title,
  price,
  onClick,
  onColorClick,
}) => {
  const [isHovered, setIsHovered] = useState(false); // 호버 상태 관리
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  // 이미지 배열의 길이 확인 후 적절한 이미지 표시
  const displayImage = images.length > 1 && isHovered ? images[1] : images[0];

  const colors = ["#FF4136", "#2ECC40", "#0074D9"];

  return (
    <Card
      onClick={() => onClick(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={displayImage} alt={title} />
      <Name>{title}</Name>
      <Price>${price}</Price>
      <ColorOptionsContainer>
        {colors.map((color) => (
          <ColorOption
            key={color}
            color={color}
            $isSelected={color === selectedColor}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from bubbling up
              setSelectedColor(color); // Update the selected color
              onColorClick(color);
            }}
          />
        ))}
      </ColorOptionsContainer>
    </Card>
  );
};
