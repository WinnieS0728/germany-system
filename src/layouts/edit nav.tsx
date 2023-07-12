import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

interface propsType {
  className?: string;
}

const Nav = ({ className }: propsType) => {
  const { t } = useTranslation(["settingPage"]);
  return (
    <>
      <nav className={className}>
        <ul className='flex gap-2 p-2'>
          <NavLink
            end
            to={"tx"}
          >
            {t("nav.tx")}
          </NavLink>
          <NavLink
            end
            to={"threshold"}
          >
            {t("nav.threshold")}
          </NavLink>
          <NavLink
            end
            to={"store"}
          >
            {t("nav.store achieve")}
          </NavLink>
          <NavLink
            end
            to={"osom"}
          >
            {t("nav.osom achieve")}
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

const styled_nav = styled(Nav)`
    background-color: ${(props) => props.theme.color.navBgc};

    a {
        border: 1px solid ${(props) => props.theme.color.white};
        color: ${(props) => props.theme.color.white};
        border-radius: .5rem;
        padding: .2em .5em;

        &.active {
            background-color: ${(props) => props.theme.color.navActive};
        }
    }
`;

export { styled_nav as Nav };
