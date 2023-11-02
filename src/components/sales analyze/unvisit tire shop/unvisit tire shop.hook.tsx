import axios from "axios";

export function useUnVisitTireShop() {
  (async function () {
    const res = await axios({
      url: `https://orangeapitest.orange-electronic.com/api/GetSalesVisitDe`,
      method: "POST",
      data: {
        Startdt: "2023-10-01",
        Enddt: "2023-10-30",
        type: "0",
      },
    });

    console.log(res.data.length);
  })();

  return;
}
