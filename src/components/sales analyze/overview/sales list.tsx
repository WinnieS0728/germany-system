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
import { Fragment, useState } from "react";
import { Error } from "@/components/UI/error";
import { SortIcon } from "@/components/UI/icons";

export function SalesList() {
  const { t } = useTranslation(["salesAnalyze"]);
  const { data, isPending, isError, error } = useSalesList();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<salesListData>[] = [
    {
      accessorKey: "sa_name",
      header: () => <th>{t("overview.salesList.thead.sales")}</th>,
    },
    {
      accessorKey: "cu_name",
      header: () => <th>{t("overview.salesList.thead.cusName")}</th>,
      cell: ({ row, getValue }) => (
        <p
          className={cn("", {
            "text-green-600": row.original.isFirstOrder,
          })}
        >
          {getValue<string>()}
        </p>
      ),
    },
    {
      accessorKey: "tx",
      header: ({ column }) => (
        <th
          onClick={column.getToggleSortingHandler()}
          className='sortingTh'
        >
          <p>
            {t("overview.salesList.thead.tx")}
            <SortIcon />
          </p>
        </th>
      ),
      cell: ({ getValue }) => getLocaleString(getValue<number>()),
    },
    {
      accessorKey: "orderTime",
      header: ({ column }) => (
        <th
          className='sortingTh'
          onClick={column.getToggleSortingHandler()}
        >
          <p>
            {t("overview.salesList.thead.order")}
            <SortIcon />
          </p>
        </th>
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
                    <Fragment key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Fragment>
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
