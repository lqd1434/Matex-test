import React, { SyntheticEvent } from 'react';
import styles from './index.module.scss';
import { Button, Dropdown, Icon, Input, Label } from 'semantic-ui-react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { MethodsOptions } from '/@/model/apiTest.model';
import { useSendReq } from '/@/message/apiTest.ipc';
import Tabs from './Tabs';
import { ToastContainer, toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { apiTestMethodAtom, apiTestUrlAtom } from '/@/store/apiTestStore';

const Header = () => {
  const [method, setMethod] = useAtom(apiTestMethodAtom);
  const [url, setUrl] = useAtom(apiTestUrlAtom);

  const { sendReq } = useSendReq();
  const notify = () => toast('so easy !');
  const countryOptions = MethodsOptions.map((item) => {
    return { key: item, value: item, text: item };
  });

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setMethod(value);
  };

  const doFetch = () => {
    notify();
    url.trim() && sendReq();
  };

  return (
    <>
      <div className={styles.url}>
        <ToastContainer style={{ color: 'red' }} />
        <Button.Group color="teal" className={styles.leftSelect}>
          <Button>{method}</Button>
          <Dropdown
            className={clsx(['button', 'icon'])}
            onChange={handleChange}
            floating
            options={countryOptions}
            trigger={<></>}
          />
        </Button.Group>
        <Input
          value={url}
          size="large"
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          icon={
            <div style={{ display: 'inline', position: 'absolute', right: '6px', top: '6px' }}>
              <Icon name="clipboard outline" circular link />
            </div>
          }
        />
        <Button primary size={'large'} onClick={doFetch}>
          发送
        </Button>
      </div>
      <div className={styles.config}>
        <div className={styles.option}>
          <Tabs />
        </div>
        <div className={styles.table}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Header;
