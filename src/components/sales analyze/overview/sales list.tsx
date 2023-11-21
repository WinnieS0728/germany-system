import { Table } from "@/components/table/table";
import {
  salesListData,
  useSalesList,
} from "@/components/sales analyze/overview/sales list.hook";
import { Section } from "@/layouts/section";
import { cn } from "@/utils/cn";
import { getLocaleString } from "@/utils/get localeString";
import { Loading } from "@/components/UI/loading";
import { useTranslation } from "react-i18next";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { Error } from "@/components/UI/error";

export function SalesList() {
  const { t } = useTranslation(["salesAnalyze"]);
  const { data, isPending, isError, error } = useSalesList();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<salesListData>[] = [
    {
      accessorKey: "sa_name",
      header: t("overview.salesList.thead.sales"),
    },
    {
      accessorKey: "cu_name",
      header: t("overview.salesList.thead.cusName"),
      cell: ({ row, getValue }) => (
        <p className={cn("", {
          'text-green-600': row.original.isFirstOrder
        })}>{getValue() as string}</p>
      ),
    },
    {
      accessorKey: "tx",
      header: ({ column }) => (
        <p onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t("overview.salesList.thead.tx")}
        </p>
      ),
      cell: ({ getValue }) => getLocaleString(getValue() as number),
    },
    {
      accessorKey: "orderTime",
      header: ({ column }) => (
        <p onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t("overview.salesList.thead.order")}
        </p>
      ),
    },
  ];

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: data?.dataSet || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (isPending) {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 20} />
        </>
      </Section>
    );
  }
  if (isError) {
    return (
      <Section>
        <>
          <Error.block message={error.message} />
        </>
      </Section>
    );
  }

  return (
    <>
      <Section title={t("overview.salesList.title")}>
        <Table>
          <table>
            <thead>
              <tr>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={4}
                >
                  {t("overview.salesList.thead.storeList")}
                </th>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={data.indexArray.length}
                >
                  {t("overview.salesList.thead.orderList")}
                </th>
              </tr>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                  {data.indexArray.map((number) => (
                    <th key={number}>{number}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  {row.original.salesArray.map((date, index) => (
                    <td
                      key={index}
                      className='whitespace-nowrap'
                    >
                      {date}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
