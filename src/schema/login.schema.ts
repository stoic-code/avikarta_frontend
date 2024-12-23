import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, PHONE_REGEX } from './constants';

export const userLoginSchema = z.object({
  Phone: z
    .string({ required_error: 'Phone no. is required.' })
    .min(1, { message: 'Phone no. is required.' })
    .regex(PHONE_REGEX, { message: 'Please  enter valid phone.' }),
  Password: z.string().min(1, { message: 'Password is required.' }),
});

export type TUserLoginForm = z.infer<typeof userLoginSchema>;

export const forgotPasswordSchema = z.object({
  Phone: z
    .string({ required_error: 'Phone no. is required.' })
    .min(1, { message: 'Phone no. is required.' })
    .regex(PHONE_REGEX, { message: 'Please  enter valid phone.' }),
  Email: z.string().min(1, { message: 'Email is required.' }),
});

export type TForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  Phone: z
    .string({ required_error: 'Phone no. is required.' })
    .min(1, { message: 'Phone no. is required.' })
    .regex(PHONE_REGEX, { message: 'Please  enter valid phone.' }),
  newPassword: z
    .string({ required_error: 'Password is required.' })
    .min(1, { message: 'Password is required.' }),
  OTP: z.number().min(1, { message: 'OTP is required.' }),
});

export type TResetPasswordForm = z.infer<typeof resetPasswordSchema>;

//!image not necessary for register
//  Avatar: z
//     .any()
//     .refine(
//       (file) => file !== undefined && file !== null,
//       'Image is required.'
//     )
//     .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 10MB.')
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
//       'Only .png, .jpg, .jpeg, pdfs and xls are supported.'
//     ),
// })
