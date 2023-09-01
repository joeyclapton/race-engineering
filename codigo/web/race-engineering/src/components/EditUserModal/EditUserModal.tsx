import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiMailLine, RiUser3Line } from "react-icons/ri";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { PasswordInput } from "../PasswordInput/PasswordInput";

type Props = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

type Profile = {
  name: string;
  password: string;
};

export const EditUserModal = ({ isOpen, setIsOpen }: Props) => {
  const { onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { register, handleSubmit, setValue } = useForm<Profile>();

  let profile =
    typeof window !== "undefined" && localStorage.getItem("profile");

  useEffect(() => {
    setValue("name", "Colocar nome aqui");
  });

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar meus dados</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl marginBottom="3">
              <FormLabel>Email</FormLabel>
              <Input value="Colocar email aqui" disabled />
            </FormControl>

            <Box w="100%" marginBottom="3">
              <FormLabel>Nome completo</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<RiUser3Line color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Digite seu nome completo"
                  {...register("name", { required: true })}
                />
              </InputGroup>
            </Box>
            <PasswordInput register={register} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button colorScheme="messenger" ml={3}>
              Alterar meus dados
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
