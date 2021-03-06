import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { TabProps } from '/@/model/sidebar.model';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useAtom } from 'jotai';
import { collapseAtom } from '/@/store/commonStore';

const SideBarTab: React.FC<TabProps> = ({ text = '', route = '', active = false }) => {
  const navigate = useNavigate();
  const tabRef = useRef<HTMLDivElement>(null);
  const [collapse] = useAtom(collapseAtom);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    navigate(route);
  };
  useEffect(() => {
    if (!collapse) {
      setTimeout(() => {
        setShow(true);
      }, 200);
    } else {
      setShow(false);
    }
  }, [collapse]);
  return (
    <div
      ref={tabRef}
      onClick={handleClick}
      style={{ width: collapse ? '50px' : '200px' }}
      className={clsx([styles.tab, active && styles.active])}
    >
      <div className={clsx([styles.tabIcon])}>{getIcon(route)}</div>
      <div style={{ display: show ? 'block' : 'none' }} className={clsx([styles.text])}>
        {text}
      </div>
    </div>
  );
};

const getIcon = (route: string) => {
  let res;
  switch (route) {
    case '/apiTest':
      res = <Icon className={styles.icon} disabled name="world" />;
      break;
    case '/websocket':
      res = <Icon className={styles.icon} disabled name="linkify" />;
      break;
    case '/benchmark':
      res = <Icon className={styles.icon} disabled name="rocket" />;
      break;
    case '/ok':
      res = <Icon disabled name="find" />;
      break;
  }
  return res;
};

export default SideBarTab;
