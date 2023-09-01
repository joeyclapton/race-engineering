import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";

import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

export const PasswordInput = ({ register }: any) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <Box w="100%" marginY="4">
      <FormLabel>Senha</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="20px" // eslint-disable-next-line react/no-children-prop
          children={<RiLockPasswordLine />}
        />
        <Input
          type={show ? "text" : "password"}
          placeholder="Digite sua senha"
          {...register("password", { required: true, minLength: 8 })}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
