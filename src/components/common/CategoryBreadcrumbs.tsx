import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { IPathFromRoot } from "../../Interfaces";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function CategoryBreadcrumbs({
  pathFromRoot,
  categoryId,
  includeCurrentCategory,
}: {
  pathFromRoot: IPathFromRoot[];
  categoryId?: string;
  includeCurrentCategory?: boolean;
}) {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    event?.preventDefault();
    const params = { category: event.currentTarget.id };
    navigate({
      pathname: "/products",
      search: `${createSearchParams(params)}`,
    });
  };

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      fontSize={"smaller"}
      maxW={"70%"}
    >
      {pathFromRoot?.map(({ id, name }) => {
        return id === categoryId && !includeCurrentCategory ? null : (
          <BreadcrumbItem>
            <BreadcrumbLink id={id} onClick={handleClick}>
              {" "}
              {name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
