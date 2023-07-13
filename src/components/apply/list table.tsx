import { Main } from "@/layouts/main";
import { NavLink } from "react-router-dom";
import { TopBtn } from "../UI/buttons";
import * as Icons from "@components/UI/icons";
import { HeaderForm } from "./list/header form";

export const ListTable = () => {
  return (
    <Main>
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
      </>
    </Main>
  );
};
