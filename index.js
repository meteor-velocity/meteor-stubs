/*jshint -W020, -W079 */
"use strict";

//////////////////////////////////////////////////////////////////////
// Meteor Stubs
//
// Stubs for the core Meteor objects.  
//
// Usage:
//   
//   MeteorStubs.install()   - installs stubs into the global object
//                             (either `global` or `window`)
//   MeteorStubs.uninstall() - restore global object fields to their
//                             previous values
//
// A note about the structure of this package:
//   Having everything all in a single file is not ideal but it makes 
//   it much easier to include client-side.  Please see the ToC below
//   to ease browsing.  Each section has a unique id which you can 
//   search on.
//
//
// Table of Contents:
//
//   MS00 - MeteorStubs
//   MS01 - Common prototypes
//   MS05 - Meteor
//     MS05-1 - Meteor.Collection
//     MS05-2 - Meteor.Collection.ObjectID
//     MS05-3 - Meteor.users
//   MS10 - Npm
//   MS15 - Deps / Tracker
//   MS20 - Package
//   MS25 - Random
//   MS30 - Session
//   MS35 - Template
//   MS40 - Handlebars
//   MS45 - Accounts
//   MS50 - __meteor_bootstrap__
//   MS55 - share
//   MS60 - Mongo
//   MS65 - Assets
//
//////////////////////////////////////////////////////////////////////


// Factory methods are used so that each time `MeteorStubs.install` is
// called, a clean object will be returned.
// Each stub has one factory associated with it.

var stubFactories = {},
    emptyFn = function () {},
    stringFn = function () { return '' },
    callbackFn = function (fn) { fn() };




//////////////////////////////////////////////////////////////////////
// MS00 - MeteorStubs
//////////////////////////////////////////////////////////////////////

;(function (global) {
  var _context = global,
      _originals = {};

  global.MeteorStubs = {

    /**
     * Install Meteor stubs into global context
     *
     * @method install
     * @param {Object} [context] Optional. The context to attach 
     *                 stubs to.  Default: the global context.
     */
    install: function (context) {

      if ('object' == typeof context && null !== context) {
        // place stubs on user-defined context
        _context = context;
      }

      for (var key in stubFactories) {
        if (_context[key] && !_originals[key]) {
          _originals[key] = _context[key];
        }
        _context[key] = stubFactories[key]();
      }

    },


    /**
     * Remove stubs by restoring context's original fields
     *
     * @method uninstall
     */
    uninstall: function () {
      for (var key in stubFactories) {
        if ('undefined' == typeof _originals[key]) {
          delete _context[key];
        } else {
          _context[key] = _originals[key];
        }
      }
    }

  };  // end global.MeteorStubs

})(typeof global === 'undefined' ? window : global);



//////////////////////////////////////////////////////////////////////
// Common Prototypes - MS01
//////////////////////////////////////////////////////////////////////

var prototypes = {

  Collection: {
    insert: emptyFn,
    find: new function () {},
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
  },  // end Collection

  Cursor: {
    count: emptyFn,
    forEach: emptyFn,
    map: emptyFn,
    fetch: emptyFn,
    observe: emptyFn,
    observeChanges: emptyFn
  },

  ObjectID: {
    getTimestamp: stringFn,
    toHexString: stringFn,
    toJSONValue: stringFn
  }

};  // end prototypes

prototypes.Collection.find.prototype = prototypes.Cursor;


//////////////////////////////////////////////////////////////////////
// Meteor - MS05
//////////////////////////////////////////////////////////////////////

stubFactories.Meteor = function () {
  var _instantiationCounts = {},
      Meteor;

  function collectionFn (collectionName) {
    var current = _instantiationCounts[collectionName];

    if (!current) {
      _instantiationCounts[collectionName] = 1
    } else {
      _instantiationCounts[collectionName] = current + 1
    }
  }

  Meteor = {
    isClient: true,
    isServer: true,
    instantiationCounts: _instantiationCounts,
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


  //////////////////////////////////////////////////////////////////////
  // Meteor.Collection - MS05.1
  //////////////////////////////////////////////////////////////////////

  Meteor.Collection.prototype = prototypes.Collection; 




  //////////////////////////////////////////////////////////////////////
  // Meteor.Collection.ObjectID - MS05.2
  //////////////////////////////////////////////////////////////////////

  Meteor.Collection.ObjectID = function () {
    return { _str: '' };
  };
  Meteor.Collection.ObjectID.prototype = prototypes.ObjectID



  //////////////////////////////////////////////////////////////////////
  // Meteor.users - MS05.3
  //
  // Instantiate the users default collection
  //////////////////////////////////////////////////////////////////////

  Meteor.users = new Meteor.Collection('users');




  return Meteor;

};  // Meteor





//////////////////////////////////////////////////////////////////////
// Npm - MS10
//////////////////////////////////////////////////////////////////////

stubFactories.Npm = function () {
  return {
    depends: emptyFn,
    require: emptyFn
  };
};


//////////////////////////////////////////////////////////////////////
// MS15 - Deps / Tracker
//////////////////////////////////////////////////////////////////////

stubFactories.Deps = function () {
  return {
    autorun: callbackFn,
    autosubscribe: callbackFn,
    afterFlush: emptyFn
  };
};
stubFactories.Tracker = stubFactories.Deps


//////////////////////////////////////////////////////////////////////
// MS20 - Package
//////////////////////////////////////////////////////////////////////

stubFactories.Package = function () {
  return { 
    describe: emptyFn 
  };
};



//////////////////////////////////////////////////////////////////////
// MS25 - Random
//////////////////////////////////////////////////////////////////////

stubFactories.Random = function () {
  return {
    id: emptyFn,
    secret: emptyFn,
    fraction: emptyFn,
    choice: emptyFn,
    hexString: emptyFn
  };
};



//////////////////////////////////////////////////////////////////////
// MS30 - Session
//////////////////////////////////////////////////////////////////////

stubFactories.Session = function () {
  return {
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
  };
};

//////////////////////////////////////////////////////////////////////
// MS35 - Template
//////////////////////////////////////////////////////////////////////

function TemplateClass () {};
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

stubFactories.Template = function () {
  return new TemplateClass();
};


//////////////////////////////////////////////////////////////////////
// MS40 - Handlebars
//////////////////////////////////////////////////////////////////////

function HandlebarsClass () { };
HandlebarsClass.prototype = {
  helpers: {},
  registerHelper: function (name, method) {
    this.helpers[name] = method;
  }
};

stubFactories.Handlebars = function () {
  return new HandlebarsClass();
};



//////////////////////////////////////////////////////////////////////
// MS45 - Accounts
//////////////////////////////////////////////////////////////////////

stubFactories.Accounts = function () {
  var Meteor = stubFactories.Meteor();

  return {
    emailTemplates: { enrollAccount: emptyFn },
    config: emptyFn,
    urls: {},
    registerLoginHandler: emptyFn,
    onCreateUser: emptyFn,
    loginServiceConfiguration: new Meteor.Collection('loginserviceconfiguration'),
    validateNewUser: emptyFn
  };
};


//////////////////////////////////////////////////////////////////////
// MS50 - __meteor_bootstrap__
//////////////////////////////////////////////////////////////////////

stubFactories.__meteor_bootstrap__ = function () {
  return {
    deployConfig: {
      packages: { 'mongo-livedata': { url: '' } }
    }
  };
};

//////////////////////////////////////////////////////////////////////
// MS55 - share
//////////////////////////////////////////////////////////////////////

stubFactories.share = function () {
  return {};
};


//////////////////////////////////////////////////////////////////////
// MS60 - Mongo
//////////////////////////////////////////////////////////////////////

stubFactories.Mongo = function () {
  var _instantiationCounts = {},
      Mongo;

  function collectionFn (collectionName) {
    var current = _instantiationCounts[collectionName];

    if (!current) {
      _instantiationCounts[collectionName] = 1
    } else {
      _instantiationCounts[collectionName] = current + 1
    }
  }

  Mongo = {
    instantiationCounts: _instantiationCounts,
    Collection: collectionFn,
    Cursor: emptyFn,
    ObjectID: function () {
      return { _str: '' };
    }
  };

  Mongo.Collection.prototype = stubFactories.Meteor().Collection.prototype;
  Mongo.ObjectID.prototype = prototypes.ObjectID;
  Mongo.Cursor.prototype = prototypes.Cursor;

  return Mongo;
};


//////////////////////////////////////////////////////////////////////
// MS65 - Assets
//////////////////////////////////////////////////////////////////////

stubFactories.Assets = function () {
  return {
    getText: stringFn,
    getBinary: emptyFn
  }
};
