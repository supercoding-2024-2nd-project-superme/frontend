import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductList from "./ProductList";

const MainContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 90px;
`;

const SliderWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  height: 700px;
  overflow: hidden;
  overflow-y: hidden; /* 세로 스크롤 숨김 */
  position: relative;
`;

const SlideImage = styled.img`
  width: 100%;
  max-height: 100%; /* 이미지의 최대 높이 설정 */
  object-fit: contain;
`;

const SliderText = styled.p`
  font-size: 24px;
  letter-spacing: 5px;
  color: var(--color-white);
  z-index: 9999;
  position: absolute;
  top: 80%;
  left: 10%;
`;

const Main = () => {
  const sliderRef = useRef(null);

  const images = [
    "https://danton.com/cdn/shop/files/PC-WOMEN_de00abda-ed74-44ad-9210-f51c04a45d17_2808x.jpg?v=1710133780",
    "https://danton.com/cdn/shop/files/20240207-pc-men_2808x.jpg?v=1707290428",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <MainContainer>
      <SliderWrapper>
        <Slider {...settings} ref={sliderRef}>
          {images.map((image, index) => (
            <div key={index}>
              <SlideImage src={image} alt={`slide-${index}`} />
            </div>
          ))}
        </Slider>
        <SliderText>SPRING & SUMMER</SliderText>
      </SliderWrapper>
      <ProductList />
    </MainContainer>
  );
};

export default Main;
