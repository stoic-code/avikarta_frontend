import { getRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { useQuery } from '@tanstack/react-query';

export const useGetAllClients = (pgNo: number) => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  // console.log('page xaaaaa?', pgNo);

  return useQuery({
    queryKey: ['allclients'],
    queryFn: async () => {
      return getRequest({
        endpoint: `/client/all/${pgNo ? pgNo : 1}`,
        token,
      });
    },
  });
};

export const useGetSingleClients = (id: string | string[]) => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  console.log('token xaaaaa?', token);
  console.log('id xaaaaa?', id);

  return useQuery({
    queryKey: ['client', token],
    queryFn: async () => {
      return getRequest({
        endpoint: `/client/${id}`,
        token,
      });
    },
  });
};
