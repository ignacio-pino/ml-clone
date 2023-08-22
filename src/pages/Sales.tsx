import {
  Box,
  Divider,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import SalesStatusMenu from "../components/common/SalesStatusMenu";
import Header from "../components/modules/Header";
import { CalendarIcon, DragHandleIcon, SearchIcon } from "@chakra-ui/icons";
import SoldItemCard from "../components/common/SoldItemCard";
import { mockItems } from "../api/mockData";
import { ISoldItem, IStatusCounts } from "../Interfaces";
import { useState } from "react";

export default function Sales() {
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState("");
  const [dateFilterMode, setDateFilterMode] = useState<
    "asc" | "desc" | "range"
  >("desc");
  const [dateRange, setDateRange] = useState<number | null>(null);

  const handleDateChange = (value: string) => {
    if (value === "asc" || value === "desc") {
      setDateFilterMode(value);
      setDateRange(null);
    } else {
      setDateFilterMode("range");
      setDateRange(Number(value));
    }
  };

  const filteredItems = mockItems
    .filter((item: ISoldItem) => {
      let validForText = true;
      let validForDate = true;
      let validForStatus = true;

      const itemDate = new Date(item.date.split("/").reverse().join("-"));
      const currentDate = new Date();

      if (dateFilterMode === "range") {
        const pastDate = new Date(currentDate);
        pastDate.setMonth(currentDate.getMonth() - (dateRange || 0));
        validForDate = itemDate >= pastDate && itemDate <= currentDate;
      }

      if (filterText) {
        validForText =
          item.name.toLowerCase().includes(filterText) ||
          item.buyer.name.toLowerCase().includes(filterText) ||
          item.code.toString().toLowerCase().includes(filterText);
      }

      if (status) {
        if (status === "unreadMessages") {
          validForStatus = item.buyer.messages.newMessageAmount > 0;
        } else {
          validForStatus = item.status === status;
        }
      }

      return validForText && validForStatus && validForDate;
    })
    .sort((a, b) => {
      if (dateFilterMode === "asc") {
        return (
          new Date(a.date.split("/").reverse().join("-")).getTime() -
          new Date(b.date.split("/").reverse().join("-")).getTime()
        );
      } else {
        return (
          new Date(b.date.split("/").reverse().join("-")).getTime() -
          new Date(a.date.split("/").reverse().join("-")).getTime()
        );
      }
    });

  const unreadMessagesCount = mockItems.filter(
    (item) => item.buyer.messages.newMessageAmount > 0
  ).length;

  const statusCounts = mockItems.reduce<IStatusCounts>((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  statusCounts["unreadMessages"] = unreadMessagesCount;

  return (
    <Box overflowX={"hidden"}>
      <Header categoryId="" categoryName=""></Header>
      <Box mx="10vw" my={"10vh"}>
        <SalesStatusMenu
          onStatusChange={setStatus}
          selectedStatus={status}
          statusCounts={statusCounts}
        />
      </Box>
      <HStack justifyContent={"center"} gap={6}>
        <HStack alignItems={"center"}>
          <DragHandleIcon />
          <Text fontSize={"sm"}>Filtrar y ordenar</Text>
        </HStack>
        <Divider h={"2rem"} orientation="vertical" />
        <HStack alignItems={"center"}>
          <SearchIcon mr={"0.5rem"} />{" "}
          <Input
            placeholder="Filtrar por número, título o comprador"
            w={"sm"}
            h={"2rem"}
            onChange={(e) => setFilterText(e.target.value.toLowerCase())}
          />
        </HStack>
        <Divider h={"2rem"} orientation="vertical" />
        <HStack alignItems={"center"}>
          <CalendarIcon mr={"0.5rem"} />
          <Select
            variant={"outline"}
            h={"2rem"}
            w={"sm"}
            onChange={(e) => handleDateChange(e.target.value)}
          >
            <option value="desc">Ordenar de manera descendiente</option>
            <option value="asc">Ordenar de manera ascendiente</option>
            <option value="1">Último mes</option>
            <option value="3">Últimos 3 meses</option>
            <option value="6">Últimos 6 meses</option>
            <option value="12">Último año</option>
          </Select>
        </HStack>
      </HStack>
      <VStack
        mt={"5vh"}
        mb={"10vh"}
        mx={"15vw"}
        gap={3}
        h={"55vh"}
        overflowY={"scroll"}
        overflowX={"hidden"}
        scrollBehavior={"smooth"}
        __css={{
          "::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
          },
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
        {filteredItems.map((soldItem: ISoldItem) => (
          <SoldItemCard soldItem={soldItem} />
        ))}
      </VStack>
    </Box>
  );
}
