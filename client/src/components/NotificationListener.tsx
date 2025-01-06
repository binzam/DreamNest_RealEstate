import { useEffect } from 'react';
import { socket } from '../socket';
import { addNotification } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const NotificationListener = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user?._id) {
      socket.emit('join', user._id);
    }
    socket.on('notification', (data) => {
      console.log('Notification received:', data);
      dispatch(addNotification(data));
    });

    return () => {
      socket.off('notification');
    };
  }, [dispatch, user?._id]);

  return null;
};

export default NotificationListener;
