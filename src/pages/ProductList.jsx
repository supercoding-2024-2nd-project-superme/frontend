import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/ProductList/useFetch";
import usePagination from "../hooks/ProductList/usePagination";
import useRouting from "../hooks/ProductList/useRouting";
import { ItemCard } from "../components/ProductList/ItemCard";
import ProductListWithFilter from "../components/ProductList/ProductListWithFilter";
import CategoryModal from "../components/ProductList/CategoryModal";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import Backdrop from "../common/Backdrop";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const Breadcrumbs = styled.div`
  display: flex;
  position: relative;
  top: 110px;
  right: 490px;

  @media (max-width: 1024px) {
    top: 110px; // 모바일에서는 상단 여백을 더 줄입니다.
    right: 350px; // 모바일에서는 오른쪽 여백을 더 줄입니다.
  }
  @media (max-width: 768px) {
    top: 90px; // 모바일에서는 상단 여백을 더 줄입니다.
    right: 220px; // 모바일에서는 오른쪽 여백을 더 줄입니다.
  }
  @media (max-width: 480px) {
    top: 90px; // 모바일에서는 상단 여백을 더 줄입니다.
    right: 110px; // 모바일에서는 오른쪽 여백을 더 줄입니다.
  }
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

const FilterIcon = styled(TbAdjustmentsHorizontal)`
  font-size: 1rem;
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
  width: 30px;
  height: 30px;
  border-radius: 50%; // 버튼을 원형으로 만듦
  margin: 0 5px; // 버튼 사이에 약간의 공간을 둠
  border: none; // 깔끔한 모양을 위해 테두리 없음
  background-color: #000; // 검은색 배경
  color: #fff; // 흰색 텍스트/아이콘 색상
  display: flex;
  justify-content: center; // 내용물을 가로 방향으로 가운데 정렬
  align-items: center; // 내용물을 세로 방향으로 가운데 정렬
  cursor: pointer;
  font-size: 1em; // 폰트 크기는 선호하는 대로 설정

  &:hover:not(:disabled) {
    background-color: #333; // 호버 시 버튼을 어둡게 함
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const PageNumber = styled.button`
  margin: 0 5px;
  border: none;
  background-color: ${(props) =>
    props.current ? "#ddd" : "transparent"}; // Highlight the current page
  font-weight: ${(props) =>
    props.current ? "bold" : "normal"}; // Make the current page number bold
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ProductList = () => {
  const { category } = useParams(); // 동적 파라미터 가져오기
  const location = useLocation();
  const apiUrl = `https://dummyjson.com/products?category=${category}`; // 동적으로 변경할 API URL에 카테고리 추가
  const { data: products } = useFetch(apiUrl); // 변경된 훅 사용
  const { currentData, next, prev, jump, currentPage, maxPage } = usePagination(
    products,
    16
  );

  const { goToProduct } = useRouting();
  const displayCategory =
    location.pathname === "/productlist/category"
      ? "SHOW"
      : category?.toUpperCase() || "CATEGORY";
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
    if (products && category) {
      const filteredData = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filteredData);
    } else {
      // 카테고리가 지정되지 않았거나, 유효하지 않은 경우 모든 상품을 보여줍니다.
      setFilteredProducts(products);
    }
  }, [products, category]); // products 또는 category가 변경될 때마다 실행

  const handleModal = () => {
    if (isCategoryOpen) {
      setIsCategoryOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const jumpToPage = (page) => {
    jump(page);
    scrollToTop();
  };

  return (
    <>
      <Breadcrumbs>
        <StyledLink to="/">Home</StyledLink>/{displayCategory} ALL
        {/* 동적 파라미터 사용 */}
      </Breadcrumbs>
      <MainContent>
        <ShowAll>{displayCategory} ALL </ShowAll>
        <FilterAndCategoryContainer>
          <CategoryButton onClick={() => setIsCategoryOpen(true)}>
            <FilterIcon />
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
                category={product.category}
                colors={product.colors}
                onClick={goToProduct}
                onColorClick={(color) => {
                  // 색상 선택 시 상품 상세 페이지로 이동하는 로직을 추가합니다.
                  goToProduct(product.id, color);
                }}
              />
            )
          )}
        </Grid>
        <PaginationContainer>
          {currentPage !== 1 && (
            <Button
              onClick={() => {
                prev();
                scrollToTop();
              }}
            >
              <SlArrowLeft />
            </Button>
          )}
          {Array.from({ length: maxPage }, (_, i) => (
            <PageNumber
              key={i + 1}
              onClick={() => jumpToPage(i + 1)}
              current={currentPage === i + 1}
            >
              {i + 1}
            </PageNumber>
          ))}
          {currentPage !== maxPage && (
            <Button
              onClick={() => {
                next();
                scrollToTop();
              }}
            >
              <SlArrowRight />
            </Button>
          )}
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
