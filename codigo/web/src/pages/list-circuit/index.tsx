import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import useApi from "@/shared/hooks/useApi";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Heading, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function Index() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedCircuitId, setSelectedCircuitId] = useState<number | null>(null);
  const [circuits, setCircuits] = useState<any[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCircuit, setEditedCircuit] = useState({ id: "", name: "", local: "" });
  const { data } = useApi<any>(() => api.get("/circuits"));
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/circuits");
      console.log(data);
      setCircuits(data);
    })();

    return () => { };
  }, []);

  const handleDeleteCircuit = (id: number) => {
    api
      .delete(`/circuits/${id}`)
      .then(() => {
        setCircuits((prevCircuits) => prevCircuits.filter((circuit: any) => circuit.id !== id));
        toast({
          title: "Circuito excluído com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao excluir circuito, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const handleEditCircuit = (circuit: any) => {
    setEditedCircuit((prevCircuit) => ({ ...prevCircuit, ...circuit }));
    setEditModalOpen(true);
  };

  const handleUpdateCircuit = () => {
    const { id, name, local } = editedCircuit;
    api
      .patch(`/circuits/${id}`, { name, local })
      .then(() => {
        setCircuits((prevCircuits) =>
          prevCircuits.map((circuit: any) => {
            if (circuit.id === id) {
              return { ...circuit, name, local };
            }
            return circuit;
          })
        );
        toast({
          title: "Circuito atualizado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setEditModalOpen(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast({
            title: "Circuito não encontrado",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          toast({
            title: "Erro ao atualizar circuito, tente novamente",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
        console.error(err);
      });
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <Box width="100%" padding="4 100px">
      <Heading as="h1" size="2xl" textAlign="center" marginTop="2%">
        Lista de Circuitos
      </Heading>

      <Modal key="confirmation-modal" isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalBody>
            Tem certeza de que deseja excluir este Circuito?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => {
              setIsConfirmationModalOpen(false);
              handleDeleteCircuit(selectedCircuitId!);
            }}>
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setIsConfirmationModalOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box width="100%">
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Box w="2vw" className="sidebar-container" style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
            <Sidebar />
          </Box>

          <Box width="100%" padding="4%">
            <TableContainer maxW="70%" margin="auto">
              <Table size="sm" variant="striped" colorScheme="messenger">
                <Thead>
                  <Tr>
                    <Th width="15%" textAlign="center">ID</Th>
                    <Th width="35%" textAlign="center">Name</Th>
                    <Th width="25%" textAlign="center">Local</Th>
                    <Th width="25%" textAlign="center">Edit</Th>
                    <Th width="40%" textAlign="center">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {circuits.map((circuit: any) => (
                    <Tr key={circuit.id}>
                      <Td textAlign="center">{circuit.id}</Td>
                      <Td textAlign="center">{circuit.name ?? "-"}</Td>
                      <Td textAlign="center">{circuit.local ?? "-"}</Td>
                      <Td textAlign="center">
                        <Button colorScheme="yellow" size="sm" variant="ghost" onClick={() => handleEditCircuit(circuit)}>
                          Editar
                        </Button>
                      </Td>
                      <Td textAlign="center">
                        <Button
                          colorScheme="red"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedCircuitId(circuit.id);
                            setIsConfirmationModalOpen(true);
                          }}
                        >
                          Deletar
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Time</ModalHeader>
            <ModalBody>
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  {...register("name", { required: true })}
                  value={editedCircuit.name}
                  onChange={(e) =>
                    setEditedCircuit((prevCircuit) => ({
                      ...prevCircuit,
                      name: e.target.value,
                    }))
                  }
                />
                {errors.name && (
                  <FormErrorMessage>O nome do circuito é obrigatório</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4} isRequired isInvalid={!!errors.local}>
                <FormLabel>Local</FormLabel>
                <Input
                  type="text"
                  {...register("local", { required: true })}
                  value={editedCircuit.local}
                  onChange={(e) =>
                    setEditedCircuit((prevCircuit) => ({
                      ...prevCircuit,
                      local: e.target.value,
                    }))
                  }
                />
                {errors.local && (
                  <FormErrorMessage>O local do circuito é obrigatório</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit(handleUpdateCircuit)}>
                Atualizar
              </Button>
              <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>
    </Box>
  );

}
