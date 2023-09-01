import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@chakra-ui/react";

import AboutPage from "./about";
import Home from "./home/index";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const onRedirect = () => {
    if (!isAuthenticated) {
      router.push("/");
    } else {
      router.push("/home");
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <AboutPage />
      ) : (
        <Box height="100vh" width="100%">
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box
              w="2vw"
              className="sidebar-container"
              style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}
            >
              <Sidebar />
            </Box>

            <Box w="98vw">
              <Home />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
