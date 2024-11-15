import { AddButton } from "@/components/Button";
import { ActionColumn, DataTable } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import { IRow } from "@/services/service-response";
import {
  WheelResponse,
  useDeleteWheel,
  useFetchWheels,
} from "@/services/service-wheel";
import SetHeader from "@/utils/SetHeader";
import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import WheelForm from "./Form";

const Wheels = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const [pageIndex, setPageIndex] = useState(pageFromUrl);
  const [id, setId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: ({ row }: IRow<WheelResponse>) => {
        return <Text> {10 * (pageIndex - 1) + (row.index + 1)} </Text>;
      },
      enableSorting: false,
    },
    {
      header: "Value",
      accessorKey: "value",
      cell: ({ row }: IRow<WheelResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.value}
          </Text>
        );
      },
    },

    {
      header: "Win Ratio",
      accessorKey: "win_ratio",
      cell: ({ row }: IRow<WheelResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.win_ratio}
          </Text>
        );
      },
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => {
        const { id } = row.original;
        return (
          <HStack>
            <ActionColumn
              handleEdit={() => {
                setId(id);
                onFormOpen();
              }}
              handleDelete={() => {
                {
                  setId(id);
                  onDeleteOpen();
                }
              }}
            />
          </HStack>
        );
      },
    },
  ];

  const {
    data: wheels,
    isPending,
    isFetching,
  } = useFetchWheels({
    page: pageIndex,
    keyword,
  });

  const { mutateAsync: deleteWheels, isPending: isDeleting } = useDeleteWheel();

  return (
    <>
      <SetHeader heading={"Wheels"} description="Welcome to the wheels" />

      {/* Delete Alert */}
      <DeleteAlert
        isOpen={isDeleteOpen}
        onClose={() => {
          onDeleteClose();
          setId(null);
        }}
        isDeleting={isDeleting}
        onDelete={async () => {
          if (id) {
            await deleteWheels({ id });
            onDeleteClose();
            setId(null);
          }
        }}
      />
      {/* Delete Alert */}

      <DataTable
        columns={columns}
        data={wheels?.data?.rows ?? []}
        isLoading={isPending || isFetching}
        count={wheels?.data?.count ?? 0}
        filter={{
          globalFilter: keyword,
          setGlobalFilter: setKeyword,
        }}
        pagination={{
          manual: true,
          totalRows: wheels?.data?.pagination?.total,
          pageCount: wheels?.data?.pagination?.last_page,
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

          {/* Wheels Add Form */}

          <WheelForm
            isOpen={isFormOpen}
            onClose={() => {
              onFormClose();
              setId(null);
            }}
            id={id}
          />

          {/* Wheels Add Form */}
        </HStack>
      </DataTable>
    </>
  );
};

export default Wheels;
