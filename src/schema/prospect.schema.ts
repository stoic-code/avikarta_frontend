import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, PHONE_REGEX } from './constants';

export const PropspectSchema = z.object({
  FullName: z.string().min(1, { message: 'Fullname is required.' }),
  Phone: z
    .string({ required_error: 'Phone is required.' })
    .length(10, { message: 'Phone no. should be of 10 digits' })
    .regex(PHONE_REGEX, { message: 'Please enter valid phone no.' }),
  DateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),

  Email: z
    .string({ required_error: 'Email is required.' })
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Email should be valid.' }),
  Province: z
    .string({ required_error: 'Provinceee is required.' })
    .min(1, { message: 'Province is required.' }),
  District: z
    .string({ required_error: 'District is required.' })
    .min(1, { message: 'District is required.' }),
  Municipality: z
    .string({ required_error: 'Municipality is required.' })
    .min(1, { message: 'Municipality is required.' }),
  Avatar: z
    .any()
    .refine((file) => file !== null && file !== undefined, {
      message: 'Image is required.',
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 10MB.')
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type), {
      message: 'Only .png, .jpg, .jpeg, pdfs and xls are supported.',
    }),
  SumExpected: z
    .number({ invalid_type_error: 'Sum Expected is required.' })

    .positive({ message: 'Sum Expected must be greater than 0' })
    .min(1, { message: 'Sum Expected is required.' }),
});

export const PropspectEditSchema = z.object({
  FullName: z.string().min(1, { message: 'Fullname is required.' }),
  Phone: z
    .string({ required_error: 'Phone is required.' })
    .length(10, { message: 'Phone no. should be of 10 digits' })
    .regex(PHONE_REGEX, { message: 'Please enter valid phone no.' }),
  DateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),

  Email: z
    .string({ required_error: 'Email is required.' })
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Email should be valid.' }),
  Province: z
    .string({ required_error: 'Provinceee is required.' })
    .min(1, { message: 'Province is required.' }),
  District: z
    .string({ required_error: 'District is required.' })
    .min(1, { message: 'District is required.' }),
  Municipality: z
    .string({ required_error: 'Municipality is required.' })
    .min(1, { message: 'Municipality is required.' }),
  Avatar: z.object({
    PublicId: z.string(),
    SecureURL: z.string(),
  }),
  SumExpected: z
    .number({ invalid_type_error: 'Sum Expected is required.' })

    .positive({ message: 'Sum Expected must be greater than 0' })
    .min(1, { message: 'Sum Expected is required.' }),
});

export type TProspectSchemaForm = z.infer<typeof PropspectSchema>;
export type TProspectEditSchemaForm = z.infer<typeof PropspectEditSchema>;
