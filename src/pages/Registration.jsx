import React, { useState } from "react";
import styled from "styled-components";
import RegistImage from "../components/ProductRegistration/RegistImage";
import RegistInfo from "../components/ProductRegistration/RegistInfo";

const Layout = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
  margin: 90px 0;
`;

const RegistTitle = styled.p`
  width: 100%;
  font-size: 0.8rem;
  margin-top: 50px;
  text-align: left;
`;

const RegistWrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-top: 30px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    max-width: 600px;
  }
`;

const SubmitBtn = styled.button`
  margin-top: 50px;
  padding: 0.8rem 3rem;
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: 5px;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function Registration() {
  const [form, setForm] = useState({
    categoryName: "Select Category",
    itemName: "",
    price: "",
    description: "",
    itemStocks: [initItemStocks],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrice = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: +value }));
  };

  const handleCategory = (categoryName) => {
    setForm((prev) => ({ ...prev, categoryName }));
  };

  const handleItemStocks = (idx, type, value) => {
    setForm((prev) => ({
      ...prev,
      itemStocks: prev.itemStocks.map((e, i) => {
        if (idx === i) {
          return {
            ...e,
            [type]: value,
          };
        }
        return e;
      }),
    }));
  };

  const handleItemStocksAdd = (type) => {
    if (type === "plus") {
      setForm((prev) => ({ ...prev, itemStocks: [...prev.itemStocks, initItemStocks] }));
    } else {
      if (form.itemStocks.length > 1) {
        setForm((prev) => ({ ...prev, itemStocks: prev.itemStocks.slice(0, -1) }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch("url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => res.json());

    console.log(data);
  };

  return (
    <Layout onSubmit={handleSubmit}>
      <RegistTitle>Home / Add Products</RegistTitle>
      <RegistWrapper>
        <RegistImage />
        <RegistInfo
          form={form}
          handleChange={handleChange}
          handleItemStocks={handleItemStocks}
          handleItemStocksAdd={handleItemStocksAdd}
          handleCategory={handleCategory}
          handlePrice={handlePrice}
        />
      </RegistWrapper>
      <SubmitBtn>Add Product</SubmitBtn>
    </Layout>
  );
}

const initItemStocks = {
  color: "",
  size: "",
  stockQty: 1,
};
