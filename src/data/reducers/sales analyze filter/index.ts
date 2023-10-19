import { createSlice } from "@reduxjs/toolkit";
import z from "zod";

const salesAnalyzeHeader_schema = z.object({
    EmpId: z.string().optional(),
    month: z.array(z.string()).optional(),
});

export type salesAnalyzeHeader = z.infer<typeof salesAnalyzeHeader_schema>;

const filterData: salesAnalyzeHeader = {
    EmpId: undefined,
    month: undefined
}

const filterSlice = createSlice({
    name: "salesAnalyzeFilter",
    initialState: {
        body: filterData,
    },
    reducers: {
        setFilter: (state, action) => {
            const validData = salesAnalyzeHeader_schema.parse(action.payload)
            state.body = validData
        }
    },
});

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions