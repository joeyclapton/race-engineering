import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((prevMinutes) => prevMinutes + 1);
      setSeconds(0);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === 60) {
      setHours((prevHours) => prevHours + 1);
      setMinutes(0);
    }
  }, [minutes]);

  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  return (
    <Box
      borderRadius="md"
      borderWidth="2px"
      p={2}
      mb={2}
      textAlign="center"
      width="240px"
      margin="auto"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <IconButton
          aria-label="Play"
          icon={<FaPlay />}
          colorScheme="green"
          borderRadius="full"
          size="sm"
          onClick={handleStart}
        />

        <Box mb={1} height="30px">
          <Text fontSize="xl" display="inline-block" data-testid="hour">
            {formatNumber(hours)}
          </Text>
          <Text fontSize="xl" mx={2} display="inline-block">
            :
          </Text>
          <Text data-testid="minutes" fontSize="xl" display="inline-block">
            {formatNumber(minutes)}
          </Text>
          <Text fontSize="xl" mx={2} display="inline-block">
            :
          </Text>
          <Text fontSize="xl" data-testid="seconds" display="inline-block">
            {formatNumber(seconds)}
          </Text>
        </Box>

        <IconButton
          aria-label="Pause"
          icon={<FaPause />}
          colorScheme="red"
          borderRadius="full"
          size="sm"
          onClick={handlePause}
        />
      </Flex>
    </Box>
  );
};

export default Timer;
