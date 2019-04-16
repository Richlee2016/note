import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555396738928_9628';

  // add your egg config in here
  config.middleware = [ 'errorHandler' ];
  // csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  };
  // mongodb
  config.mongoose = {
    url: 'mongodb://120.79.228.82:27017/note',
    options: {}
  };
  // view engin
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    },
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
