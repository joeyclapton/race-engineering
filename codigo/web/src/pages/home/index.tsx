import { useRouter } from "next/router";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();

  const cards = [
    {
      id: 0,
      title: "Corridas",
      description:
        "Gerencie corridas com facilidade: liste, crie, edite ou remova corridas conforme necessário.",
      backgroundImage:
        "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
      secondaryButton: {
        label: "Listar",
        action: () => {
          router.push("/list-race");
        },
      },
      primaryButton: {
        label: "Cadastrar",
        action: () => {
          router.push("/create-race");
        },
      },
    },
    {
      id: 0,
      title: "Circuitos",
      description:
        "Gerencie os circuitos com facilidade: liste, crie, edite ou remova corridas conforme necessário.",
      backgroundImage:
        "https://images.unsplash.com/photo-1543796076-c8a565501995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      secondaryButton: {
        label: "Listar",
        action: () => {
          router.push("/list-circuit");
        },
      },
      primaryButton: {
        label: "Cadastrar",
        action: () => {
          router.push("/create-circuit");
        },
      },
    },
    {
      id: 0,
      title: "Times",
      description:
        "Gerencie os times com facilidade: liste, crie, edite ou remova times conforme necessário.",
      backgroundImage:
        "https://images.unsplash.com/photo-1642767226923-5d9abcea019a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      secondaryButton: {
        label: "Listar",
        action: () => {
          router.push("/list-team");
        },
      },
      primaryButton: {
        label: "Cadastrar",
        action: () => {
          router.push("/create-team");
        },
      },
    },
  ];

  return (
    <Box height="100vh" width="100%" padding="0 100px">
      <Heading
        as="h1"
        size="2xl"
        textAlign="center"
        marginTop="3%"
        marginBottom="5%"
      >
        Gerenciamento Porsche Cup
      </Heading>

      <Box
        padding="0 20px"
        margin="0 auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {cards.map((card) => (
          <Card
            align="center"
            backgroundImage={card.backgroundImage}
            backgroundPosition="center center"
            backgroundSize="cover"
            maxHeight="250px"
            key={card.id}
            my="32px"
            maxWidth="500px"
            width="500px"
          >
            <Box
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              background="rgba(0,0,0,0.7)"
              borderRadius="8px"
            />
            <CardHeader zIndex="1">
              <Heading color="#ffffff" size="md">
                {card.title}
              </Heading>
            </CardHeader>
            <CardBody zIndex="1">
              <Text
                color="#ffffff"
                align="center"
                lineHeight="normal"
                fontSize={17}
              >
                {card.description}
              </Text>
            </CardBody>
            <CardFooter w="100%" zIndex="1">
              <Button
                variant="solid"
                onClick={card.secondaryButton.action}
                colorScheme="whiteAlpha"
                w="50%"
                mr="2"
              >
                {card.secondaryButton.label}
              </Button>
              <Button
                variant="solid"
                onClick={card.primaryButton.action}
                colorScheme="whiteAlpha"
                w="50%"
                ml="2"
              >
                {card.primaryButton.label}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
