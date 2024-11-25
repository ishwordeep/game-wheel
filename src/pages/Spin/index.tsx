import {
  useFetchWheelValues,
  useFetchWinningValues,
} from "@/services/service-wheel";
import { useInitDataStore } from "@/store";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Wheel, WheelDataType } from "react-custom-roulette";
import useSound from "use-sound";

import SpinSound from "@/assets/spin.mp3";
import WinSound from "@/assets/win.wav";
import SpinTubeLight from "../Home/SpinModal/Tubelight";
const SpinModal = () => {
  const [play, { stop }] = useSound(SpinSound);

  const [playWin] = useSound(WinSound);

  const { initData } = useInitDataStore();
  const {
    data: wheelValues,
    isPending,
    isFetching,
  } = useFetchWheelValues(true);

  const [values, setValues] = useState<WheelDataType[]>([]);

  useEffect(() => {
    if (wheelValues?.data?.rows) {
      setValues(
        wheelValues?.data?.rows?.map((wheel) => ({
          option: wheel.value,
        }))
      );
    }
  }, [wheelValues?.data?.rows]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const { refetch, isPending: isLoading } = useFetchWinningValues(mustSpin);

  const handleSpinClick = async () => {
    try {
      if (!mustSpin) {
        setTimeout(() => {
          play();
        }, 500);
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
    <Center maxW={"100dvw"} h={"100dvh"}>
      {isPending || (isFetching && <Spinner />)}
      {!isPending && !isFetching && values.length && (
        <>
          {(wheelValues?.data.count ?? 0 > 0) && (
            <Flex py={{ base: 16, sm: 20 }} px={20}>
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
                    data={values || ([] as WheelDataType[])}
                    onStopSpinning={() => {
                      setMustSpin(false);
                      // playWin();
                      stop();
                      console.log({ prizeNumber });
                    }}
                    outerBorderColor={"#C49E20"}
                    radiusLineWidth={1}
                    backgroundColors={["gold", "white"]}
                    innerBorderColor="#C49E20"
                    outerBorderWidth={0}
                    innerBorderWidth={20}
                    textDistance={70}
                    fontSize={24}
                    pointerProps={{
                      style: {
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
            </Flex>
          )}

          <Button onClick={handleSpinClick}>Spin</Button>
        </>
      )}
    </Center>
  );
};

export default SpinModal;
