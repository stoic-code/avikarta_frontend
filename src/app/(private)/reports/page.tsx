import Title from '@/components/Title';
import { Card } from '@/components/ui/card';
import React from 'react';
import { H3, H4, P } from '@/components/typography';
import Link from 'next/link';

export default function page() {
  return (
    <section className="px-4 sm:container sm:py-10">
      <Title title="Reports" />
      <div className="mt-20">
        <Link href="/reports/self-assured">
          <Card className="border-primary p-4">
            <H4>Self Assured</H4>
            <P>Your Client Total Self Assured</P>
          </Card>
        </Link>
        <Link href="/reports/total-budget">
          <Card className="mt-5 border-primary p-4">
            <H4>Total Budgets</H4>
            <P>Total Self Assured Of Your Team Member</P>
          </Card>
        </Link>
      </div>
    </section>
  );
}
