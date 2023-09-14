export type MyPage<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: any;
};
