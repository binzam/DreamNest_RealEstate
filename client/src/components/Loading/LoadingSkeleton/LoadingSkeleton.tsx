import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './LoadingSkeleton.css';
const LoadingSkeleton = () => {
  return (
    <div className="loading_skeleton">
      <Skeleton height={60} width={350} style={{ marginBottom: '10px' }} />
      <div className="loading_skeleton_inner">
        <Skeleton height={300} width={`${100}%`} />
        <Skeleton height={300} width={`${100}%`} />
        <Skeleton height={300} width={`${100}%`} />
        <Skeleton height={300} width={`${100}%`} />
        <Skeleton height={300} width={`${100}%`} />
        <Skeleton height={300} width={`${100}%`} />
        <Skeleton height={300} width={`${100}%`} />
        <Skeleton height={300} width={`${100}%`} />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
