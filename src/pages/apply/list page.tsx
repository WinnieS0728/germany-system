import { Main } from "@/layouts/main";
import { NavLink } from "react-router-dom";
import { IconBtn } from "../../components/UI/buttons";
import * as Icons from "@components/UI/icons";
import { HeaderForm } from "../../components/apply/list/header form";
import { ListTable } from "@/components/apply/list/table";
import { useTheme } from "styled-components";

export const ListPage = () => {
  const color = useTheme()?.color;
  return (
    <Main className='main-section-gap'>
      <>
        <div className='top-btn-list'>
          <NavLink to={"add"}>
            <IconBtn
              primary
              icon={
                <Icons.Add
                  size='1.5rem'
                  color={color.white}
                />
              }
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
