import { YearSalesHeader } from "@/components/fuck/sales analyze/header filter/year sales header";
import { YearSalesTable } from "@/components/fuck/sales analyze/year sales/sales table";
import { Main } from "@/layouts/main";

export default function YearSalesPage() {  
  return (
    <>
      <Main>
        <>
          <YearSalesHeader />
          <YearSalesTable />
        </>
      </Main>
    </>
  );
}
