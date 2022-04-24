import Taro from '@tarojs/taro';

interface Query {
  url: string;
  query?: object;
}

const qs = <T>(query: T): string => {
  if (!query) return '';
  let params = '?';
  const keys = Object.keys(query);
  keys.map((item) => {
    params += `${item}=${query[item]}&`;
  });
  return params.substring(0, params.length);
};

export default function () {
  const router = {
    navigateTo: ({ url, query }: Query) => {
      Taro.navigateTo({
        url: `${url}${qs(query || '')}`
      });
    },
    redirectTo: () => {},
    reLaunch: () => {},
    switchTab: () => {}
  };

  return {
    router
  };
}
