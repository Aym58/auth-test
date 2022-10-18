import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import type { UserLocal, SignUpValues } from '../types/types';

import Router from 'next/router';

const userSubject = new BehaviorSubject<UserLocal | null>(
  typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('user') || 'null'),
);

const register = async (values: SignUpValues) => {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (data.status === 'success') {
      userSubject.next(data);
      localStorage.setItem('user', JSON.stringify({ token: data.token }));
    }
    return data;
  } catch (error) {
    alert(error);
  }
};

const login = async (email: string, password: string) => {
  try {
    const res = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.status === 'success') {
      userSubject.next(data);
      localStorage.setItem('user', JSON.stringify({ token: data.token }));
    }
    return data;
  } catch (error) {
    alert(error);
  }
};

const getUser = async () => {
  if (!userSubject.value) return null;

  const token: string = userSubject.value.token;
  try {
    const res = await fetch('/api/authenticate', {
      method: 'GET',
      headers: { auth: `Bearer ${token}` },
    });
    const user = await res.json();
    return user;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/');
};

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  getUser,
  logout,
  register,
};
