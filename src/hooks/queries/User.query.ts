import { getRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { useQuery } from '@tanstack/react-query';

export const useGetUserDetail = () => {
  const { session } = useSession();

  // const { userDetail } = session;
  const token = session?.userDetail?.token || '';

  return useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      return getRequest({
        endpoint: '/user/me',
        token,
      });
    },
  });
};
