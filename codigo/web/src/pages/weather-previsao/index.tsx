import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { MdOutlineWaterDrop, MdWindPower } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "@/components/sidebar/Sidebar";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

type Params = {
  city: string;
  date: string;
};

type Props = {
  data: {
    city: {
      name: string;
    };
    list: {
      dt_txt: string;
      main: {
        temp: number;
        humidity: number;
      };
      weather: {
        description: keyof typeof descriptionTranslations;
        icon: string;
      }[];
      wind: {
        speed: number;
      };
    }[];
  };
};

export default function Home() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Props["data"] | null>(null);
  const [originalWeather, setOriginalWeather] = useState<Props["data"] | null>(
    null
  );
  const [groupedData, setGroupedData] = useState({});
  const { register, handleSubmit } = useForm<Params>();
  const [searchSuccess, setSearchSuccess] = useState(false);

  const onSubmit = handleSubmit((data, event) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${
      data.city
    }&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}${
      data.date ? `&dt=${new Date(data.date).getTime() / 1000}` : ""
    }`;
    setCity(data.city);
    setDate(data.date);
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        event?.target?.reset();
        setWeather(data);
        setOriginalWeather(data);
        setSearchSuccess(true); // define que a pesquisa foi bem-sucedida
        const groupedData = data.list.reduce((grouped, obj) => {
          // Obtém a data ignorando a hora
          const date = new Date(obj.dt_txt).toLocaleDateString();

          // Verifica se a data já existe no objeto de agrupamento
          if (grouped[date]) {
            // Adiciona o objeto à lista existente para a data
            grouped[date].push(obj);
          } else {
            // Cria uma nova lista para a data e adiciona o objeto
            grouped[date] = [obj];
          }

          return grouped;
        }, {});
        console.log({
          groupedData,
          data,
        });
        setGroupedData(groupedData);
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = "Erro ao pesquisar clima, tente novamente";
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage =
              "Cidade não encontrada, verifique se o nome está correto e tente novamente";
          } else {
            errorMessage = `Erro na chamada da API: ${error.response.status} - ${error.response.data.message}`;
          }
        }
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSearchSuccess(false); // define que a pesquisa não foi bem-sucedida
      });
  });

  const getImageUrl = (condition: string) => {
    switch (condition) {
      case "clear sky":
        return "https://images.unsplash.com/photo-1558418294-9da149757efe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";
      case "few clouds":
        return "https://images.unsplash.com/photo-1612251276789-9b1a8f2add8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
      case "scattered clouds":
        return "https://images.unsplash.com/photo-1642447733831-2cdd9f5efae7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80";
      case "broken clouds":
        return "https://images.unsplash.com/photo-1533736405784-798e2e103a3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80";
      case "shower rain":
        return "https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
      case "rain":
        return "https://images.unsplash.com/photo-1630574232726-fc3ea90637b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";
      case "thunderstorm":
        return "https://images.unsplash.com/photo-1442213391790-7656f6e368b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80";
      case "snow":
        return "https://source.unsplash.com/YOUR_UNSPLASH_API_KEY/snow";
      case "mist":
        return "https://source.unsplash.com/YOUR_UNSPLASH_API_KEY/mist";
      default:
        return "";
    }
  };

  return (
    <div>
      <Head>
        <title>{city ? `Clima - ${city}` : "Clima"}</title>
      </Head>

      <Box height="100vh" width="100%" padding="0 12%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            w="2vw"
            className="sidebar-container"
            style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}
          >
            <Sidebar />
          </Box>

          <Box w="98vw" height="100vh">
            <Box
              mr="16px"
              ml="57px"
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <FormControl width={480} as="form" onSubmit={onSubmit} isRequired>
                <Box w="100%" marginY="4" dir="row">
                  <FormLabel>Nome da cidade</FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Digite o nome da cidade"
                      {...register("city", { required: true })}
                    />
                    <IconButton
                      ml="16px"
                      aria-label="Search database"
                      icon={<BsSearch />}
                      type="submit"
                      colorScheme="messenger"
                    />
                  </InputGroup>
                </Box>
                <ToastContainer />
              </FormControl>

              {searchSuccess && weather && (
                <Box mt={6} background="white" rounded="lg" padding="32px">
                  <Text fontSize="3xl" fontWeight="bold" mb={4}>
                    Previsão do tempo - {city}
                  </Text>
                  <Tabs variant="soft-rounded">
                    <TabList>
                      {Object.keys(groupedData).map((key) => (
                        <Tab key={key}>
                          {new Date(key).toLocaleDateString("pt-BR", {
                            timeZone: "America/Sao_Paulo",
                          })}
                        </Tab>
                      ))}
                    </TabList>

                    <TabPanels>
                      {Object.entries(groupedData).map(([key, value]) => (
                        <TabPanel key={key}>
                          {/* Render the content for each tab */}
                          {value.map((item) => (
                            <Box
                              key={item.dt_txt}
                              m={4}
                              borderRadius="md"
                              p={4}
                              textAlign="center"
                              bg="white"
                              backgroundImage={getImageUrl(
                                item.weather[0].description
                              )}
                              backgroundPosition="center center"
                              backgroundSize="cover"
                              position="relative"
                              overflow="hidden"
                            >
                              <Box
                                position="absolute"
                                top="0"
                                bottom="0"
                                left="0"
                                right="0"
                                background="rgba(0,0,0,0.77)"
                              />

                              <Text
                                color="white"
                                position="relative"
                                zIndex="1"
                              >
                                {new Date(item.dt_txt).toLocaleString("pt-BR", {
                                  timeZone: "America/Sao_Paulo",
                                })}
                              </Text>
                              <Text
                                color="white"
                                position="relative"
                                zIndex="1"
                                fontSize="28px"
                                fontWeight="Bold"
                              >
                                {(item.main.temp - 273.15).toFixed(1)}°C
                              </Text>
                              <Text
                                color="white"
                                position="relative"
                                zIndex="1"
                              >
                                {descriptionTranslations[
                                  item.weather[0].description
                                ] || item.weather[0].description}
                              </Text>

                              <Flex alignItems="center">
                                <Text
                                  color="white"
                                  position="relative"
                                  zIndex="1"
                                >
                                  <Icon as={MdWindPower} mr={2} />
                                  {`${(item.wind.speed * 3.6).toFixed(2)}km/h`}
                                </Text>
                                <Text
                                  ml={4}
                                  color="white"
                                  position="relative"
                                  zIndex="1"
                                >
                                  <Icon as={MdOutlineWaterDrop} mr={2} />
                                  {`${item.main.humidity}%`}
                                </Text>
                              </Flex>
                              <Image
                                src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                                position="relative"
                                zIndex="1"
                              />
                            </Box>
                          ))}
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </Tabs>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

const descriptionTranslations = {
  "clear sky": "Céu Limpo",
  "few clouds": "Algumas Nuvens",
  "scattered clouds": "Nuvens Dispersas",
  "broken clouds": "Nuvens Fragmentadas",
  "overcast clouds": "Céu Nublado",
  "light rain": "Chuva Fraca",
  "moderate rain": "Chuva Moderada",
  "heavy intensity rain": "Chuva Forte",
  "very heavy rain": "Chuva Muito Forte",
  "extreme rain": "Chuva Extrema",
  "freezing rain": "Chuva Congelante",
  "light snow": "Neve Fraca",
  "heavy snow": "Neve Forte",
  sleet: "Aguaneve",
  "shower rain": "Chuva de Banho",
  thunderstorm: "Trovoadas",
  "thunderstorm with light rain": "Trovoadas com Chuva Fraca",
  "thunderstorm with heavy rain": "Trovoadas com Chuva Forte",
  "thunderstorm with rain": "Trovoadas com Chuva",
  snow: "Neve",
  mist: "Neblina",
  haze: "Nevoeiro",
  fog: "Névoa",
  smoke: "Fumaça",
  dust: "Poeira",
  sand: "Areia",
  ash: "Cinzas",
  tornado: "Tornado",
  squalls: "Rajadas de Vento",
};
