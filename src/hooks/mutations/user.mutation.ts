import { patchRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditUserDetail = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      return await patchRequest({
        endpoint: '/user/me/update',
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['user', token] }),
  });
};
