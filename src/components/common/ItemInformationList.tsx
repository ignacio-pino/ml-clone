import { HStack, VStack, Text, Divider, Button } from "@chakra-ui/react";
import { IItemInformationList } from "../../Interfaces";
import { EmailIcon, InfoIcon, LockIcon, RepeatIcon } from "@chakra-ui/icons";

export default function ItemInformationList({
  itemInformationList,
}: {
  itemInformationList: IItemInformationList;
}) {
  const {
    condition,
    sold_quantity,
    title,
    original_price,
    price,
    currency_id,
    shipping,
    available_quantity,
  } = itemInformationList;

  const soldQuantityReference = [
    { min: 6, max: 25, result: 5 },
    { min: 26, max: 50, result: 25 },
    { min: 51, max: 100, result: 50 },
    { min: 101, max: 150, result: 100 },
    { min: 151, max: 200, result: 150 },
    { min: 201, max: 250, result: 200 },
    { min: 251, max: 500, result: 250 },
    { min: 501, max: 5000, result: 500 },
    { min: 5001, max: 50000, result: 5000 },
    { min: 50001, max: 500000, result: 50000 },
  ];

  const availableQuantityReference = [
    { min: 51, max: 100, result: 50 },
    { min: 101, max: 150, result: 100 },
    { min: 151, max: 200, result: 150 },
    { min: 201, max: 250, result: 200 },
    { min: 251, max: 500, result: 250 },
    { min: 501, max: 5000, result: 500 },
    { min: 5001, max: 50000, result: 5000 },
    { min: 50001, max: 99999, result: 50000 },
  ];

  const convertToRange = ({
    value,
    reference,
  }: {
    value: number;
    reference: { min: number; max: number; result: number }[];
  }): number | null => {
    const matchingRange = reference.find(
      ({ min, max }) => value >= min && value <= max
    );

    return matchingRange ? matchingRange.result : null;
  };

  return (
    <VStack
      alignItems={"flex-start"}
      border={"1px"}
      borderColor={"gray.500"}
      borderRadius={"10px"}
      p={6}
    >
      <HStack>
        <Text color={"gray.500"} fontSize={"sm"}>
          {condition === "new" ? "Nuevo" : "Usado"}
        </Text>
        <Divider orientation="vertical" color={"gray.500"} height={"1rem"} />
        <Text color={"gray.500"} fontSize={"sm"}>
          {sold_quantity > 5
            ? `+${convertToRange({
                value: sold_quantity,
                reference: soldQuantityReference,
              })}`
            : sold_quantity}{" "}
          vendidos
        </Text>
      </HStack>
      <Text as="b" fontSize={"lg"}>
        {title}
      </Text>
      <VStack alignItems={"flex-start"}>
        {original_price && (
          <HStack>
            <Text textColor={"gray.500"} as="del" fontSize={"xs"}>
              {currency_id === "USD" ? "U$S" : "$"} {original_price}
            </Text>
          </HStack>
        )}
        <HStack mb="2" mt={original_price ? "-3" : "5"}>
          <HStack gap={0.5}>
            <Text as="b" fontSize={"x-large"}>
              {currency_id === "USD" ? "U$S" : "$"} {price}
            </Text>
          </HStack>

          {original_price && (
            <Text textColor={"purple.400"}>
              {Math.floor(((original_price - price) / original_price) * 100)}%
              OFF
            </Text>
          )}
        </HStack>
      </VStack>
      <HStack>
        <EmailIcon />
        <Text color={"purple.400"}>
          Envío:{" "}
          {shipping.free_shipping ? (
            <Text color={"white"} as={"span"}>
              Llega gratis entre el <b> martes</b> y el <b>jueves</b>
            </Text>
          ) : (
            <Text color={"white"} as={"span"}>
              Llega entre el <b> martes</b> y el <b>jueves</b> por $159{" "}
            </Text>
          )}
        </Text>
      </HStack>
      <HStack>
        <InfoIcon />
        <Text>
          {available_quantity > 50
            ? `+${convertToRange({
                value: available_quantity,
                reference: availableQuantityReference,
              })}`
            : available_quantity}{" "}
          disponibles
        </Text>
      </HStack>
      <Button backgroundColor={"purple.400"} w={"100%"} mt={"5vh"}>
        Comprar ahora
      </Button>
      <Button w={"100%"}>Añadir al carrito</Button>
      <HStack>
        <RepeatIcon />
        <Text fontSize={"sm"}>
          <Text
            fontSize={"sm"}
            as={"span"}
            color={"purple.400"}
            whiteSpace={"nowrap"}
          >
            Devolución gratis.
          </Text>{" "}
          Tienes 30 días desde que lo recibes.
        </Text>
      </HStack>
      <HStack alignItems={"flex-start"}>
        <LockIcon />
        <Text fontSize={"sm"}>
          <Text
            whiteSpace={"nowrap"}
            as={"span"}
            fontSize={"sm"}
            color={"purple.400"}
          >
            Compra Protegida,
          </Text>{" "}
          recibe el producto que esperabas o te devolvemos tu dinero.
        </Text>
      </HStack>
    </VStack>
  );
}
