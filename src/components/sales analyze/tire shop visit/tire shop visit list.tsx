import { Loading } from "@/components/UI/loading";
import { tsVisitList, useTSVisitList } from "./tire shop visit list.hook";
import { Section } from "@/layouts/section";
import { Error } from "@/components/UI/error";
import { Table } from "@/components/table/table";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { SortIcon } from "@/components/UI/icons";

export function TireShopVisitList() {
  const { t } = useTranslation(["salesAnalyze"]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isPending, isError, error } = useTSVisitList();

  const columns: ColumnDef<tsVisitList>[] = [
    {
      accessorKey: "Empname",
      header: () => <th>{t("TSVisitList.thead.sales")}</th>,
    },
    {
      accessorKey: "Custname",
      header: () => <th>{t("TSVisitList.thead.cusName")}</th>,
    },
    {
      accessorKey: "SumQty",
      header: ({ column }) => (
        <th onClick={column.getToggleSortingHandler()} className="sortingTh">
          <p>
            {t("TSVisitList.thead.tx")}
            <SortIcon />
          </p>
        </th>
      ),
    },
    {
      accessorKey: "vqty",
      header: ({ column }) => (
        <th onClick={column.getToggleSortingHandler()} className="sortingTh">
          <p>
            {t("TSVisitList.thead.visit")}
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
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (isPending) {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 30} />
        </>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <Error.block message={error.message} />
      </Section>
    );
  }

  return (
    <>
      <Section>
        <Table>
          <table>
            <thead>
              <tr>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={4}
                >
                  {t("TSVisitList.thead.list")}
                </th>
                <th
                  className='text-start bg-sectionHeader text-myWhite'
                  colSpan={data.indexArray.length}
                >
                  {t("TSVisitList.thead.dateList")}
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
                  {row.original.visitDateList.map((data, index) => (
                    <td
                      key={index}
                      className='whitespace-nowrap'
                    >
                      <Link
                        target='_blank'
                        to={`https://esys.orange-electronic.com/TravelRep/Edit/${data.BTRId}`}
                        className='text-blue-500'
                      >
                        {data.StartDT}
                      </Link>
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
