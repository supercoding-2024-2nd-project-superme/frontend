import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { v4 as uuid4 } from "uuid";

const Layout = styled.div`
  width: 100%;
  max-width: 550px;
`;

const ImgPreviewWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 5px;
`;

const Label = styled.label`
  font-size: 0.8rem;
`;

const SlideImg = styled.img`
  width: 100%;
  height: ${(props) => `${props.$imgSize}px`};
  cursor: pointer;
`;

const SubSlider = styled.div`
  img {
    padding: 10px;
  }
`;

const SlideImgSub = styled.img`
  cursor: pointer;
`;

const DefaultImgWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => `${props.$imgSize}px`};
  border: 1px solid var(--color-lightgray);
  cursor: pointer;
  &:hover > img {
    transform: scale(1.2);
  }
`;

const DefaultImg = styled.img`
  transition: all 0.5s;
  width: 100px;
  height: 100px;
`;

const InputFile = styled.input`
  display: none;
`;

const ImgUploadBtn = styled.label`
  text-align: center;
  width: 150px;
  padding: 0.4rem;
  border-radius: 5px;
  background-color: var(--color-white);
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--color-black);
  border: 3px solid var(--color-lightgray);
  margin-top: 20px;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`;

export default function RegistImage() {
  const [imgSize, setImgSize] = useState(0);
  const [imgs, setImgs] = useState([]);
  const imgRef = useRef(null);

  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
  };

  const settingsSub = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 500,
    draggable: false,
  };

  // 이미지 미리보기
  const handleFile = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImgs((prevImg) => [...prevImg, reader.result]);
          }
        };
      });
    }
  };

  // 이미지 사이즈 자동 조절 (반응형)
  useEffect(() => {
    const handleResize = () => {
      if (imgRef.current) {
        const newImgSize = imgRef.current.offsetWidth;
        setImgSize(newImgSize);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout ref={imgRef}>
      <Label>Upload Product Images</Label>
      <ImgPreviewWrapper $imgSize={imgSize}>
        {imgs.length > 0 ? (
          <>
            <Slider {...settings}>
              {imgs.map((img) => (
                <SlideImg src={img} key={uuid4()} alt="mainImg" $imgSize={imgSize} />
              ))}
            </Slider>
            <SubSlider>
              <Slider {...settingsSub}>
                {imgs.map((img) => (
                  <SlideImgSub src={img} key={uuid4()} alt="mainImg" $imgSize={imgSize} />
                ))}
              </Slider>
            </SubSlider>
          </>
        ) : (
          <DefaultImgWrapper htmlFor="file" $imgSize={imgSize}>
            <DefaultImg src="/assets/images/camera.png"></DefaultImg>
          </DefaultImgWrapper>
        )}

        <ImgUploadBtn htmlFor="file">Upload Images</ImgUploadBtn>
        <InputFile type="file" id="file" multiple accept="image/*" onChange={handleFile} />
      </ImgPreviewWrapper>
    </Layout>
  );
}
