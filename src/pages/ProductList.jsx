import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/ProductList/useFetch";
import usePagination from "../hooks/ProductList/usePagination";
import useRouting from "../hooks/ProductList/useRouting";
import { ItemCard } from "../components/ProductList/ItemCard";
import ProductListWithFilter from "../components/ProductList/ProductListWithFilter";
import CategoryModal from "../components/ProductList/CategoryModal";

import Backdrop from "../common/Backdrop";

const Breadcrumbs = styled.div`
  display: flex;
  position: relative;
  top: 110px;
  right: 490px;
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black; // 원하는대로 색상 조절
  &:hover {
    text-decoration: underline;
  }
`;

const ShowAll = styled.div`
  display: grid;
  font-size: 24px;
`;

const FilterAndCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between; // 양쪽에 자동으로 공간을 만들어 줍니다.
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: space-between; // 작은 화면에서도 양쪽 배치를 유지
  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  font-size: 15px;
  font-family: sans-serif;
  gap: 8px;
  margin-bottom: 10px;

  &:hover {
    background-color: white;
  }
`;

const MainContent = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(270px, 1fr));
  gap: 10px;
  padding: 20px;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
  const { data: products } = useFetch("https://dummyjson.com/products");
  const { currentData, next, prev, jump, currentPage, maxPage } = usePagination(
    products,
    20
  );
  const { goToProduct } = useRouting();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleFilterChange = (selectedOption) => {
    let filteredData = [...products]; // 초기화
    if (selectedOption === "price_low_high") {
      // 가격 낮은 순으로 정렬
      filteredData.sort((a, b) => a.price - b.price);
    } else if (selectedOption === "price_high_low") {
      // 가격 높은 순으로 정렬
      filteredData.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filteredData);
  };

  useEffect(() => {
    // 필터 옵션이 변경될 때마다 필터링된 결과를 업데이트
    setFilteredProducts([]);
  }, [products]);

  const handleModal = () => {
    if (isCategoryOpen) {
      setIsCategoryOpen(false);
    }
  };

  return (
    <>
      <Breadcrumbs>
        <StyledLink to="/">Home</StyledLink>/SHOP ALL
      </Breadcrumbs>
      <MainContent>
        <ShowAll>SHOP All</ShowAll>
        <FilterAndCategoryContainer>
          <CategoryButton onClick={() => setIsCategoryOpen(true)}>
            Category
          </CategoryButton>
          <ProductListWithFilter onFilterChange={handleFilterChange} />
        </FilterAndCategoryContainer>
        <Grid>
          {(filteredProducts.length > 0 ? filteredProducts : currentData()).map(
            (product) => (
              <ItemCard
                key={product.id}
                id={product.id}
                images={product.images}
                title={product.title}
                price={product.price}
                onClick={goToProduct}
              />
            )
          )}
        </Grid>
        <PaginationContainer>
          <Button onClick={prev} disabled={currentPage === 1}>
            Prev
          </Button>
          {Array.from({ length: maxPage }, (_, i) => (
            <PageNumber key={i + 1} onClick={() => jump(i + 1)}>
              {i + 1}
            </PageNumber>
          ))}
          <Button onClick={next} disabled={currentPage === maxPage}>
            Next
          </Button>
        </PaginationContainer>
      </MainContent>
      {ReactDOM.createPortal(
        <Backdrop isModalOpen={isCategoryOpen} handleModal={handleModal} />,
        document.getElementById("backdrop")
      )}
      <CategoryModal isModalOpen={isCategoryOpen} handleModal={handleModal} />
    </>
  );
};

export default ProductList;
