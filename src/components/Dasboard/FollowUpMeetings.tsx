import React from 'react';
import { Card } from '../ui/card';
import { H3, H4, H5, P } from '../typography';

export default function FollowUpMeetings() {
  return (
    <section className="my-10 rounded-2xl border p-4 py-4 shadow-lg">
      <div>
        <H4 className="text-3xl font-semibold"> Meetings</H4>
        {[1, 2, 3].map((item, index) => (
          <div
            key={index}
            className="mt-4 space-y-1 rounded-b-xl border-b-2 border-l-0 border-r-0 border-t-0 border-gray-400 p-4"
          >
            <div className="flex flex-col justify-between sm:flex-row sm:items-center">
              <div>
                <span className="text-lg font-bold">Title:</span>
                <span className="ml-1 text-lg">Follow Up Meeting</span>
              </div>
              <div className="text-red-600">
                <span className="font-semibold">Follow Up:</span>
                <span className="ml-1">Fri, 25th June 2021</span>
              </div>
            </div>
            <div>
              <span className="font-semibold">Purpose:</span>
              <span className="ml-1">
                To discuss about the upcoming project
              </span>
            </div>

            <P>
              <span className="font-semibold">Remark:</span>
              <span className="ml-1 text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                sed, cum deleniti possimus dignissimos obcaecati libero
                reiciendis quod veniam facilis, numquam quae? Facilis rem
                obcaecati eligendi. Aliquam minima ad cupiditate consequatur
                dolor dolores inventore eum fugiat quod deleniti? Obcaecati quo
                totam earum animi deserunt soluta ducimus harum in reiciendis
                sequi?
              </span>
            </P>
          </div>
        ))}
      </div>
    </section>
  );
}
