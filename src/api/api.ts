import axios from "axios";

export const fetchData = async (path: string) => {
  const response = await axios.get(`https://api.mercadolibre.com/${path}`);
  return response.data;
};
