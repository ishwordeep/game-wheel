import { DataTable } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import {
  SpinRecordResponse,
  useFetchSpinRecords,
} from "@/services/service-index";
import { IRow } from "@/services/service-response";
import SetHeader from "@/utils/SetHeader";
import { HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SpinRecord = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const [pageIndex, setPageIndex] = useState(pageFromUrl);
  const [id, setId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: ({ row }: IRow<SpinRecordResponse>) => {
        return <Text> {10 * (pageIndex - 1) + (row.index + 1)} </Text>;
      },
      enableSorting: false,
    },
    {
      header: "Value",
      accessorKey: "wheel.value",
      cell: ({ row }: IRow<SpinRecordResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.wheel.value}
          </Text>
        );
      },
    },

    {
      header: "User",
      accessorKey: "user.name",
      cell: ({ row }: IRow<SpinRecordResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.user.name}
          </Text>
        );
      },
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: IRow<SpinRecordResponse>) => {
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
    data: spinRecord,
    isPending,
    isFetching,
  } = useFetchSpinRecords({
    page: pageIndex,
    keyword,
  });

  return (
    <>
      <SetHeader
        heading={"SpinRecord"}
        description="Welcome to the spinRecord"
      />

      <DataTable
        columns={columns}
        data={spinRecord?.data?.rows ?? []}
        isLoading={isPending || isFetching}
        count={spinRecord?.data?.count ?? 0}
        filter={{
          globalFilter: keyword,
          setGlobalFilter: setKeyword,
        }}
        pagination={{
          manual: true,
          totalRows: spinRecord?.data?.pagination?.total,
          pageCount: spinRecord?.data?.pagination?.last_page,
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
        </HStack>
      </DataTable>
    </>
  );
};

export default SpinRecord;
