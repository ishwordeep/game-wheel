import {
  Avatar,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Bell, ChatDots, Gift, List } from "@phosphor-icons/react";

const icons = [
  {
    label: "Notification",
    icon: Bell,
    bg: "primary.500",
    color: "white",
    bgHover: "primary.600",
    iconColor: "white",
  },
  {
    label: "Messages",
    icon: ChatDots,
    color: "primary.500",
    bg: "primary.100",
    bgHover: "primary.200",
    iconColor: "primary.500",
  },
  {
    label: "Orders",
    icon: Gift,
    color: "primary.500",
    bg: "primary.100",
    bgHover: "primary.200",
    iconColor: "primary.500",
  },
];

import { useHeaderDataStore } from "@/store/headerDataStore";
import MobileSidebar from "../Sidebar/MobileSidebar";
const Navbar = () => {
  const { headerData } = useHeaderDataStore();
  const { isOpen, onOpen: onNavOpen, onClose } = useDisclosure();

  return (
    <HStack gap={6} align={"center"} justify={"space-between"}>
      <HStack gap={2} hideFrom={"md"}>
        <IconButton
          aria-label="Menu"
          icon={<Icon as={List} boxSize={7} />}
          onClick={onNavOpen}
          variant={"outline"}
        />
      </HStack>

      <MobileSidebar isOpen={isOpen} onClose={onClose} />
      <Stack gap={0} textAlign={{ base: "center", md: "start" }}>
        <Text
          fontSize={{ base: "xl", sm: "2xl", lg: "4xl" }}
          fontWeight={"bold"}
        >
          {headerData?.heading}
        </Text>
        <Text
          hideBelow={"sm"}
          color={"gray.500"}
          fontSize={{ base: "sm", md: "md" }}
        >
          {headerData?.description}
        </Text>
      </Stack>
      <HStack align={"center"} gap={6}>
        <HStack align={"center"}>
          <Avatar name={"Samantha"} />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Navbar;
