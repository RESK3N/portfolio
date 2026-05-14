import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import AdminLogin from './AdminLogin';

const AdminLayout = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#000] text-gray-900 dark:text-white">Loading...</div>;
  }

  if (!session) {
    return <AdminLogin />;
  }

  // Session exists, render dashboard
  return <Outlet />;
};

export default AdminLayout;
