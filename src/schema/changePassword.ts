import { z } from 'zod';

export const userChangePassword = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Old Password is required.' }),
    newPassword: z.string().min(1, { message: 'New password is required.' }),
    repeatPassword: z
      .string()
      .min(1, { message: 'Repeat password is required.' }),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Passwords do not matches.',
    path: ['repeatPassword'],
  });

export type TUserChangePassword = z.infer<typeof userChangePassword>;
