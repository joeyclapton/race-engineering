import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import { RiInformationFill } from "react-icons/ri";

import Card from "@/components/Card";
import Sidebar from "@/components/sidebar/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import Signup from "@/pages/form";
// import "@/styles/header.css";
import Timer from "@/pages/timer";
import api from "@/services/api";
import { dataToSelectOptions } from "@/shared/utils/dataToSelectOptions";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  ChakraProvider,
  Divider,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import type { AppProps } from "next/app";
type Race = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalLaps: number;
};

export default function Strategy({ Component, pageProps }: AppProps) {
  const [races, setRaces] = useState<Race[]>([]);
  const [laps, setLaps] = useState([]);
  const [selectedRace, setSelectedRace] = useState<Race>();
  const [selectedIdRace, setSelectedIdRace] = useState("");
  const [maxLap, setMaxLap] = useState(0);
  const [lapsLeft, setLapsLeft] = useState(0);
  const [generalLap, setGeneralLap] = useState(0);
  const { register, handleSubmit } = useForm<FormData>();
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/races");
      setRaces(data);
    })();

    return () => {};
  }, []);

  const handleMaxLap = (event: any) => {
    setMaxLap(Number(event.target.value));
  };

  const onSelectedRace = (id: any) => {
    const currentRace = races.filter((race) => race.id == id)[0];
    setSelectedRace(currentRace);
  };

  const fetchLaps = (raceId: number) => {
    const fetchData = async () => {
      const { data } = await api.get(`/laps/race/${raceId}`);
      //setLaps(data);
    };

    fetchData();
  };

  useEffect(() => {
    console.log(laps);
    const sumLapsDrivers = laps.reduce((prev, curr) => {
      return Number(prev) + Number(curr.lapNumber);
    }, 0);

    console.log({
      sumLapsDrivers,
      laps,
    });
    setGeneralLap(sumLapsDrivers);
    setLapsLeft(maxLap - sumLapsDrivers);
  }, [laps]);

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="2vw" className="sidebar-container">
        <Sidebar />
      </Box>

      <ChakraProvider>
        <Box w="98vw" justifyContent="center" alignItems="center" padding="4%">
          <Box display="flex" flexDir="row" bg="white" p={3} rounded="lg">
            <FormControl mr="2" id="first-name" width="50%">
              <FormLabel>Corrida para a estratégia</FormLabel>
              <Select
                placeholder="Selecione a corrida"
                onChange={(value) => {
                  console.log(value.target.value);
                  onSelectedRace(value.target.value);
                  setLaps([]);
                  setMaxLap(0);
                  setGeneralLap(0);
                  setLapsLeft(0);
                }}
                value={selectedIdRace}
              >
                {races.map((race) => (
                  <option key={race.id} value={race.id}>
                    {race.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl ml="2" variant="floating" id="first-name" width="50%">
              <FormLabel>Número de voltas máxima</FormLabel>
              <Input
                onChange={handleMaxLap}
                value={maxLap}
                placeholder="Digite o número de voltas máxima"
              />
            </FormControl>
          </Box>

          <Box w="100%" my="24px">
            {selectedRace && (
              <Box bg="white" p="4" rounded="lg">
                <Text fontWeight="semibold" color="black.300" fontSize="24px">
                  Informações da corrida
                </Text>
                <br />
                <Stack direction="row">
                  <Box display="flex" flexDirection="row">
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color="#060f1a"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        Corrida selecionada
                        <Icon
                          as={RiInformationFill}
                          ml={1}
                          width="1.3em"
                          height="1.3em"
                        />
                      </Text>
                      <Text>
                        {selectedRace && selectedRace?.name
                          ? selectedRace?.name
                          : "-"}
                      </Text>
                    </Box>
                    <Divider mx="16px" my="0" orientation="vertical" />
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color="#060f1a"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        Inicio da Corrida
                        <Icon
                          as={RiInformationFill}
                          ml={1}
                          width="1.3em"
                          height="1.3em"
                        />
                      </Text>
                      <Text>
                        {selectedRace.startDate
                          ? new Date(selectedRace.startDate).toLocaleString(
                              "pt-BR"
                            )
                          : "-"}
                      </Text>
                    </Box>
                    <Divider mx="16px" my="0" orientation="vertical" />
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color="#060f1a"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        Fim da corrida
                        <Icon
                          as={RiInformationFill}
                          ml={1}
                          width="1.3em"
                          height="1.3em"
                        />
                      </Text>
                      <Text>
                        {selectedRace.endDate
                          ? new Date(selectedRace.endDate).toLocaleString(
                              "pt-BR"
                            )
                          : "-"}
                      </Text>
                    </Box>
                    <Divider mx="16px" my="0" orientation="vertical" />
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color="#060f1a"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        Total de voltas
                        <Icon
                          as={RiInformationFill}
                          ml={1}
                          width="1.3em"
                          height="1.3em"
                        />
                      </Text>
                      <Text>
                        {selectedRace.totalLaps ? selectedRace.totalLaps : "-"}
                      </Text>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
          <Stack
            spacing={{ base: 5, sm: 2 }}
            direction={{ base: "column", sm: "row" }}
            alignItems="center"
          >
            {selectedRace && (
              <>
                <Card
                  heading="Número de Voltas"
                  detail=""
                  label={selectedRace.totalLaps}
                />
                <Card
                  heading="Número de Voltas Máximas"
                  detail=""
                  label={maxLap}
                />
                <Card
                  heading="Contador Geral de Voltas"
                  detail=""
                  label={generalLap}
                />
                <Card heading="Voltas Restantes" detail="" label={lapsLeft} />
              </>
            )}
          </Stack>
          {/* <Box display="flex" flexDirection="row" alignItems="center">
            <Box>
              <Text fontSize="md" fontWeight="semibold">
                Tempo para término da corrida
              </Text>
              <Timer></Timer>
            </Box>
          </Box> */}

          {/* FORMULARIO */}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            mt="24px"
          >
            <Box w="30%">
              {selectedRace && (
                <Signup
                  raceId={selectedRace.id}
                  races={races}
                  onAfterSubmit={(lap: any) => {
                    setLaps([...laps, lap]);
                  }}
                />
              )}
            </Box>
            {laps.length ? (
              <Box
                maxHeight="432px"
                overflowY="scroll"
                w="70%"
                ml="24px"
                bg="white"
                rounded="lg"
              >
                <TableContainer>
                  <Table variant="striped" colorScheme="messenger">
                    <Thead>
                      <Tr>
                        <Th>Tipo Pneu</Th>
                        <Th>Piloto</Th>
                        <Th>Número de voltas</Th>
                        <Th>Quantidade de gasolina no tanque</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {laps.map((lap) => {
                        return (
                          <Tr key={lap.id}>
                            <Td>{lap.tire}</Td>
                            <Td>{lap.driverId}</Td>
                            <Td>{lap.lapNumber}</Td>
                            <Td>{lap.gas}</Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            ) : null}
          </Box>
        </Box>
      </ChakraProvider>
    </Box>
  );
}
