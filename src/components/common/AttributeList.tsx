import {
  Text,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Box,
} from "@chakra-ui/react";
import { IAttributeListData } from "../../Interfaces";

export default function AttributeList({
  attributeListData,
}: {
  attributeListData: IAttributeListData[];
}) {
  return (
    <Box>
      <Text as="b">Características</Text>
      <TableContainer mt={"3vh"}>
        <Table variant={"striped"} backgroundColor="gray.800" size="sm">
          <Tbody>
            {attributeListData.map(({ id, name, value_name }) => (
              <Tr key={id}>
                <Td fontWeight={"bold"}>{name}</Td>
                <Td>{value_name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
