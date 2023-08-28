import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setFormId } from "@/data/reducers/sign/form info";
import { setSignList } from "@/data/actions/sign/set sign list";
import { setNextSigner } from "@/data/actions/sign/set next sign";

import Title from "@components/print/title";
import FormInfo from "@components/print/form info";
import Transport from "@components/print/transport";
import Detail from "@components/print/detail";
import SignTable from "@components/print/sign table";
import api from "@/lib/api";
import { table } from "console";

type props = {
  className?: string;
};
const PrintPage = ({ className }: props) => {
  const { formId } = useParams();

  // (async function(){
  //   const cusList = await api.getCus('')
  //   console.log(cusList.filter(i=>i.PostalCode.startsWith('50')));
  // })()

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFormId(formId));
    dispatch(setSignList(formId as string));
    dispatch(setNextSigner(formId as string));
  }, [dispatch, formId]);

  return (
    <section className={className}>
      <div
        data-space
        className='header'
      ></div>
      <div
        data-space
        className='footer'
      ></div>
      <table>
        <thead data-header>
          <tr>
            <th className='no-border'>
              <div data-space></div>
            </th>
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
            <td className='no-border'>
              <div data-space></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

const styled_page = styled(PrintPage)`
    
    #printPage {
      width: 21cm;
      min-height: 29.7cm;
      padding: 1cm;
      margin: auto;
      border: 1px solid black;
      border-radius: 0.5rem;
      font-size: 12pt;
      display: flex;
      flex-flow: column;
      gap: 1rem;
    }

    [data-space] {
      height: var(--print-padding);
    }

    .header {
      position: fixed;
      top: 0mm;
      width: 100%;
    }

    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
    }

    .no-border {
      border: 0;
    }

    thead {
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

      body {
        font-size: 12pt;
        background-color: #fafafa;
      }
      #printPage {
        width: initial;
        min-height: initial;
        margin: 0;
        border: initial;
        border-radius: initial;
        break-after: always;
      }

      thead[data-header]{
        display: table-header-group;
      }
      tfoot[data-footer]{
        display: table-footer-group;
      }
    }
    p[data-formcode]{
      text-align: end;
    }
`;

export default styled_page;
