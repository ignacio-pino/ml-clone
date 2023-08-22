import {
  Card,
  HStack,
  VStack,
  Text,
  Button,
  Avatar,
  Image,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { ISoldItem } from "../../Interfaces";
import { statusData } from "../../api/mockData";

export default function SoldItemCard({ soldItem }: { soldItem: ISoldItem }) {
  return (
    <Card w={"60vw"} p={"1rem"} boxShadow={"dark-lg"}>
      <HStack
        borderBottom={"1px"}
        borderBottomColor={"gray.500"}
        justifyContent={"space-between"}
        px={"3rem"}
        pb={"1rem"}
      >
        <VStack alignItems={"flex-start"} gap={0}>
          <Text color={statusData[soldItem.status].color}>
            {statusData[soldItem.status].title}
          </Text>
          <Text color={"gray.500"} fontSize={"sm"}>
            {statusData[soldItem.status].message}
          </Text>
        </VStack>
        <Flex alignItems={"center"} justifyContent={"flex-start"} w={"10rem"}>
          <Avatar
            src={soldItem.buyer.thumbnail}
            w={"25px"}
            h={"25px"}
            boxShadow={"2xl"}
            mr={"1rem"}
          />
          <Flex flexDirection={"column"} justifyContent={"flex-start"}>
            <Text>{soldItem.buyer.name}</Text>
            <Button
              variant="link"
              size={"xs"}
              justifyContent={"flex-start"}
              color={"purple.700"}
            >
              {soldItem.buyer.messages.newMessageAmount
                ? `Ver ${soldItem.buyer.messages.newMessageAmount} nuevos mensajes`
                : soldItem.buyer.messages.hasPreviousMessages
                ? "Ver mensajes"
                : "Enviar mensaje"}
            </Button>
          </Flex>
        </Flex>
      </HStack>
      <SimpleGrid columns={5} pt={"1rem"} px={"3rem"}>
        <HStack alignItems={"center"}>
          <Image
            src={soldItem.thumbnail}
            alt={soldItem.name}
            w={"40px"}
            h={"50px"}
          />
          <Text>{soldItem.name}</Text>
        </HStack>
        <Flex alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.500"}>
            {soldItem.currency} {soldItem.price}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.500"}>
            {soldItem.amount} u.
          </Text>
        </Flex>
        <Flex flexDirection={"column"} justifyContent={"flex-start"}>
          <Text>
            {soldItem.details?.name} {soldItem.details?.value}
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            SKU: {soldItem.code}
          </Text>
        </Flex>
        <Flex
          flexDirection={"column"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Text fontSize={"sm"} color={"gray.500"}>
            {soldItem.date}
          </Text>
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
