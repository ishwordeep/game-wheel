import SpinModal from "@/pages/Home/SpinModal";
import TokenService from "@/services/service-token";
import { useInitDataStore } from "@/store";
import { Container, Flex, HStack, Text } from "@chakra-ui/react";
import LoginModal from "../Login";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const isAuthenticated = TokenService.isAuthenticated();
  const { initData } = useInitDataStore();
  return (
    <Flex align={"center"} h={"80px"} bg={"primary"}>
      <Container maxW={{ base: "100vw", md: "90vw", xl: "85vw" }}>
        <Flex justify={"space-between"} align={"center"}>
          <Text
            borderBlock={"2px solid #000"}
            textStyle={"heading"}
            color={"white"}
            py={0}
            textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25);"}
          >
            Logo
          </Text>
          {isAuthenticated ? (
            <HStack>
              <Text color={"white"}>$ {initData?.user?.total_balance}</Text>
              <UserMenu />
              <SpinModal />
            </HStack>
          ) : (
            <LoginModal />
          )}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
