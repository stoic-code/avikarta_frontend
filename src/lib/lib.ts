'use server';
import { cookies } from 'next/headers';
import { postRequest } from './fetch';
import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

//CREATE SESSION
export const createLoginSession = async (payload: any) => {
  try {
    if (payload) {
      const userDetail = {
        ...payload.userDetail,
        token: payload.Token,
      };

      const expires = new Date(Date.now() + 60 * 60 * 1000); //10sec

      const session = await encryptMe({ userDetail, expires });

      cookies().set('session', session, {
        expires,
        httpOnly: true,
        sameSite: 'lax',
      });

      return {
        success: true,
        message: 'Login Successfully!',
      };
    }
  } catch (err: any) {
    console.log('session ko kerror', err);
    throw new Error(err.Error || 'Erorroororororroroo');
  }
};

//ENCYPTING THE PAYLOAD
export const encryptMe = async (payload: any) => {
  try {
    const session = await new SignJWT(payload)
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setExpirationTime('100h')
      .sign(key);
    return session;
  } catch (err) {
    console.log('err', err);

    throw new Error('Failed to create JWT');
  }
};

//DECRYPTING THE COOKIE
export const decryptMe = async (hashed: string) => {
  try {
    const { payload } = await jwtVerify(hashed, key, { algorithms: ['HS256'] });
    const user = payload;

    return user;
  } catch (err) {
    console.log('Error during decryption', err);
    return null;
  }
};

//GET SESSION
export const getSession = async () => {
  const session = cookies().get('session')?.value;
  if (!session) {
    return null;
  }
  return await decryptMe(session);
};

//UPDATE SESSION IN EACH PAGE REQUREST
export const udpateSession = async (req: NextRequest) => {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  try {
    const parsed = await decryptMe(session);
    if (!parsed) {
      const loginUrl = new URL('/login', req.url).toString();
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete('session');
      return res;
    }

    const newExpiryDate = new Date(Date.now() + 60 * 60 * 1000); //1hr
    parsed.expires = newExpiryDate;

    // Create a new response to update the session cookie
    const res = NextResponse.next();
    res.cookies.set('session', await encryptMe(parsed), {
      httpOnly: true,
      sameSite: 'lax',
      expires: newExpiryDate,
    });

    //returning this modified NextResponse object.
    return res;
  } catch (Err) {
    console.log('update cookie error:', Err);
    throw new Error('Failed to update session');
  }
};

//VALIDATING THE SESSION COOKIE
export const validateSession = async (sessionCookie: any) => {
  try {
    const { payload } = await jwtVerify(sessionCookie, key, {
      algorithms: ['HS256'],
    });
    if (payload) {
      return true;
    }
  } catch (err) {
    console.error('Error validating session:', err);
    return false;
  }
};

//DELETE SESSION ON LOGOUT
// export const deleteSession = () => {
//   //remove the session cookie
//   const res = NextResponse.next();
//   res.cookies.delete('session', {
//     httpOnly: true,
//     sameSite: 'Lax',
//     secure: process.env.NODE_ENV === 'production', // Ensure secure flag is set in production
//   });
// };
export async function deleteSession() {
  cookies().delete('session');
  redirect('/login');
}
