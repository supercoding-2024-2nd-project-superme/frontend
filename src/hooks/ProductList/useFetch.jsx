import { useState, useEffect } from "react";

const useFetch = (category) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://dummyjson.com/products?category=${category}`; // category 파라미터를 반영하여 URL 생성
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        // API가 카테고리별로 필터링된 데이터를 제대로 반환한다고 가정할 때
        setData(json.products || []); // 빈 배열을 기본값으로 설정하여 에러 방지
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [category]);

  return { data, isLoading, error };
};

export default useFetch;
