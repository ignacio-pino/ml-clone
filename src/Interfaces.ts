export interface IProductListData {
  id: string;
  title: string;
  price: string;
  original_price?: string;
  currency_id: "UYU" | "USD";
  thumbnail: string;
  shipping: {
    free_shipping: boolean;
  };
}

export interface ISortDataList {
  sort: ISortData;
  available_sorts: ISortData[];
}

export interface ISortData {
  id: string;
  name: string;
}
export interface IProductCard {
  id: string;
  title: string;
  price: string;
  original_price?: string;
  currency_id: "UYU" | "USD";
  thumbnail: string;

  free_shipping: boolean;
}

export interface IFilterDataList {
  filters: IFilterList[];
  availableFilters: IFilterList[];
}
export interface IFilterList {
  id: string;
  name: string;
  type: string;
  values: IFilterListValues[];
}

export interface IFilterListValues {
  id: string;
  name: string;
  results?: number;
  path_from_root?: IPathFromRoot[];
}

export interface ICategoryData {
  query?: string;
  categoryInformation?: ICategoryInformation;
  totalResults: number;
  childrenCategories?: IPathFromRoot[];
}

export interface ICategoryInformation {
  id: string;
  name: string;
  path_from_root?: IPathFromRoot[];
}

export interface IPathFromRoot {
  id: string;
  name: string;
}

export interface IChildrenCategoryData {
  id: string;
  name: string;
  total_items_in_this_category: number;
}

export interface IHeaderCategoryData {
  categoryId: string;
  categoryName: string;
}
