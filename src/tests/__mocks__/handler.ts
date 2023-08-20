import { DefaultBodyType, MockedRequest, RestHandler, rest } from "msw";

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get("http://localhost:4000/api/tasks", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, summary: "Pay bill", completed: true, dueDate: "2023-04-30" },
        {
          id: 2,
          summary: "clear garbage",
          completed: false,
          dueDate: "2023-12-30",
        },
        {
          id: 3,
          summary: "Submit timesheet",
          completed: false,
          dueDate: "2023-05-30",
        },
      ])
    );
  }),
  rest.post("http://localhost:4000/api/newTask", (req, res, ctx) => {
    console.log(req);
    return res(
      ctx.json({
        message: "Request successful",
        status: 200,
        task: req.body,
      })
    );
  }),
];
