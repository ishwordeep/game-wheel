import { AddButton } from "@/components/Button";
import { ActionColumn, DataTable } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import { IRow } from "@/services/service-response";
import {
  RuleResponse,
  useDeleteRule,
  useFetchRules,
} from "@/services/service-rule";
import SetHeader from "@/utils/SetHeader";
import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import RuleForm from "./Form";

const Rules = () => {
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
      cell: ({ row }: IRow<RuleResponse>) => {
        return <Text> {10 * (pageIndex - 1) + (row.index + 1)} </Text>;
      },
      enableSorting: false,
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }: IRow<RuleResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.title}
          </Text>
        );
      },
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }: IRow<RuleResponse>) => {
        return (
          <Text maxW={"200px"} textTransform={"capitalize"} fontWeight={500}>
            {row.original.description}
          </Text>
        );
      },
    },
    {
      header: "Display Order",
      accessorKey: "display_order",
      cell: ({ row }: IRow<RuleResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.display_order}
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
    data: rules,
    isPending,
    isFetching,
  } = useFetchRules({
    page: pageIndex,
    keyword,
  });

  const { mutateAsync: deleteRules, isPending: isDeleting } = useDeleteRule();

  return (
    <>
      <SetHeader heading={"Rules"} description="Welcome to the rules" />

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
            await deleteRules({ id });
            onDeleteClose();
            setId(null);
          }
        }}
      />
      {/* Delete Alert */}

      <DataTable
        columns={columns}
        data={rules?.data?.rows ?? []}
        isLoading={isPending || isFetching}
        count={rules?.data?.count ?? 0}
        filter={{
          globalFilter: keyword,
          setGlobalFilter: setKeyword,
        }}
        pagination={{
          manual: true,
          totalRows: rules?.data?.pagination?.total,
          pageCount: rules?.data?.pagination?.last_page,
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

          {/* Rules Add Form */}

          <RuleForm
            isOpen={isFormOpen}
            onClose={() => {
              onFormClose();
              setId(null);
            }}
            id={id}
          />

          {/* Rules Add Form */}
        </HStack>
      </DataTable>
    </>
  );
};

export default Rules;
