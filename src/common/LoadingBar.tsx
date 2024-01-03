import { LinearProgress } from '@mui/material';
import { useNavigation } from 'react-router-dom';

const LoadingIndicator = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div>
      {isLoading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'blue' }}>
          <LinearProgress />
        </div>
      )}
    </div>
  );
};

export default LoadingIndicator