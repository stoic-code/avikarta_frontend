'use client';
import Title from '@/components/Title';
import { H3, H4, P } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import React from 'react';

export default function Page() {
  const handleDownload = async () => {
    try {
      console.log('clickedd');

      const response = await fetch(
        '/avikarta_Required_Documents_For_Insurance.pdf'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `avikarta_Required_Documents_For_Insurance.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="px-4 2xl:container sm:py-10">
      <Title title="Download" />
      <div className="mt-16 flex flex-col">
        <div className="mb-8 flex w-full justify-end">
          <Button onClick={() => handleDownload()}>
            <Download size={20} className="mr-2" />
            Download
          </Button>
        </div>
        <div className="mx-auto mt-2 max-w-xl">
          <H3 className="mb-2 font-semibold">
            Required Documents For Insurance
          </H3>

          <P className="text-md">
            To ensure a smooth and efficient insurance application process,
            please have the following documents and information ready:
          </P>
          <div>
            <H4 className="mt-2">General Documents:</H4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ul className="mt-2 list-disc pl-6">
                <li>Nagarikta (Citizenship Certificate)</li>
                <li>Passport-sized Photograph</li>
                <li>Height</li>
                <li>Weight</li>
                <li>Qualification</li>
                <li>Permanent Address</li>
              </ul>
              <ul className="mt-2 list-disc pl-6">
                <li>Present Address</li>
                <li>Name of Grandfather</li>
                <li>Name of Mother</li>
                <li>Name of Nominee</li>
                <li>Name of Children</li>
                <li>Monthly Income</li>
              </ul>
              <ul className="mt-2 list-disc pl-6">
                <li>Source of Income</li>
                <li>Nationality</li>
                <li>Profession</li>
                <li>Type of Profession</li>
                <li>Mobile Number</li>
                <li>Age of All Family Members</li>
              </ul>
            </div>
          </div>
          <div>
            <H4 className="mt-4">
              Additional Documents (if residing outside the country):
            </H4>
            <ul className="mt-2 list-disc pl-6">
              <li>Passport Copy</li>
              <li>Visa Copy</li>
              <li>Resident Card</li>
              <li>Salary Slip</li>
              <li>ID Card</li>
            </ul>
          </div>
          <P className="mt-4 text-lg">
            Having these documents ready will expedite your insurance
            application and help us provide you with the best coverage options
            tailored to your needs.
          </P>
        </div>
      </div>
    </section>
  );
}
