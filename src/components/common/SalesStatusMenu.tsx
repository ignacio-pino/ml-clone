import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  Flex,
  Collapse,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { IStatusCounts } from "../../Interfaces";

interface ISaleStatusList {
  id: string;
  text: string;
  values: {
    id: string;
    text: string;
    color: string;
  }[];
}

export default function SalesStatusMenu({
  onStatusChange,
  selectedStatus,
  statusCounts,
}: {
  onStatusChange: (status: string) => void;
  selectedStatus: string;
  statusCounts: IStatusCounts;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const saleStatusList: ISaleStatusList[] = [
    {
      id: "prepare",
      text: "Para preparar",
      values: [
        { id: "late", text: "Demoradas", color: "red.500" },
        { id: "prepareDispatch", text: "Para despachar", color: "orange" },
        {
          id: "talkWithBuyer",
          text: " Acordar con el comprador",
          color: "orange",
        },
      ],
    },
    {
      id: "readyToDispatch",
      text: "Listo para despachar",
      values: [
        { id: "unreadMessages", text: "Mensajes no leídos", color: "orange" },
        { id: "readyToDispatch", text: "Para despachar", color: "orange" },
      ],
    },
    {
      id: "inTransit",
      text: "En tránsito",
      values: [{ id: "onTheWay", text: "En camino", color: "white" }],
    },
    {
      id: "finished",
      text: "Finalizadas",
      values: [
        { id: "openClaim", text: "Reclamos abiertos", color: "red.500" },
        { id: "completed", text: "Concretadas", color: "white" },
        { id: "notCompleted", text: "No concretadas", color: "white" },
      ],
    },
  ];

  return (
    <Flex flexDirection="column" alignItems={"center"}>
      <Card zIndex={1} w={"80vw"}>
        <Collapse in={isOpen} startingHeight={"5rem"}>
          <CardBody>
            <Flex justifyContent={"space-evenly"}>
              {saleStatusList.map((saleStatus) => (
                <Box
                  key={saleStatus.id}
                  pl={"2rem"}
                  borderX={"1px"}
                  borderColor={"gray.500"}
                  w={"25%"}
                  h={"5rem"}
                >
                  <Text>{saleStatus.text}</Text>
                  <Text color={"gray.500"} fontSize={"smaller"}>
                    {saleStatus.values.reduce(
                      (acc, currValue) =>
                        acc +
                        (statusCounts[currValue.id as keyof IStatusCounts] ||
                          0),
                      0
                    )}{" "}
                    ventas
                  </Text>
                </Box>
              ))}
            </Flex>
            <SimpleGrid columns={4}>
              {saleStatusList.map((saleStatus) => (
                <Flex
                  flexDirection="column"
                  borderX={"1px"}
                  borderColor={"gray.500"}
                  p={"1rem"}
                >
                  {saleStatus.values.map(({ id, text, color }) => (
                    <Button
                      key={id}
                      w={"100%"}
                      my={"2vh"}
                      h={"5rem"}
                      justifyContent={"flex-start"}
                      boxShadow={"dark-lg"}
                      onClick={() => {
                        selectedStatus === id
                          ? onStatusChange("")
                          : onStatusChange(id);
                      }}
                      backgroundColor={
                        selectedStatus === id ? "purple.500" : "gray.600"
                      }
                    >
                      <Box>
                        <Text color={color}>{text}</Text>
                        <Text fontSize={"smaller"} textAlign={"left"} mt={"1"}>
                          {statusCounts[id as keyof IStatusCounts] || 0} ventas
                        </Text>
                      </Box>
                    </Button>
                  ))}
                </Flex>
              ))}
            </SimpleGrid>
          </CardBody>
        </Collapse>
      </Card>
      <IconButton
        zIndex={0}
        aria-label="Expandir panel"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        p="0"
        mt={-2}
        borderTopRadius={0}
        h={"1.7rem"}
        w={"4rem"}
        color={"purple.00"}
      ></IconButton>
    </Flex>
  );
}
