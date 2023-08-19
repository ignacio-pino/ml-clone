import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { IFilterList, IFilterListValues } from "../../Interfaces";
import RangeSelector from "./RangeSelector";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FilterList({ id, name, type, values }: IFilterList) {
  const [showMore, setShowMore] = useState(false);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const navigate = useNavigate();

  let params = Object.fromEntries(searchParams.entries());

  let shortenedValues: IFilterListValues[] = [];

  const handleClick = (valueId: string) => {
    id === "category"
      ? (params = { [id]: valueId })
      : (params = { ...params, [id]: valueId });
    navigate({
      pathname: "/products",
      search: `${createSearchParams(params)}`,
    });
  };

  const valueList = ({ id, name, results }: IFilterListValues) => (
    <Stack>
      <HStack>
        <Button variant="link" fontSize={"sm"} onClick={() => handleClick(id)}>
          <Text isTruncated my={1}>
            {name}
          </Text>
          <Text textColor={"gray.500"} ml={1}>
            ({results})
          </Text>{" "}
        </Button>
      </HStack>
    </Stack>
  );

  if (values.length > 9) {
    shortenedValues = values.slice(0, 8);
  }

  return (
    <Stack id={id}>
      <Box my="5">
        <Text as="b">{name}</Text>
        {values.length > 9 && !showMore
          ? shortenedValues.map(
              ({ id, name, results }) =>
                results && results > 0 && valueList({ id, name, results })
            )
          : values.map(
              ({ id, name, results }) =>
                results && results > 0 && valueList({ id, name, results })
            )}
        {values.length > 9 && (
          <Button
            variant="link"
            textColor={"purple.400"}
            fontSize={"sm"}
            onClick={() => setShowMore(!showMore)}
            aria-label="Mostrar mas o menos resultados"
          >
            {showMore ? "Mostrar menos" : "Mostrar más"}
          </Button>
        )}
        {type === "range" && <RangeSelector />}
      </Box>
    </Stack>
  );
}
