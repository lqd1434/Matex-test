import { MatexWin } from '../global';
import { ApiTest_Channel } from '/@common/ipc/channel';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestHeadersAtom,
  apiTestMethodAtom,
  apiTestParamsAtom,
  apiTestUrlAtom
} from '../store/apiTest.store';

export const useSendReq = () => {
  const method = useAtomValue(apiTestMethodAtom);
  const url = useAtomValue(apiTestUrlAtom);
  const paramList = useAtomValue(apiTestParamsAtom);
  const headerList = useAtomValue(apiTestHeadersAtom);
  console.log(url, 'url');
  console.log(method, 'method');
  const sendReq = () => {
    console.log(headerList);
    const params = paramList.slice(0, paramList.length - 1);
    const headers: { [key: string]: string } = {};
    headerList.slice(0, headerList.length - 1).forEach((item) => {
      headers[item.key] = item.value;
    });
    console.log({ url, method, params, headers });
    MatexWin.ipc?.send(ApiTest_Channel.Request, { url, method, params, headers });
  };

  return { sendReq };
};
