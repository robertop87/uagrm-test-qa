'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _helpers = require('../formatter/helpers');

var _helpers2 = require('./helpers');

var _install_validator = require('./install_validator');

var _i18n = require('./i18n');

var I18n = _interopRequireWildcard(_i18n);

var _configuration_builder = require('./configuration_builder');

var _configuration_builder2 = _interopRequireDefault(_configuration_builder);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _builder = require('../formatter/builder');

var _builder2 = _interopRequireDefault(_builder);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pickle_filter = require('../pickle_filter');

var _pickle_filter2 = _interopRequireDefault(_pickle_filter);

var _master = require('../runtime/parallel/master');

var _master2 = _interopRequireDefault(_master);

var _runtime = require('../runtime');

var _runtime2 = _interopRequireDefault(_runtime);

var _support_code_library_builder = require('../support_code_library_builder');

var _support_code_library_builder2 = _interopRequireDefault(_support_code_library_builder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cli = function () {
  function Cli(_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd,
        stdout = _ref.stdout;
    (0, _classCallCheck3.default)(this, Cli);

    this.argv = argv;
    this.cwd = cwd;
    this.stdout = stdout;
  }

  (0, _createClass3.default)(Cli, [{
    key: 'getConfiguration',
    value: function () {
      var _ref2 = (0, _bluebird.coroutine)(function* () {
        var fullArgv = yield (0, _helpers2.getExpandedArgv)({ argv: this.argv, cwd: this.cwd });
        return _configuration_builder2.default.build({ argv: fullArgv, cwd: this.cwd });
      });

      function getConfiguration() {
        return _ref2.apply(this, arguments);
      }

      return getConfiguration;
    }()
  }, {
    key: 'initializeFormatters',
    value: function () {
      var _ref4 = (0, _bluebird.coroutine)(function* (_ref3) {
        var _this = this;

        var eventBroadcaster = _ref3.eventBroadcaster,
            formatOptions = _ref3.formatOptions,
            formats = _ref3.formats,
            supportCodeLibrary = _ref3.supportCodeLibrary;

        var streamsToClose = [];
        var eventDataCollector = new _helpers.EventDataCollector(eventBroadcaster);
        yield _bluebird2.default.map(formats, function () {
          var _ref6 = (0, _bluebird.coroutine)(function* (_ref5) {
            var _context;

            var type = _ref5.type,
                outputTo = _ref5.outputTo;

            var stream = _this.stdout;
            if (outputTo) {
              var fd = yield _fs2.default.open(_path2.default.resolve(_this.cwd, outputTo), 'w');
              stream = _fs2.default.createWriteStream(null, { fd: fd });
              streamsToClose.push(stream);
            }
            var typeOptions = (0, _extends3.default)({
              eventBroadcaster: eventBroadcaster,
              eventDataCollector: eventDataCollector,
              log: (_context = stream).write.bind(_context),
              stream: stream,
              supportCodeLibrary: supportCodeLibrary
            }, formatOptions);
            return _builder2.default.build(type, typeOptions);
          });

          return function (_x2) {
            return _ref6.apply(this, arguments);
          };
        }());
        return function () {
          return _bluebird2.default.each(streamsToClose, function (stream) {
            return _bluebird2.default.promisify(stream.end.bind(stream))();
          });
        };
      });

      function initializeFormatters(_x) {
        return _ref4.apply(this, arguments);
      }

      return initializeFormatters;
    }()
  }, {
    key: 'getSupportCodeLibrary',
    value: function getSupportCodeLibrary(_ref7) {
      var supportCodeRequiredModules = _ref7.supportCodeRequiredModules,
          supportCodePaths = _ref7.supportCodePaths;

      supportCodeRequiredModules.map(function (module) {
        return require(module);
      });
      _support_code_library_builder2.default.reset(this.cwd);
      supportCodePaths.forEach(function (codePath) {
        return require(codePath);
      });
      return _support_code_library_builder2.default.finalize();
    }
  }, {
    key: 'run',
    value: function () {
      var _ref8 = (0, _bluebird.coroutine)(function* () {
        yield (0, _install_validator.validateInstall)(this.cwd);
        var configuration = yield this.getConfiguration();
        if (configuration.listI18nLanguages) {
          this.stdout.write(I18n.getLanguages());
          return { success: true };
        }
        if (configuration.listI18nKeywordsFor) {
          this.stdout.write(I18n.getKeywords(configuration.listI18nKeywordsFor));
          return { success: true };
        }
        var supportCodeLibrary = this.getSupportCodeLibrary(configuration);
        var eventBroadcaster = new _events2.default();
        var cleanup = yield this.initializeFormatters({
          eventBroadcaster: eventBroadcaster,
          formatOptions: configuration.formatOptions,
          formats: configuration.formats,
          supportCodeLibrary: supportCodeLibrary
        });
        var testCases = yield (0, _helpers2.getTestCasesFromFilesystem)({
          cwd: this.cwd,
          eventBroadcaster: eventBroadcaster,
          featureDefaultLanguage: configuration.featureDefaultLanguage,
          featurePaths: configuration.featurePaths,
          pickleFilter: new _pickle_filter2.default(configuration.pickleFilterOptions)
        });
        var success = void 0;
        if (configuration.parallel) {
          var parallelRuntimeMaster = new _master2.default({
            eventBroadcaster: eventBroadcaster,
            options: configuration.runtimeOptions,
            supportCodePaths: configuration.supportCodePaths,
            supportCodeRequiredModules: configuration.supportCodeRequiredModules,
            testCases: testCases
          });
          yield new _bluebird2.default(function (resolve) {
            parallelRuntimeMaster.run(configuration.parallel, function (s) {
              success = s;
              resolve();
            });
          });
        } else {
          var runtime = new _runtime2.default({
            eventBroadcaster: eventBroadcaster,
            options: configuration.runtimeOptions,
            supportCodeLibrary: supportCodeLibrary,
            testCases: testCases
          });
          success = yield runtime.start();
        }
        yield cleanup();
        return {
          shouldExitImmediately: configuration.shouldExitImmediately,
          success: success
        };
      });

      function run() {
        return _ref8.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return Cli;
}();

exports.default = Cli;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaW5kZXguanMiXSwibmFtZXMiOlsiSTE4biIsIkNsaSIsImFyZ3YiLCJjd2QiLCJzdGRvdXQiLCJmdWxsQXJndiIsImJ1aWxkIiwiZXZlbnRCcm9hZGNhc3RlciIsImZvcm1hdE9wdGlvbnMiLCJmb3JtYXRzIiwic3VwcG9ydENvZGVMaWJyYXJ5Iiwic3RyZWFtc1RvQ2xvc2UiLCJldmVudERhdGFDb2xsZWN0b3IiLCJtYXAiLCJ0eXBlIiwib3V0cHV0VG8iLCJzdHJlYW0iLCJmZCIsIm9wZW4iLCJyZXNvbHZlIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJwdXNoIiwidHlwZU9wdGlvbnMiLCJsb2ciLCJ3cml0ZSIsImVhY2giLCJwcm9taXNpZnkiLCJlbmQiLCJzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcyIsInN1cHBvcnRDb2RlUGF0aHMiLCJyZXF1aXJlIiwibW9kdWxlIiwicmVzZXQiLCJmb3JFYWNoIiwiY29kZVBhdGgiLCJmaW5hbGl6ZSIsImNvbmZpZ3VyYXRpb24iLCJnZXRDb25maWd1cmF0aW9uIiwibGlzdEkxOG5MYW5ndWFnZXMiLCJnZXRMYW5ndWFnZXMiLCJzdWNjZXNzIiwibGlzdEkxOG5LZXl3b3Jkc0ZvciIsImdldEtleXdvcmRzIiwiZ2V0U3VwcG9ydENvZGVMaWJyYXJ5IiwiY2xlYW51cCIsImluaXRpYWxpemVGb3JtYXR0ZXJzIiwidGVzdENhc2VzIiwiZmVhdHVyZURlZmF1bHRMYW5ndWFnZSIsImZlYXR1cmVQYXRocyIsInBpY2tsZUZpbHRlciIsInBpY2tsZUZpbHRlck9wdGlvbnMiLCJwYXJhbGxlbCIsInBhcmFsbGVsUnVudGltZU1hc3RlciIsIm9wdGlvbnMiLCJydW50aW1lT3B0aW9ucyIsInJ1biIsInMiLCJydW50aW1lIiwic3RhcnQiLCJzaG91bGRFeGl0SW1tZWRpYXRlbHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFBWUEs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Q0FBVjtBQUNBckM7QUFDRCxhQUhEO0FBSUQsV0FMSyxDQUFOO0FBTUQsU0FkRCxNQWNPO0FBQ0wsY0FBTXNDLFVBQVUsc0JBQVk7QUFDMUJsRCw4Q0FEMEI7QUFFMUI4QyxxQkFBU2pCLGNBQWNrQixjQUZHO0FBRzFCNUMsa0RBSDBCO0FBSTFCb0M7QUFKMEIsV0FBWixDQUFoQjtBQU1BTixvQkFBVSxNQUFNaUIsUUFBUUMsS0FBUixFQUFoQjtBQUNEO0FBQ0QsY0FBTWQsU0FBTjtBQUNBLGVBQU87QUFDTGUsaUNBQXVCdkIsY0FBY3VCLHFCQURoQztBQUVMbkI7QUFGSyxTQUFQO0FBSUQsTzs7Ozs7Ozs7Ozs7O2tCQTFHa0J2QyxHIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhQ29sbGVjdG9yIH0gZnJvbSAnLi4vZm9ybWF0dGVyL2hlbHBlcnMnXG5pbXBvcnQgeyBnZXRFeHBhbmRlZEFyZ3YsIGdldFRlc3RDYXNlc0Zyb21GaWxlc3lzdGVtIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHsgdmFsaWRhdGVJbnN0YWxsIH0gZnJvbSAnLi9pbnN0YWxsX3ZhbGlkYXRvcidcbmltcG9ydCAqIGFzIEkxOG4gZnJvbSAnLi9pMThuJ1xuaW1wb3J0IENvbmZpZ3VyYXRpb25CdWlsZGVyIGZyb20gJy4vY29uZmlndXJhdGlvbl9idWlsZGVyJ1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5pbXBvcnQgRm9ybWF0dGVyQnVpbGRlciBmcm9tICcuLi9mb3JtYXR0ZXIvYnVpbGRlcidcbmltcG9ydCBmcyBmcm9tICdtei9mcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgUGlja2xlRmlsdGVyIGZyb20gJy4uL3BpY2tsZV9maWx0ZXInXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCBQYXJhbGxlbFJ1bnRpbWVNYXN0ZXIgZnJvbSAnLi4vcnVudGltZS9wYXJhbGxlbC9tYXN0ZXInXG5pbXBvcnQgUnVudGltZSBmcm9tICcuLi9ydW50aW1lJ1xuaW1wb3J0IHN1cHBvcnRDb2RlTGlicmFyeUJ1aWxkZXIgZnJvbSAnLi4vc3VwcG9ydF9jb2RlX2xpYnJhcnlfYnVpbGRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpIHtcbiAgY29uc3RydWN0b3IoeyBhcmd2LCBjd2QsIHN0ZG91dCB9KSB7XG4gICAgdGhpcy5hcmd2ID0gYXJndlxuICAgIHRoaXMuY3dkID0gY3dkXG4gICAgdGhpcy5zdGRvdXQgPSBzdGRvdXRcbiAgfVxuXG4gIGFzeW5jIGdldENvbmZpZ3VyYXRpb24oKSB7XG4gICAgY29uc3QgZnVsbEFyZ3YgPSBhd2FpdCBnZXRFeHBhbmRlZEFyZ3YoeyBhcmd2OiB0aGlzLmFyZ3YsIGN3ZDogdGhpcy5jd2QgfSlcbiAgICByZXR1cm4gQ29uZmlndXJhdGlvbkJ1aWxkZXIuYnVpbGQoeyBhcmd2OiBmdWxsQXJndiwgY3dkOiB0aGlzLmN3ZCB9KVxuICB9XG5cbiAgYXN5bmMgaW5pdGlhbGl6ZUZvcm1hdHRlcnMoe1xuICAgIGV2ZW50QnJvYWRjYXN0ZXIsXG4gICAgZm9ybWF0T3B0aW9ucyxcbiAgICBmb3JtYXRzLFxuICAgIHN1cHBvcnRDb2RlTGlicmFyeSxcbiAgfSkge1xuICAgIGNvbnN0IHN0cmVhbXNUb0Nsb3NlID0gW11cbiAgICBjb25zdCBldmVudERhdGFDb2xsZWN0b3IgPSBuZXcgRXZlbnREYXRhQ29sbGVjdG9yKGV2ZW50QnJvYWRjYXN0ZXIpXG4gICAgYXdhaXQgUHJvbWlzZS5tYXAoZm9ybWF0cywgYXN5bmMgKHsgdHlwZSwgb3V0cHV0VG8gfSkgPT4ge1xuICAgICAgbGV0IHN0cmVhbSA9IHRoaXMuc3Rkb3V0XG4gICAgICBpZiAob3V0cHV0VG8pIHtcbiAgICAgICAgY29uc3QgZmQgPSBhd2FpdCBmcy5vcGVuKHBhdGgucmVzb2x2ZSh0aGlzLmN3ZCwgb3V0cHV0VG8pLCAndycpXG4gICAgICAgIHN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKG51bGwsIHsgZmQgfSlcbiAgICAgICAgc3RyZWFtc1RvQ2xvc2UucHVzaChzdHJlYW0pXG4gICAgICB9XG4gICAgICBjb25zdCB0eXBlT3B0aW9ucyA9IHtcbiAgICAgICAgZXZlbnRCcm9hZGNhc3RlcixcbiAgICAgICAgZXZlbnREYXRhQ29sbGVjdG9yLFxuICAgICAgICBsb2c6IDo6c3RyZWFtLndyaXRlLFxuICAgICAgICBzdHJlYW0sXG4gICAgICAgIHN1cHBvcnRDb2RlTGlicmFyeSxcbiAgICAgICAgLi4uZm9ybWF0T3B0aW9ucyxcbiAgICAgIH1cbiAgICAgIHJldHVybiBGb3JtYXR0ZXJCdWlsZGVyLmJ1aWxkKHR5cGUsIHR5cGVPcHRpb25zKVxuICAgIH0pXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFByb21pc2UuZWFjaChzdHJlYW1zVG9DbG9zZSwgc3RyZWFtID0+XG4gICAgICAgIFByb21pc2UucHJvbWlzaWZ5KDo6c3RyZWFtLmVuZCkoKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGdldFN1cHBvcnRDb2RlTGlicmFyeSh7IHN1cHBvcnRDb2RlUmVxdWlyZWRNb2R1bGVzLCBzdXBwb3J0Q29kZVBhdGhzIH0pIHtcbiAgICBzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcy5tYXAobW9kdWxlID0+IHJlcXVpcmUobW9kdWxlKSlcbiAgICBzdXBwb3J0Q29kZUxpYnJhcnlCdWlsZGVyLnJlc2V0KHRoaXMuY3dkKVxuICAgIHN1cHBvcnRDb2RlUGF0aHMuZm9yRWFjaChjb2RlUGF0aCA9PiByZXF1aXJlKGNvZGVQYXRoKSlcbiAgICByZXR1cm4gc3VwcG9ydENvZGVMaWJyYXJ5QnVpbGRlci5maW5hbGl6ZSgpXG4gIH1cblxuICBhc3luYyBydW4oKSB7XG4gICAgYXdhaXQgdmFsaWRhdGVJbnN0YWxsKHRoaXMuY3dkKVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBhd2FpdCB0aGlzLmdldENvbmZpZ3VyYXRpb24oKVxuICAgIGlmIChjb25maWd1cmF0aW9uLmxpc3RJMThuTGFuZ3VhZ2VzKSB7XG4gICAgICB0aGlzLnN0ZG91dC53cml0ZShJMThuLmdldExhbmd1YWdlcygpKVxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9XG4gICAgfVxuICAgIGlmIChjb25maWd1cmF0aW9uLmxpc3RJMThuS2V5d29yZHNGb3IpIHtcbiAgICAgIHRoaXMuc3Rkb3V0LndyaXRlKEkxOG4uZ2V0S2V5d29yZHMoY29uZmlndXJhdGlvbi5saXN0STE4bktleXdvcmRzRm9yKSlcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICAgIH1cbiAgICBjb25zdCBzdXBwb3J0Q29kZUxpYnJhcnkgPSB0aGlzLmdldFN1cHBvcnRDb2RlTGlicmFyeShjb25maWd1cmF0aW9uKVxuICAgIGNvbnN0IGV2ZW50QnJvYWRjYXN0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgICBjb25zdCBjbGVhbnVwID0gYXdhaXQgdGhpcy5pbml0aWFsaXplRm9ybWF0dGVycyh7XG4gICAgICBldmVudEJyb2FkY2FzdGVyLFxuICAgICAgZm9ybWF0T3B0aW9uczogY29uZmlndXJhdGlvbi5mb3JtYXRPcHRpb25zLFxuICAgICAgZm9ybWF0czogY29uZmlndXJhdGlvbi5mb3JtYXRzLFxuICAgICAgc3VwcG9ydENvZGVMaWJyYXJ5LFxuICAgIH0pXG4gICAgY29uc3QgdGVzdENhc2VzID0gYXdhaXQgZ2V0VGVzdENhc2VzRnJvbUZpbGVzeXN0ZW0oe1xuICAgICAgY3dkOiB0aGlzLmN3ZCxcbiAgICAgIGV2ZW50QnJvYWRjYXN0ZXIsXG4gICAgICBmZWF0dXJlRGVmYXVsdExhbmd1YWdlOiBjb25maWd1cmF0aW9uLmZlYXR1cmVEZWZhdWx0TGFuZ3VhZ2UsXG4gICAgICBmZWF0dXJlUGF0aHM6IGNvbmZpZ3VyYXRpb24uZmVhdHVyZVBhdGhzLFxuICAgICAgcGlja2xlRmlsdGVyOiBuZXcgUGlja2xlRmlsdGVyKGNvbmZpZ3VyYXRpb24ucGlja2xlRmlsdGVyT3B0aW9ucyksXG4gICAgfSlcbiAgICBsZXQgc3VjY2Vzc1xuICAgIGlmIChjb25maWd1cmF0aW9uLnBhcmFsbGVsKSB7XG4gICAgICBjb25zdCBwYXJhbGxlbFJ1bnRpbWVNYXN0ZXIgPSBuZXcgUGFyYWxsZWxSdW50aW1lTWFzdGVyKHtcbiAgICAgICAgZXZlbnRCcm9hZGNhc3RlcixcbiAgICAgICAgb3B0aW9uczogY29uZmlndXJhdGlvbi5ydW50aW1lT3B0aW9ucyxcbiAgICAgICAgc3VwcG9ydENvZGVQYXRoczogY29uZmlndXJhdGlvbi5zdXBwb3J0Q29kZVBhdGhzLFxuICAgICAgICBzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlczogY29uZmlndXJhdGlvbi5zdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcyxcbiAgICAgICAgdGVzdENhc2VzLFxuICAgICAgfSlcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBwYXJhbGxlbFJ1bnRpbWVNYXN0ZXIucnVuKGNvbmZpZ3VyYXRpb24ucGFyYWxsZWwsIHMgPT4ge1xuICAgICAgICAgIHN1Y2Nlc3MgPSBzXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBydW50aW1lID0gbmV3IFJ1bnRpbWUoe1xuICAgICAgICBldmVudEJyb2FkY2FzdGVyLFxuICAgICAgICBvcHRpb25zOiBjb25maWd1cmF0aW9uLnJ1bnRpbWVPcHRpb25zLFxuICAgICAgICBzdXBwb3J0Q29kZUxpYnJhcnksXG4gICAgICAgIHRlc3RDYXNlcyxcbiAgICAgIH0pXG4gICAgICBzdWNjZXNzID0gYXdhaXQgcnVudGltZS5zdGFydCgpXG4gICAgfVxuICAgIGF3YWl0IGNsZWFudXAoKVxuICAgIHJldHVybiB7XG4gICAgICBzaG91bGRFeGl0SW1tZWRpYXRlbHk6IGNvbmZpZ3VyYXRpb24uc2hvdWxkRXhpdEltbWVkaWF0ZWx5LFxuICAgICAgc3VjY2VzcyxcbiAgICB9XG4gIH1cbn1cbiJdfQ==