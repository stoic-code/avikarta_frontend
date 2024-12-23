import { getRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTeamMember = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();

  return useQuery({
    queryKey: ['teams', token],
    queryFn: async () => {
      return getRequest({
        endpoint: `/team/team-detail`,
        token,
      });
    },
  });
};
