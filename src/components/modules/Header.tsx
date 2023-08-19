import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Checkbox,
  IconButton,
  Box,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { IHeaderCategoryData } from "../../Interfaces";

export default function Header({
  categoryId,
  categoryName,
}: IHeaderCategoryData) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const navigate = useNavigate();

  let params = Object.fromEntries(searchParams.entries());

  const [searchValue, setSearchValue] = useState("");
  const [categoryCheck, setCategoryCheck] = useState(false);

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    searchValue
      ? categoryCheck
        ? (params = {
            q: searchValue.trim().toLocaleLowerCase(),
            category: categoryId,
          })
        : (params = { q: searchValue.trim().toLocaleLowerCase() })
      : delete params.q;
    navigate({
      pathname: "/products",
      search: `${createSearchParams(params)}`,
    });
  };

  return (
    <Flex
      w="100vw"
      h="10vh"
      backgroundColor="gray.900"
      boxShadow="lg"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justifyContent="space-evenly" alignItems="center">
        <Image
          src="/assets/handshake.png"
          width="100px"
          height="100px"
          mr="2rem"
        />
        <InputGroup>
          <form onSubmit={(event) => handleClick(event)}>
            <Input
              variant="filled"
              placeholder="Busca productos, marcas y más..."
              w="3xl"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
          </form>
          <InputRightElement>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              width="100%"
              gap={3}
            >
              {categoryName && (
                <HStack gap={5}>
                  <Divider orientation="vertical" color="gray.500" h="20px" />

                  <Checkbox
                    whiteSpace="nowrap"
                    color="gray.500"
                    onChange={() => setCategoryCheck(!categoryCheck)}
                    isChecked={categoryCheck}
                  >
                    Solo en {categoryName}
                  </Checkbox>

                  <Divider orientation="vertical" color="gray.500" h="20px" />
                </HStack>
              )}
              <IconButton
                aria-label="Buscar"
                icon={<SearchIcon />}
                onClick={(event) => handleClick(event)}
              />
            </Box>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}
