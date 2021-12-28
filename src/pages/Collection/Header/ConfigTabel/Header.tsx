import { useHeaders, useUrlConfig } from '../../../../zustand/store/collection.store';
import React, { Fragment, useEffect } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import styles from './index.module.scss';

const HeadersTable = () => {
  const { updateHeader, headerList, addHeader, deleteHeader } = useHeaders((state) => state);
  const { method } = useUrlConfig((state) => state);
  useEffect(() => {
    const len = headerList.length;
    if (len) {
      if (headerList[len - 1].key && headerList[len - 1].value) {
        addHeader({ index: len, key: '', value: '' });
      }
    }
  }, [headerList]);

  return (
    <Table celled compact size={'small'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>键</Table.HeaderCell>
          <Table.HeaderCell>值</Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign={'center'}>
            操作
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {headerList.map((item, index) => {
          return (
            <Fragment key={item.index}>
              <Table.Row>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.key}
                    onChange={(e) => {
                      updateHeader(index, 'key', e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.value}
                    onChange={(e) => {
                      updateHeader(index, 'value', e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button icon compact>
                      <Icon name="expand arrows alternate" />
                    </Button>
                    <Button icon compact onClick={() => deleteHeader(item.index)}>
                      <Icon name="delete" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};
export default HeadersTable;
