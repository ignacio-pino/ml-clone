import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Divider, HStack, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";

export default function RangeSelector() {
  const [values, setValues] = useState({ minValue: "", maxValue: "" });

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const navigate = useNavigate();

  let params = Object.fromEntries(searchParams.entries());

  const handleClick = () => {
    params = {
      ...params,
      price: values.minValue
        ? values.maxValue
          ? `${values.minValue}.0-${values.maxValue}.0`
          : `${values.minValue}.0-*`
        : `*-${values.maxValue}.0`,
    };
    navigate({
      pathname: "/products",
      search: `${createSearchParams(params)}`,
    });
    setValues({ minValue: "", maxValue: "" });
  };

  return (
    <HStack>
      <Input
        type="number"
        placeholder="Min."
        variant={"outline"}
        h={"2rem"}
        w={"5rem"}
        value={values.minValue}
        onChange={(event) => {
          setValues({
            ...values,
            minValue: event.currentTarget.value,
          });
        }}
      />
      <Divider orientation="horizontal" w={3} />
      <Input
        type="number"
        placeholder="Max."
        variant={"outline"}
        h={"2rem"}
        w={"5rem"}
        value={values.maxValue}
        onChange={(event) => {
          setValues({
            ...values,
            maxValue: event.currentTarget.value,
          });
        }}
      />
      <IconButton
        aria-label="Buscar rango"
        icon={<ArrowForwardIcon />}
        variant={"outline"}
        borderRadius={"10px"}
        size={"sm"}
        onClick={() => handleClick()}
      />
    </HStack>
  );
}
