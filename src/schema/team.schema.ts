import { z } from 'zod';
import { PHONE_REGEX } from './constants';

export const teamMemberSchema = z.object({
  Phone: z
    .string({ required_error: 'Phone no. is required.' })
    .min(1, { message: 'Phone no. is required.' })
    .regex(PHONE_REGEX, { message: 'Please  enter valid phone.' }),
});

export type TTeamMemberSchemaForm = z.infer<typeof teamMemberSchema>;
