import { Inter } from "next/font/google";
import Head from "next/head";
import NextLink from "next/link";

import Sidebar from "@/components/sidebar/Sidebar";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Tag,
} from "@chakra-ui/react";

export default function Index() {
  return (
    <Box height="100vh" width="100%" padding="4 100px">
      <Heading as="h1" size="2xl" textAlign="center" marginTop="2%" >
        Lista de Mecânicos
      </Heading>

      <Box height="100vh" width="100%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          flex-flexDirection="column"
          alignItems="center"
        >
          <Box w="2vw" className="sidebar-container" style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
            <Sidebar />
          </Box>

          <Box w="95vw"></Box>
        </Box>
      </Box>
    </Box>
  );
}
