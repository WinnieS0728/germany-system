import api from "@/lib/api";
import { useAppSelector } from "./redux";
import { useTranslation } from "react-i18next";

export const useOptions = () => {
  const nowUser = useAppSelector((state) => state.nowUser);
  const { i18n } = useTranslation();
  const nowLang = i18n.language;
  
  async function getEventOptions(input: string) {
    const res = await api.getEvent("TripEvent");

    return res.filter((o: { ResourcesName: string }) =>
      o.ResourcesName.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getAreaOptions(input: string) {
    const res = await api.getArea("DEU");

    return res.filter((o: { Country: string }) =>
      o.Country.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getPostalCodeOptions(input: string) {
    const res: { zipcode: string; place: string }[] = await api.getPostCode();

    const noRepeatData = [...new Set(res.map((i) => i.zipcode))];

    const options = noRepeatData.map((d) => res.find((i) => i.zipcode === d));

    return options.filter(
      (o) =>
        o?.place.toLowerCase().includes(input.toLowerCase()) ||
        o?.zipcode.includes(input)
    );
  }

  async function getCusOptions(input: string) {
    const res = await api.getCus("", "DEU");

    return res.filter((o: { CustName: string }) =>
      o.CustName.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getTransportOptions(input: string) {
    const res = await api.getEvent("Traffic");

    return res.filter((o: { ResourcesName: string }) =>
      o.ResourcesName.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getAgentOptions(input: string) {
    const res = await api.getMember("", nowUser.body.DeptId);
    const notMe = res.filter(
      (i: { EmpId: string }) => i.EmpId !== nowUser.body.EmpId
    );

    return notMe.filter(
      (o: { EmpName: string; EmpId: string }) =>
        o.EmpName.toLowerCase().includes(input.toLowerCase()) ||
        o.EmpId.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getDeptOptions(input: string) {
    const res = await api.getDept();

    const memberList = Promise.all(
      res.map(async (d: { DeptId: string }) => {
        const m = await api.getMember("", d.DeptId);
        return {
          id: d.DeptId,
          member: m,
        };
      })
    );

    const deptHasMember = (await memberList).filter(
      (i) => i.member.length !== 0
    );

    const options = deptHasMember.map((i) =>
      res.find((d: { DeptId: string }) => d.DeptId === i.id)
    );

    return options.filter(
      (o: { DeptName: string; DeptId: string }) =>
        o.DeptName.toLowerCase().includes(input.toLowerCase()) ||
        o.DeptId.includes(input)
    );
  }

  async function getMemberOptions(input: string) {
    const res = await api.getMember();

    return res.filter(
      (i: { FullName: string; EmpId: string }) =>
        i.FullName.toLowerCase().includes(input.toLowerCase()) ||
        i.EmpId.includes(input)
    );
  }

  async function getDeptList() {
    const res = await api.getDept();

    const memberList = Promise.all(
      res.map(async (d: { DeptId: string }) => {
        const m = await api.getMember("", d.DeptId);
        return {
          id: d.DeptId,
          member: m,
        };
      })
    );

    const deptHasMember = (await memberList).filter(
      (i) => i.member.length !== 0
    );

    const options = deptHasMember.map((i) =>
      res.find((d: { DeptId: string }) => d.DeptId === i.id)
    );

    return options;
  }

  async function getDeptMemberOptions(input: string) {
    const deptList = await getDeptList();
    const bigData = Promise.all(
      deptList.map(async (dept) => {
        const memberInThisDept = await api.getMember("", dept.DeptId);
        return {
          label: dept.DeptName,
          options: memberInThisDept,
        };
      })
    );
    // console.log("data", await bigData);

    return (await bigData)?.filter((i) => {
      if (input.startsWith("!")) {
        return i.options.some(
          (d: { DeptName: string; DeptId: string }) =>
            d.DeptName.toLowerCase().includes(
              input.toLowerCase().replace("!", "")
            ) || d.DeptId.includes(input.replace("!", ""))
        );
      } else {
        return i.options.some(
          (d: { FullName: string; EmpId: string }) =>
            d.FullName.toLowerCase().includes(input.toLowerCase()) ||
            d.EmpId.includes(input)
        );
      }
    });
  }

  return {
    options: {
      event: getEventOptions,
      area: getAreaOptions,
      postalCode: getPostalCodeOptions,
      cus: getCusOptions,
      transport: getTransportOptions,
      agent: getAgentOptions,
      dept: getDeptOptions,
      member: getMemberOptions,
      a: getDeptMemberOptions,
    },
  };
};
