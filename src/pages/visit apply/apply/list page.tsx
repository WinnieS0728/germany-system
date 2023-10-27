import { Main } from "@/layouts/main";
import { NavLink } from "react-router-dom";
import { IconBtn } from "../../../components/UI/buttons";
import * as Icons from "@components/UI/icons";
import { HeaderForm } from "../../../components/visit apply/list/header form";
import { ListTable } from "@/components/visit apply/list/table";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";

export default function ListPage() {
  const color = useTheme()?.color;
  const { t } = useTranslation(["list page"]);
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
              {t("create new form")}
            </IconBtn>
          </NavLink>
        </div>
        <HeaderForm />
        <ListTable />
      </>
    </Main>
  );
}
