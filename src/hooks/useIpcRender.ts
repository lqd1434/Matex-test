import React, { useEffect } from 'react';
import { Window } from '../type';
import type { IpcRendererEvent } from 'electron';

interface IpcProps {
  channel: string;
  listener: (e: IpcRendererEvent) => void;
}

const useIpcOn = ({ channel, listener }: IpcProps) => {
  useEffect(() => {
    Window.ipc.on(channel, listener);

    return () => {
      Window.ipc.removeListener(channel, listener);
    };
  }, []);

  const off = () => {
    Window.ipc.removeListener(channel, listener);
  };
  return { off };
};

export default useIpcOn;
