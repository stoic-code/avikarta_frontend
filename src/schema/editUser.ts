import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, PHONE_REGEX } from './constants';

export const userEditSchema = z.object({
  FullName: z.string().min(1, { message: 'FullName is required.' }),
  Phone: z
    .string()
    .length(10, { message: 'Invalid Phone no.' })
    .regex(PHONE_REGEX, { message: 'Please enter valid phone.' })
    .min(1, { message: 'Phone is required.' }),
  MyTeam: z.string().min(1, { message: 'Team Name is required.' }),
  Province: z
    .string({ required_error: 'Province is required.' })
    .min(1, { message: 'Province is required.' }),
  District: z
    .string({ required_error: 'District is required.' })
    .min(1, { message: 'District is required.' }),
  DateOfBirth: z.string().min(1, { message: 'Date of Birth is required.' }),
  Municipality: z
    .string({ required_error: 'Municipality is required.' })
    .min(1, { message: 'Municipality is required.' }),
  Avatar: z.object({
    PublicId: z.string(),
    SecureURL: z.string(),
  }),
});

export type TUserEditForm = z.infer<typeof userEditSchema>;

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
