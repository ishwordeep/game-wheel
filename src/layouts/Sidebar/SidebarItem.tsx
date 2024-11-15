import {
  Collapse,
  Flex,
  HStack,
  Icon,
  ResponsiveValue,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { CaretRight } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface IItemProps {
  icon: React.ElementType;
  title: string;
  to: string;
}

interface ISidebarItem {
  item: IItemProps;
  subItems?: IItemProps[];
  isOpen?: boolean;
  onToggle: () => void;
  width: ResponsiveValue<number | string>;
  onClose?: () => void;
  onClick?: () => void;
}

const SidebarItem: React.FC<ISidebarItem> = ({
  item,
  subItems,
  isOpen,
  onToggle,
  width,
  // onClose,
  onClick,
}) => {
  const attributes = {
    borderRadius: 5,
    align: "center",
    _hover: {
      bg: "primary.100",
      color: "primary.500",
    },
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes(item.to)) {
      onToggle();
    }
  }, [pathname]);

  return !!subItems && subItems.length > 0 ? (
    <>
      <HStack h={"full"} w={"full"} gap={3}>
        <Flex
          as={NavLink}
          bg={
            pathname.includes(item.to) || isOpen ? "primary.100" : "transparent"
          }
          color={pathname.includes(item.to) || isOpen ? "primary.500" : ""}
          fontWeight={pathname.includes(item.to) || isOpen ? "bold" : "normal"}
          justify={"space-between"}
          onClick={onToggle}
          cursor={"pointer"}
          {...attributes}
          w={"full"}
          p={2}
        >
          <HStack align={"center"} justify={"start"}>
            <Icon as={item.icon} boxSize={5} />
            <Text>{item.title}</Text>
          </HStack>
          <Icon
            as={CaretRight}
            boxSize={5}
            transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
          />
        </Flex>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <Flex flexDir={"column"} gap={4} pl={8}>
          {subItems.map((subItem, index) => (
            <Tooltip
              display={width === "95px" ? "block" : "none"}
              fontSize={"16px"}
              label={subItem.title}
              placement={"right"}
              hasArrow
              key={index}
            >
              <Flex
                as={NavLink}
                p={2}
                onClick={onClick}
                gap={2}
                to={subItem.to}
                key={index}
                _activeLink={
                  pathname === subItem.to
                    ? {
                        bg: "primary.50",
                        color: "primary.500",
                        fontWeight: "bold",
                        weight: "bold",
                      }
                    : {}
                }
                {...attributes}
              >
                <Icon as={subItem.icon} boxSize={6} />
                <Text
                  opacity={{ base: 1, sm: width === "95px" ? 0 : 1 }}
                  pos={{
                    base: "static",
                    sm: width === "95px" ? "absolute" : "static",
                  }}
                  fontSize={{ md: "16px" }}
                  whiteSpace={"nowrap"}
                >
                  {subItem.title}
                </Text>
              </Flex>
            </Tooltip>
          ))}
        </Flex>
      </Collapse>
    </>
  ) : (
    <HStack h={"max-content"} gap={3}>
      <Flex
        p={2}
        h={"full"}
        as={NavLink}
        onClick={onClick}
        to={item.to}
        _activeLink={{
          bg: "primary.100",
          color: "primary.500",
          fontWeight: "bold",
        }}
        w={"100%"}
        {...attributes}
        whiteSpace={"nowrap"}
      >
        <HStack align={"center"} justify={"start"}>
          <Icon as={item.icon} boxSize={5} />
          <Text
            opacity={{ base: 1, sm: width === "95px" ? 0 : 1 }}
            pos={{
              base: "static",
              sm: width === "95px" ? "absolute" : "static",
            }}
          >
            {item.title}
          </Text>
        </HStack>
      </Flex>
    </HStack>
  );
};

export default SidebarItem;
