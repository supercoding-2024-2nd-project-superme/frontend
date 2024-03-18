import React from "react";
import styled from "styled-components";

const Gallery = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImage = styled.img`
  width: 70%;
  height: auto;
  position: sticky;
  top: 0px;
`;

const ProductImageGallery = ({ images, title }) => (
  <Gallery>
    <MainImage src={images} alt={title} />
  </Gallery>
);

export default ProductImageGallery;
