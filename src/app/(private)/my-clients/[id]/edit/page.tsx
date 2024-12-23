'use client';
import PageLoadingUI from '@/components/Common/PageLoadingUI';
import EditClient from '@/components/Forms/AddClient/EditClient';
import { useGetSingleClients } from '@/hooks/queries/client.query';
import React from 'react';

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isLoading } = useGetSingleClients(id);
  console.log('edit paga bata', data);

  if (isLoading) {
    return <PageLoadingUI />;
  }
  const { data: c } = data;

  return <EditClient client={c} />;
}
