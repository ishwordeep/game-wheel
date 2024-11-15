import { AddButton } from "@/components/Button";
import { ActionColumn, DataTable } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import LazyImage from "@/components/LazyImage";
import {
  PaymentResponse,
  useDeletePayment,
  useFetchPayments,
} from "@/services/service-payment";
import { IRow } from "@/services/service-response";
import SetHeader from "@/utils/SetHeader";
import { HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentsForm from "./Form";

const Payments = () => {
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
      cell: ({ row }: IRow<PaymentResponse>) => {
        return <Text> {10 * (pageIndex - 1) + (row.index + 1)} </Text>;
      },
      enableSorting: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: IRow<PaymentResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.name}
          </Text>
        );
      },
    },

    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<PaymentResponse>) => {
        return (
          <Stack align={"center"}>
            <LazyImage
              borderRadius={5}
              objectFit={"cover"}
              src={row.original.image ?? ""}
              boxSize={16}
            />
          </Stack>
        );
      },
      enableSorting: false,
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
    data: payments,
    isPending,
    isFetching,
    refetch,
  } = useFetchPayments({
    page: pageIndex,
    perPage: 2,
    keyword,
  });

  const { mutateAsync: deletePayments, isPending: isDeleting } =
    useDeletePayment();

  return (
    <>
      <SetHeader heading={"Payments"} description="Welcome to the payments" />

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
            await deletePayments({ id });
            onDeleteClose();
            setId(null);
          }
        }}
      />
      {/* Delete Alert */}

      <DataTable
        columns={columns}
        data={payments?.data?.rows ?? []}
        isLoading={isPending || isFetching}
        count={payments?.data?.count ?? 0}
        filter={{
          globalFilter: keyword,
          setGlobalFilter: setKeyword,
        }}
        pagination={{
          manual: true,
          totalRows: payments?.data?.pagination?.total,
          pageCount: payments?.data?.pagination?.last_page,
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

          {/* Payments Add Form */}

          <PaymentsForm
            isOpen={isFormOpen}
            onClose={() => {
              onFormClose();
              setId(null);
            }}
            id={id}
          />

          {/* Payments Add Form */}
        </HStack>
      </DataTable>
    </>
  );
};

export default Payments;
