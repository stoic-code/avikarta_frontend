import { CircleCheck, CircleX } from 'lucide-react';
import React from 'react';

export default function MeetingAlertFormat() {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-400"></div>
          <h2 className="text-base font-semibold">Meeting Alert</h2>
        </div>
      </div>
      <div>
        <p className="text-sm">Your meeting is due tomorrow with Mohan lal.</p>
      </div>
    </div>
  );
}
