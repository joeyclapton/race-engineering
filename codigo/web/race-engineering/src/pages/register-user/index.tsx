import { AxiosError } from 'axios';
/* eslint-disable react/no-children-prop */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiErrorWarningFill
} from 'react-icons/ri';

import BackgroundSection from '@/components/BackgroundSection';
import api from '@/services/api';
import { AtSignIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
    Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel,
    Heading, Highlight, Input, InputGroup, InputLeftElement, InputRightElement, List, ListIcon,
    ListItem, Select, Text, useToast
} from '@chakra-ui/react';

type Register = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const RegisterPage = () => {
  const options = [
    {
      label: "Analista",
      id: "ANALYST",
    },
    {
      label: "Piloto",
      id: "DRIVER",
    },
    {
      label: "Mecânico",
      id: "MECHANIC",
    },
  ];
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<Register>();
  const toast = useToast();

  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  const onSubmit = handleSubmit(async (data, event) => {
    try {
      await api.post("/auth/register", data);

      event?.target?.reset();
      router.push("/login");

      toast({
        title: "Cadastro realizado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 409) {
        toast({
          title: "O email fornecido já está cadastrado",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao fazer cadastro, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  });

  return (
    <BackgroundSection>
      <FormControl
        my="32px"
        maxWidth={450}
        as="form"
        onSubmit={onSubmit}
        isRequired
      >
        <Card>
          <CardHeader>
            <Heading as="h2" size="md">
              <Highlight
                query="Criar"
                styles={{ px: "1", py: "1", bg: "gray.100" }}
              >
                Criar nova conta
              </Highlight>
            </Heading>
          </CardHeader>

          <CardBody>
            <Box w="100%" marginBottom="3">
              <FormLabel>Nome completo</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Digite seu nome completo"
                  {...register("name", { required: true })}
                />
              </InputGroup>
            </Box>

            <Box w="100%" marginY="4">
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children={<EmailIcon color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  {...register("email", { required: true })}
                />
              </InputGroup>
            </Box>

            <Box w="100%" marginY="4">
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children={<LockIcon color="gray.300" />}
                  />
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Digite sua senha"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      maxLength: 20,
                    })}
                    name="password"
                    maxLength={20}
                    minLength={8}
                    onInput={() => {
                      trigger("password");
                      console.log(errors);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <List mt={3}>
                  <ListItem>
                    {!getValues("password") && (
                      <ListIcon
                        as={RiCheckboxBlankCircleLine}
                        color="gray.300"
                      />
                    )}
                    {getValues("password") &&
                      getValues("password").length < 8 && (
                        <ListIcon as={RiErrorWarningFill} color="red.300" />
                      )}
                    {getValues("password") &&
                      getValues("password").length >= 8 && (
                        <ListIcon as={RiCheckboxCircleFill} color="green.300" />
                      )}
                    Deve ter pelo menos 8 caracteres
                  </ListItem>

                  <ListItem>
                    {!getValues("password") && (
                      <ListIcon
                        as={RiCheckboxBlankCircleLine}
                        color="gray.300"
                      />
                    )}
                    {getValues("password") && getValues("password").length && (
                      <ListIcon as={RiCheckboxCircleFill} color="green.300" />
                    )}
                    Senha deve ter no máximo 20 caracteres{" "}
                  </ListItem>
                </List>
              </FormControl>
            </Box>

            <Box w="100%" marginTop="4">
              <FormLabel>Tipo de usuário</FormLabel>
              <InputGroup id="role">
                <Select
                  value={selected}
                  {...register("role")}
                  onChange={handleChange}
                >
                  <option hidden>Tipo de usuário</option>
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </Box>
          </CardBody>

          <CardFooter display="flex" width="100%">
            <Button
              variant="ghost"
              bg="#ffffff"
              color="black"
              onClick={() => {
                router.push("/");
              }}
              width="50%"
              mr="3"
            >
              Voltar
            </Button>
            <Button
              bg="#000000"
              color="white"
              variant="solid"
              width="50%"
              ml="3"
              type="submit"
            >
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
      </FormControl>
    </BackgroundSection>
  );
};

export default RegisterPage;
