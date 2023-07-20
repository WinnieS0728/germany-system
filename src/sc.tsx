import styled from "styled-components";

interface props {
  className?: string;
}
const Title = (props: props) => {
  const { className } = props;
  return <h1 className={className}>title</h1>;
};

const Styled_Title = styled(Title)`
    font-size: 3rem;
`;

const Content = (props: props) => {
  const { className } = props;

  return <p className={className}>this is content</p>;
};

const Styled_Content = styled(Content)`
    color: red;
`;

const MySection = (props: props) => {
  const { className } = props;

  return (
    <section className={className}>
      <Styled_Title />
      <Styled_Content />
    </section>
  );
};

export const Styled_MySection = styled(MySection)`
    background-color: green;

    ${Styled_Title}{
        color:blue
    }

    ${Styled_Content} {
        font-size: 2rem;
        color: white;
    }
`;

// ! 方法一
const 我的元件 = () => {
  return <h1>一個元件</h1>;
};

const styled_我的元件 = styled(我的元件)`
    // * some style
    `;

export { styled_我的元件 as 我的元件 };

// ! 方法二
const unStyled_另一個元件 = () => {
  return <h1>一個元件</h1>;
};

const 要用的元件名字 = styled(unStyled_另一個元件)`
    //  * some style
`;

export { 要用的元件名字 };
