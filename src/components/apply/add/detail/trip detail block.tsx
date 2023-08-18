import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Collapse } from "@/layouts/collapse";
import { DetailTable } from "./detail table";
import { DetailHeader } from "./detail header";
import * as Icons from "@components/UI/icons";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IconBtn } from "@/components/UI/buttons";
import { useTheme } from "styled-components";
import { addData } from "@/data/reducers/trip detail/trip detail";
import { Block } from "@/layouts/block";
import { useTranslation } from "react-i18next";

export const TripDetailForm = () => {
  const { t } = useTranslation("new form");
  const color = useTheme()?.color;
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "tripData",
    control,
  });
  const tripDetail = useAppSelector((state) => state.tripDetail);

  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <button
          type='button'
          className='p-0'
          onClick={() => {
            append({
              startDate: "",
              endDate: "",
            });
            dispatch(addData());
          }}
        >
          <IconBtn
            style={{
              backgroundColor: color.sectionHeader,
              color: color.white,
            }}
            icon={<Icons.NewDetail />}
          >
            {t("btn.add")}
          </IconBtn>
        </button>
      </div>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <Block>
              <Collapse
                type='addForm'
                main={
                  <DetailHeader
                    data={field}
                    index={index}
                  />
                }
                sub={
                  <DetailTable
                    type='addForm'
                    data={tripDetail.body[index]}
                    index={index}
                  />
                }
                remove={() => {
                  remove(index);
                }}
                index={index}
              />
            </Block>
          </div>
        );
      })}
    </>
  );
};
