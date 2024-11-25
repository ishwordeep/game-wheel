import { useFetchPayments } from "@/services/service-index";
import { Container, HStack, Image, Stack, Text } from "@chakra-ui/react";

const Payment = () => {
  const { data: payments } = useFetchPayments();

  return (
    <Container maxW={{ base: "100vw", md: "85vw" }} pb={10}>
      <Stack gap={4} align={"center"}>
        <Text
          textStyle={"heading"}
          color={"primary"}
          fontSize={{ base: "20px", md: "24px", xl: "28px" }}
        >
          We Accept
        </Text>
        <HStack gap={2}>
          {payments?.data?.rows.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              w={50}
              aspectRatio={1}
              borderRadius={10}
            />
          ))}
        </HStack>
      </Stack>
    </Container>
  );
};

export default Payment;
