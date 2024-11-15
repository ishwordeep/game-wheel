import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { FC } from "react";
import Sidebar from ".";

interface IMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: FC<IMobileSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      {/* Sidebar Content */}
      <DrawerOverlay />
      <DrawerContent maxW={"350px"}>
        <DrawerCloseButton />
        <Sidebar
          hideBelow={"base"}
          onClick={onClose}
          maxW={"350px"}
          w={"full"}
        />
        {/* <Box h={"full"} w={"full"} bg={"red.200"} /> */}
        {/* Sidebar Content */}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
