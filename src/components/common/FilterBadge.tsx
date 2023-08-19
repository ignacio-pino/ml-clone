import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { IFilterList } from "../../Interfaces";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";

export default function FilterBadge({ id, values }: IFilterList) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const navigate = useNavigate();

  const params = Object.fromEntries(searchParams.entries());

  const handleClick = () => {
    delete params[id];
    navigate({
      pathname: "/products",
      search: `${createSearchParams(params)}`,
    });
  };

  return (
    <Tag
      size={"sm"}
      key={id}
      variant="subtle"
      backgroundColor={"purple.400"}
      textColor={"purple.900"}
      w={"fit-content"}
    >
      <TagLabel>{values[0].name}</TagLabel>
      <TagCloseButton
        ml={"0.3rem"}
        onClick={() => handleClick()}
        aria-label="Eliminar filtro"
      />
    </Tag>
  );
}
