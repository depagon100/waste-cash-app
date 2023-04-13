import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const navigation = () => {
  let ref;

  if (!ref && navigationRef.isReady()) {
    ref = navigationRef;
  }

  return ref;
};

export default navigation;
