import { z } from 'zod';

export const MeetingSchema = z.object({
  prospectID: z.string().min(1, { message: 'Prospect Id is required.' }),
  meetingDetail: z.object({
    MeetingDate: z.string().min(1, { message: 'Meeting date is required' }),
    Time: z.string().min(1, { message: 'Meeting time is required' }),
    MeetingTitle: z.string().min(1, { message: 'Meeting title is required' }),
    Purpose: z.string().min(1, { message: 'Meeting purpose is required' }),
    WhatTheySaid: z.string().min(1, { message: 'Message is required' }),
    FollowUp: z.string().min(1, { message: 'Follow up date is required.' }), // Follow-up date is optional
    Remark: z.string().min(1, { message: 'Remark is required.' }), // Remarks are optional
  }),
});

export type TMeetingSchema = z.infer<typeof MeetingSchema>;
