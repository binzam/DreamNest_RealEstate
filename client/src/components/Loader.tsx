import { GridLoader } from 'react-spinners';

export const Loader = () => (
  <GridLoader
    color="#13ccbb"
    margin={10}
    size={25}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 13000,
    }}
  />
);
