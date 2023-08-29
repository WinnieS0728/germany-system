import { useTranslation } from "react-i18next";
import { useAppSelector } from "./redux";

export const useEmail = () => {
  const { t } = useTranslation("email");

  const { nowOrder, signList } = useAppSelector((state) => state.formInfo).body;

  const nextSigner = signList.find(
    (member) => member.SIGNORDER === nowOrder + 1
  )?.SIGNER;

  if (!nextSigner) {
    console.log('沒了');
  }else{
    console.log(nextSigner);
  }
};
