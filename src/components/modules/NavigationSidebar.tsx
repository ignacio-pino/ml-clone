import { Box, HStack, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ICategoryData, IFilterDataList } from "../../Interfaces";
import CategoryList from "../common/CategoryList";
import CategoryBreadcrumbs from "../common/CategoryBreadcrumbs";
import FilterBadge from "../common/FilterBadge";

export default function NavigationSidebar({
  filterDataList,
  categoryData,
  isLoading,
}: {
  filterDataList: IFilterDataList;
  categoryData: ICategoryData;
  isLoading: boolean;
}) {
  return (
    <Stack ml={"10vw"} w={"20vw"}>
      <Skeleton isLoaded={!isLoading} h="100vh">
        {categoryData.categoryInformation?.path_from_root && (
          <CategoryBreadcrumbs
            pathFromRoot={categoryData.categoryInformation?.path_from_root}
            categoryId={categoryData.categoryInformation?.id}
          />
        )}
        <Heading>
          {categoryData.categoryInformation
            ? categoryData.categoryInformation.name
            : categoryData.query
            ? categoryData.query.charAt(0).toUpperCase() +
              categoryData.query.slice(1)
            : "Sin resultados"}
        </Heading>
        <Text>{categoryData.totalResults} resultados</Text>

        {filterDataList.filters && (
          <HStack>
            {" "}
            {filterDataList.filters.map(({ id, name, values }) => {
              return id === "category" ? null : (
                <FilterBadge id={id} name={name} values={values} type="" />
              );
            })}
          </HStack>
        )}

        <Box>
          {categoryData.childrenCategories && (
            <CategoryList
              id={"category"}
              name="Categorías"
              type="text"
              values={categoryData.childrenCategories}
            />
          )}
          {filterDataList.availableFilters.map(({ id, name, values, type }) => (
            <CategoryList id={id} name={name} values={values} type={type} />
          ))}
        </Box>
      </Skeleton>
    </Stack>
  );
}
