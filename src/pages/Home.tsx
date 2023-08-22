import { Box, Button, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import Header from "../components/modules/Header";
import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import { URLS } from "../api/urls";
import { ISortData } from "../Interfaces";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Home() {
  const [categoryList, setCategoryList] = useState<ISortData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchData(URLS.GET_CATEGORIES).then((data) => {
      console.log(data);
      setCategoryList(data);
    });
    setIsLoading(false);
  }, []);

  const handleClick = (id: string) => {
    const params = { category: id };
    navigate({
      pathname: "/products",
      search: `${createSearchParams(params)}`,
    });
  };
  return (
    <Box overflowX={"hidden"}>
      <Header categoryId="" categoryName="" />
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading>Bienvenido al sitio!</Heading>
        <Text fontSize={"xl"} my={"1rem"}>
          Comienza a comprar buscando o seleccionando una categoría
        </Text>
        <Flex mx={"5vw"} justifyContent={"center"} alignItems={"center"}>
          <Skeleton isLoaded={!isLoading}>
            {categoryList.map(({ id, name }: ISortData) => (
              <Button
                boxShadow={"dark-lg"}
                key={id}
                onClick={() => handleClick(id)}
                m={"1rem"}
                w={"15rem"}
                h={"5rem"}
              >
                {" "}
                {name}{" "}
              </Button>
            ))}
          </Skeleton>
        </Flex>
      </Flex>
    </Box>
  );
}
