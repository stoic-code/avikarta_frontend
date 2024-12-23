'use client';
import PageLoadingUI from '@/components/Common/PageLoadingUI';
import EditClient from '@/components/Forms/AddClient/EditClient';
import EditProfile from '@/components/Forms/EditProfile/EditProfile';
import { useGetSingleClients } from '@/hooks/queries/client.query';
import { useGetUserDetail } from '@/hooks/queries/User.query';
import React from 'react';

export default function page() {
  const { data, isLoading } = useGetUserDetail();

  if (isLoading) {
    return <PageLoadingUI />;
  }
  const { user } = data;

  return <EditProfile user={user} />;
}
