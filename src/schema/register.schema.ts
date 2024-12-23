import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, PHONE_REGEX } from './constants';

export const userRegisterSchema = z
  .object({
    FullName: z.string().min(1, { message: 'Fullname is required.' }),
    Email: z
      .string({ required_error: 'Email is required.' })
      .min(1, { message: 'Email is required.' })
      .email(),
    Phone: z
      .string()
      .length(10, { message: 'Invalid Phone no.' })
      .regex(PHONE_REGEX, { message: 'Please enter valid phone.' })
      .min(1, { message: 'Phone is required.' }),
    Password: z.string().min(1, { message: 'Password is required.' }),
    ConfirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required.' }),

    Province: z
      .string({ required_error: 'Provinceee is required.' })
      .min(1, { message: 'Province is required.' }),
    District: z
      .string({ required_error: 'District is required.' })
      .min(1, { message: 'District is required.' }),
    InsuranceCompanyCategory: z
      .string({ required_error: 'Insurance Company Category is required.' })
      .min(1, { message: 'Insurance Company Category is required.' }),
    NameOfInsuranceCompany: z
      .string({ required_error: 'Insurance Company Name is required.' })
      .min(1, { message: 'Insurance Company is required.' }),
    AgentCode: z.string().min(1, { message: 'Agent Code is required.' }),
    DateOfBirth: z.string().min(1, { message: 'Date of Birth is required.' }),
    Municipality: z
      .string({ required_error: 'Municipality is required.' })
      .min(1, { message: 'Municipality is required.' }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: 'Passwords do not match.',
    path: ['ConfirmPassword'],
  });

export type TUserRegisterForm = z.infer<typeof userRegisterSchema>;

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
