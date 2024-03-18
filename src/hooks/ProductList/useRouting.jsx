// hooks/useRouting.js
import { useNavigate } from "react-router-dom";

const useRouting = () => {
  const navigate = useNavigate();

  function goToProduct(id) {
    navigate(`/products/${id}`);
  }

  return { goToProduct };
};

export default useRouting;
