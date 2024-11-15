import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Icon,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Pagination from "./Pagination";

interface IDataTable {
  data: Record<string, any>[];
  count?: number;
  children?: ReactNode;
  columns: ColumnDef<any, any>[];
  isLoading?: boolean;
  showPagination?: boolean;
  pagination?: {
    manual?: boolean;
    pageCount?: number;
    totalRows?: number;
    pageParams?: {
      pageSize: number;
      pageIndex: number;
    };
  };
  filter?: {
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
  };

  handlePageSize?: (pageSize: number) => void;
}

const filterFunction: FilterFn<any> = (rows, id, value) => {
  const rowValue = String(rows.original[id]).toLowerCase();
  const filterStatusValue = value.toLowerCase();
  // return rowValue.includes(filterStatusValue);

  // Split the rowValue by spaces to check for individual words
  const words = rowValue.split(" ");

  // Check if any word starts with the filterValue
  const match = words.some((word) => word.startsWith(filterStatusValue));

  return match;
};

const DataTable: React.FC<IDataTable> = ({
  data,
  count,
  columns,
  isLoading,
  pagination,
  filter,
  children,
  showPagination = true,
}) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pageIndex, setPageIndex] = React.useState<number>(1);
  const [pageSize, _] = React.useState<number>(10);
  // const handlePageSize = (pageSize: number) => {
  //   setPageSize(pageSize);
  // };

  const table = useReactTable({
    columns,
    data,
    manualPagination: pagination?.manual,
    state: {
      columnFilters,
      globalFilter: filter?.globalFilter?.trim() || "",
      pagination: pagination?.manual
        ? pagination?.pageParams
        : {
            pageIndex,
            pageSize,
          },
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: filterFunction,
    onGlobalFilterChange: filter?.setGlobalFilter,
  });

  return (
    <Flex flexDir={"column"} gap={4}>
      <Card bg={"gray.50"} variant={"outline"}>
        {children && <CardHeader>{children}</CardHeader>}
        <CardBody>
          <TableContainer>
            <Table>
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <Tr bg={"gray.200"} key={headerGroup.id} mb={2}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <Th
                            colSpan={header.colSpan}
                            key={header.id}
                            textTransform="capitalize"
                            whiteSpace="nowrap"
                            mb={10}
                            borderColor={"gray.300"}
                            style={{
                              width:
                                header.getSize() !== 150
                                  ? header.getSize()
                                  : "auto",

                              textAlign: "center",
                              padding: "20px",
                              fontWeight: 600,
                            }}
                            fontFamily={"Inter Variable"}
                            cursor={
                              header.column.getCanSort() ? "pointer" : "default"
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <Flex gap={2} justify={"center"} align={"center"}>
                              <Text
                                textAlign={"center"}
                                fontSize={{
                                  base: "sm",
                                  lg: "md",
                                }}
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </Text>
                              {header.column.getCanSort() ? (
                                header.column.getIsSorted().valueOf() ===
                                "desc" ? (
                                  <Icon
                                    as={ArrowUp}
                                    boxSize={4}
                                    weight="bold"
                                  />
                                ) : header.column.getIsSorted().valueOf() ===
                                  "asc" ? (
                                  <Icon
                                    as={ArrowDown}
                                    boxSize={4}
                                    weight="bold"
                                  />
                                ) : null
                              ) : null}
                            </Flex>
                          </Th>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Thead>
              <Tbody>
                {isLoading ? (
                  <>
                    {[...Array(5)].map((_, rowIndex) => (
                      <Tr bg={"gray.50"} key={rowIndex}>
                        {columns.map((_, columnIndex) => (
                          <Td key={columnIndex}>
                            <Skeleton height="10px" w={"full"} />
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </>
                ) : count === 0 ? (
                  <Tr bg={"gray.50"}>
                    <Td border={0} colSpan={columns.length} textAlign="center">
                      No data found
                    </Td>
                  </Tr>
                ) : (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <Tr
                        _hover={{
                          bg: "gray.100",
                        }}
                        bg={"gray.50"}
                        verticalAlign={"middle"}
                        key={row.id}
                      >
                        {row.getVisibleCells()?.map((cell, index) => {
                          return (
                            <Td
                              my={2}
                              style={{
                                width: `${columns[index]?.maxSize}px`,

                                textAlign: "center",
                                overflow: "clip",
                                textOverflow: "ellipsis",
                              }}
                              borderColor={"gray.300"}
                              key={cell.id}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
        {showPagination && (
          <CardFooter>
            <Stack align={"center"} w={"full"}>
              <Pagination
                pageIndex={
                  pagination?.manual
                    ? pagination?.pageParams?.pageIndex ?? 1
                    : pageIndex
                }
                setPageIndex={setPageIndex}
                totalPage={
                  pagination?.manual
                    ? pagination?.pageCount ?? 1
                    : table.getPageCount()
                }
              />
            </Stack>
          </CardFooter>
        )}
      </Card>
    </Flex>
  );
};

export default DataTable;
