import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ProductImageGallery from "../components/ProductDetail/ProductImageGallery";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import ProductSubList from "../components/ProductDetail/ProductSubList";

// Styled components
const ProductDetailLayout = styled.div`
  padding-top: 150px; // 헤더 높이
  padding-bottom: 150px; // 푸터 높이
  min-height: calc(100vh - 300px); // 전체 높이에서 헤더와 푸터 높이를 뺀 값
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full viewport height
  width: 100vw; // Full viewport width
`;

const ListLink = styled(Link)`
  display: block;
  margin-bottom: 20px; // 원하는대로 마진 조절
  text-decoration: none;
  color: black; // 원하는대로 색상 조절
  &:hover {
    text-decoration: underline;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  position: relative;
  top: 180px;
  right: 385px;
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black; // 원하는대로 색상 조절
  &:hover {
    text-decoration: underline;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
          // 스크롤을 상단으로 이동시킵니다.
          window.scrollTo(0, 0);
        })
        .catch((error) => console.error("Error fetching product details:", error));
    }
  }, [id]);

  if (!product) {
    return <DetailContainer>Loading...</DetailContainer>;
  }

  return (
    <>
      <Breadcrumbs>
        <StyledLink to="/">Home</StyledLink>/<ListLink to="/productlist">SHOP ALL</ListLink> /{" "}
        {product.title}
      </Breadcrumbs>
      <ProductDetailLayout>
        <ProductImageGallery images={product.images[0]} title={product.title} />
        <ProductInfo product={product} />
      </ProductDetailLayout>
      <ProductSubList />
    </>
  );
};

export default ProductDetail;
