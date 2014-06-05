/*jshint -W020, -W079 */
"use strict";

var stubs,
    emptyFn = function () {},
    callbackFn = function (fn) { fn() },
    Meteor,
    TemplateClass,
    HandlebarsClass;



function collectionFn (collectionName) {
  var current = Meteor.instantiationCounts[collectionName];

  if (!current) {
    Meteor.instantiationCounts[collectionName] = 1
  } else {
    Meteor.instantiationCounts[collectionName] = current + 1
  }
}


Meteor = {
  isClient: true,
  isServer: true,
  instantiationCounts: {},
  startupFunctions: [],
  publishFunctions: {},
  subscribeFunctions: {},
  methodMap: {},
  Error: emptyFn,
  startup: function (newStartupFunction) {
    this.startupFunctions.push(newStartupFunction);
  },
  Collection: collectionFn,
  SmartCollection: collectionFn,
  publish: function (modelName, publishFunction) {
    this.publishFunctions[modelName] = publishFunction;
  },
  subscribe: function (modelName, subscribeFunction) {
    this.subscribeFunctions[modelName] = subscribeFunction;
    return {
      ready: function () {
        return true;
      }
    };
  },
  settings: { public: {} },
  methods: function (map) {
    for (var name in map) {
      //noinspection JSUnfilteredForInLoop
      this.methodMap[name] = map[name];
    }
  },
  autorun: callbackFn,
  autosubscribe: callbackFn,
  call: emptyFn,
  loggingIn: emptyFn,
  setInterval: emptyFn,
  user: function () {
    return {
      emails: []
    };
  },
  userId: function () { return null; },
  loginWithGoogle: emptyFn,
  logout: emptyFn,
  require: emptyFn,
  runStartupMethods: function () {
    for (var i = 0; i < this.startupFunctions.length; i += 1) {
      this.startupFunctions[i]();
    }
  }
};

Meteor.Collection.prototype = {
  insert: emptyFn,
  find: function () {
    return {
      count: emptyFn,
      fetch: emptyFn,
      observe: emptyFn,
      observeChanges: emptyFn
    };
  },
  findOne: emptyFn,
  update: emptyFn,
  remove: emptyFn,
  allow: emptyFn,
  deny: emptyFn,
  _ensureIndex: emptyFn,

  // collection hooks
  before: {
    insert: emptyFn,
    update: emptyFn,
    remove: emptyFn
  },
  after: {
    insert: emptyFn,
    update: emptyFn,
    remove: emptyFn
  }
};

Meteor.Collection.ObjectID = function () {
  return { _str: '' };
};


// instantiate the users default collection
Meteor.users = new Meteor.Collection('users');



TemplateClass = function () {};
TemplateClass.prototype = {
  stub: function (templateName) {
    TemplateClass.prototype[templateName] = {
      eventMap: {},
      events: function (eventMap) {
        for (var event in eventMap) {
          //noinspection JSUnfilteredForInLoop
          TemplateClass.prototype[templateName].eventMap[event] = eventMap[event];
        }
      },
      helpers: function (helperMap) {
        for (var helper in helperMap) {
          //noinspection JSUnfilteredForInLoop
          TemplateClass.prototype[templateName][helper] = helperMap[helper];
        }
      },
      fireEvent: function (key) {
        if (arguments.length > 1) {
          var args = Array.prototype.slice.call(arguments, 1);
          TemplateClass.prototype[templateName].eventMap[key].apply(null, args);
        } else {
          TemplateClass.prototype[templateName].eventMap[key]();
        }
      },
      // Allows you to set an attribute in the event 'this' context
      addContextAttribute: function (key, value) {
        TemplateClass.prototype[templateName].eventMap[key] = value;
      }
    };
  }
};



HandlebarsClass = function handlebarsClass () { };
HandlebarsClass.prototype = {
  helpers: {},
  registerHelper: function (name, method) {
    this.helpers[name] = method;
  }
};



stubs = {

  share: {},

  Meteor: Meteor,

  Npm: {
    depends: emptyFn,
    require: emptyFn
  },

  Deps: {
    autorun: callbackFn,
    autosubscribe: callbackFn,
    afterFlush: emptyFn
  },

  Package: { describe: emptyFn },

  Random: {
    id: emptyFn,
    secret: emptyFn,
    fraction: emptyFn,
    choice: emptyFn,
    hexString: emptyFn
  },

  Session: {
    store: {},
    get: function (key) {
      return this.store[key];
    },
    set: function (key, value) {
      this.store[key] = value;
    },
    equals: function (key, value) {
      return this.store[key] === value;
    },
    setDefault: function (key, value) {
      if (typeof this.get(key) === 'undefined') {
        this.set(key, value);
      }
    }
  },

  Template: new TemplateClass(),

  Handlebars: new HandlebarsClass(),

  Accounts: {
    emailTemplates: { enrollAccount: emptyFn },
    config: emptyFn,
    urls: {},
    registerLoginHandler: emptyFn,
    onCreateUser: emptyFn,
    loginServiceConfiguration: new Meteor.Collection('loginserviceconfiguration'),
    validateNewUser: emptyFn
  },

  __meteor_bootstrap__: {
    deployConfig: {
      packages: { 'mongo-livedata': { url: '' } }
    }
  }

};  // end stubs




// export our stubs
for (var key in stubs) {
  global[key] = stubs[key];
}
