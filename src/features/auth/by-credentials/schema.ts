import z from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, { message: "Это поле обязательно к заполнению" })
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;

        const phoneRegex = /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
        const isPhone = phoneRegex.test(value);

        return isEmail || isPhone;
      },
      {
        message: "Введите корректный email или номер телефона",
      }
    ),
  password: z.string().min(1, { message: "Это поле обязательно к заполнению" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
