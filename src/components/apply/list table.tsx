import { Main } from "@/layouts/main";
import { NavLink } from "react-router-dom";
import { TopBtn } from "../UI/buttons";
import * as Icons from "@components/UI/icons";
import { HeaderForm } from "./list/header form";
import { ListTable } from "@/components/apply/list/table";

export const ListPage = () => {
  return (
    <Main className='main-section-gap'>
      <>
        <div className='top-btn-list'>
          <NavLink to={"add"}>
            <TopBtn
              primary
              icon={<Icons.Add />}
            >
              建立表單
            </TopBtn>
          </NavLink>
        </div>
        <HeaderForm />
        <ListTable />
      </>
    </Main>
  );
};
