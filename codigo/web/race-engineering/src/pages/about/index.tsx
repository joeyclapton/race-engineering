import { useRouter } from 'next/router';

import BackgroundSection from '@/components/BackgroundSection';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';

const AboutPage = () => {
  const router = useRouter();

  return (
    <BackgroundSection>
      <Stack direction="column" justifyContent="center" align="center" p="64px">
        <Heading>Race Engineering</Heading>
        <Text fontSize="xl" textAlign="center">
          Explore a gestão de dados em tempo real e aprimorar a comunicação com
          sua equipe durante a corrida.
        </Text>
      </Stack>
      <Stack direction="column" spacing={4} align="center">
        <Button
          bg="#000000"
          variant="solid"
          color="white"
          w="320px"
          size="lg"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </Button>
        <Button
          bg="#ffffff"
          variant="ghost"
          size="lg"
          w="320px"
          onClick={() => {
            router.push("/register-user");
          }}
        >
          Criar conta
        </Button>
      </Stack>
    </BackgroundSection>
  );
};

export default AboutPage;
