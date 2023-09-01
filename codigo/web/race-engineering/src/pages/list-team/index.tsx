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
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTeam, setEditedTeam] = useState({ id: "", name: "", category: "" });
  const { data } = useApi<any>(() => api.get("/teams"));
  const toast = useToast();

  useEffect(() => {
    if (data !== null) {
      setTeams(data);
    }
  }, [data]);


  const handleDeleteTeam = (id: number) => {
    api
      .delete(`/teams/${id}`)
      .then(() => {
        setTeams((prevTeams) => prevTeams.filter((team: any) => team.id !== id));
        toast({
          title: "Time excluído com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao excluir time, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const handleEditTeam = (team: any) => {
    setEditedTeam((prevTeam) => ({ ...prevTeam, ...team }));
    setEditModalOpen(true);
  };


  const handleUpdateTeam = () => {
    const { id, name, category } = editedTeam;
    api
      .patch(`/teams/${id}`, { name, category })
      .then(() => {
        setTeams((prevTeams) =>
          prevTeams.map((team: any) => {
            if (team.id === id) {
              return { ...team, name, category };
            }
            return team;
          })
        );
        toast({
          title: "Time atualizado com sucesso",
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
            title: "Time não encontrado",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          toast({
            title: "Erro ao atualizar time, tente novamente",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
        console.error(err); // Opcional: exibe o erro no console para fins de depuração
      });
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <Box width="100%" padding="4%">
      <Heading as="h1" size="2xl" textAlign="center" marginTop="2%">
        Lista de Times
      </Heading>

      <Modal
        key="confirmation-modal"
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalBody>Tem certeza de que deseja excluir este time?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                setIsConfirmationModalOpen(false);
                handleDeleteTeam(selectedTeamId!);
              }}
            >
              Deletar
            </Button>
            <Button variant="ghost" onClick={() => setIsConfirmationModalOpen(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Box w="2vw" className="sidebar-container" style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
          <Sidebar />
        </Box>
        <Box width="100%" padding="4%">
          <TableContainer maxW="70%" margin="auto">
            <Table size="sm" variant="striped" colorScheme="messenger">
              <Thead>
                <Tr>
                  <Th width="15%" textAlign="center">
                    ID
                  </Th>
                  <Th width="35%" textAlign="center">
                    Name
                  </Th>
                  <Th width="25%" textAlign="center">
                    Category
                  </Th>
                  <Th width="12%" textAlign="center">
                    Edit
                  </Th>
                  <Th width="13%" textAlign="center">
                    Delete
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {teams.map((team: any) => (
                  <Tr key={team.id}>
                    <Td textAlign="center">{team.id}</Td>
                    <Td textAlign="center">{team.name ?? "-"}</Td>
                    <Td textAlign="center">{team.category ?? "-"}</Td>
                    <Td textAlign="center">
                      <Button colorScheme="yellow" size="sm" variant="ghost" onClick={() => handleEditTeam(team)}>
                        Editar
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        colorScheme="red"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedTeamId(team.id);
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
                  value={editedTeam.name}
                  onChange={(e) =>
                    setEditedTeam((prevTeam) => ({
                      ...prevTeam,
                      name: e.target.value,
                    }))
                  }
                />
                {errors.name && (
                  <FormErrorMessage>O nome do time é obrigatório</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4} isRequired isInvalid={!!errors.category}>
                <FormLabel>Categoria</FormLabel>
                <Input
                  type="text"
                  {...register("category", { required: true })}
                  value={editedTeam.category}
                  onChange={(e) =>
                    setEditedTeam((prevTeam) => ({
                      ...prevTeam,
                      category: e.target.value,
                    }))
                  }
                />
                {errors.category && (
                  <FormErrorMessage>A categoria do time é obrigatória</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit(handleUpdateTeam)}>
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
