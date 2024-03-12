import React from "react";
import styled from "styled-components";

const Layout = styled.main`
  margin-top: 90px;
`;

const Main = () => {
  return (
    <Layout>
      {Array.from({ length: 30 }, (_, idx) => (
        <p key={idx}>Main</p>
      ))}
    </Layout>
  );
};

export default Main;
