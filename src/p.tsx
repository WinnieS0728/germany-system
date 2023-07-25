import styled from "styled-components";

const AA = ({ c, className }: { c: string; className?: string }) => {
  return <h1 className={className}>123</h1>;
};

export const AAA = styled(AA)`
    background-color: ${(props) => props.c};
`;
