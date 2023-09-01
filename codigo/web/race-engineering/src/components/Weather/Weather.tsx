import React from "react";
import { BiChat, BiCurrentLocation, BiLike, BiShare } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoWaterOutline } from "react-icons/io5";
import { WiCloudyGusts, WiCloudyWindy } from "react-icons/wi";

import { months } from "@/shared/mock/months";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";

const Weather = ({ data }: any) => {
  const date = new Date();
  const currentMonth = months[date.getMonth()];
  const currentDay = date.getDay();
  const dayAndMonth = `Hoje, ${currentDay} de ${currentMonth}`;
  console.log(data);
  return (
    <>
      {data.main && (
        <Card maxW="md">
          <CardHeader>
            <Flex>
              <Flex
                flex="1"
                gap="4"
                alignItems="center"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <Flex alignItems="start" justifyContent="start" flexWrap="wrap">
                  <Box position="relative" top="1px">
                    <CiLocationOn fontSize="22px" />
                  </Box>
                  <Text ml="8px">{data.name}</Text>
                </Flex>
                <Text>{dayAndMonth}</Text>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex alignItems="center" justifyContent="center">
              <Text fontSize="48px">{data.main.temp} ºC</Text>
            </Flex>
          </CardBody>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Flex flex="1">
              <Box position="relative" top="1px">
                <WiCloudyGusts fontSize="26px" />
              </Box>
              <Text m="0">{data.wind.gust ?? "0"}hpa</Text>
            </Flex>
            <Flex flex="1" mx="32px">
              <Box position="relative" top="1px">
                <IoWaterOutline fontSize="26px" />
              </Box>
              <Text m="0">{data.main.humidity} %</Text>
            </Flex>
            <Flex flex="1">
              <Box position="relative" top="1px">
                <WiCloudyWindy fontSize="26px" />
              </Box>
              <Text m="0">{data.wind.speed}km/h</Text>
            </Flex>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Weather;
