import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTruck } from "react-icons/fa";

// 컨테이너 섹션 스타일
const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 650px; // 제품 정보의 너비
  padding: 20px;
  border-radius: 8px;
  margin: 0 auto; // 중앙 정렬
  background: #ffffff;
  @media (max-width: 650px) {
    // When the viewport width is 650px or less, switch to grid layout
    display: grid;
    grid-template-columns: 1fr; // Single column grid
    width: 100%; // Full width of the container
    // Add any additional grid settings you may need
  }
`;

// 제품 타이틀 스타일
const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 25px; // 제목 아래 여백
`;

// 제품 가격 스타일
const Price = styled.span`
  font-size: 15px;
  margin-bottom: 25px; // 가격 아래 여백
  border-bottom: 1px solid #ccc; // 가격 아래 선 추가
  padding-bottom: 40px; // 가격 아래 여백 추가
`;

// 색상 선택 옵션 스타일
const ColorSelector = styled.div`
  display: flex; // 색상 옵션들을 가로로 나열
  flex-direction: column; // 요소들을 세로로 쌓기 위해 변경
  align-items: flex-start; // 요소들을 왼쪽 정렬
  margin-bottom: 16px; // 다음 요소와의 여백
`;

// 색상 옵션 버튼 스타일
const ColorOption = styled.button`
  width: 30px; // 버튼 너비
  height: 30px; // 버튼 높이
  margin-right: 10px; // 버튼 사이 간격
  border: 1px solid #ddd; // 기본 테두리
  display: flex; // 플렉스박스를 사용하여 내용 중앙 정렬
  justify-content: center; // 가로 방향 중앙 정렬
  align-items: center; // 세로 방향 중앙 정렬
  background-color: ${(props) => props.color}; // 배경색 props로 설정
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5; // 마우스 호버 시 배경색 변경
  }
  // 선택된 색상에 대한 스타일
  ${(props) =>
    props.isSelected &&
    `
  border: 2px solid black; // 선택 시 테두리 굵게
`}
`;

// 색상 선택기 위치 고정을 위한 컨테이너
const ColorSelectorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px; // 충분한 높이를 주어 색상 이름을 표시할 공간 확보
`;

// 색상 이름 스타일
const ColorName = styled.span`
  font-weight: bold; // 글꼴 볼드
  margin-bottom: 1px; // 라벨 아래 여백
`;

const ColorOptionsContainer = styled.div`
  display: flex; // 옵션들을 가로로 나열
`;

const SizeOptionsContainer = styled.div`
  display: flex; // 옵션들을 가로로 나열
`;

// 사이즈 라벨 스타일
const SizeLabel = styled.p`
  font-weight: bold; // 글꼴 볼드
  margin-bottom: 10px; // 라벨 아래 여백
`;

// 사이즈 선택 옵션 스타일
const SizeSelector = styled.div`
  display: flex; // 사이즈 옵션들을 가로로 나열
  flex-direction: column; // 요소들을 세로로 쌓기 위해 변경
  align-items: flex-start; // 요소들을 왼쪽 정렬
  margin-top: 20px;
  margin-bottom: 25px;
`;

// 사이즈 옵션 버튼 스타일
const SizeOption = styled.button`
  width: 40px; // 버튼 너비
  height: 40px; // 버튼 높이
  margin-right: 10px; // 버튼 사이 간격
  border: 1px solid #ddd; // 기본 테두리
  font-size: 16px; // 글꼴 크기
  line-height: 40px; // 버튼 안 글자 세로 중앙 정렬
  text-align: center; // 글자 가로 중앙 정렬
  background-color: transparent; // 배경색 투명
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5; // 마우스 호버 배경색
  }
  // 선택된 사이즈에 대한 스타일
  ${(props) =>
    props.isSelected &&
    `
  border: 2px solid black; // 선택 시 테두리 굵게
  font-weight: bold; // 선택 시 글꼴 볼드
`}
`;

const ShippingInfo = styled.p`
  display: flex; // 아이콘과 텍스트를 위한 플렉스 컨테이너
  align-items: center; // 아이콘과 텍스트 수직 중앙 정렬
  margin-top: 10px; // 사이즈 선택기와의 상단 여백
  font-size: 14px; // 텍스트 크기
  svg {
    margin-right: 10px; // 아이콘과 텍스트 사이 간격
  }
`;

// '장바구니에 추가' 버튼 스타일
const AddToCartButton = styled.button`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: 2px solid black;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 10px; // 버튼 간 여백
  display: flex;
  justify-content: center; // 가로축으로 텍스트를 중앙 정렬
  align-items: center; // 세로축으로 텍스트를 중앙 정렬
  position: relative; // after의용 클래스를 위한 상대적 위치 설정
  &:hover {
    background-color: #f5f5f5; // 호버 배경색
    &:after {
      content: "→"; // 호버 시 화살표
      display: block;
      position: absolute; // 버튼 내 절대적 위치
      right: 10px; // 오른쪽 끝에서 10px 떨어진 곳에 위치
    }
  }
`;

// 'Shop Pay로 구매' 버튼 스타일
const ActionButton = styled.button`
  background-color: #5c6ac4; // Shop Pay 버튼 색상
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 5px; // 버튼 간 여백
  &:hover {
    background-color: #4a5aa1; // 호버 배경색 변경
  }
`;

const MorePaymentOptions = styled.p`
  color: #555; // 글자 색상
  font-size: 14px; // 글자 크기
  text-align: center; // 중앙 정렬
  margin-top: 10px; // 버튼과의 상단 여백
  cursor: pointer; // 클릭 가능 표시
  &:hover {
    text-decoration: underline; // 호버 시 밑줄
  }
  margin-bottom: px;
`;

const DetailHeader = styled.h2`
  font-size: 18px; // 제목 글꼴 크기
  font-weight: bold; // 제목 글꼴 두께
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
// 상세정보 리스트 스타일
const DetailList = styled.ul`
  list-style: none; // 기본 리스트 스타일 제거
  padding-left: 0; // 기본 패딩 제거
`;

// 상세정보 리스트 항목 스타일
const DetailItem = styled.li`
  font-size: 14px; // 리스트 항목 글꼴 크기
  &:before {
    content: "•"; // 불릿 대신 사용할 문자
    margin-right: 8px; // 문자와 텍스트 사이의 여백
    color: black; // 문자 색상
  }
`;

const SizeChartContainer = styled.div`
  margin-top: 20px; // 상단 여백
`;

// 표 제목 스타일
const SizeChartTitle = styled.p`
  font-size: 18px; // 제목 글꼴 크기
  font-weight: bold; // 제목 글꼴 두께
  margin-bottom: 10px; // 표와의 여백
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
`;

// 표 스타일
const SizeChartTable = styled.table`
  width: 100%; // 전체 너비 사용
  border-collapse: collapse; // 테두리 겹치기 방지
  margin-bottom: 20px; // 하단 여백
`;

// 표의 헤더 셀 스타일
const SizeChartHeader = styled.th`
  text-align: center; // 왼쪽 정렬
  font-size: 14px; // 글꼴 크기
  padding-bottom: 10px; // 셀 아래쪽 패딩
`;

// 표의 행 셀 스타일
const SizeChartCell = styled.td`
  text-align: center; // 왼쪽 정렬
  font-size: 14px; // 글꼴 크기
  padding: 8px 0; // 셀 상하 패딩
`;

const NoticeHeader = styled.p`
  text-transform: uppercase;
  font-size: 15px;
  margin-bottom: 10px; // 여백을 없애거나 조절하세요
  cursor: pointer;
`;

const ToggleButton = styled.span`
  font-size: 15px; // Chevron 사이즈에 맞게 조절
  cursor: pointer;
  user-select: none; // 텍스트 선택 방지

  &::after {
    content: "${(props) =>
      props.isExpanded ? "▲" : "▼"}"; // 상태에 따라 아이콘 변경
    display: inline-block;
    margin-left: 5px;
    transition: transform 0.2s ease; // 부드러운 아이콘 회전을 위한 트랜지션
    transform: ${(props) => (props.isExpanded ? "rotate(180deg)" : "none")};
  }
`;

const Description = styled.div`
  max-height: ${(props) => (props.isExpanded ? "100%" : "0")};
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  border-bottom: 1px solid #ccc;
`;

// 상품 정보 컴포넌트
const ProductInfo = ({ product }) => {
  useEffect(() => {
    if (colorData.length > 0) {
      setSelectedColor(colorData[0].color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 색상 및 사이즈 데이터
  const colorData = [
    { color: "#FF4136", name: "Red" },
    { color: "#2ECC40", name: "Green" },
    { color: "#0074D9", name: "Blue" },
  ];
  const sizes = ["S", "M", "L", "XL"]; // 실제 제품 사이즈에 맞춰 교체 필요
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null); // 선택된 색상 상태 추가
  const [selectedSize, setSelectedSize] = useState(null);

  // 색상 및 사이즈 선택 핸들러
  const handleSelectColor = (color) => {
    console.log("Selected color:", color);
    setSelectedColor(color);
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    console.log("Selected size:", size);
  };

  const handleAddToCart = () => {
    console.log("Added to cart");
  };

  const handleToggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Container>
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <ColorSelectorContainer>
        <ColorSelector>
          {selectedColor && (
            <ColorName>
              COLOR — {colorData.find((c) => c.color === selectedColor).name}
            </ColorName>
          )}
          <ColorOptionsContainer>
            {colorData.map(({ color, name }) => (
              <ColorOption
                key={color}
                color={color}
                onClick={() => handleSelectColor(color)}
                isSelected={selectedColor === color}
              />
            ))}
          </ColorOptionsContainer>
        </ColorSelector>
      </ColorSelectorContainer>
      <SizeSelector>
        <SizeLabel>Size</SizeLabel>
        <SizeOptionsContainer>
          {sizes.map((size) => (
            <SizeOption
              key={size}
              onClick={() => handleSelectSize(size)}
              isSelected={selectedSize === size}
            >
              {size}
            </SizeOption>
          ))}
        </SizeOptionsContainer>
      </SizeSelector>
      <ShippingInfo>
        <FaTruck /> Free shipping for orders over USD${product.price}
      </ShippingInfo>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
      <ActionButton onClick={handleAddToCart}>Buy with Shop Pay</ActionButton>
      <MorePaymentOptions>More payment options</MorePaymentOptions>
      <DetailHeader>DETAILS</DetailHeader>
      <DetailList>
        <DetailItem>
          Only on DANTON online store and directly managed stores (TOKYO / KOBE)
        </DetailItem>
        <DetailItem>
          A basic sweatshirt with moderately relaxed fitting
        </DetailItem>
        <DetailItem>A soft and lightweight texture lining</DetailItem>
        <DetailItem>
          Accented with the DANTON logo print on the chest
        </DetailItem>
        <DetailItem>88% Cotton, 12% Polyester</DetailItem>
        <DetailItem>Rib: 80% Cotton, 20% Polyester</DetailItem>
        <DetailItem>Made in China</DetailItem>
      </DetailList>
      <SizeChartContainer>
        <SizeChartTitle>SIZE & FIT (cm)</SizeChartTitle>
        <SizeChartTable>
          <thead>
            <tr>
              <SizeChartHeader>SIZE</SizeChartHeader>
              <SizeChartHeader>BODY LENGTH</SizeChartHeader>
              <SizeChartHeader>BODY WIDTH</SizeChartHeader>
              <SizeChartHeader>SLEEVE LENGTH</SizeChartHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <SizeChartCell>size</SizeChartCell>
              <SizeChartCell>bodyLength</SizeChartCell>
              <SizeChartCell>bodyWidth</SizeChartCell>
              <SizeChartCell>sleeveLength</SizeChartCell>
            </tr>
          </tbody>
        </SizeChartTable>
      </SizeChartContainer>
      <NoticeHeader onClick={handleToggleDescription}>
        Notice of Inventory
        <ToggleButton isExpanded={isDescriptionExpanded} />
      </NoticeHeader>
      <Description isExpanded={isDescriptionExpanded}>
        {product.description}
      </Description>
    </Container>
  );
};

export default ProductInfo;
