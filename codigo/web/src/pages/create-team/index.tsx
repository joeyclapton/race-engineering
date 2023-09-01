/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import { RegisterTeam } from "@/shared/interfaces/register-team";


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
  const { register, handleSubmit } = useForm<RegisterTeam>();
  const toast = useToast();

  const onSubmit = handleSubmit((data, event) => {
    api
      .post("/teams", data)
      .then(() => {
        event?.target?.reset();
        toast({
          title: "Cadastro realizado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/list-team");
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
                  Criar novo time
                </Highlight>
              </Heading>
            </CardHeader>
            <CardBody>
              <Box w="100%" marginY="4">
                <FormLabel>Nome do time</FormLabel>
                <InputGroup>
                  <Input
                    type={"text"}
                    placeholder="Digite o nome do time"
                    {...register("name", { required: true })}
                  />
                </InputGroup>
              </Box>
              <Box w="100%" marginY="4">
                <FormLabel>Categoria</FormLabel>
                <InputGroup>
                  <Input
                    type={"text"}
                    placeholder="Digite a categoria do time"
                    {...register("category", { required: true })}
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
