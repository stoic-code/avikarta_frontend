import { getRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { useQuery } from '@tanstack/react-query';

export const useGetAllProspects = (pgNo: number) => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  console.log('token xaaaaa?', token);
  console.log('page xaaaaa?', pgNo);

  return useQuery({
    queryKey: ['prospects'],
    queryFn: async () => {
      return getRequest({
        endpoint: `/prospect/all/${pgNo}`,
        token,
      });
    },
  });
};

export const useGetSingleProspect = (id: string | string[]) => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  console.log('token xaaaaa?', token);
  console.log('id xaaaaa?', id);

  return useQuery({
    queryKey: ['singleProspect'],
    queryFn: async () => {
      return getRequest({
        endpoint: `/prospect/${id}`,
        token,
      });
    },
  });
};
