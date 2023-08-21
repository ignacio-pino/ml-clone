import {
  Card,
  Stack,
  CardBody,
  Image,
  Text,
  HStack,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { IProductCard } from "../../Interfaces";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  title,
  price,
  currency_id,
  original_price,
  free_shipping,
  thumbnail,
}: IProductCard) {
  const navigate = useNavigate();

  const params = { item: id };

  const handleClick = () => {
    navigate({
      pathname: "/item",
      search: `${createSearchParams(params)}`,
    });
  };

  return (
    <Card
      data-testid="productCard"
      id={id}
      direction={{ base: "column", sm: "row" }}
      variant="outline"
      p={1}
      boxShadow={"dark-lg"}
      maxW={"50vw"}
    >
      <Image objectFit="fill" h="130px" w="130px" src={thumbnail} alt={title} />

      <Stack overflow={"hidden"}>
        <CardBody p={3}>
          <Button
            variant={"link"}
            size="lg"
            mt={-2}
            noOfLines={1}
            textOverflow={"ellipsis"}
            onClick={() => handleClick()}
          >
            <Tooltip
              openDelay={500}
              label={title}
              aria-label={title}
              placement="top-end"
            >
              {title}
            </Tooltip>
          </Button>

          {original_price && (
            <HStack gap={0.5} as={"del"} mt={1} ml={0.5}>
              <Text fontSize="x-small" textColor={"gray.500"}>
                {currency_id === "USD" ? "U$S" : "$"}{" "}
                {original_price.split(".")[0]}
              </Text>
              <Text fontSize={"xx-small"} mt={-1} textColor={"gray.500"}>
                {original_price.split(".")[1]}
              </Text>
            </HStack>
          )}
          <HStack mb="2" mt={original_price ? "-2" : "5"}>
            <HStack gap={0.5}>
              <Text as="b" fontSize={"larger"}>
                {currency_id === "USD" ? "U$S" : "$"} {price.split(".")[0]}
              </Text>
              <Text as="b" fontSize={"x-small"} mt={-1}>
                {price.split(".")[1]}
              </Text>
            </HStack>

            {original_price && (
              <Text fontSize={"xs"} textColor={"purple.400"}>
                {Math.floor(
                  ((parseFloat(original_price) - parseFloat(price)) /
                    parseFloat(original_price)) *
                    100
                )}
                % OFF
              </Text>
            )}
          </HStack>
          {free_shipping && (
            <Text
              as="mark"
              fontWeight={"bold"}
              px={2}
              fontSize={"sm"}
              backgroundColor={"purple.400"}
              borderRadius={"4px"}
              textColor={"purple.900"}
            >
              Envío gratis
            </Text>
          )}
        </CardBody>
      </Stack>
    </Card>
  );
}
