import styled from "styled-components";

interface PropType {
  className?: string;
  title?: string;
  children?: JSX.Element;
  filter?: JSX.Element;
}
const Table = ({ className, title, children, filter }: PropType) => {
  return (
    <div className={className}>
      {title && (
        <div className='header'>
          {title}
          {filter}
        </div>
      )}
      <div className='table-wrapper'>{children}</div>
    </div>
  );
};

const styled_Table = styled(Table)`
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${(props) => props.theme.color.sectionHeader};
        color: ${(props) => props.theme.color.white};
        padding: 0.5rem 1em;

        span{
            margin-inline: 0.5em;
        }
    }
    tbody{
        position: relative;
    }
`;

export { styled_Table as Table };
