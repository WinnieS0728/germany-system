import { useAppSelector } from "@/hooks/redux";
import { Collapse } from "@/layouts/collapse";
import { DetailTable } from "./detail table";
import { DetailHeader } from "./detail header";
import { useState } from "react";

export const TripDetailForm = () => {
  const tripDetail = useAppSelector((state) => state.tripDetail);  

  const [open, setOpen] = useState(true);

  return (
    <>
      {tripDetail.body.map((data, index) => {
        return (
          <Collapse
            key={index}
            open={open}
            main={<DetailHeader />}
            sub={
              <DetailTable
                data={data}
                index={index}
              />
            }
          />
        );
      })}
    </>
  );
};
