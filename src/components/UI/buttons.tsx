import { styled, useTheme } from "styled-components";
import * as Icons from "@components/UI/icons";

interface propType {
  text: string;
  className?: string;
}
const SubmitBtn = ({ text, className }: propType) => {
  return (
    <button
      type='submit'
      form='threshold'
      className={className}
    >
      <Icons.Save />
      {text}
    </button>
  );
};

const styled_submitBtn = styled(SubmitBtn)`
    background-color: ${(props) => props.theme.color.submitBtn};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    margin-block: .5rem;
    padding: .5rem 2rem;
    svg{
      transform: scale(1.5);
    }
`;

export { styled_submitBtn as SubmitBtn };

interface topBtnProp {
  children: JSX.Element | string;
  icon?: JSX.Element;
  primary?: boolean;
}
export const TopBtn = ({ children, icon, primary }: topBtnProp) => {
  const color = useTheme()?.color;

  const css = {
    backgroundColor: primary ? color?.navActive : color?.white,
    color: primary ? color?.white : color?.black,
  };

  return (
    <span
      className='top-btn flex items-center justify-center gap-2 rounded-md px-10 py-2'
      style={css}
    >
      {icon}
      {children}
    </span>
  );
};
