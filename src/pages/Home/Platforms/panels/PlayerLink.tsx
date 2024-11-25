import { useFetchGames } from "@/services/service-index";
import { GridItem, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PlayerLink = () => {
  const { data: games } = useFetchGames();
  return (
    <SimpleGrid columns={{ base: 3, lg: 6 }} gap={10}>
      {games?.data?.rows.map((item, index) => (
        <GridItem colSpan={1} key={index} as={Link} to={item.player_link}>
          <Stack gap={4} align={"center"}>
            <Image
              src={item.image}
              alt={item.name}
              aspectRatio={1}
              w={"100px"}
              objectFit={"cover"}
            />
            <Text
              textStyle={"heading"}
              color={"primary"}
              fontSize={{ base: "20px", md: "24px", xl: "28px" }}
              borderBlock={"2px solid"}
              pb={1}
              whiteSpace={"nowrap"}
              noOfLines={1}
            >
              {item.name}
            </Text>
          </Stack>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default PlayerLink;
