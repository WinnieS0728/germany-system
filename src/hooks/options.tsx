import api from "@/lib/api";
import { useAppSelector } from "./redux";

export const useOptions = () => {
  const nowUser = useAppSelector((state) => state.nowUser);
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
    const res = await api.getPostCode();

    const noRepeatData = [
      ...new Set(res.map((i: { zipcode: string }) => i.zipcode)),
    ];

    const options = noRepeatData.map((d) =>
      res.find((i: { zipcode: string }) => i.zipcode === d)
    );

    return options.filter((o: { zipcode: string }) =>
      o.zipcode.includes(input)
    );
  }

  async function getCusOptions(input: string) {
    const res = await api.getCus('',"DEU");

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

  return {
    options: {
      event: getEventOptions,
      area: getAreaOptions,
      postalCode: getPostalCodeOptions,
      cus: getCusOptions,
      transport: getTransportOptions,
      agent: getAgentOptions,
    },
  };
};
