import { Box, keyframes } from "@chakra-ui/react";

// Define the on-off animation with a black circle during the "off" phase
const tubeLightAnimation = keyframes`
  0%, 70% {
    opacity: 1;
    background-color: #FFF; // Light is on
    box-shadow: 0 0 15px #FFF, 0 0 30px #FFF, 0 0 60px #FFF, 0 0 90px #0ff, 0 0 120px #0ff;
  }
  71%, 100% {
    opacity: 1; // Visible but dark
    background-color: #000; // Light is off (black circle)
    box-shadow: none;
  }
`;

const SpinTubeLight = ({ mustSpin }: { mustSpin: boolean }) => {
  const boxAttrs = {
    boxSize: { base: "10px", sm: "15px" },
    bg: "#FFF",
    borderRadius: "full",
    pos: "absolute" as const,
    zIndex: 99999,
    animation: mustSpin ? `${tubeLightAnimation} 0.4s infinite` : "none",
  };
  return (
    <>
      {/* bottom */}
      <Box
        {...boxAttrs}
        bottom={"0%"} // Position the tube light at the bottom
        left={"50%"}
        transform={`translate(-50%, 130%)`}
      />
      {/* bottom */}

      {/* top */}
      <Box
        {...boxAttrs}
        top={"0%"} // Position the tube light at the bottom
        left={"50%"}
        transform={`translate(-50%, -130%)`}
      />
      <Box
        {...boxAttrs}
        top={"8%"} // Position the tube light at the bottom
        left={"22%"}
        transform={`translate(-50%, -130%)`}
      />
      <Box
        {...boxAttrs}
        top={"26%"} // Position the tube light at the bottom
        left={"5%"}
        transform={`translate(-50%, -130%)`}
      />
      <Box
        {...boxAttrs}
        top={"27%"} // Position the tube light at the bottom
        right={"6%"}
        transform={`translate(130%, -100%)`}
      />
      <Box
        {...boxAttrs}
        top={"7%"} // Position the tube light at the bottom
        right={"25%"}
        transform={`translate(130%, -100%)`}
      />
      {/* top */}

      {/* left */}
      <Box
        {...boxAttrs}
        top={"50%"} // Position the tube light at the bottom
        left={"0%"}
        transform={`translate(-130%, -100%)`}
      />
      <Box
        {...boxAttrs}
        top={"77%"} // Position the tube light at the bottom
        left={"6.5%"}
        transform={`translate(-130%, -100%)`}
      />
      <Box
        {...boxAttrs}
        top={"97%"} // Position the tube light at the bottom
        left={"26%"}
        transform={`translate(-130%, -100%)`}
      />
      {/* left */}

      {/* right */}

      <Box
        {...boxAttrs}
        top={"50%"} // Position the tube light at the bottom
        right={"0%"}
        transform={`translate(130%, -100%)`}
      />
      <Box
        {...boxAttrs}
        top={"77%"} // Position the tube light at the bottom
        right={"6.5%"}
        transform={`translate(130%, -100%)`}
      />
      <Box
        {...boxAttrs}
        top={"97%"} // Position the tube light at the bottom
        right={"26%"}
        transform={`translate(130%, -100%)`}
      />
      {/* right */}
    </>
  );
};

export default SpinTubeLight;
