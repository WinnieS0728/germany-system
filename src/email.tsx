import { useAppSelector } from "./hooks/redux";

type data = {
  formId: string;
  createName: string;
  link: string;
};
type cardProps = {
  type: "done" | "wait" | "other" | "return";
  data: data;
};
const Card = ({ type, data }: cardProps) => {
  switch (type) {
    case "done":
      break;
    case "other":
      break;
    case "return":
      break;
    case "wait":
      break;
    default:
      break;
  }
  return (
    <div className='card'>
      <h3>待簽核</h3>
      <article>
        <h4>
          E-system 系統通知 - 德國出差申請單, 表單號碼 : {data.formId} , 待簽核
        </h4>
        <p>
          您好 : <br />
          <span style={{ marginLeft: "2rem" }}>
            請協助簽核
            <b> ⟪ {data.createName} 的出差申請單 ⟫ </b>, 表單號碼
            <b> {data.formId} </b>,
          </span>
          <br />
          <span style={{ marginLeft: "2rem" }}>
            可點選連結進入 E-system 查看 : <a href={data.link}>表單連結</a>
          </span>
          <br />
          <br />
          <br />※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
        </p>
      </article>
    </div>
  );
};

export const Email = () => {
  const { formId } = useAppSelector((state) => state.formInfo).body;

  const emailData: data = {
    formId:formId || 'BTP202308123',
    createName: "a",
    link: `https://www.google.com.tw/?hl=zh_TW`,
  };
  return (
    <>
      <Card
        type='done'
        data={emailData}
      />
    </>
  );
};
