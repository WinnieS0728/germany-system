import { RecentHeader } from "@/components/sales analyze/header filter/recent header";
import { UnOrderTireShopTable } from "@/components/sales analyze/unOrder tire shop/unOrder tire shop";
import { Main } from "@/layouts/main";

export default function UnOrderTireShop() {
  return (
    <>
      <Main>
        <>
          <RecentHeader as="order" />
          <UnOrderTireShopTable />
        </>
      </Main>
    </>
  );
}
