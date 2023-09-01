import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import { useForm } from "react-hook-form";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Heading,
  FormControl,
  FormLabel,
  Input,
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
  FormErrorMessage,
} from "@chakra-ui/react";

export default function Index() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [races, setRaces] = useState<any[]>([]); // Provide type annotation for races
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);
  const [editedRace, setEditedRace] = useState({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    totalLaps: 0,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/races");
      console.log(data);
      setRaces(data);
    })();

    return () => { };
  }, []);

  const handleDeleteRace = (id: number) => {
    api
      .delete(`/races/${id}`)
      .then(() => {
        setRaces((prevRaces) => prevRaces.filter((race: any) => race.id !== id));
        toast({
          title: "Corrida excluído com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao excluir a corrida, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const handleEditRace = (race: any) => {
    setEditedRace((prevRace) => ({ ...prevRace, ...race }));
    setEditModalOpen(true);
  };

  const handleUpdateRace = () => {
    const { id, name, startDate, endDate, totalLaps } = editedRace;
  
    if (endDate < startDate) {
      toast({
        title: "A data de Início da Corrida não pode ser anterior à data do Fim da Corrida",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return; // Cancel submission
    }
  
    api
      .patch(`/races/${id}`, { name, startDate, endDate, totalLaps })
      .then(() => {
        setRaces((prevRaces) =>
          prevRaces.map((race: any) => {
            if (race.id === id) {
              return { ...race, name, startDate, endDate, totalLaps };
            }
            return race;
          })
        );
        toast({
          title: "Corrida atualizada com sucesso",
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
    <Box width="100%" padding="4 100px">
      <Heading as="h1" size="2xl" textAlign="center" marginTop="2%">
        Lista de Corridas
      </Heading>

      <Modal key="confirmation-modal" isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalBody>
            Tem certeza de que deseja excluir esta Corrida?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => {
              setIsConfirmationModalOpen(false);
              handleDeleteRace(selectedRaceId!);
            }}>
              Deletar
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
                    <Th width="10%" textAlign="center">ID</Th>
                    <Th width="20%" textAlign="center">Name</Th>
                    <Th width="20%" textAlign="center">Start Date</Th>
                    <Th width="20%" textAlign="center">End Date</Th>
                    <Th width="15%" textAlign="center">Total Laps</Th>
                    <Th width="15%" textAlign="center">Edit</Th>
                    <Th width="15%" textAlign="center">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {races.map((race: any) => (
                    <Tr key={race.id}>
                      <Td textAlign="center">{race.id}</Td>
                      <Td textAlign="center">{race.name ?? "-"}</Td>
                      <Td textAlign="center">{new Date(race.startDate).toLocaleString()}</Td>
                      <Td textAlign="center">{new Date(race.endDate).toLocaleString()}</Td>
                      <Td textAlign="center">{race.totalLaps}</Td>
                      <Td textAlign="center">
                        <Button colorScheme="yellow" size="sm" variant="ghost" onClick={() => handleEditRace(race)}>
                          Editar
                        </Button>
                      </Td>
                      <Td textAlign="center">
                        <Button
                          colorScheme="red"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedRaceId(race.id);
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
                  value={editedRace.name}
                  onChange={(e) =>
                    setEditedRace((prevRace) => ({
                      ...prevRace,
                      name: e.target.value,
                    }))
                  }
                />
                {errors.name && (
                  <FormErrorMessage>O nome da corrida é obrigatório</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4} isRequired isInvalid={!!errors.startDate}>
                <FormLabel>Data de Início</FormLabel>
                <Input
                  type="datetime-local"
                  {...register("startDate", { required: true })}
                  value={editedRace.startDate}
                  onChange={(e) =>
                    setEditedRace((prevRace) => ({
                      ...prevRace,
                      startDate: e.target.value,
                    }))
                  }
                />
                {errors.startDate && (
                  <FormErrorMessage>A data de início é obrigatória</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4} isRequired isInvalid={!!errors.endDate}>
                <FormLabel>Data de Término</FormLabel>
                <Input
                  type="datetime-local"
                  {...register("endDate", { required: true })}
                  value={editedRace.endDate}
                  onChange={(e) =>
                    setEditedRace((prevRace) => ({
                      ...prevRace,
                      endDate: e.target.value,
                    }))
                  }
                />
                {errors.endDate && (
                  <FormErrorMessage>A data de término é obrigatória</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4} isRequired isInvalid={!!errors.totalLaps}>
                <FormLabel>Total de Voltas</FormLabel>
                <Input
                  type="number"
                  {...register("totalLaps", { required: true })}
                  value={editedRace.totalLaps}
                  onChange={(e) =>
                    setEditedRace((prevRace) => ({
                      ...prevRace,
                      totalLaps: parseInt(e.target.value),
                    }))
                  }
                />
                {errors.totalLaps && (
                  <FormErrorMessage>O total de voltas é obrigatório</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit(handleUpdateRace)}>
                Atualizar
              </Button>
              <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


      </Box>
    </Box >
  );
}
