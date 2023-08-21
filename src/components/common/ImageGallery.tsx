import {
  VStack,
  Image,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IPictureList } from "../../Interfaces";

export default function ImageGallery({
  pictures,
}: {
  pictures: IPictureList[];
}) {
  const [selectedImage, setSelectedImage] = useState({ id: "", url: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  let shortenedPictures: IPictureList[] = [];

  if (pictures.length > 6) {
    shortenedPictures = pictures.slice(0, 6);
  }

  return (
    <>
      <Flex>
        <VStack marginRight={"5%"}>
          {(shortenedPictures.length > 0 ? shortenedPictures : pictures).map(
            ({ id, url }) => (
              <Button
                key={id}
                onClick={() => setSelectedImage({ id, url })}
                w={"fit-content"}
                h={"fit-content"}
                p={1}
                variant={"outline"}
                boxShadow={"2xl"}
                data-testid={`imageButton-${url}`}
              >
                <Image
                  src={url}
                  h={"50px"}
                  w={"50px"}
                  alt={`imageButton-${id}`}
                />
              </Button>
            )
          )}
          {shortenedPictures.length > 0 && (
            <Button
              onClick={() => setIsModalOpen(true)}
              w={"50px"}
              h={"50px"}
              p={1}
              variant={"outline"}
              boxShadow={"2xl"}
              data-testid="showMoreImagesButton"
            >
              <Text fontSize={"lg"}>+{pictures.length - 6} </Text>
            </Button>
          )}
        </VStack>
        <Flex justifyContent={"center"} w={"500px"}>
          <Image
            borderRadius={"5px"}
            src={selectedImage.url ? selectedImage.url : pictures[0].url}
            key={selectedImage.id ? selectedImage.id : pictures[0].id}
            boxShadow={"dark-lg"}
            maxW={"500px"}
            maxH={"500px"}
            alt={selectedImage.id ? selectedImage.id : pictures[0].id}
          />
        </Flex>
      </Flex>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={"xl"}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Imágenes del producto</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            {pictures.map(({ id, url }) => (
              <VStack data-testid="imageList">
                <Image
                  key={id}
                  w={"fit-content"}
                  h={"fit-content"}
                  p={1}
                  boxShadow={"2xl"}
                  src={url}
                  alt={id}
                />
                <Divider my={"2rem"} backgroundColor={"gray.500"} />
              </VStack>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
