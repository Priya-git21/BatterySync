import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../../lib/server_actions/utils';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('/api/user/logout').catch(console.error).finally(() => {
      logout();
      navigate('/login', { replace: true });
    });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Logging you out…</p>
    </div>
  );
};

export default Logout;