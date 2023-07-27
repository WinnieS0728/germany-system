import { Main } from "@/layouts/main";
import { NavLink } from "react-router-dom";
import { IconBtn } from "../UI/buttons";
import * as Icons from "@components/UI/icons";
import { HeaderForm } from "./list/header form";
import { ListTable } from "@/components/apply/list/table";

export const ListPage = () => {
  return (
    <Main className='main-section-gap'>
      <>
        <div className='top-btn-list'>
          <NavLink to={"add"}>
            <IconBtn
              primary
              icon={<Icons.Add />}
            >
              建立表單
            </IconBtn>
          </NavLink>
        </div>
        <HeaderForm />
        <ListTable />
      </>
    </Main>
  );
};
