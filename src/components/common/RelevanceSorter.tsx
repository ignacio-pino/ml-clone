import { HStack, Select, Text } from "@chakra-ui/react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { ISortData } from "../../Interfaces";

export default function RelevanceSorter({
  selectedSort,
  availableSorts,
}: {
  selectedSort: ISortData;
  availableSorts: ISortData[];
}) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const navigate = useNavigate();

  let params = Object.fromEntries(searchParams.entries());

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    params = { ...params, sort: target.value };
    navigate({
      pathname: "/products",
      search: `${createSearchParams(params)}`,
    });
  };

  return (
    <HStack alignSelf="flex-end" my={"1rem"} w={"20rem"}>
      {" "}
      <Text as="b">Ordenar por</Text>{" "}
      <Select
        placeholder={selectedSort.name}
        w={"10rem"}
        value={selectedSort.id}
        onChange={handleChange}
      >
        {availableSorts.map(({ id, name }) => (
          <option value={id}>{name}</option>
        ))}
      </Select>
    </HStack>
  );
}
