import { patchRequest, postRequest } from '@/lib/fetch';
import { useSession } from '@/providers/SessionProvider';
import { TForgotPasswordForm, TResetPasswordForm } from '@/schema/login.schema';
import { useMutation } from '@tanstack/react-query';

//register user
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/user/register',
        payload,
      });
    },
  });
};

//login user
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/user/login',
        payload,
      });
    },
  });
};

// forgot Password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: TForgotPasswordForm }) => {
      return await postRequest({
        endpoint: '/user/password/forgot',
        payload,
      });
    },
  });
};

//reset Password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload: TResetPasswordForm) => {
      return await patchRequest({
        endpoint: '/user/password/reset',
        payload,
      });
    },
  });
};

type TChangePw = {
  currentPassword: string;
  newPassword: string;
};
//change password
export const useChangePassword = () => {
  const {
    session: {
      userDetail: { token },
    },
  } = useSession();
  return useMutation({
    mutationFn: async (payload: TChangePw) => {
      return await patchRequest({
        endpoint: '/user/me/change-pswd',
        payload,
        token,
      });
    },
  });
};
