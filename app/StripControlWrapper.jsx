import React from 'react';
import { OnlineConnectivityProvider } from '../utils/useConnectivity';
import StripControl from '../components/StripControl';


const StripControlWrapper = () => {
  return (
    <OnlineConnectivityProvider>
      <StripControl />
    </OnlineConnectivityProvider>
  );
};

export default StripControlWrapper;
