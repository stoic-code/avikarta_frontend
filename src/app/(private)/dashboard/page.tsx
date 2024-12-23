'use client';
import { formatDateString } from '@/components/Common/DateFormatter';
import PageLoadingUI from '@/components/Common/PageLoadingUI';
import CardsInfo from '@/components/Dasboard/CardsInfo';
import FollowUpMeetings from '@/components/Dasboard/FollowUpMeetings';
import { H3 } from '@/components/typography';
import { useGetUserDetail } from '@/hooks/queries/User.query';
import { useMediaQuery } from 'react-responsive';
import { Calendar, Mail, MapPin, Phone, User, UserSquare } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  CartesianGrid,
  Line,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const dataBar = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const dataPie = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

export default function Page() {
  const { data, isLoading } = useGetUserDetail();
  // const isSmallDevice = useMediaQuery('only screen and (max-width : 720px)');
  const isSmallDevice = useMediaQuery({ query: '(max-width: 720px)' });
  const isMediumDevice = useMediaQuery({ query: '(max-width: 500px)' });

  console.log(isSmallDevice, isMediumDevice);

  if (isLoading) {
    return <PageLoadingUI />;
  }

  const { user } = data;
  console.log('mero dertail', user);

  return (
    <section className="mx-auto lg:px-0 lg:py-10">
      <div className="flex flex-col justify-between gap-8 px-4 2xl:container lg:flex-col">
        <div className="flex h-fit w-full flex-col gap-4 md:flex-row">
          {/* <H3 className="mb-4">Team Name: {user.MyTeam}</H3> */}
          <div className="flex h-auto w-full max-w-4xl flex-col justify-between gap-4 rounded-2xl border p-4 shadow-lg sm:flex-row">
            <div className="flex-shrink-0 self-center sm:self-start">
              <Image
                src="/girl.svg"
                alt="My Photo"
                width={200}
                height={200}
                className="h-[100px] w-[100px] rounded-full object-cover md:h-44 md:w-44"
              />
            </div>
            <section className="">
              {/* for the big screens */}
              <div className="hidden grid-cols-1 gap-4 text-base sm:grid sm:grid-cols-2 xl:w-full xl:grid-cols-3">
                <div className="flex items-start gap-2">
                  <User size={20} className="mt-1 flex-shrink-0 text-primary" />
                  <div className="flex w-full text-base sm:flex-col">
                    <span className="font-bold lg:w-44">Agent Name:</span>
                    {/* <br /> */}
                    <p>{user.FullName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-base">
                  <MapPin
                    size={20}
                    className="mt-1 flex-shrink-0 text-primary"
                  />
                  <div className="flex w-full flex-col">
                    <span className="font-bold lg:w-44">Address:</span>
                    <span>
                      {user.District},{user.Municipality}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-base">
                  <Calendar
                    size={20}
                    className="mt-1 flex-shrink-0 text-primary"
                  />
                  <div className="flex w-full flex-col">
                    <span className="font-bold lg:w-44">Date of Birth:</span>
                    <span>{formatDateString(user.DateOfBirth)}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone
                    size={20}
                    className="mt-1 flex-shrink-0 text-primary"
                  />
                  <div className="flex w-full flex-col">
                    <span className="font-bold lg:w-44">Phone:</span>

                    <a
                      href={`tel:${user.Phone}`}
                      className="text-primary underline"
                    >
                      {user.Phone}
                    </a>
                    <a
                      href={`tel:${user.Phone}`}
                      className="text-primary underline"
                    >
                      {user.Phone}
                    </a>
                    {/* <span>{user.Phone}</span> */}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-1 flex-shrink-0 text-primary" size={20} />
                  <div className="flex w-full flex-col">
                    <span className="font-bold lg:w-44">Email:</span>
                    <span>{user.Email}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <UserSquare
                    className="mt-1 flex-shrink-0 text-primary"
                    size={20}
                  />
                  <div className="flex w-full flex-col">
                    <span className="font-bold lg:w-44">My Team:</span>
                    <span>{user.MyTeam}</span>
                  </div>
                </div>
              </div>
              {/* for mobile screens */}
              <div className="block sm:hidden">
                <table className="flex items-center justify-center space-y-4">
                  <tbody className="space-y-4">
                    <tr>
                      {/* <td className="pr-4 font-semibold"></td> */}
                      <td
                        colSpan={2}
                        className="text-center text-xl font-semibold"
                      >
                        Milan Praz
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4 pt-2 font-semibold">
                        <span className="flex items-center gap-1">
                          <MapPin size={20} className="text-primary" />
                          Address:
                        </span>
                      </td>
                      <td>
                        {user.District},{user.Municipality}
                      </td>
                    </tr>

                    <tr>
                      <td className="pr-4 pt-2 font-semibold">
                        <span className="flex items-center gap-1">
                          <Phone size={20} className="text-primary" />
                          Phone:
                        </span>
                      </td>
                      <td className="flex max-w-[200px] flex-wrap gap-1">
                        <a
                          href={`tel:${user.Phone}`}
                          className="text-primary underline"
                        >
                          {user.Phone}
                        </a>
                        ,
                        <a
                          href={`tel:${user.Phone}`}
                          className="text-primary underline"
                        >
                          {user.Phone}
                        </a>
                        ,
                        <a
                          href={`tel:${user.Phone}`}
                          className="text-primary underline"
                        >
                          {user.Phone}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4 pt-2 font-semibold">
                        <span className="flex items-center gap-1">
                          <Mail size={20} className="text-primary" />
                          Email:
                        </span>
                      </td>
                      <td>{user.Email}</td>
                    </tr>
                    <tr>
                      <td className="pr-4 pt-2 font-semibold">
                        <span className="flex items-center gap-1">
                          <UserSquare size={20} className="text-primary" />
                          My Team:
                        </span>
                      </td>
                      <td>{user.MyTeam}</td>
                    </tr>
                    <tr>
                      <td className="pr-4 pt-2 font-semibold">
                        <span className="flex items-center gap-1 text-nowrap">
                          <Calendar size={20} className="text-primary" />
                          Date of Birth:
                        </span>
                      </td>
                      <td>{formatDateString(user.DateOfBirth)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-2 hidden">
                <span className="font-semibold">My Team : {user.MyTeam}</span>
              </div>
              <div className="mt-2 hidden">
                <span className="font-semibold">
                  My Leader: <span className="font-medium">Milan</span>
                </span>
              </div>
            </section>
          </div>

          {/* stats part */}
          <div className="flex flex-1 gap-4">
            <section className="flex w-full flex-wrap gap-2 md:gap-4">
              <div className="flex w-full flex-row flex-wrap justify-center gap-2 md:justify-normal">
                {/* my clients */}
                <div className="flex h-auto w-[48%] flex-shrink-0 gap-2 rounded-2xl border p-2 shadow-lg sm:min-w-[208px] sm:p-4">
                  <img
                    src="/clientIcon.png"
                    alt="icon"
                    height={40}
                    width={40}
                    className="h-14 w-14 flex-shrink-0 sm:h-16 sm:w-16"
                  />
                  <div className="flex-shrink-0 text-lg font-semibold">
                    <h2 className="text-base font-semibold sm:text-lg">
                      My Clients
                    </h2>
                    <p className="text-2xl">51</p>
                  </div>
                </div>
                {/* my team */}
                <div className="flex w-[48%] gap-2 rounded-2xl border p-2 shadow-lg sm:min-w-[208px] sm:p-4">
                  <img
                    src="/teamIcon.png"
                    alt="icon"
                    height={40}
                    width={40}
                    className="h-14 w-14 flex-shrink-0 sm:h-16 sm:w-16"
                  />
                  <div className="font-semibold">
                    <h2 className="text-base font-semibold sm:text-lg">
                      My Team
                    </h2>
                    <p className="text-2xl">51</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-row flex-wrap justify-center gap-2 md:justify-normal">
                {/* my prospects */}
                <div className="flex w-[48%] gap-2 whitespace-nowrap rounded-2xl border p-2 shadow-lg sm:min-w-[208px] sm:p-4">
                  <img
                    src="/prospectIcon.png"
                    alt="icon"
                    height={40}
                    width={40}
                    className="h-14 w-14 flex-shrink-0 sm:h-16 sm:w-16"
                  />
                  <div className="text-lg font-semibold">
                    <h2 className="text-base font-semibold sm:text-lg">
                      My Prospect
                    </h2>
                    <p className="text-2xl">51</p>
                  </div>
                </div>
                {/* my pending req */}
                <div className="flex w-[48%] gap-2 whitespace-nowrap rounded-2xl border p-2 shadow-lg sm:min-w-[208px] sm:p-4">
                  <img
                    src="/pending.svg"
                    alt="icon"
                    height={40}
                    width={40}
                    className="h-14 w-14 flex-shrink-0 sm:h-16 sm:w-16"
                  />
                  <div className="text-lg font-semibold">
                    <h2 className="text-base font-semibold sm:text-lg">
                      Pending{' '}
                    </h2>
                    <p className="text-2xl">51</p>
                  </div>
                </div>
              </div>
            </section>
            {/* my team */}
            {/* <div className="hidden w-[132px] flex-col items-center justify-center gap-2 rounded-2xl border p-4 shadow-lg xl:flex">
              <h2 className="text-lg font-semibold">My Team</h2>
              <div className="flex flex-row items-center gap-2 text-lg font-semibold">
                <img
                  src="/teamIcon.png"
                  alt="icon"
                  height={80}
                  width={80}
                  className="w-16 flex-shrink-0"
                />
                <p className="text-2xl">51</p>
              </div>
            </div> */}
          </div>
          {/* <div className="mt-10">
            <CardsInfo />
          </div> */}
        </div>
        {/* Chart  Bar diagram */}
        <div className="flex flex-col items-center gap-4 md:flex-row">
          {/* BAR DIAGRAM */}
          <div className="h-96 w-[98%] rounded-2xl border p-4 shadow-lg md:h-96 md:w-1/2">
            <h1 className="font-semibold">Premium Amount</h1>
            <div className="h-full w-full py-2">
              <ResponsiveContainer width="99%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={dataBar}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 1,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIEE CHART */}
          <div className="h-80 w-[96%] rounded-2xl border p-4 shadow-lg md:h-96 md:w-1/2">
            <h1 className="font-semibold">Clients Distribution</h1>
            <ResponsiveContainer aspect={1.5} width="99%" height="100%">
              <PieChart
                width={isSmallDevice ? 400 : 600}
                height={isSmallDevice ? 400 : 600}
              >
                <Pie
                  data={dataPie}
                  cx={isSmallDevice ? 80 : 140}
                  cy={isSmallDevice ? 100 : 190}
                  // innerRadius={isSmallDevice ? 60 : 80}
                  // outerRadius={isSmallDevice ? 80 : 120}
                  innerRadius={isSmallDevice ? 60 : 120}
                  outerRadius={isSmallDevice ? 80 : 160}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataBar.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="w-full px-4 2xl:container">
        <FollowUpMeetings />
      </div>
    </section>
  );
}
