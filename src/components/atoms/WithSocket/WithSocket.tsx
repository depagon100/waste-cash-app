import React from 'react';

import SocketProvider from '../../SocketContext';

export const WithSocket = (Component: any) => (props: any) =>
  (
    <SocketProvider.Consumer>
      {({ socket }) => <Component {...props} socket={socket} />}
    </SocketProvider.Consumer>
  );
