import { api, transformation } from "./api";

export const departmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<
      { content: { id: number; title: string }[] },
      void
    >({
      query: () => {
        return {
          url: "departments",
        };
      },
      transformResponse: (response) => {
        const departments = transformation({ response });

        const arr = departments.content;

        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];

          if (
            item.title.replace(/\s/g, "").toLowerCase() === "takeout" &&
            i !== 0
          ) {
            const takeout = arr.splice(i, 1);

            arr.unshift(takeout[0]);

            i = 0;
          } else if (item.title === "other" && i !== arr.length - 1) {
            const others = arr.splice(i, 1);

            arr.push(others[0]);

            i = 0;
          }
        }

        return departments;
      },

      providesTags: ["Department"],
    }),
  }),
});

export const { useGetDepartmentsQuery } = departmentApi;
