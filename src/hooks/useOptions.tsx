import api from "@/api";
import { useAppSelector } from "@data/store";
import { useTranslation } from "react-i18next";
import { useSignStatusTranslate } from "./status translate";
import { memberResType } from "@/api/member/getMember";
import { moneyType, tripEvent } from "@/types";
import { eventResType } from "@/api/event/get event";
import { useCallback } from "react";

function moveElement(array: eventResType[], type: tripEvent): eventResType[] {
  const targetIndex = array.findIndex((d) => d.ResourcesId === type);
  const newArray = [...array];
  newArray.splice(targetIndex, 1);
  newArray.unshift(array[targetIndex]);
  return newArray;
}

export const useOptions = () => {
  const { i18n, t } = useTranslation("new form");
  const nowLang = i18n.language;
  const { EmpId, DeptId } = useAppSelector((state) => state.nowUser).body;

  const { getFormStatus } = useSignStatusTranslate();
  const getFormStatusOptions: () => {
    label: string;
    value: "1" | "2" | "3" | "4";
  }[] = useCallback(
    () => [
      { label: getFormStatus("簽核中"), value: "1" },
      { label: getFormStatus("已完簽"), value: "2" },
      { label: getFormStatus("退簽"), value: "3" },
      { label: getFormStatus("作廢"), value: "4" },
    ],
    [getFormStatus]
  );
  const getMoneyTypeOptions: () => {
    label: string;
    value: typeof moneyType[number];
  }[] = useCallback(
    () => [
      { label: t("money.eur"), value: "EUR" },
      { label: t("money.twd"), value: "TWD" },
      { label: t("money.rmb"), value: "RMB" },
      { label: t("money.usd"), value: "USD" },
    ],
    [t]
  );

  const getEventOptions = useCallback(async (input: string) => {
    const res = await api.getEvent("TripEvent");

    const newArray = [...res];
    const visitIndex = res.findIndex((d) => d.ResourcesId === "TripEvent-1");
    newArray.splice(visitIndex, 1);
    newArray.push(res[visitIndex]);

    const moveNewCus = moveElement(newArray, tripEvent.newCus);
    const moveOldCus = moveElement(moveNewCus, tripEvent.oldCus);
    const moveAtu = moveElement(moveOldCus, tripEvent.atu);

    return moveAtu.filter(
      (event) =>
        event.ResourcesName.toLowerCase().includes(input.toLowerCase()) ||
        event.ResourcesName_E.toLowerCase().includes(input.toLowerCase())
    );
  }, []);

  const getAreaOptions = useCallback(async (input: string) => {
    const res = await api.getArea("DEU");

    return res.filter(
      (cus) =>
        cus.Country.toLowerCase().includes(input.toLowerCase()) ||
        cus.Country_E.toLowerCase().includes(input.toLowerCase())
    );
  }, []);

  const getPostalCodeOptions = useCallback(async (input: string) => {
    const res = await api.getPostCode();

    const noRepeatData = [...new Set(res.map((i) => i.zipcode))];

    const options = noRepeatData.map((d) => res.find((i) => i.zipcode === d));

    return options.filter(
      (o) =>
        o?.place.toLowerCase().includes(input.toLowerCase()) ||
        o?.zipcode.includes(input)
    );
  }, []);

  const getCusOptions = useCallback(async (input: string) => {
    const res = await api.getCus({
      country: "DEU"
    });

    return res.filter(
      (cus) =>
        cus.CustName.toLowerCase().includes(input.toLowerCase()) ||
        cus.CustName_E.toLowerCase().includes(input.toLowerCase())
    );
  }, []);

  const getTransportOptions = useCallback(async (input: string) => {
    const res = await api.getEvent("Traffic");

    return res.filter(
      (event) =>
        event.ResourcesName.toLowerCase().includes(input.toLowerCase()) ||
        event.ResourcesName_E.toLowerCase().includes(input.toLowerCase())
    );
  }, []);

  const getAgentOptions = useCallback(
    async (input: string) => {
      const res = await api.getMember("", DeptId);
      const notMe = res.filter((member) => member.EmpId !== EmpId);

      return notMe.filter(
        (member) =>
          member.FullName.toLowerCase().includes(input.toLowerCase()) ||
          member.EmpId.toLowerCase().includes(input.toLowerCase())
      );
    },
    [DeptId, EmpId]
  );

    const getDeptList = useCallback(async () => {
    const res = await api.getMember();
    const deptNoRepeat = [...new Set(res.map((member) => member.DeptId))];
    const deptArr = deptNoRepeat.map((i) =>
      res.find((member) => member.DeptId === i)
    );

    return deptArr;
  }, []);

  const getDeptOptions = useCallback(async (input: string) => {
    const res = (await getDeptList()) as memberResType[];
    return res.filter(
      (dept) =>
        dept.DeptName.toLowerCase().includes(input.toLowerCase()) ||
        dept.DeptName_E.toLowerCase().includes(input.toLowerCase()) ||
        dept.DeptId.includes(input)
    );
  }, [getDeptList]);

  const getMemberOptions = useCallback(async (input: string) => {
    const res = await api.getMember();

    return res.filter(
      (member) =>
        member.FullName.toLowerCase().includes(input.toLowerCase()) ||
        member.EmpId.includes(input)
    );
  }, []);

  const getDeptMemberOptions = useCallback(async(input: string) => {
    const deptList = await getDeptList();

    const bigData = Promise.all(
      deptList.map(async (dept) => {
        if (!dept) {
          return;
        }
        const memberInThisDept = await api.getMember("", dept.DeptId);
        return {
          label: nowLang === "en" ? dept.DeptName_E : dept.DeptName,
          options: memberInThisDept,
        };
      })
    );
    // console.log("data", await bigData);

    return (await bigData)?.filter((i) => {
      if (!i) {
        return;
      }
      if (input.startsWith("!")) {
        return i.options.some(
          (member) =>
            member.DeptName.toLowerCase().includes(
              input.toLowerCase().replace("!", "")
            ) || member.DeptId.includes(input.replace("!", ""))
        );
      } else {
        return i.options.some(
          (member) =>
            member.FullName.toLowerCase().includes(input.toLowerCase()) ||
            member.EmpId.includes(input)
        );
      }
    });
  },[getDeptList, nowLang])

  return {
    options: {
      status: getFormStatusOptions(),
      curr: getMoneyTypeOptions(),
      event: getEventOptions,
      area: getAreaOptions,
      postalCode: getPostalCodeOptions,
      cus: getCusOptions,
      transport: getTransportOptions,
      agent: getAgentOptions,
      dept: getDeptOptions,
      member: getMemberOptions,
      otherSign: getDeptMemberOptions,
    },
  };
};
