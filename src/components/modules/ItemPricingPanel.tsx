import { Box } from "@chakra-ui/react";
import ItemInformationList from "../common/ItemInformationList";
import PaymentMethodList from "../common/PaymentMethodList";
import { IItemInformationList, IPaymentMethods } from "../../Interfaces";

export default function ItemPricingPanel({
  itemInformation,
  paymentMethods,
}: {
  itemInformation: IItemInformationList;
  paymentMethods: IPaymentMethods[];
}) {
  return (
    <Box pt={"3vh"} ml="10vw" maxW={"25vw"}>
      <ItemInformationList itemInformationList={itemInformation} />
      <Box pt={"5vh"}>
        <PaymentMethodList paymentMethods={paymentMethods} />
      </Box>
    </Box>
  );
}
