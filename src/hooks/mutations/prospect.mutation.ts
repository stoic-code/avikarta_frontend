import { deleteRequest, editRequest, postRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddProspect = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/prospect/new',
        payload,
        token,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prospects'] }),
  });
};

export const useDeleteProspect = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteRequest({
        endpoint: `/prospect/${id}`,
        token,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prospects'] }),
  });
};

export const useEditProspect = (id: string | string[]) => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      return await editRequest({
        endpoint: `/prospect/${id}`,
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['singleProspect'] }),
  });
};

//add meeting

export const useAddMeeting = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      console.log('whatt is in payoad meeting', payload);

      return await postRequest({
        endpoint: '/prospect/meeting/create',
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['singleProspect'] }),
  });
};

//delete Meeting
export const useDeleteMeeting = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      meeting_id,
      prospect_id,
    }: {
      meeting_id: string;
      prospect_id: string;
    }) => {
      return await deleteRequest({
        endpoint: `/prospect/meeting/${prospect_id}/${meeting_id}`,
        token,
      });
    },
    onSuccess: async () => {
      console.log('Mutation succeeded in delete, invalidating queries...');
      await queryClient.invalidateQueries({ queryKey: ['singleProspect'] });
      queryClient.refetchQueries({ queryKey: ['singleProspect'] }); // Manual refetch
    },
  });
};
