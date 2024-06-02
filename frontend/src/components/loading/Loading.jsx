import Lottie from 'react-lottie';
import animationData from '../../images/loading.json';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className="loading">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}
export default Loading;