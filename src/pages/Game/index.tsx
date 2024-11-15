import { AddButton } from "@/components/Button";
import { ActionColumn, DataTable } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import LazyImage from "@/components/LazyImage";
import {
  GameResponse,
  useDeleteGame,
  useFetchGames,
} from "@/services/service-game";
import { IRow } from "@/services/service-response";
import SetHeader from "@/utils/SetHeader";
import { HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameForm from "./Form";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const queryFromUrl = urlParams.get("q") || "";
  const [pageIndex, setPageIndex] = useState(pageFromUrl);
  const [id, setId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>(queryFromUrl);

  useEffect(() => {
    setPageIndex(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    // Update URL with search text as a query parameter `q`
    const params = new URLSearchParams(location.search);
    if (keyword) {
      params.set("q", keyword);
    } else {
      params.delete("q");
    }
    navigate({ search: params.toString() }, { replace: true });
  }, [keyword, location.search, navigate]);

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
      cell: ({ row }: IRow<GameResponse>) => {
        return <Text> {10 * (pageIndex - 1) + (row.index + 1)} </Text>;
      },
      enableSorting: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: IRow<GameResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.name}
          </Text>
        );
      },
    },
    {
      header: "Agent Link",
      accessorKey: "agent_link",
      cell: ({ row }: IRow<GameResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.agent_link}
          </Text>
        );
      },
    },
    {
      header: "Player Link",
      accessorKey: "player_link",
      cell: ({ row }: IRow<GameResponse>) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.player_link}
          </Text>
        );
      },
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: IRow<GameResponse>) => {
        return (
          <Stack align={"center"}>
            <LazyImage
              borderRadius={5}
              objectFit={"cover"}
              src={row.original.image ?? ""}
              boxSize={16}
              minW={16}
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
    data: games,
    isPending,
    isFetching,
    refetch,
  } = useFetchGames({
    page: pageIndex,
    keyword: queryFromUrl,
  });
  useEffect(() => {
    refetch();
  }, [pageIndex, keyword]);
  const { mutateAsync: deleteGame, isPending: isDeleting } = useDeleteGame();

  return (
    <>
      <SetHeader heading={"Game"} description="Welcome to the game" />

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
            await deleteGame({ id });
            onDeleteClose();
            setId(null);
          }
        }}
      />
      {/* Delete Alert */}

      <DataTable
        columns={columns}
        data={games?.data?.rows ?? []}
        isLoading={isPending || isFetching}
        count={games?.data?.count ?? 0}
        pagination={
          games?.data?.count ?? 0 > 0
            ? {
                manual: true,
                totalRows: games?.data?.pagination?.total ?? 0,
                pageCount: games?.data?.pagination?.last_page ?? 1,
                pageParams: {
                  pageIndex,
                  pageSize: 10,
                },
              }
            : undefined
        }
      >
        <HStack justify={"space-between"} gap={4}>
          <SearchInput
            value={keyword}
            onSearch={setKeyword}
            placeholder="Search ..."
            maxW={"300px"}
          />
          <AddButton onClick={onFormOpen} />

          {/* Game Add Form */}

          <GameForm
            isOpen={isFormOpen}
            onClose={() => {
              onFormClose();
              setId(null);
            }}
            id={id}
          />

          {/* Game Add Form */}
        </HStack>
      </DataTable>
    </>
  );
};

export default Game;
