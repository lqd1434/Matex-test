import React from 'react';
import styles from './app.module.scss';
import useIpcOn from './hooks/useIpcRender';
import { RouterAuth } from './router';
import { useChannel } from './zustand/store/apiData.store';

function App() {
  const { setPort } = useChannel((state) => state);

  const ipcListener = (e: any) => {
    const port = e.ports[0];
    setPort(port);
  };
  useIpcOn({ channel: 'port', listener: ipcListener });
  return (
    <div className={styles.app}>
      <RouterAuth />
    </div>
  );
}

export default App;
