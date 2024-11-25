import { AddButton } from "@/components/Button";
import { DataTable, StatusSwitch } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import LazyImage from "@/components/LazyImage";
import { UserListResponse, useFetchUserLists } from "@/services/service-index";
import { IRow } from "@/services/service-response";
import SetHeader from "@/utils/SetHeader";
import {
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import UserForm from "./Form";

const Users = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const [pageIndex, setPageIndex] = useState(pageFromUrl);
  const [id, setId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: ({ row }: IRow<UserListResponse>) => {
        return <Text> {10 * (pageIndex - 1) + (row.index + 1)} </Text>;
      },
      enableSorting: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: IRow<UserListResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.name}
          </Text>
        );
      },
    },

    {
      header: "Username",
      accessorKey: "username",
      cell: ({ row }: IRow<UserListResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.username}
          </Text>
        );
      },
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<UserListResponse>) => {
        return (
          <Stack align={"center"}>
            <LazyImage
              src={row.original.image}
              alt={row.original.name}
              aspectRatio={1}
              boxSize={16}
              minW={16}
            />
          </Stack>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "is_active",
      cell: ({ row }: IRow<UserListResponse>) => {
        const { id, is_active } = row.original;
        return (
          <StatusSwitch
            id={id}
            isActive={is_active ? true : false}
            model="user"
          />
        );
      },
    },
    {
      header: "Balance",
      accessorKey: "total_balance",
      cell: ({ row }: IRow<UserListResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.total_balance}
          </Text>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: IRow<UserListResponse>) => {
        // const { id } = row.original;
        return (
          <IconButton
            aria-label="delete"
            icon={<Icon as={DotsThreeOutlineVertical} boxSize={5} />}
            variant={"ghost"}
          />
        );
      },
    },
  ];

  const {
    data: users,
    isPending,
    isFetching,
  } = useFetchUserLists({
    page: pageIndex,
    keyword,
  });

  return (
    <>
      <SetHeader heading={"Users"} description="Welcome to the users" />

      <DataTable
        columns={columns}
        data={users?.data?.rows ?? []}
        isLoading={isPending || isFetching}
        count={users?.data?.count ?? 0}
        filter={{
          globalFilter: keyword,
          setGlobalFilter: setKeyword,
        }}
        pagination={{
          manual: true,
          totalRows: users?.data?.pagination?.total,
          pageCount: users?.data?.pagination?.last_page,
          pageParams: {
            pageIndex,
            pageSize: 10,
          },
        }}
      >
        <HStack justify={"space-between"} gap={4}>
          <SearchInput
            onSearch={setKeyword}
            placeholder="Search ..."
            maxW={"300px"}
          />
          <AddButton onClick={onFormOpen} />
          <UserForm id={id} isOpen={isFormOpen} onClose={onFormClose} />
        </HStack>
      </DataTable>
    </>
  );
};

export default Users;
