import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IQuestionsList } from "../../Interfaces";
import { useState } from "react";

const getFormattedDate = (dateData: string) => {
  const date = new Date(dateData);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export default function QuestionsList({
  questionsList,
}: {
  questionsList: IQuestionsList[];
}) {
  let shortenedQuestionsList: IQuestionsList[] = [];

  if (questionsList.length > 5) {
    shortenedQuestionsList = questionsList.slice(0, 5);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const questionListInformation = (list: IQuestionsList[]) =>
    list.map(({ id, status, text, answer }) => (
      <Box key={id} alignItems={"flex-start"} my={"1rem"}>
        <Text>{text}</Text>
        {status === "ANSWERED" && (
          <HStack pl={"1rem"}>
            <Text color={"gray.500"} fontSize={"l"} alignSelf={"flex-start"}>
              L
            </Text>
            <Text color={"gray.500"} mt={1}>
              {answer.text}{" "}
              <Text
                fontSize={"sm"}
                color={"gray.500"}
                as={"span"}
                whiteSpace={"nowrap"}
              >
                {getFormattedDate(answer.date_created)}
              </Text>
            </Text>
          </HStack>
        )}
      </Box>
    ));

  return (
    <>
      <VStack alignItems={"flex-start"} gap={7}>
        <Text>Preguntas y respuestas</Text>
        <HStack flexWrap={"wrap"}>
          <Input placeholder="Escribe tu pregunta" w={"md"} />
          <Button backgroundColor={"purple.400"}>Preguntar</Button>
        </HStack>
        <Box>
          {questionsList.length === 0 && (
            <Text color={"gray.500"}>
              {" "}
              Todavía no hay preguntas. ¡Sé el primero en preguntar!
            </Text>
          )}
          {questionsList && shortenedQuestionsList.length > 0
            ? questionListInformation(shortenedQuestionsList)
            : questionListInformation(questionsList)}
          {shortenedQuestionsList.length > 0 && (
            <Button
              variant={"link"}
              color={"purple.400"}
              onClick={() => setIsModalOpen(true)}
            >
              Mostrar todas las preguntas
            </Button>
          )}
        </Box>
      </VStack>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={"xl"}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Preguntas y respuestas</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>{questionListInformation(questionsList)}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
