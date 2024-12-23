import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, PHONE_REGEX } from './constants';

export const ClientSchema = z.object({
  FullName: z.string().min(1, { message: 'Fullname is required.' }),
  Phone: z
    .string({ required_error: 'Phone no. is required.' })
    .length(10, { message: 'Phone no. is incorrect.' })
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
  ClientInsuranceInfo: z.object({
    NameOfNominee: z
      .string()
      .min(1, { message: 'Name of nominee is required' }),
    NomineePhone: z
      .string()
      .min(10, { message: 'Phone must be of 10 digits.' })
      .max(10, { message: 'Phone must be of 10 digits.' })
      .regex(PHONE_REGEX, { message: 'Please enter valid phone no.' }),
    Relationship: z.string().min(1, { message: 'Relationship is required' }),
    SumAssured: z
      .number({ invalid_type_error: 'Sum Assured is required.' })

      .positive({ message: 'Sum Assured must be greater than 0' })
      .min(1, { message: 'Sum Assured is required.' }),
    PremiumAmount: z
      .number({ invalid_type_error: 'Premium Amount is required.' })
      .min(1, { message: 'Premium Amount is required' }),
    PolicyNo: z
      .number({ invalid_type_error: 'Policy No. is required.' })
      .min(1, { message: 'Policy Number is required' }),
    PolicyType: z
      .number({ invalid_type_error: 'Policy type is required.' })
      .min(1, { message: 'Policy type is required' }),
    IssueDate: z
      .string({ required_error: 'Issued Date is required.' })
      .min(1, { message: 'Issued Date is required' }),
    EndDate: z
      .string({ required_error: 'End Date is required.' })
      .min(1, { message: 'End Date is required' }),
    LastPaymentDate: z
      .string({ required_error: 'Last Payment Date is required.' })
      .min(1, { message: 'Last Payment Date is required' }),
    PaymentMethod: z
      .string({ required_error: 'Payment Method is required' })
      .min(1, { message: 'Name of nominee is required' }),
    LoanFacilities: z.boolean({
      invalid_type_error: 'Choose if loan facility is provided.',
    }),
    PolicyIssueBranch: z
      .string()
      .min(1, { message: 'Policy Issue Branch is required' }),
    PhotoOfPolicy: z
      .any()
      .refine((file) => file !== null && file !== undefined, {
        message: 'Image is required.',
      })
      .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 10MB.')
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type), {
        message: 'Only .png, .jpg, .jpeg, pdfs and xls are supported.',
      }),
    PolicyFileReceivedBy: z
      .string()
      .min(1, { message: 'Policy File Reciever is required' }),
    PolicyFileReceivedDate: z
      .string({ required_error: 'Policy File Received Date is required.' })
      .min(1, { message: 'Policy File Received Date is required' }),
  }),
});
export const ClientEditSchema = z.object({
  FullName: z.string().min(1, { message: 'Fullname is required.' }),
  Phone: z
    .string({ required_error: 'Phone no. is required.' })
    .length(10, { message: 'Phone no. is incorrect.' })
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
  ClientInsuranceInfo: z.object({
    NameOfNominee: z
      .string()
      .min(1, { message: 'Name of nominee is required' }),
    NomineePhone: z
      .string()
      .min(10, { message: 'Phone must be of 10 digits.' })
      .max(10, { message: 'Phone must be of 10 digits.' })
      .regex(PHONE_REGEX, { message: 'Please enter valid phone no.' }),
    Relationship: z.string().min(1, { message: 'Relationship is required' }),
    SumAssured: z
      .number({ invalid_type_error: 'Sum Assured is required.' })

      .positive({ message: 'Sum Assured must be greater than 0' })
      .min(1, { message: 'Sum Assured is required.' }),
    PremiumAmount: z
      .number({ invalid_type_error: 'Premium Amount is required.' })
      .min(1, { message: 'Premium Amount is required' }),
    PolicyNo: z
      .number({ invalid_type_error: 'Policy No. is required.' })
      .min(1, { message: 'Policy Number is required' }),
    PolicyType: z
      .number({ invalid_type_error: 'Policy type is required.' })
      .min(1, { message: 'Policy type is required' }),
    IssueDate: z
      .string({ required_error: 'Issued Date is required.' })
      .min(1, { message: 'Issued Date is required' }),
    EndDate: z
      .string({ required_error: 'End Date is required.' })
      .min(1, { message: 'End Date is required' }),
    LastPaymentDate: z
      .string({ required_error: 'Last Payment Date is required.' })
      .min(1, { message: 'Last Payment Date is required' }),
    PaymentMethod: z
      .string({ required_error: 'Payment Method is required' })
      .min(1, { message: 'Name of nominee is required' }),
    LoanFacilities: z.boolean({
      invalid_type_error: 'Choose if loan facility is provided.',
    }),
    PolicyIssueBranch: z
      .string()
      .min(1, { message: 'Policy Issue Branch is required' }),
    PhotoOfPolicy: z.object({
      PublicId: z.string(),
      SecureURL: z.string(),
    }),
    PolicyFileReceivedBy: z
      .string()
      .min(1, { message: 'Policy File Reciever is required' }),
    PolicyFileReceivedDate: z
      .string({ required_error: 'Policy File Received Date is required.' })
      .min(1, { message: 'Policy File Received Date is required' }),
  }),
});

export type TClientSchemaForm = z.infer<typeof ClientSchema>;
export type TClientSchemaEditForm = z.infer<typeof ClientEditSchema>;
