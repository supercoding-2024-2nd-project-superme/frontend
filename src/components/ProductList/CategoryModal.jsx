import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  position: fixed;
  left: ${(props) => (props.$isModalOpen ? "0" : "-100%")};
  opacity: ${(props) => (props.$isModalOpen ? "1" : "0")};
  top: 0;
  width: 100%;
  max-width: 333px;
  height: 100vh;
  z-index: 1500;
  transition: all 0.5s;
  background-color: var(--color-white);
  padding: 1.5rem 2rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  font-size: 1.1rem;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CloseIcon = styled(IoIosClose)`
  font-size: 2rem;
  cursor: pointer;
`;

const CategoryOverlay = ({ isModalOpen, handleModal, categories }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleCategoryClick = (categoryName) => {
    // 카테고리 이름에 따라 다른 경로로 이동
    navigate(`/productlist/${categoryName}`);
    handleModal(); // 모달 닫기
  };

  return (
    <Layout $isModalOpen={isModalOpen}>
      <List>
        <Item onClick={handleModal}>
          <CloseIcon />
        </Item>
        {categories.map((category, index) => (
          <Item key={index} onClick={() => handleCategoryClick(category)}>
            {category}
          </Item>
        ))}
      </List>
    </Layout>
  );
};

// CategoryModal 컴포넌트에서 카테고리 목록을 prop으로 전달
function CategoryModal({ isModalOpen, handleModal }) {
  const categories = [
    "category",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  return ReactDOM.createPortal(
    <CategoryOverlay
      isModalOpen={isModalOpen}
      handleModal={handleModal}
      categories={categories}
    />,
    document.getElementById("overlay")
  );
}

export default CategoryModal;
