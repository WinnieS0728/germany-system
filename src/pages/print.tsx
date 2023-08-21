import styled from "styled-components";

type props = {
  className?: string;
};
const PrintPage = ({ className }: props) => {
  return (
    <article className={className}>
      
    </article>
  );
};

const styled_page = styled(PrintPage)`
    width: 21cm;
    height: 29.7cm;
    border: 5px solid black;
    margin: auto;
`;

export default styled_page;
