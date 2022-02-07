import { Timings } from '@szmarczak/http-timer';
import { Response } from 'got';
import { judgementType, rawTypes } from './judgement';
import { getDescription } from './statusCodeMapping';
import { ApiTestResProps } from '../../../../common';
import { Blob } from 'buffer';
import fileSize from 'filesize';

export const getResponse = (res: Response<string>): ApiTestResProps => {
  const type = judgementType(res.headers['content-type'] ?? 'text/plain');
  const timings = getTimings(res.timings);
  let size;
  try {
    size = parseInt(res.headers['content-length'] ?? new Blob([res.body]).size.toString());
  } catch (e) {
    console.log(e);
    size = 0;
  }
  return {
    type: res.headers['content-type'] ?? 'text/plain',
    desc: getDescription(res.statusCode),
    statusCode: res.statusCode,
    body: rawTypes.includes(type) ? res.rawBody : res.body,
    size: fileSize(size),
    headers: res.headers,
    timer: timings
  };
};

const getTimings = (timings: Timings) => {
  return {
    ['initialization']: timings.phases.wait,
    ['dns-lookup']: timings.phases.dns,
    ['tcp-connection']: timings.phases.tcp,
    ['first-byte']: timings.phases.firstByte,
    ['download']: timings.phases.download,
    ['total']: timings.phases.total
  };
};
