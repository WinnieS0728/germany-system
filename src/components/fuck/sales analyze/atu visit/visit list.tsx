import { Table } from "@/components/table/table";
import {
  useAtuVisit,
  visitData,
} from "@/components/fuck/sales analyze/atu visit/atu visit list.hook";
import { Section } from "@/layouts/section";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
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

export function AtuVisitList() {
  const { t } = useTranslation(["salesAnalyze"]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isPending, isError, error } = useAtuVisit();

  const columns: ColumnDef<visitData>[] = [
    {
      accessorKey: "EmpName",
      header: () => <th>{t("atuVisitList.thead.sales")}</th>,
    },
    {
      accessorKey: "cusName",
      header: () => <th>{t("atuVisitList.thead.cusName")}</th>,
    },
    {
      accessorKey: "payNumber",
      header: ({ column }) => (
        <th
          onClick={column.getToggleSortingHandler()}
          className='sortingTh'
        >
          <p>
            {t("atuVisitList.thead.pay")}
            <SortIcon />
          </p>
        </th>
      ),
    },
    {
      accessorKey: "visitNumber",
      header: ({ column }) => (
        <th
          onClick={column.getToggleSortingHandler()}
          className='sortingTh'
        >
          <p>
            {t("atuVisitList.thead.visit")}
            <SortIcon />
          </p>
        </th>
      ),
    },
  ];

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: data?.atuVisit || [],
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
        <Error.block
          message={error.message}
          className='h-96'
        />
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
                  colSpan={4}
                  className='text-start bg-sectionHeader text-myWhite'
                >
                  {t("atuVisitList.thead.visitList")}
                </th>
                <th
                  colSpan={data.indexArray.length}
                  className='text-start bg-sectionHeader text-myWhite'
                >
                  {t("atuVisitList.thead.dateList")}
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
                  {data.indexArray.map((index) => (
                    <th key={index}>{index}</th>
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
                  {row.original.visitList.map((data, index) => (
                    <td
                      key={index}
                      className='whitespace-nowrap'
                    >
                      <a
                        href={`https://esys.orange-electronic.com/TravelRep/Edit/${data.BTRId}`}
                        target='_blank'
                        className='text-blue-500'
                      >
                        {data.StartDT}
                      </a>
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
