import { Flex } from "@chakra-ui/react";
import Hero from "./Hero";
import Payment from "./Payment";
import Platforms from "./Platforms";

const Home = () => {
  return (
    <Flex flexDir={"column"} gap={"40px"}>
      <Hero />
      <Platforms />
      <Payment />
    </Flex>
  );
};

export default Home;
