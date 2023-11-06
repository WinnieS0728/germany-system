import { Loading } from "../UI/loading";

interface props {
  children: JSX.Element;
  status?: string;
}

export const Tbody = (props: props) => {
  const { children, status } = props;
  if (status === "loading") {
    return (
      <tbody>
        <tr>
          <td
            colSpan={100}
            className='p-1'
          >
            <Loading.block />
          </td>
        </tr>
      </tbody>
    );
  } else {
    return <tbody>{children}</tbody>;
  }
};
