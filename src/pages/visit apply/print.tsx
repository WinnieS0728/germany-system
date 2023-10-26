import styled from "styled-components";
import { useReactToPrint } from "react-to-print";

import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@data/store";
import { setFormId } from "@/data/reducers/sign/form info";
import { setSignList } from "@/data/actions/sign/set sign list";
import { setNextSigner } from "@/data/actions/sign/set next sign";

import Title from "@components/print/title";
import FormInfo from "@components/print/form info";
import Transport from "@components/print/transport";
import Detail from "@components/print/detail";
import SignTable from "@components/print/sign table";

type props = {
  className?: string;
};
function PrintPage ({ className }: props) {
  const { formId } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFormId(formId));
    dispatch(setSignList(formId as string));
    dispatch(setNextSigner(formId as string));
  }, [dispatch, formId]);

  const printRef = useRef<HTMLElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${formId} 出差申請`,
    onAfterPrint: window.close,
  });

  useEffect(() => {
    const timeout = setTimeout(handlePrint, 1000);

    return () => clearTimeout(timeout);
  }, [handlePrint]);

  return (
    <section
      className={className}
      ref={printRef}
    >
      <table>
        <thead data-header>
          <tr>
            <th
              className='no-border'
              data-space
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='no-border'>
              <article id='printPage'>
                <Title />
                <FormInfo />
                <Transport />
                <Detail />
                <SignTable />
                <p data-formcode>OM-001-01 ( B )</p>
              </article>
            </td>
          </tr>
        </tbody>
        <tfoot data-footer>
          <tr>
            <td
              className='no-border'
              data-space
            ></td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

const styled_page = styled(PrintPage)`
    body {
      font-size: 12pt;
      background-color: #fafafa;
    }
    
    #printPage {
      width: 21cm;
      min-height: 29.7cm;
      padding: 2cm 1cm;
      margin: auto;
      border: 1px solid black;
      border-radius: 0.5rem;
      font-size: 12pt;
      display: flex;
      flex-flow: column;
      gap: 1rem;
    }

    [data-space] {
      height: 2cm;
    }

    .no-border {
      border: 0;
      padding: 0;
    }

    table > * {
      background-color: transparent;
    }

    @media print {
      .no-print {
        display: none;
      }
      @page {
        size: a4;
        margin: 0;
      }

      #printPage {
        width: initial;
        min-height: initial;
        margin: 0;
        padding: 0 1cm;
        border: initial;
        border-radius: initial;
        break-after: always;
      }
    }
    p[data-formcode]{
      text-align: end;
    }
    #splitLine {
      width: 100%;
      height: 2px;
      background-color: red;
      position: absolute;
      top: calc(29.7cm - 1cm * 2 + 2cm);
    }
`;

export default styled_page;
