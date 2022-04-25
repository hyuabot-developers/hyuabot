import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const api = axios.create({
  baseURL: 'https://api.hyuabot.app/api/v1/',
  timeout: 5000,
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
