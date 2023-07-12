import { styled } from "styled-components";
import { TfiHarddrive } from "react-icons/tfi";

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
      <TfiHarddrive />
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
