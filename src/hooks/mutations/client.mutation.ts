import { deleteRequest, editRequest, postRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useAddClient = () => {
  const queryClient = useQueryClient();
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  return useMutation({
    mutationFn: async ({ payload, token }: { payload: any; token: any }) => {
      return await postRequest({
        endpoint: '/client/new',
        payload,
        token,
      });
    },
    onSuccess: async () => {
      console.log('Mutation succeeded in addddddd, invalidating queries...');

      await queryClient.invalidateQueries({ queryKey: ['allclients'] });
      queryClient.refetchQueries({ queryKey: ['allclients'] }); // Manual refetch
    },
    onError: (error) => {
      console.error('Error adding client:', error);
    },
  });
};

export const useDeleteClient = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteRequest({
        endpoint: `/client/${id}`,
        token,
      });
    },
    onSuccess: () => {
      console.log('Mutation succeeded in delete, invalidating queries...');

      queryClient.invalidateQueries({ queryKey: ['allclients'] });
    },
  });
};

export const useEditClient = (id: string | string[]) => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      return await editRequest({
        endpoint: `/client/${id}`,
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['client', token] }),
  });
};
