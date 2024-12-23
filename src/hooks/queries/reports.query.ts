import { getRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';

//selfAssured
export const useGetSelfAssured = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  return useQuery({
    queryKey: ['self-assured'],
    queryFn: async () => {
      return await getRequest({
        endpoint: '/report/self-assured-report',
        token,
      });
    },
  });
};

//get primary member details
export const useGetPrimaryMemberReport = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  return useQuery({
    queryKey: ['primary-member'],
    queryFn: async () => {
      return await getRequest({
        endpoint: '/report/primary-member-report',
        token,
      });
    },
  });
};

//get secondary member details
export const useGetSecondaryMemberReport = (phone: string | string[]) => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  return useQuery({
    queryKey: ['secondary-member'],
    queryFn: async () => {
      return await getRequest({
        endpoint: `/report/secondary-member-report/${phone}`,
        token,
      });
    },
  });
};
