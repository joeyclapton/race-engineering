import { ReactNode } from 'react';

import { Box, Stack } from '@chakra-ui/react';

import bgDesktop from '../../assets/images/porsche-01.jpg';
import bgMobile from '../../assets/images/porsche-02.jpg';

interface Props {
  children: ReactNode;
}

const BackgroundSection = ({ children }: Props) => (
  <Box
    minHeight="100vh"
    width="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection={{ lg: "row", md: "column", sm: "column", base: "column" }}
  >
    <Box
      width={{ lg: "50%", md: "100%", sm: "100%", base: "100%", xl: "100vh" }}
      minHeight={{ lg: "100vh", md: "50vh", sm: "40vh", base: "40vh" }}
      backgroundImage={{
        xl: `url(${bgDesktop.src})`,
        lg: `url(${bgDesktop.src})`,
        md: `url(${bgMobile.src})`,
        sm: `url(${bgDesktop.src})`,
        base: `url(${bgDesktop.src})`,
      }}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center center"
      className="about-image"
    ></Box>
    <Stack
      direction="column"
      justifyContent="center"
      align="center"
      width={{ lg: "50%", md: "100%", sm: "100%", base: "100%", xl: "100%" }}
      minHeight={{ lg: "100vh", md: "50vh", sm: "60vh", base: "60vh" }}
    >
      {children}
    </Stack>
  </Box>
);

export default BackgroundSection;
