import { useTheme } from "styled-components";
import * as Icons from "@components/UI/icons";
import { useTranslation } from "react-i18next";
import { formId } from "@/pages/kpi/setting/setting layout";
import { cn } from "@/utils/cn";

interface propType {
  text: string;
  className?: string;
  formId: formId;
}

export const SettingSubmitBtn = ({ text, className, formId }: propType) => {
  return (
    <button
      type='submit'
      form={formId}
      className={cn(
        "bg-submitBtn rounded-lg flex gap-2 justify-center items-center mb-2 px-8 py-2",
        className
      )}
    >
      <Icons.Save size='1.5rem' />
      {text}
    </button>
  );
};

interface IconBtnProp {
  children: JSX.Element | string;
  icon: JSX.Element;
  primary?: boolean;
  style?: {
    [key: string]: string | number;
  };
}
export const IconBtn = ({ children, icon, primary, style }: IconBtnProp) => {
  const color = useTheme()?.color;

  const css = {
    backgroundColor: primary ? color?.navActive : color?.white,
    color: primary ? color?.white : color?.black,
    ...style,
  };

  return (
    <span
      className='top-btn flex items-center justify-center gap-2 rounded-md px-10 py-2'
      style={css}
    >
      {icon}
      <span
        className='hidden lg:inline-block'
        style={{ whiteSpace: "nowrap" }}
      >
        {children}
      </span>
    </span>
  );
};

type longBtn = { style: "cancel" | "confirm" } & (
  | {
      type: "reset" | "submit";
      form: string;
      onClick?: () => void;
      disabled?: boolean,
      className?: string
    }
  | {
      type: "button";
      onClick: () => void;
      disabled?: boolean,
      className?: string
    }
);

export const LongBtn = (props: longBtn) => {
  const color = useTheme()?.color;
  const { t } = useTranslation("common");

  let css;
  let content;
  switch (props.style) {
    case "cancel":
      css = { backgroundColor: color.red, color: color.white };
      content = t("btn.cancel");
      break;
    case "confirm":
      css = {
        backgroundColor: color.sectionHeader,
        color: color.white,
      };
      content = t("btn.confirm");
      break;
    default:
      css = props.style;
      break;
  }

  return (
    <button
      type={props.type}
      form={props.type !== "button" ? props.form : ""}
      className={cn("rounded-md px-16 py-2",props.className)}
      style={css}
      onClick={() => {
        if (!props.onClick) {
          return;
        }
        props.onClick();
      }}
      disabled={props.disabled}
    >
      {content}
    </button>
  );
};

interface PageControlBtnProps {
  type: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}
export const PageControlBtn = (props: PageControlBtnProps) => {
  const { type, onClick, disabled } = props;
  const { t } = useTranslation("common", { keyPrefix: "pageControl" });
  const color = useTheme()?.color;
  let content;
  if (type === "prev") {
    content = t("prev");
  } else if (type === "next") {
    content = t("next");
  }
  return (
    <button
      type='button'
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
      style={{
        backgroundColor: color.sectionHeader,
        color: color.white,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {content}
    </button>
  );
};
