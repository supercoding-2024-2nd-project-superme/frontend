import React, { useEffect } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-black);
  transition: all 0.3s;
  opacity: ${(props) => (props.$isModalOpen ? 0.5 : 0)};
  z-index: ${(props) => (props.$isModalOpen ? 1000 : -1)};
`;

export default function Backdrop({ isModalOpen, handleModal }) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isModalOpen]);

  return <ModalBackdrop $isModalOpen={isModalOpen} onClick={handleModal} />;
}
