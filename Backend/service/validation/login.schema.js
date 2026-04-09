const { z } = require("zod");

const loginSchema = z.object({
  body: z.object(
    {
      email: z.string().nonempty(),
      password: z.string().nonempty(),
    },
    { error: "Ожидается json объект в теле запроса" }
  ),
});

module.exports = { loginSchema };
