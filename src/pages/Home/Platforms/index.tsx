import {
  Box,
  Container,
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import AgentLink from "./panels/AgentLink";
import PlayerLink from "./panels/PlayerLink";

const tabTriggers = [
  {
    value: "player_link",
    label: "Player Link",
  },
  {
    value: "agent_link",
    label: "Agent Link",
  },
];

const Platforms = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Trigger fade-in only when switching tabs
  useEffect(() => {
    setFadeIn(false); // Reset fade-in effect
    const timer = setTimeout(() => {
      setFadeIn(true); // Trigger fade-in effect
    }, 300); // Adjust delay as needed for smoother transition

    return () => clearTimeout(timer);
  }, [selectedTab]);

  return (
    <Flex flexDir={"column"} gap={"20px"} align={"center"}>
      <Text
        textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
        color={"primary"}
        textStyle={"heading"}
      >
        Our Top Platforms
      </Text>
      <Container maxW={{ base: "100vw", md: "85vw" }}>
        <Tabs
          variant={"unstyled"}
          isLazy
          w={"full"}
          onChange={(value) => setSelectedTab(value)}
        >
          <TabList
            w={"full"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {tabTriggers.map((tab, index) => (
              <Fragment key={index}>
                <Tab
                  maxW={"max-content"}
                  textStyle={"heading"}
                  borderBlock={"2px solid"}
                  _selected={{
                    color: "primary",
                  }}
                  fontSize={{ base: "20px", md: "24px", xl: "28px" }}
                >
                  {tab.label}
                </Tab>
                {index < tabTriggers.length - 1 && (
                  <HStack gap={2}>
                    <Box
                      h={{ base: "60px", sm: "80px" }}
                      w={"2px"}
                      bg={"primary"}
                    />
                    <Box
                      h={{ base: "60px", sm: "80px" }}
                      w={"2px"}
                      bg={"primary"}
                    />
                  </HStack>
                )}
              </Fragment>
            ))}
          </TabList>

          {/* Player Link Content */}
          <TabPanels mt={10}>
            <TabPanel
              style={{
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 0.4s ease-in-out",
              }}
            >
              <PlayerLink />
            </TabPanel>
            <TabPanel
              style={{
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 0.4s ease-in-out",
              }}
            >
              <AgentLink />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Flex>
  );
};

export default Platforms;
