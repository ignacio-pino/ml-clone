import { Box, Divider, Text } from "@chakra-ui/react";
import AttributeList from "../common/AttributeList";
import ImageGallery from "../common/ImageGallery";
import QuestionsList from "../common/QuestionsList";
import {
  IPictureList,
  IAttributeListData,
  IQuestionsList,
} from "../../Interfaces";

export default function ItemInformationPanel({
  pictureList,
  attributeList,
  description,
  questions,
}: {
  pictureList: IPictureList[];
  attributeList: IAttributeListData[];
  description: string;
  questions: IQuestionsList[];
}) {
  return (
    <>
      <Box pl={"3vw"} pt={"3vh"}>
        <ImageGallery pictures={pictureList} />
      </Box>
      <Box pl={"3vw"} pt="5vh">
        <Divider mb={"2rem"} backgroundColor={"gray.500"} />
        <AttributeList attributeListData={attributeList} />
        <Divider mt={"2rem"} backgroundColor={"gray.500"} />
      </Box>
      <Box pl={"3vw"} w={"40vw"} mt={"2vh"} pb={"5vh"}>
        <Text fontSize={"large"} mb={"3vh"}>
          Descripción
        </Text>
        <Text>{description}</Text>
        <Divider my={"2rem"} backgroundColor={"gray.500"} />
        <QuestionsList questionsList={questions} />
        <Divider my={"2rem"} backgroundColor={"gray.500"} />
      </Box>
    </>
  );
}
