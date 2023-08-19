import ProductCard from "../common/ProductCard";
import { IProductListData } from "../../Interfaces";
import { Box } from "@chakra-ui/react";

export default function ProductList({
  productDataList,
}: {
  productDataList: IProductListData[];
}) {
  return (
    <Box px={"5%"}>
      {productDataList?.map(
        ({
          id,
          title,
          original_price,
          price,
          shipping,
          thumbnail,
          currency_id,
        }) => (
          <ProductCard
            id={id}
            title={title}
            original_price={original_price?.toString()}
            price={price.toString()}
            free_shipping={shipping.free_shipping}
            thumbnail={thumbnail}
            currency_id={currency_id}
          />
        )
      )}
    </Box>
  );
}
