import {
  useFetchWinningValues,
  WheelValueResponse,
} from "@/services/service-wheel";
import { useInitDataStore } from "@/store";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import SpinTubeLight from "./Tubelight";

interface SpinWheelProps {
  setIsPending?: Dispatch<SetStateAction<boolean>>;
  mustSpin: boolean;
  setMustSpin: Dispatch<SetStateAction<boolean>>;
  wheelValues: WheelValueResponse[];
}

const SpinWheel: FC<SpinWheelProps> = ({
  mustSpin,
  setMustSpin,
  wheelValues,
}) => {
  const { initData } = useInitDataStore();

  const [values, setValues] = useState<WheelData[]>([]);

  useEffect(() => {
    if (wheelValues) {
      setValues(
        wheelValues.map((wheel) => ({
          option: wheel.value,
        }))
      );
    }
  }, [wheelValues]);

  const [prizeNumber, setPrizeNumber] = useState(0);
  const { refetch, isPending: isLoading } = useFetchWinningValues(mustSpin);

  const handleSpinClick = async () => {
    try {
      if (!mustSpin) {
        // Trigger fetching the winning value
        const { data: winningValue } = await refetch();

        // Convert prize value to index
        const prizeIndex = values.findIndex(
          (item) => item.option === winningValue
        );

        // Update prize number and start the spin
        setPrizeNumber(prizeIndex >= 0 ? prizeIndex : 0);
        setMustSpin(true);
      }
    } catch (error) {
      console.error("Error fetching winning value:", error);
    }
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <Flex
        borderRadius={"100%"}
        border={{ base: "15px solid", sm: "20px solid" }}
        borderColor={"#242635"}
        pos={"relative"}
        justify={"center"}
        align={"center"}
        maxW={"500px"}
        aspectRatio={1}
        mx={10}
        boxShadow="inset 0 4px 12px rgba(0, 0, 0, 1), inset 0 -4px 12px rgba(0, 0, 0, 0.8)"
        outline={{
          base: "2px solid #C49E20",
          sm: "3px solid #C49E20",
        }}
      >
        <Flex
          align={"center"}
          justify={"center"}
          pos={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          zIndex={10}
          fontSize={{ base: 24, sm: 28 }}
          shadow={"0 0 10px rgba(0,0,0,1)"}
          borderRadius={"100%"}
          boxSize={8}
        >
          <Text>$</Text>
        </Flex>

        <SpinTubeLight mustSpin={mustSpin} />
        <Box
          outline={{
            base: "2px solid #C49E20",
            sm: "3px solid #C49E20",
          }}
          borderRadius={"100%"}
          bg={"#C49E20"}
          pos={"relative"}
          boxShadow="inset 0 2px 2px rgba(0, 0, 0, 1)"
          aspectRatio={1}
        >
          <Box
            pos="absolute"
            inset={0} // Fills the parent Box
            borderRadius="100%"
            top={0}
            left={0}
            boxShadow={"inset 0 0 50px  rgba(0,0,0,1)"}
            zIndex={9} // Ensures this overlaps the Wheel
            pointerEvents="none" // Prevents the shadow layer from interfering with interactions
          />
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={values || ([] as WheelData[])}
            onStopSpinning={() => {
              setMustSpin(false);
              console.log({ prizeNumber });
            }}
            outerBorderColor={"#C49E20"}
            radiusLineWidth={1}
            backgroundColors={["#C49E20", "white"]}
            innerBorderColor="#C49E20"
            outerBorderWidth={0}
            innerBorderWidth={20}
            disableInitialAnimation
            spinDuration={1.2}
            textDistance={70}
            fontSize={24}
            pointerProps={{
              src: "/pointer.png",
              style: {
                rotate: "45deg",
                position: "absolute",
                transform: "translate(0%, 0%)",
                display: "none",
              },
            }}
          />
        </Box>
        <Image
          src="/pointer.png"
          pos={"absolute"}
          top={"6%"}
          transform={"rotate(45deg)"}
          right={"2%"}
          zIndex={10}
          maxW={{ base: 14, sm: 16 }}
          aspectRatio={1}
        />
      </Flex>
      <Button onClick={handleSpinClick}>Spin</Button>
    </Flex>
  );
};

export default SpinWheel;
