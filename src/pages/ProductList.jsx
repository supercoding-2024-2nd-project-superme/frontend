import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled-components
const MainContent = styled.div`
  padding-top: 100px; // 헤더 높이
  padding-bottom: 100px; // 푸터 높이
  min-height: calc(100vh - 200px); // 전체 높이에서 헤더와 푸터 높이를 뺀 값
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    4,
    minmax(270px, 1fr)
  ); // 열 너비를 최소 px로 설정하고 1fr의 비율로 채워짐
  gap: 10px; // 그리드 간격
  padding: 20px;
  justify-content: center;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  width: 270px; // 정사각형 모양을 만들기 위해 너비 설정
  height: 270px; // 정사각형 모양을 만들기 위해 높이 설정
  margin-bottom: 10px; // 카드 사이의 간격을 주기 위해 마진 설정
  position: relative; // 이미지를 포함하는 카드를 기준으로 하위 요소를 배치하기 위해
`;

const ProductImage = styled.img`
  width: 100%; // 이미지 너비를 카드에 맞춤
  height: 100%; // 이미지 높이를 카드에 맞춤
  object-fit: contain; // 이미지가 완전히 보이도록 가로세로 비율을 유지하면서 컨테이너에 맞게 조정
  max-height: 70%; // 카드 높이의 70%까지만 이미지가 차지하도록 설정
`;

const ProductName = styled.h3`
  font-size: 14px;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  color: #333;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #eaeaea;
  }
`;

const PageNumber = styled.button`
  margin: 0 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`); // 상품 ID를 사용하여 ProductDetail 페이지로 이동
  };

  // 현재 페이지에 표시할 아이템 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호를 렌더링하기 위한 컴포넌트
  const PageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <PaginationContainer>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1} // 첫 페이지에서는 버튼 비활성화
        >
          이전
        </Button>
        {pageNumbers.map((number) => (
          <PageNumber key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </PageNumber>
        ))}
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages} // 마지막 페이지에서는 버튼 비활성화
        >
          다음
        </Button>
      </PaginationContainer>
    );
  };

  return (
    <MainContent>
      <Grid>
        {currentItems.map((product) => (
          <ItemCard
            key={product.id}
            onClick={() => handleProductClick(product.id)}
          >
            <ProductImage src={product.thumbnail} alt={product.title} />
            <ProductName>{product.title}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
          </ItemCard>
        ))}
      </Grid>
      <PageNumbers />
    </MainContent>
  );
};

export default ProductList;
