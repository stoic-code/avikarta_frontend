import { deleteRequest, patchRequest, postRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//create team
export const useCreateTeam = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/team/register-team',
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['teams', token] }),
  });
};

//add team member
export const useAddTeamMember = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/team/add-member',
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['teams', token] }),
  });
};

//join team acccept request
export const useJoinTeam = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await patchRequest({
        endpoint: '/team/team-request-accept',
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['user', token] }),
  });
};
//cancel team  request
export const useCancelTeam = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      console.log('payload:', payload);

      return await deleteRequest({
        endpoint: '/team/team-request-cancel',
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['user', token] }),
  });
};

//2 Level team members
export const useGetTwoLevelMembers = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/team/team-member-detail',
        payload,
        token,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['teams', token] }),
  });
};
