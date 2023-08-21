import { InfoIcon } from "@chakra-ui/icons";
import { VStack, Image, Text, HStack } from "@chakra-ui/react";
import { IPaymentMethods } from "../../Interfaces";

export default function PaymentMethodList({
  paymentMethods,
}: {
  paymentMethods: IPaymentMethods[];
}) {
  return (
    <VStack
      alignItems={"flex-start"}
      border={"1px"}
      borderColor={"gray.500"}
      borderRadius={"10px"}
      p={"1vw"}
      gap={3}
    >
      <Text size={"l"}>Medios de pago</Text>
      <HStack backgroundColor={"purple.400"} borderRadius={"5px"} p={"0.5rem"}>
        <InfoIcon />
        <Text>¡Paga en hasta 10 cuotas sin interés! </Text>
      </HStack>
      <Text as="b">Tarjetas de Crédito</Text>
      <Text color={"gray.500"} fontSize={"sm"} mt={-2}>
        ¡Cuotas sin interés con bancos seleccionados!
      </Text>
      <HStack gap={3} flexWrap={"wrap"}>
        {paymentMethods.map(({ payment_type_id, id, thumbnail }) =>
          payment_type_id === "credit_card" ? (
            <Image
              key={id}
              src={thumbnail}
              mixBlendMode={"multiply"}
              maxW={"60px"}
              maxH={"60px"}
              alt={thumbnail}
            />
          ) : null
        )}
      </HStack>
      <Text as="b">Tarjetas de Débito</Text>
      <HStack gap={3}>
        {paymentMethods.map(({ payment_type_id, id, thumbnail }) =>
          payment_type_id === "debit_card" ? (
            <Image
              key={id}
              src={thumbnail}
              mixBlendMode={"multiply"}
              maxW={"60px"}
              maxH={"60px"}
              alt={thumbnail}
            />
          ) : null
        )}
      </HStack>
      <Text as="b">Efectivo</Text>
      <HStack gap={3}>
        {paymentMethods.map(({ payment_type_id, id, thumbnail }) =>
          payment_type_id === "ticket" ? (
            <Image
              key={id}
              src={thumbnail}
              mixBlendMode={"multiply"}
              maxW={"60px"}
              maxH={"60px"}
              alt={thumbnail}
            />
          ) : null
        )}
      </HStack>
    </VStack>
  );
}
