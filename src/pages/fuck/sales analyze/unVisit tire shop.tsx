import { RecentHeader } from "@/components/fuck/sales analyze/header filter/recent header";
import { UnVisitTireShopTable } from "@/components/fuck/sales analyze/unvisit tire shop/unvisit tire shop";
import { Main } from "@/layouts/main";

export default function UnVisitTireShop() {
  return (
    <>
      <Main>
        <>
          <RecentHeader as="visit" />
          <UnVisitTireShopTable />
        </>
      </Main>
    </>
  );
}
