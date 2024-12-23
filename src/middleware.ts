import { NextRequest, NextResponse } from 'next/server';
import { getSession, udpateSession, validateSession } from './lib/lib';

const privateRoutes = [
  '/dashboard',
  '/download',
  '/my-clients',
  '/my-teams',
  '/prospects',
  '/reports',
  '/settings',
];

//CHECKING PRIVATE ROUTE
export function isPrivateRoute(pathname: string): boolean {
  for (const path of privateRoutes) {
    if (pathname.startsWith(path)) return true;
  }
  return false;
}

//CHECKING IF USER HAS Token
const handleUnauthorized = (req: NextRequest) => {
  //here its takes the base url and adds /login on it irrespective of url req
  const loginUrl = new URL('/login', req.url).toString();
  console.log(' unauthorizeddd  login urll hai', loginUrl);
  const res = NextResponse.redirect(loginUrl);
  res.cookies.delete('session');
  return res;
};

//CHECKS IF USER IS lOGGEDIN
export const isLoggedIn = async (req: NextRequest) => {
  try {
    const sessionCookie = req.cookies.get('session')?.value;
    if (!sessionCookie) return false;

    //aslo check if token is vallidate or not
    return validateSession(sessionCookie);
  } catch (err) {
    throw new Error('User is Not LoggedIn');
  }
};

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (/\.(png|svg|jpg|webp|mp3|geojson)/.test(pathname)) return;

  if (pathname === '/login' || pathname === '/register') {
    const loggedIn = await isLoggedIn(req);
    if (loggedIn) {
      const url = new URL('/dashboard', req.url);
      return NextResponse.redirect(url);
    }
  }
  if (isPrivateRoute(pathname)) {
    const session = await getSession();

    if (!session) {
      return handleUnauthorized(req);
    }
    return await udpateSession(req);
  }
  return NextResponse.next();
}
