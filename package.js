Package.describe({
  name: 'velocity:meteor-stubs',
  summary: 'Meteor stubs and mocks for unit testing.',
  version: '1.1.0',
  git: 'https://github.com/meteor-velocity/meteor-stubs'
});

Package.onUse(function (api) {
  api.addFiles('index.js');
  api.addAssets('index.js', ['client', 'server']);
  api.export('MeteorStubs');
});
