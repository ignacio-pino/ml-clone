import { Box, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import Header from "../components/modules/Header";
import {
  IAttributeListData,
  IItemInformationList,
  IPathFromRoot,
  IPaymentMethods,
  IPictureList,
  IQuestionsList,
} from "../Interfaces";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../api/api";
import { URLS } from "../api/urls";
import CategoryBreadcrumbs from "../components/common/CategoryBreadcrumbs";
import ItemPricingPanel from "../components/modules/ItemPricingPanel";
import ItemInformationPanel from "../components/modules/ItemInformationPanel";

export default function Item() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const itemId = searchParams.entries().next().value[1];

  const urlItemData = URLS.GET_ITEM_DATA.replace(":query", itemId);
  const urlItemDescription = URLS.GET_ITEM_DESCRIPTION.replace(
    ":query",
    itemId
  );
  const urlItemQuestions = URLS.GET_ITEM_QUESTIONS.replace(":query", itemId);

  const [isLoading, setIsLoading] = useState(true);
  const [pictureList, setPictureList] = useState<IPictureList[]>([]);
  const [attributeList, setAttributeList] = useState<IAttributeListData[]>([]);
  const [itemInformation, setItemInformation] = useState<IItemInformationList>({
    condition: "new",
    sold_quantity: 0,
    title: "",
    original_price: 0,
    price: 0,
    currency_id: "UYU",
    shipping: {
      free_shipping: false,
    },
    available_quantity: 0,
  });
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<IQuestionsList[]>([]);
  const [pathFromRoot, setPathFromRoot] = useState<IPathFromRoot[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethods[]>([]);

  useEffect(() => {
    fetchData(urlItemData)
      .then((data) => {
        setPictureList(data.pictures);
        setAttributeList(data.attributes);

        const info = {
          condition: data.condition,
          sold_quantity: data.sold_quantity,
          title: data.title,
          original_price: data.original_price,
          price: data.price,
          currency_id: data.currency_id,
          shipping: data.shipping,
          available_quantity: data.available_quantity,
        };
        setItemInformation(info);

        const urlCategoryInformation = URLS.GET_CATEGORY_DETAILS.replace(
          ":query",
          data.category_id
        );
        fetchData(urlCategoryInformation).then((catData) => {
          setPathFromRoot(catData.path_from_root);
        });

        const urlPaymentMethods = URLS.GET_ACCEPTED_PAYMENT_METHODS.replace(
          ":query",
          data.seller_id
        );
        return fetchData(urlPaymentMethods);
      })
      .then((paymentMethodsData) => {
        setPaymentMethods(paymentMethodsData);
        return fetchData(urlItemDescription);
      })
      .then((descData) => {
        setDescription(descData.plain_text);
        return fetchData(urlItemQuestions);
      })
      .then((questionsData) => {
        console.log(questionsData.questions);
        setQuestions(questionsData.questions);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box overflowX={"hidden"}>
      {isLoading ? (
        <>
          <Header categoryId="" categoryName="" />
          <Skeleton
            isLoaded={!isLoading}
            mx={"10vw"}
            my={"9vh"}
            h={"90vh"}
            w={"75vw"}
            borderRadius={"10px"}
          ></Skeleton>
        </>
      ) : (
        <>
          <Header categoryId="" categoryName="" />
          <Box ml="11vw" mt={"5vh"}>
            <CategoryBreadcrumbs
              pathFromRoot={pathFromRoot}
              includeCurrentCategory
            />
          </Box>
          <Box
            mx="10vw"
            my={"1vh"}
            boxShadow={"2xl"}
            backgroundColor={"gray.700"}
            borderRadius={"10px"}
          >
            <Grid
              templateColumns={"1fr 1fr"}
              h={"100vh"}
              w={"fit-content"}
              overflow={"hidden"}
            >
              <GridItem
                overflowY={"scroll"}
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
                <ItemInformationPanel
                  pictureList={pictureList}
                  description={description}
                  questions={questions}
                  attributeList={attributeList}
                />
              </GridItem>
              <GridItem
                pr={"1vw"}
                overflowY={"scroll"}
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
                <ItemPricingPanel
                  itemInformation={itemInformation}
                  paymentMethods={paymentMethods}
                />
              </GridItem>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
