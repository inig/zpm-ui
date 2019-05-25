import RemoteComponent from './components/RemoteCom/index';
import Message from './components/message';
import locale from './locale/index';

const components = {
  'remote-component': RemoteComponent
}

const zpm = {
  ...components
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  Object.keys(zpm).forEach(key => {
    Vue.component(key, zpm[key]);
  });

  Vue.prototype.$zpm = {
    size: opts.size || '',
    transfer: 'transfer' in opts ? opts.transfer : ''
  };

  Vue.prototype.$Message = Message;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  version: process.env.VERSION, // eslint-disable-line no-undef
  locale: locale.use,
  i18n: locale.i18n,
  install,
  ...components
};

API.lang = (code) => {
  const langObject = window['zpm/locale'].default;
  if (code === langObject.i.locale) locale.use(langObject);
  else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
};

module.exports.default = module.exports = API;   // eslint-disable-line no-undef
