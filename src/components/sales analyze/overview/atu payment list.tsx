import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { atuPaymentList, useAtuPaymentList } from "./atu payment list.hook";
import { Loading } from "@/components/UI/loading";
import { Error } from "@/components/UI/error";
import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SortIcon } from "@/components/UI/icons";
import { getTranslationMonth } from "@/utils/get month translation";

export function AtuPaymentList() {
  const {
    t,
    i18n: { language },
  } = useTranslation(["salesAnalyze"]);
  const { status, atuPaymentList, message } = useAtuPaymentList();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<atuPaymentList>[] = [
    {
      id: "storeList",
      header: ({ header }) => (
        <th colSpan={header.colSpan} className='text-start bg-sectionHeader text-myWhite'>
          {t("overview.atuPaymentList.thead.storeList", {
            lng: "en",
          })}
        </th>
      ),
      columns: [
        {
          accessorKey: "EmpName",
          header: () => <th>{t("overview.atuPaymentList.thead.sales")}</th>,
        },
        {
          accessorKey: "area",
          header: () => <th>{t("overview.atuPaymentList.thead.country")}</th>,
        },
        {
          accessorKey: "cusName",
          header: () => <th>{t("overview.atuPaymentList.thead.cusName")}</th>,
        },
        {
          accessorKey: "payNumber",
          header: ({ column }) => (
            <th
              className='sortingTh'
              onClick={column.getToggleSortingHandler()}
            >
              <p>
                {t("overview.atuPaymentList.thead.payQty")}
                <SortIcon />
              </p>
            </th>
          ),
        },
      ],
    },
    {
      id: "monthPay",
      header: ({ header }) => (
        <th colSpan={header.colSpan} className='text-start bg-sectionHeader text-myWhite'>
          {t("overview.atuPaymentList.thead.payList")}
        </th>
      ),
      columns: [
        {
          accessorKey: "Jan",
          header: () => <th>{getTranslationMonth(language, 0)}</th>,
        },
        {
          accessorKey: "Feb",
          header: () => <th>{getTranslationMonth(language, 1)}</th>,
        },
        {
          accessorKey: "Mar",
          header: () => <th>{getTranslationMonth(language, 2)}</th>,
        },
        {
          accessorKey: "Apr",
          header: () => <th>{getTranslationMonth(language, 3)}</th>,
        },
        {
          accessorKey: "May",
          header: () => <th>{getTranslationMonth(language, 4)}</th>,
        },
        {
          accessorKey: "Jun",
          header: () => <th>{getTranslationMonth(language, 5)}</th>,
        },
        {
          accessorKey: "Jul",
          header: () => <th>{getTranslationMonth(language, 6)}</th>,
        },
        {
          accessorKey: "Aug",
          header: () => <th>{getTranslationMonth(language, 7)}</th>,
        },
        {
          accessorKey: "Sep",
          header: () => <th>{getTranslationMonth(language, 8)}</th>,
        },
        {
          accessorKey: "Oct",
          header: () => <th>{getTranslationMonth(language, 9)}</th>,
        },
        {
          accessorKey: "Nov",
          header: () => <th>{getTranslationMonth(language, 10)}</th>,
        },
        {
          accessorKey: "Dec",
          header: () => <th>{getTranslationMonth(language, 11)}</th>,
        },
      ],
    },
  ];

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: atuPaymentList || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (status === "pending") {
    return (
      <Section>
        <>
          <Loading.block />
          <Loading.block height={16 * 20} />
        </>
      </Section>
    );
  }
  if (status === "error") {
    return (
      <Section>
        <Error.block message={message} />
      </Section>
    );
  }
  return (
    <>
      <Section
        title={t("overview.atuPaymentList.title")}
      >
        <Table>
          <table>
            <thead>
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
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Section>
    </>
  );
}
