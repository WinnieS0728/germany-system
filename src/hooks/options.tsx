import api from "@/lib/api";
import { useAppSelector } from "./redux";

export const useOptions = () => {
  const nowUser = useAppSelector((state) => state.nowUser);

  async function getEventOptions(input: string) {
    const res = await api.getEvent("TripEvent");

    return res.filter(
      (o: { ResourcesName: string; ResourcesName_E: string }) =>
        o.ResourcesName.toLowerCase().includes(input.toLowerCase()) ||
        o.ResourcesName_E.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getAreaOptions(input: string) {
    const res = await api.getArea("DEU");

    return res.filter(
      (o: { Country: string; Country_E: string }) =>
        o.Country.toLowerCase().includes(input.toLowerCase()) ||
        o.Country_E.toLowerCase().includes(input.toLowerCase())
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
    
    return res.filter(
      (o: { CustName: string; CustName_E: string }) =>
        o.CustName.toLowerCase().includes(input.toLowerCase()) ||
        o.CustName_E.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getTransportOptions(input: string) {
    const res = await api.getEvent("Traffic");

    return res.filter(
      (o: { ResourcesName: string; ResourcesName_E: string }) =>
        o.ResourcesName.toLowerCase().includes(input.toLowerCase()) ||
        o.ResourcesName_E.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getAgentOptions(input: string) {
    const res = await api.getMember("", nowUser.body.DeptId);
    const notMe = res.filter(
      (i: { EmpId: string }) => i.EmpId !== nowUser.body.EmpId
    );

    return notMe.filter(
      (o: { FullName: string; EmpId: string }) =>
        o.FullName.toLowerCase().includes(input.toLowerCase()) ||
        o.EmpId.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getDeptOptions(input: string) {
    const res = await api.getMember();
    const deptNoRepeat = [
      ...new Set(res.map((i: { DeptId: string }) => i.DeptId)),
    ];
    const deptArr = deptNoRepeat.map((i) =>
      res.find((i2: { DeptId: string }) => i2.DeptId === i)
    );

    return deptArr.filter(
      (o: { DeptName: string; DeptName_E: string; DeptId: string }) =>
        o.DeptName.toLowerCase().includes(input.toLowerCase()) ||
        o.DeptName_E.toLowerCase().includes(input.toLowerCase()) ||
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
      otherSign: getDeptMemberOptions,
    },
  };
};
