import { useLogout } from "@/services/service-auth";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const profileItems = [
  {
    title: "Profile",
    to: "profile",
  },
  {
    title: "Balance",
    to: "balance",
  },
];

const UserMenu = () => {
  const { mutateAsync: logout } = useLogout();
  return (
    <Menu autoSelect={false} closeOnBlur={true} placement="bottom-end">
      <MenuButton cursor={"pointer"} as={Avatar} size={"sm"} />
      <MenuList minW={"150px"} zIndex={999} p={1}>
        {profileItems.map((item, index) => (
          <MenuItem
            as={Link}
            to={`/profile/${item.to}`}
            borderRadius={5}
            key={index}
          >
            {item.title}
          </MenuItem>
        ))}
        <MenuItem
          _hover={{ bg: "red.100" }}
          borderRadius={5}
          onClick={async () => await logout()}
          color={"red.500"}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
