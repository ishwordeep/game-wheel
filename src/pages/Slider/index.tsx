import { AddButton } from "@/components/Button";
import { ActionColumn, DataTable } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import LazyImage from "@/components/LazyImage";
import { IRow } from "@/services/service-response";
import {
  SliderResponse,
  useDeleteSlider,
  useFetchSliders,
} from "@/services/service-slider";
import SetHeader from "@/utils/SetHeader";
import { HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SlidersForm from "./Form";

const Sliders = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const queryFromUrl = urlParams.get("query") || "";
  const [pageIndex, setPageIndex] = useState(pageFromUrl);
  const [id, setId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>(queryFromUrl);

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
      cell: ({ row }: IRow<SliderResponse>) => {
        return <Text> {10 * (pageIndex - 1) + (row.index + 1)} </Text>;
      },
      enableSorting: false,
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }: IRow<SliderResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.title}
          </Text>
        );
      },
    },
    {
      header: "Sub Title",
      accessorKey: "subtitle",
      cell: ({ row }: IRow<SliderResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.subtitle}
          </Text>
        );
      },
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<SliderResponse>) => {
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
    data: sliders,
    isPending,
    isFetching,
  } = useFetchSliders({
    page: pageIndex,
    keyword,
  });

  const { mutateAsync: deleteSliders, isPending: isDeleting } =
    useDeleteSlider();

  return (
    <>
      <SetHeader heading={"Sliders"} description="Welcome to the sliders" />

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
            await deleteSliders({ id });
            onDeleteClose();
            setId(null);
          }
        }}
      />
      {/* Delete Alert */}

      <DataTable
        columns={columns}
        data={sliders?.data?.rows ?? []}
        isLoading={isPending || isFetching}
        count={sliders?.data?.count ?? 0}
        pagination={{
          manual: true,
          totalRows: sliders?.data?.pagination?.total,
          pageCount: sliders?.data?.pagination?.last_page,
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

          {/* Sliders Add Form */}

          <SlidersForm
            isOpen={isFormOpen}
            onClose={() => {
              onFormClose();
              setId(null);
            }}
            id={id}
          />

          {/* Sliders Add Form */}
        </HStack>
      </DataTable>
    </>
  );
};

export default Sliders;
