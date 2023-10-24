import { YearSalesHeader } from "@/components/sales analyze/header filter/year sales header";
import { YearSalesTable } from "@/components/sales analyze/year sales/sales table";
import { useFiles } from "@/hooks/useFiles";
import { Main } from "@/layouts/main";

export default function YearSalesPage() {
  const { getDropzoneAccept } = useFiles();
  console.log(getDropzoneAccept(['ppt']));
  
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
