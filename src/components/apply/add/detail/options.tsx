import api from "@/lib/api";

export const useOptions = () => {
  async function getEventOptions(input: string) {
    const res = await api.getTripEvent();

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
    const res = await api.getCus("DEU");

    return res.filter((o: { CustName: string }) =>
      o.CustName.toLowerCase().includes(input.toLowerCase())
    );
  }

  return {
    options: {
      event: getEventOptions,
      area: getAreaOptions,
      postalCode: getPostalCodeOptions,
      cus: getCusOptions,
    },
  };
};
