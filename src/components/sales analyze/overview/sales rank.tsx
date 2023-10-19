import { Table } from "@/components/table/table";
import { useSalesRank } from "@/hooks/useSalesRank";
import { Section } from "@/layouts/section";
import { getLocaleString } from "@/utils/get localeString";


export function SalesRank (){
    const rankData = useSalesRank()
    
    return <>
        <Section title="業務銷售排名 (不含ATU)">
            <Table>
                <table>
                    <thead>
                        <tr>
                            <td>排名</td>
                            <td>業務人員</td>
                            <td>TX銷售數量</td>
                            <td>OG銷售數量</td>
                            <td>訂單總數量</td>
                            <td>首購客戶訂單數量</td>
                            <td>首購客戶訂單占比</td>
                            <td>既有客戶訂單數量</td>
                            <td>既有客戶訂單占比</td>
                            <td>ATU對帳數</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rankData.map((data,index)=><tr key={data.name}>
                            <td>{index+1}</td>
                            <td className="whitespace-pre">{data.name}</td>
                            <td>{getLocaleString(data.tx)}</td>
                            <td>{getLocaleString(data.og)}</td>
                            <td>{getLocaleString(data.total)}</td>
                            <td>{getLocaleString(data.first_order)}</td>
                            <td>{getLocaleString(data.first_order_rate,{toFix:1})} %</td>
                            <td>{getLocaleString(data.other_order)}</td>
                            <td>{getLocaleString(data.other_order_rate,{toFix:1})} %</td>
                            <td>{getLocaleString(data.atu)}</td>
                        </tr>)}
                    </tbody>
                </table>
            </Table>
        </Section>
    </>
}