/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import { RegisterCircuit } from "@/shared/interfaces/register-circuit";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Highlight,
  Input,
  InputGroup,
  useToast,
} from "@chakra-ui/react";

const CircuitPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<RegisterCircuit>();
  const toast = useToast();

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const onSubmit = handleSubmit((data, event) => {
    data.safetyMargin = Number(data.safetyMargin);
    data.trackSize = Number(data.trackSize);

    api
      .post("/circuits", data)
      .then(() => {
        event?.target?.reset();
        toast({
          title: "Cadastro realizado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/list-circuit");
      })
      .catch((err) => {
        toast({
          title: "Erro ao fazer cadastro, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  });

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="2vw" className="sidebar-container" style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
        <Sidebar />
      </Box>

      <Box w="98vw" justifyContent="center" alignItems="center">
        <FormControl width={480} as="form" onSubmit={onSubmit} margin="auto">
          <Card>
            <CardHeader>
              <Heading as="h2" size="md">
                <Highlight
                  query="Criar"
                  styles={{ px: "1", py: "1", bg: "gray.100" }}
                >
                  Criar novo Circuito
                </Highlight>
              </Heading>
            </CardHeader>
            <CardBody>
              <Box w="100%" marginY="4">
                <FormLabel>Nome do circuito</FormLabel>
                <InputGroup>
                  <Input
                    type={"text"}
                    placeholder="Digite o nome do circuito"
                    {...register("name", { required: true })}
                  />
                </InputGroup>
              </Box>
              <Box w="100%" marginY="4">
                <FormLabel>Local do circuito</FormLabel>
                <InputGroup>
                  <Input
                    type={"text"}
                    placeholder="Digite o local do circuito"
                    {...register("local", { required: true })}
                  />
                </InputGroup>
              </Box>
              <Box w="100%" marginY="4">
                <FormLabel>Track size</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder="Digite o tamanho do track size do circuito"
                    {...register("trackSize", { required: true })}
                  />
                </InputGroup>
              </Box>
              <Box w="100%" marginY="4">
                <FormLabel>Margin</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder="Digite o tamanho da margin do circuito"
                    {...register("safetyMargin", { required: true })}
                  />
                </InputGroup>
              </Box>
            </CardBody>

            <CardFooter display="flex" width="100%">
              <Button
                colorScheme="messenger"
                variant="ghost"
                onClick={() => {
                  router.push("/");
                }}
                width="50%"
                mr="3"
              >
                Voltar
              </Button>
              <Button colorScheme="messenger" width="50%" ml="3" type="submit">
                Cadastrar
              </Button>
            </CardFooter>
          </Card>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CircuitPage;
