import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from '../store';
import Swal from 'sweetalert2';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    // console.log({ email, password });
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('token-init-date', new Date().getTime());

      saveNewTokenInLocalStorage(data);

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', {
        email,
        password,
        name,
      });
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('token-init-date', new Date().getTime());

      saveNewTokenInLocalStorage(data);

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(
        onLogout(error.response.data?.msg || 'verificar en useAuthStore')
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(onLogout());
    }

    try {
      const { data } = await calendarApi.get('auth/renew');
      // console.log(data);
      // localStorage.setItem('token', data.token);

      saveNewTokenInLocalStorage(data);

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      startLogout();
      Swal.fire(
        'Sesión caducada',
        'Por favor vuelva a iniciar sesión',
        'error'
      );
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  const saveNewTokenInLocalStorage = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', new Date().getTime());
  };

  return {
    // * Propiedades

    status,
    user,
    errorMessage,

    // * Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
