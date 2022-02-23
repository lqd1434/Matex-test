import { atom, useAtom } from 'jotai';
import { WebsocketType, WsMessage } from '/@/type/websocketPage';
import { produce } from 'immer';
import { checkIndex } from '/@/store/utils';
import { useUpdateAtom } from 'jotai/utils';

export const websocketTypeAtom = atom<WebsocketType>('native');
export const websocketSideAtom = atom<'client' | 'server'>('client');
export const websocketMsgListAtom = atom<WsMessage[]>([]);
export const websocketNativeConnAtom = atom<WebSocket | undefined>(undefined);
export const websocketUrlAtom = atom<string>('ws://localhost:8080');

const addMsgListAtom = atom(null, (get, set, param: Omit<WsMessage, 'index'>) => {
  const tempList = produce(get<WsMessage[]>(websocketMsgListAtom), (draft) => {
    draft.push({ index: draft.length, ...param });
  });
  set(websocketMsgListAtom, checkIndex(tempList));
});

export const useMsgList = () => {
  const [msgList, updateMsgList] = useAtom(websocketMsgListAtom);
  const addMsgListFn = useUpdateAtom(addMsgListAtom);

  const clearList = () => {
    updateMsgList([]);
  };

  return {
    msgList,
    addMsg: addMsgListFn,
    clearList
  };
};
