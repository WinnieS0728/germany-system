import { Table } from "@/components/table/table";
import { Section } from "@/layouts/section";
import { useKpiData } from "./kpi.hook";

export default function TotalTable() {
    useKpiData()
  return (
    <Section>
      <Table>
        <table></table>
      </Table>
    </Section>
  );
}
