import React, { useMemo } from 'react';
import { Button, Dropdown, Label, Menu } from 'semantic-ui-react';
import { BodyItemType, TabItems } from '../../../../type/collection';
import { useBodyList, useUrlConfig } from '../../../../zustand/store/collection.store';
import { useNavigate } from 'react-router-dom';
import { BodyTypes } from '../../../../model/collection.model';

const Tabs = () => {
  const { activeTab, setActiveTab, method } = useUrlConfig((state) => state);
  const navigate = useNavigate();
  const { type, setType } = useBodyList((state) => state);

  const handleItemClick = (item: TabItems) => {
    setActiveTab(item);
    const path = `/apiTest/${item.toLowerCase()}`;
    navigate(path);
  };
  const options = BodyTypes.map((item) => {
    return { key: item, value: item, text: item };
  });

  const handleChange = (e: React.SyntheticEvent, { value }: any) => {
    setType(value as BodyItemType);
  };

  return useMemo(() => {
    return (
      <>
        <Label ribbon as="a" color={'orange'}>
          选项
        </Label>
        <Menu color={'teal'} secondary>
          <Menu.Item
            name="Params"
            active={activeTab === 'Params'}
            onClick={() => handleItemClick('Params')}
          />
          <Menu.Item
            name="Headers"
            active={activeTab === 'Headers'}
            onClick={() => handleItemClick('Headers')}
          />
          <Menu.Item name={'Body'} active={activeTab === 'Body'} onClick={() => handleItemClick('Body')} />
          {activeTab === 'Body' && method === 'Post' && (
            <Menu.Menu position="right" style={{ marginRight: 15 }}>
              <Menu.Item>
                <Button.Group color={'teal'} size={'small'}>
                  <Button>{type}</Button>
                  <Dropdown
                    className="button icon"
                    onChange={handleChange}
                    options={options}
                    trigger={<></>}
                  />
                </Button.Group>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </>
    );
  }, [activeTab, type, method]);
};

export default Tabs;
