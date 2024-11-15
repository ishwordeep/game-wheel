import { useLogout } from "@/services/service-auth";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  HStack,
  Icon,
  IconButton,
  ResponsiveValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Gear, SignOut } from "@phosphor-icons/react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarItems } from "../data";
import SidebarItem from "./SidebarItem";
interface ISidebarProps {
  width?: ResponsiveValue<number | string>;
  onClick?: () => void;
}

const Sidebar: FC<ISidebarProps & CardProps> = ({
  width,
  onClick,
  ...rest
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogout();
  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <Card
      pos={"fixed"}
      h={"100dvh"}
      w={width}
      borderRadius={0}
      shadow={"none"}
      transition={"all 0.25s cubic-bezier(.17,.67,.17,.88)"}
      bg={"gray.50"}
      {...rest}
    >
      <CardHeader>
        <Stack align={"center"} gap={0}>
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight={"bold"}>
            Admin Panel
            <Text as={"span"} color={"red.500"}>
              .
            </Text>
          </Text>
        </Stack>
      </CardHeader>
      <CardBody overflowY={"auto"}>
        <Stack gap={4}>
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              width={"250px"}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              onClose={() => {}}
              onClick={onClick}
            />
          ))}
        </Stack>
      </CardBody>
      <CardFooter>
        <HStack align={"center"} justify={"center"} w={"full"}>
          <IconButton
            w={"full"}
            aria-label={"Settings"}
            colorScheme="gray"
            icon={<Icon as={Gear} boxSize={5} />}
            onClick={() => {
              navigate("/settings");
            }}
          />
          <IconButton
            w={"full"}
            aria-label={"Sign Out"}
            colorScheme="red"
            icon={<Icon as={SignOut} boxSize={5} />}
            onClick={async () => {
              await logout();
            }}
          />
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default Sidebar;
