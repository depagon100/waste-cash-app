import React from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  socket?: Socket;
}

const SocketContext = React.createContext<Props>({ socket: undefined });

export default SocketContext;
