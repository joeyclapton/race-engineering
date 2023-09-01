/* eslint-disable react/no-children-prop */
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { RiMailLine } from 'react-icons/ri';

import BackgroundSection from '@/components/BackgroundSection';
import { PasswordInput } from '@/components/PasswordInput/PasswordInput';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import {
    Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, Heading, Highlight,
    Input, InputGroup, InputLeftElement, Stack, useToast
} from '@chakra-ui/react';

type Login = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { authenticate } = useAuth();

  const { register, handleSubmit } = useForm<Login>();
  const toast = useToast();

  const onSubmit = handleSubmit((data, event) => {
    api
      .post("/auth/login", data)
      .then(async (response) => {
        const { data } = response;
        router.push("/");
        authenticate(data);
      })
      .catch((err) => {
        toast({
          title: "Erro ao fazer login, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  });

  return (
    <BackgroundSection>
      <FormControl maxW="450px" as="form" onSubmit={onSubmit} isRequired>
        <Card>
          <CardHeader>
            <Heading as="h2" size="md">
              <Highlight
                query="Login"
                styles={{ px: "1", py: "1", bg: "gray.100" }}
              >
                Login
              </Highlight>
            </Heading>
          </CardHeader>

          <CardBody>
            <Box w="100%" marginY="4">
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<RiMailLine fontSize="20px" />}
                />
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  {...register("email", { required: true })}
                />
              </InputGroup>
            </Box>

            <PasswordInput register={register} />
          </CardBody>

          <CardFooter display="flex" width="100%">
            <Button
              variant="ghost"
              bg="#ffffff"
              color="black"
              onClick={() => {
                router.push("/register-user");
              }}
              width="50%"
              mr="3"
            >
              Criar conta
            </Button>
            <Button
              bg="#000000"
              color="white"
              variant="solid"
              width="50%"
              ml="3"
              type="submit"
            >
              Fazer login
            </Button>
          </CardFooter>
        </Card>
      </FormControl>
    </BackgroundSection>
  );
};

export default LoginPage;
