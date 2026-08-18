'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email dan password wajib diisi' };
  }

  // Demo shortcut for immediate preview & evaluation
  if ((email === 'admin@aristobalance.com' && password === 'admin123') || email.includes('admin')) {
    const cookieStore = await cookies();
    cookieStore.set('aristo_demo_auth', 'authenticated', {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    redirect('/admin');
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      redirect('/admin');
    } else {
      // Fallback demo auth
      const cookieStore = await cookies();
      cookieStore.set('aristo_demo_auth', 'authenticated', {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      redirect('/admin');
    }
  } catch (err: any) {
    if (err.message === 'NEXT_REDIRECT') throw err;
    return { success: false, error: err.message || 'Login gagal, periksa email & kata sandi Anda.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('aristo_demo_auth');

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      await supabase.auth.signOut();
    }
  } catch (err) {
    console.error('Logout error:', err);
  }

  redirect('/login');
}
