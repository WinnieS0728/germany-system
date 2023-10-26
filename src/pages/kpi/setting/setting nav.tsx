import { cn } from "@/utils/cn";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface propsType {
  className?: string;
}

export const Nav = ({ className }: propsType) => {
  const { t } = useTranslation(["settingPage"]);
  return (
    <>
      <nav className={cn("bg-navBgc",className)}>
        <ul className='flex gap-2 overflow-x-auto p-2'>
          <NavLink
            end
            to={""}
            className={"navBtn"}
          >
            {t("nav.tx")}
          </NavLink>
          <NavLink
            end
            to={"threshold"}
            className={"navBtn"}
          >
            {t("nav.threshold")}
          </NavLink>
          <NavLink
            end
            to={"store"}
            className={"navBtn"}
          >
            {t("nav.store achieve")}
          </NavLink>
          <NavLink
            end
            to={"osom"}
            className={"navBtn"}
          >
            {t("nav.osom achieve")}
          </NavLink>
        </ul>
      </nav>
    </>
  );
};