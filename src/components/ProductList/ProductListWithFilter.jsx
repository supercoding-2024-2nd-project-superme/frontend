import React from "react";
import styled from "styled-components";

const FilterDropdownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 20px;
`;

const FilterDropdown = styled.select`
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

const ProductListWithFilter = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const selectedOption = e.target.value;
    onFilterChange(selectedOption); // 선택한 옵션을 부모 컴포넌트로 전달
  };

  return (
    <FilterDropdownContainer>
      <FilterDropdown onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="price_low_high">Price: Low to High</option>
        <option value="price_high_low">Price: High to Low</option>
        <option value="recently_registered">Recently registered</option>
        <option value="previous_registration">Previous registration</option>
        {/* 추가적인 필터 옵션 */}
      </FilterDropdown>
    </FilterDropdownContainer>
  );
};

export default ProductListWithFilter;
