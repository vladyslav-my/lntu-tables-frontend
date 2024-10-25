import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const rtkApi = createApi({
	tagTypes: ["bookedTables"],
	reducerPath: "rtkApi",
	baseQuery: axiosBaseQuery({}),
	endpoints: () => ({}),
});
