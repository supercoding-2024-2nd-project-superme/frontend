// components/common/ItemCard.jsx
import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  width: 270px;
  height: 270px;
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
  font-size: 14px;
  text-align: center;
`;

const Price = styled.p`
  font-size: 14px;
  color: #333;
`;

export const ItemCard = ({ id, images, title, price, onClick }) => {
  const [isHovered, setIsHovered] = useState(false); // 호버 상태 관리
  // 이미지 배열의 길이 확인 후 적절한 이미지 표시
  const displayImage = images.length > 1 && isHovered ? images[1] : images[0];

  return (
    <Card
      onClick={() => onClick(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={displayImage} alt={title} />
      <Name>{title}</Name>
      <Price>${price}</Price>
    </Card>
  );
};
