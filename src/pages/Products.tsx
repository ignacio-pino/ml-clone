import { Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react";
import NavigationSidebar from "../components/modules/NavigationSidebar";
import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import {
  ICategoryData,
  IFilterDataList,
  IFilterList,
  IProductListData,
  ISortData,
  ISortDataList,
} from "../Interfaces";
import Header from "../components/modules/Header";
import { useLocation } from "react-router-dom";
import { URLS } from "../api/urls";
import RelevanceSorter from "../components/common/RelevanceSorter";
import ProductList from "../components/modules/ProductList";

export default function Products() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [isLoading, setIsLoading] = useState(true);

  const [productDataList, setProductDataList] = useState<IProductListData[]>(
    []
  );
  const [filterDataList, setFilterDataList] = useState<IFilterDataList>({
    filters: [],
    availableFilters: [],
  });

  const [categoryData, setCategoryData] = useState<ICategoryData>({
    categoryInformation: { id: "", name: "", path_from_root: [] },
    totalResults: 0,
    childrenCategories: [],
    query: "",
  });

  const [sortData, setSortData] = useState<ISortDataList>();

  const urlProductDataList = URLS.GET_PRODUCTS_LIST.replace(
    ":query",
    searchParams.toString()
  );

  useEffect(() => {
    setIsLoading(true);
    fetchData(urlProductDataList).then(
      (data: {
        query: string;
        results: IProductListData[];
        available_filters: IFilterList[];
        sort: ISortData;
        available_sorts: ISortData[];
        filters: IFilterList[];
        paging: { total: number };
      }) => {
        setProductDataList(data.results);
        setFilterDataList({
          availableFilters: data.available_filters,
          filters: data.filters,
        });
        setSortData({ sort: data.sort, available_sorts: data.available_sorts });

        setCategoryData({
          categoryInformation: data.filters.find(({ id }) => id === "category")
            ?.values[0] as IFilterList,
          totalResults: data.paging.total,
          childrenCategories: data.available_filters.find(
            ({ id }) => id === "category"
          )?.values,
          query: data.query,
        });
        setIsLoading(false);
      }
    );
  }, [search]);

  return (
    <>
      <Header
        categoryId={categoryData.categoryInformation?.id as string}
        categoryName={categoryData.categoryInformation?.name as string}
      />
      <Grid mt={"2rem"} templateColumns={"1fr 2fr 1fr"}>
        <GridItem>
          <NavigationSidebar
            filterDataList={filterDataList}
            categoryData={categoryData}
            isLoading={isLoading}
          />
        </GridItem>
        <GridItem>
          <Skeleton isLoaded={!isLoading} h={"100vh"} ml={"4rem"}>
            <Stack>
              {sortData && (
                <RelevanceSorter
                  selectedSort={sortData?.sort}
                  availableSorts={sortData?.available_sorts}
                />
              )}

              <ProductList productDataList={productDataList} />
            </Stack>
          </Skeleton>
        </GridItem>
      </Grid>
    </>
  );
}
