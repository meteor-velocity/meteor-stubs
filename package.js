Package.describe({
  name: 'velocity:meteor-stubs',
  summary: 'Meteor stubs and mocks for unit testing.',
  version: '1.0.0_1',
  git: 'https://github.com/meteor-velocity/meteor-stubs'
});

Package.onUse(function (api) {
  api.addFiles('index.js');
  api.export('MeteorStubs');
});
