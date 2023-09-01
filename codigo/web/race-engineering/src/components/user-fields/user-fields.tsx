/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useState } from "react";

import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

const UserFields = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClick = () => setShow(!show);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <Stack width="100%" spacing={4} maxWidth={500}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<EmailIcon color="gray.300" />}
        />
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Digite seu email"
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<LockIcon color="gray.300" />}
        />
        <Input
          type={show ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Digite sua senha"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
};

export default UserFields;
