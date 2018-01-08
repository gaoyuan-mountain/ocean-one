let configStore;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  configStore = require('./configureStore.prod').default;
} else {
  configStore = require('./configureStore.dev').default;
}

export default configStore;
