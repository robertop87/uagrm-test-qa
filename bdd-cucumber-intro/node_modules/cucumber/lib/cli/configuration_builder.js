'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _argv_parser = require('./argv_parser');

var _argv_parser2 = _interopRequireDefault(_argv_parser);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _option_splitter = require('./option_splitter');

var _option_splitter2 = _interopRequireDefault(_option_splitter);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globP = (0, _bluebird.promisify)(_glob2.default);

var ConfigurationBuilder = function () {
  (0, _createClass3.default)(ConfigurationBuilder, null, [{
    key: 'build',
    value: function () {
      var _ref = (0, _bluebird.coroutine)(function* (options) {
        var builder = new ConfigurationBuilder(options);
        return builder.build();
      });

      function build(_x) {
        return _ref.apply(this, arguments);
      }

      return build;
    }()
  }]);

  function ConfigurationBuilder(_ref2) {
    var argv = _ref2.argv,
        cwd = _ref2.cwd;
    (0, _classCallCheck3.default)(this, ConfigurationBuilder);

    this.cwd = cwd;

    var parsedArgv = _argv_parser2.default.parse(argv);
    this.args = parsedArgv.args;
    this.options = parsedArgv.options;
  }

  (0, _createClass3.default)(ConfigurationBuilder, [{
    key: 'build',
    value: function () {
      var _ref3 = (0, _bluebird.coroutine)(function* () {
        var listI18nKeywordsFor = this.options.i18nKeywords;
        var listI18nLanguages = !!this.options.i18nLanguages;
        var unexpandedFeaturePaths = yield this.getUnexpandedFeaturePaths();
        var featurePaths = [];
        var supportCodePaths = [];
        if (!listI18nKeywordsFor && !listI18nLanguages) {
          featurePaths = yield this.expandFeaturePaths(unexpandedFeaturePaths);
          var unexpandedSupportCodePaths = this.options.require;
          if (unexpandedSupportCodePaths.length === 0) {
            unexpandedSupportCodePaths = this.getFeatureDirectoryPaths(featurePaths);
          }
          supportCodePaths = yield this.expandPaths(unexpandedSupportCodePaths, '.js');
        }
        return {
          featureDefaultLanguage: this.options.language,
          featurePaths: featurePaths,
          formats: this.getFormats(),
          formatOptions: this.getFormatOptions(),
          listI18nKeywordsFor: listI18nKeywordsFor,
          listI18nLanguages: listI18nLanguages,
          parallel: this.options.parallel,
          profiles: this.options.profile,
          pickleFilterOptions: {
            featurePaths: unexpandedFeaturePaths,
            names: this.options.name,
            tagExpression: this.options.tags
          },
          runtimeOptions: {
            dryRun: !!this.options.dryRun,
            failFast: !!this.options.failFast,
            filterStacktraces: !this.options.backtrace,
            strict: !!this.options.strict,
            worldParameters: this.options.worldParameters
          },
          shouldExitImmediately: !!this.options.exit,
          supportCodePaths: supportCodePaths,
          supportCodeRequiredModules: this.options.requireModule
        };
      });

      function build() {
        return _ref3.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: 'expandPaths',
    value: function () {
      var _ref4 = (0, _bluebird.coroutine)(function* (unexpandedPaths, defaultExtension) {
        var _this = this;

        var expandedPaths = yield _bluebird2.default.map(unexpandedPaths, function () {
          var _ref5 = (0, _bluebird.coroutine)(function* (unexpandedPath) {
            var matches = yield globP(unexpandedPath, {
              absolute: true,
              cwd: _this.cwd
            });
            return _bluebird2.default.map(matches, function () {
              var _ref6 = (0, _bluebird.coroutine)(function* (match) {
                if (_path2.default.extname(match) === '') {
                  return globP(match + '/**/*' + defaultExtension);
                }
                return match;
              });

              return function (_x5) {
                return _ref6.apply(this, arguments);
              };
            }());
          });

          return function (_x4) {
            return _ref5.apply(this, arguments);
          };
        }());
        return _lodash2.default.flattenDepth(expandedPaths, 2).map(function (x) {
          return _path2.default.normalize(x);
        });
      });

      function expandPaths(_x2, _x3) {
        return _ref4.apply(this, arguments);
      }

      return expandPaths;
    }()
  }, {
    key: 'expandFeaturePaths',
    value: function () {
      var _ref7 = (0, _bluebird.coroutine)(function* (featurePaths) {
        featurePaths = featurePaths.map(function (p) {
          return p.replace(/(:\d+)*$/g, '');
        }); // Strip line numbers
        return this.expandPaths(featurePaths, '.feature');
      });

      function expandFeaturePaths(_x6) {
        return _ref7.apply(this, arguments);
      }

      return expandFeaturePaths;
    }()
  }, {
    key: 'getFeatureDirectoryPaths',
    value: function getFeatureDirectoryPaths(featurePaths) {
      var _this2 = this;

      var featureDirs = featurePaths.map(function (featurePath) {
        var featureDir = _path2.default.dirname(featurePath);
        var childDir = void 0;
        var parentDir = featureDir;
        while (childDir !== parentDir) {
          childDir = parentDir;
          parentDir = _path2.default.dirname(childDir);
          if (_path2.default.basename(parentDir) === 'features') {
            featureDir = parentDir;
            break;
          }
        }
        return _path2.default.relative(_this2.cwd, featureDir);
      });
      return _lodash2.default.uniq(featureDirs);
    }
  }, {
    key: 'getFormatOptions',
    value: function getFormatOptions() {
      var formatOptions = _lodash2.default.clone(this.options.formatOptions);
      formatOptions.cwd = this.cwd;
      _lodash2.default.defaults(formatOptions, { colorsEnabled: true });
      return formatOptions;
    }
  }, {
    key: 'getFormats',
    value: function getFormats() {
      var mapping = { '': 'progress' };
      this.options.format.forEach(function (format) {
        var _OptionSplitter$split = _option_splitter2.default.split(format),
            _OptionSplitter$split2 = (0, _slicedToArray3.default)(_OptionSplitter$split, 2),
            type = _OptionSplitter$split2[0],
            outputTo = _OptionSplitter$split2[1];

        mapping[outputTo || ''] = type;
      });
      return _lodash2.default.map(mapping, function (type, outputTo) {
        return { outputTo: outputTo, type: type };
      });
    }
  }, {
    key: 'getUnexpandedFeaturePaths',
    value: function () {
      var _ref8 = (0, _bluebird.coroutine)(function* () {
        var _this3 = this;

        if (this.args.length > 0) {
          var nestedFeaturePaths = yield _bluebird2.default.map(this.args, function () {
            var _ref9 = (0, _bluebird.coroutine)(function* (arg) {
              var filename = _path2.default.basename(arg);
              if (filename[0] === '@') {
                var filePath = _path2.default.join(_this3.cwd, arg);
                var content = yield _fs2.default.readFile(filePath, 'utf8');
                return _lodash2.default.chain(content).split('\n').map(_lodash2.default.trim).compact().value();
              }
              return arg;
            });

            return function (_x7) {
              return _ref9.apply(this, arguments);
            };
          }());
          var featurePaths = _lodash2.default.flatten(nestedFeaturePaths);
          if (featurePaths.length > 0) {
            return featurePaths;
          }
        }
        return ['features/**/*.feature'];
      });

      function getUnexpandedFeaturePaths() {
        return _ref8.apply(this, arguments);
      }

      return getUnexpandedFeaturePaths;
    }()
  }]);
  return ConfigurationBuilder;
}();

exports.default = ConfigurationBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY29uZmlndXJhdGlvbl9idWlsZGVyLmpzIl0sIm5hbWVzIjpbImdsb2JQIiwiQ29uZmlndXJhdGlvbkJ1aWxkZXIiLCJvcHRpb25zIiwiYnVpbGRlciIsImJ1aWxkIiwiYXJndiIsImN3ZCIsInBhcnNlZEFyZ3YiLCJwYXJzZSIsImFyZ3MiLCJsaXN0STE4bktleXdvcmRzRm9yIiwiaTE4bktleXdvcmRzIiwibGlzdEkxOG5MYW5ndWFnZXMiLCJpMThuTGFuZ3VhZ2VzIiwidW5leHBhbmRlZEZlYXR1cmVQYXRocyIsImdldFVuZXhwYW5kZWRGZWF0dXJlUGF0aHMiLCJmZWF0dXJlUGF0aHMiLCJzdXBwb3J0Q29kZVBhdGhzIiwiZXhwYW5kRmVhdHVyZVBhdGhzIiwidW5leHBhbmRlZFN1cHBvcnRDb2RlUGF0aHMiLCJyZXF1aXJlIiwibGVuZ3RoIiwiZ2V0RmVhdHVyZURpcmVjdG9yeVBhdGhzIiwiZXhwYW5kUGF0aHMiLCJmZWF0dXJlRGVmYXVsdExhbmd1YWdlIiwibGFuZ3VhZ2UiLCJmb3JtYXRzIiwiZ2V0Rm9ybWF0cyIsImZvcm1hdE9wdGlvbnMiLCJnZXRGb3JtYXRPcHRpb25zIiwicGFyYWxsZWwiLCJwcm9maWxlcyIsInByb2ZpbGUiLCJwaWNrbGVGaWx0ZXJPcHRpb25zIiwibmFtZXMiLCJuYW1lIiwidGFnRXhwcmVzc2lvbiIsInRhZ3MiLCJydW50aW1lT3B0aW9ucyIsImRyeVJ1biIsImZhaWxGYXN0IiwiZmlsdGVyU3RhY2t0cmFjZXMiLCJiYWNrdHJhY2UiLCJzdHJpY3QiLCJ3b3JsZFBhcmFtZXRlcnMiLCJzaG91bGRFeGl0SW1tZWRpYXRlbHkiLCJleGl0Iiwic3VwcG9ydENvZGVSZXF1aXJlZE1vZHVsZXMiLCJyZXF1aXJlTW9kdWxlIiwidW5leHBhbmRlZFBhdGhzIiwiZGVmYXVsdEV4dGVuc2lvbiIsImV4cGFuZGVkUGF0aHMiLCJtYXAiLCJ1bmV4cGFuZGVkUGF0aCIsIm1hdGNoZXMiLCJhYnNvbHV0ZSIsIm1hdGNoIiwiZXh0bmFtZSIsImZsYXR0ZW5EZXB0aCIsIm5vcm1hbGl6ZSIsIngiLCJwIiwicmVwbGFjZSIsImZlYXR1cmVEaXJzIiwiZmVhdHVyZURpciIsImRpcm5hbWUiLCJmZWF0dXJlUGF0aCIsImNoaWxkRGlyIiwicGFyZW50RGlyIiwiYmFzZW5hbWUiLCJyZWxhdGl2ZSIsInVuaXEiLCJjbG9uZSIsImRlZmF1bHRzIiwiY29sb3JzRW5hYmxlZCIsIm1hcHBpbmciLCJmb3JtYXQiLCJmb3JFYWNoIiwic3BsaXQiLCJ0eXBlIiwib3V0cHV0VG8iLCJuZXN0ZWRGZWF0dXJlUGF0aHMiLCJhcmciLCJmaWxlbmFtZSIsImZpbGVQYXRoIiwiam9pbiIsImNvbnRlbnQiLCJyZWFkRmlsZSIsImNoYWluIiwidHJpbSIsImNvbXBhY3QiLCJ2YWx1ZSIsImZsYXR0ZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBLElBQU1BLFFBQVEsd0NBQWQ7O0lBRXFCQyxvQjs7OztxREFDQUMsTyxFQUFTO0FBQzFCLFlBQU1DLFVBQVUsSUFBSUYsb0JBQUosQ0FBeUJDLE9BQXpCLENBQWhCO0FBQ0EsZUFBT0MsUUFBUUMsS0FBUixFQUFQO0FBQ0QsTzs7Ozs7Ozs7OztBQUVELHVDQUEyQjtBQUFBLFFBQWJDLElBQWEsU0FBYkEsSUFBYTtBQUFBLFFBQVBDLEdBQU8sU0FBUEEsR0FBTztBQUFBOztBQUN6QixTQUFLQSxHQUFMLEdBQVdBLEdBQVg7O0FBRUEsUUFBTUMsYUFBYSxzQkFBV0MsS0FBWCxDQUFpQkgsSUFBakIsQ0FBbkI7QUFDQSxTQUFLSSxJQUFMLEdBQVlGLFdBQVdFLElBQXZCO0FBQ0EsU0FBS1AsT0FBTCxHQUFlSyxXQUFXTCxPQUExQjtBQUNEOzs7Ozt3REFFYTtBQUNaLFlBQU1RLHNCQUFzQixLQUFLUixPQUFMLENBQWFTLFlBQXpDO0FBQ0EsWUFBTUMsb0JBQW9CLENBQUMsQ0FB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a0JmLG9CIiwiZmlsZSI6ImNvbmZpZ3VyYXRpb25fYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBBcmd2UGFyc2VyIGZyb20gJy4vYXJndl9wYXJzZXInXG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IE9wdGlvblNwbGl0dGVyIGZyb20gJy4vb3B0aW9uX3NwbGl0dGVyJ1xuaW1wb3J0IFByb21pc2UsIHsgcHJvbWlzaWZ5IH0gZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJ1xuXG5jb25zdCBnbG9iUCA9IHByb21pc2lmeShnbG9iKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maWd1cmF0aW9uQnVpbGRlciB7XG4gIHN0YXRpYyBhc3luYyBidWlsZChvcHRpb25zKSB7XG4gICAgY29uc3QgYnVpbGRlciA9IG5ldyBDb25maWd1cmF0aW9uQnVpbGRlcihvcHRpb25zKVxuICAgIHJldHVybiBidWlsZGVyLmJ1aWxkKClcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgYXJndiwgY3dkIH0pIHtcbiAgICB0aGlzLmN3ZCA9IGN3ZFxuXG4gICAgY29uc3QgcGFyc2VkQXJndiA9IEFyZ3ZQYXJzZXIucGFyc2UoYXJndilcbiAgICB0aGlzLmFyZ3MgPSBwYXJzZWRBcmd2LmFyZ3NcbiAgICB0aGlzLm9wdGlvbnMgPSBwYXJzZWRBcmd2Lm9wdGlvbnNcbiAgfVxuXG4gIGFzeW5jIGJ1aWxkKCkge1xuICAgIGNvbnN0IGxpc3RJMThuS2V5d29yZHNGb3IgPSB0aGlzLm9wdGlvbnMuaTE4bktleXdvcmRzXG4gICAgY29uc3QgbGlzdEkxOG5MYW5ndWFnZXMgPSAhIXRoaXMub3B0aW9ucy5pMThuTGFuZ3VhZ2VzXG4gICAgY29uc3QgdW5leHBhbmRlZEZlYXR1cmVQYXRocyA9IGF3YWl0IHRoaXMuZ2V0VW5leHBhbmRlZEZlYXR1cmVQYXRocygpXG4gICAgbGV0IGZlYXR1cmVQYXRocyA9IFtdXG4gICAgbGV0IHN1cHBvcnRDb2RlUGF0aHMgPSBbXVxuICAgIGlmICghbGlzdEkxOG5LZXl3b3Jkc0ZvciAmJiAhbGlzdEkxOG5MYW5ndWFnZXMpIHtcbiAgICAgIGZlYXR1cmVQYXRocyA9IGF3YWl0IHRoaXMuZXhwYW5kRmVhdHVyZVBhdGhzKHVuZXhwYW5kZWRGZWF0dXJlUGF0aHMpXG4gICAgICBsZXQgdW5leHBhbmRlZFN1cHBvcnRDb2RlUGF0aHMgPSB0aGlzLm9wdGlvbnMucmVxdWlyZVxuICAgICAgaWYgKHVuZXhwYW5kZWRTdXBwb3J0Q29kZVBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB1bmV4cGFuZGVkU3VwcG9ydENvZGVQYXRocyA9IHRoaXMuZ2V0RmVhdHVyZURpcmVjdG9yeVBhdGhzKGZlYXR1cmVQYXRocylcbiAgICAgIH1cbiAgICAgIHN1cHBvcnRDb2RlUGF0aHMgPSBhd2FpdCB0aGlzLmV4cGFuZFBhdGhzKFxuICAgICAgICB1bmV4cGFuZGVkU3VwcG9ydENvZGVQYXRocyxcbiAgICAgICAgJy5qcydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGZlYXR1cmVEZWZhdWx0TGFuZ3VhZ2U6IHRoaXMub3B0aW9ucy5sYW5ndWFnZSxcbiAgICAgIGZlYXR1cmVQYXRocyxcbiAgICAgIGZvcm1hdHM6IHRoaXMuZ2V0Rm9ybWF0cygpLFxuICAgICAgZm9ybWF0T3B0aW9uczogdGhpcy5nZXRGb3JtYXRPcHRpb25zKCksXG4gICAgICBsaXN0STE4bktleXdvcmRzRm9yLFxuICAgICAgbGlzdEkxOG5MYW5ndWFnZXMsXG4gICAgICBwYXJhbGxlbDogdGhpcy5vcHRpb25zLnBhcmFsbGVsLFxuICAgICAgcHJvZmlsZXM6IHRoaXMub3B0aW9ucy5wcm9maWxlLFxuICAgICAgcGlja2xlRmlsdGVyT3B0aW9uczoge1xuICAgICAgICBmZWF0dXJlUGF0aHM6IHVuZXhwYW5kZWRGZWF0dXJlUGF0aHMsXG4gICAgICAgIG5hbWVzOiB0aGlzLm9wdGlvbnMubmFtZSxcbiAgICAgICAgdGFnRXhwcmVzc2lvbjogdGhpcy5vcHRpb25zLnRhZ3MsXG4gICAgICB9LFxuICAgICAgcnVudGltZU9wdGlvbnM6IHtcbiAgICAgICAgZHJ5UnVuOiAhIXRoaXMub3B0aW9ucy5kcnlSdW4sXG4gICAgICAgIGZhaWxGYXN0OiAhIXRoaXMub3B0aW9ucy5mYWlsRmFzdCxcbiAgICAgICAgZmlsdGVyU3RhY2t0cmFjZXM6ICF0aGlzLm9wdGlvbnMuYmFja3RyYWNlLFxuICAgICAgICBzdHJpY3Q6ICEhdGhpcy5vcHRpb25zLnN0cmljdCxcbiAgICAgICAgd29ybGRQYXJhbWV0ZXJzOiB0aGlzLm9wdGlvbnMud29ybGRQYXJhbWV0ZXJzLFxuICAgICAgfSxcbiAgICAgIHNob3VsZEV4aXRJbW1lZGlhdGVseTogISF0aGlzLm9wdGlvbnMuZXhpdCxcbiAgICAgIHN1cHBvcnRDb2RlUGF0aHMsXG4gICAgICBzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlczogdGhpcy5vcHRpb25zLnJlcXVpcmVNb2R1bGUsXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZXhwYW5kUGF0aHModW5leHBhbmRlZFBhdGhzLCBkZWZhdWx0RXh0ZW5zaW9uKSB7XG4gICAgY29uc3QgZXhwYW5kZWRQYXRocyA9IGF3YWl0IFByb21pc2UubWFwKFxuICAgICAgdW5leHBhbmRlZFBhdGhzLFxuICAgICAgYXN5bmMgdW5leHBhbmRlZFBhdGggPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gYXdhaXQgZ2xvYlAodW5leHBhbmRlZFBhdGgsIHtcbiAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZSxcbiAgICAgICAgICBjd2Q6IHRoaXMuY3dkLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5tYXAobWF0Y2hlcywgYXN5bmMgbWF0Y2ggPT4ge1xuICAgICAgICAgIGlmIChwYXRoLmV4dG5hbWUobWF0Y2gpID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JQKGAke21hdGNofS8qKi8qJHtkZWZhdWx0RXh0ZW5zaW9ufWApXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXRjaFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIClcbiAgICByZXR1cm4gXy5mbGF0dGVuRGVwdGgoZXhwYW5kZWRQYXRocywgMikubWFwKHggPT4gcGF0aC5ub3JtYWxpemUoeCkpXG4gIH1cblxuICBhc3luYyBleHBhbmRGZWF0dXJlUGF0aHMoZmVhdHVyZVBhdGhzKSB7XG4gICAgZmVhdHVyZVBhdGhzID0gZmVhdHVyZVBhdGhzLm1hcChwID0+IHAucmVwbGFjZSgvKDpcXGQrKSokL2csICcnKSkgLy8gU3RyaXAgbGluZSBudW1iZXJzXG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kUGF0aHMoZmVhdHVyZVBhdGhzLCAnLmZlYXR1cmUnKVxuICB9XG5cbiAgZ2V0RmVhdHVyZURpcmVjdG9yeVBhdGhzKGZlYXR1cmVQYXRocykge1xuICAgIGNvbnN0IGZlYXR1cmVEaXJzID0gZmVhdHVyZVBhdGhzLm1hcChmZWF0dXJlUGF0aCA9PiB7XG4gICAgICBsZXQgZmVhdHVyZURpciA9IHBhdGguZGlybmFtZShmZWF0dXJlUGF0aClcbiAgICAgIGxldCBjaGlsZERpclxuICAgICAgbGV0IHBhcmVudERpciA9IGZlYXR1cmVEaXJcbiAgICAgIHdoaWxlIChjaGlsZERpciAhPT0gcGFyZW50RGlyKSB7XG4gICAgICAgIGNoaWxkRGlyID0gcGFyZW50RGlyXG4gICAgICAgIHBhcmVudERpciA9IHBhdGguZGlybmFtZShjaGlsZERpcilcbiAgICAgICAgaWYgKHBhdGguYmFzZW5hbWUocGFyZW50RGlyKSA9PT0gJ2ZlYXR1cmVzJykge1xuICAgICAgICAgIGZlYXR1cmVEaXIgPSBwYXJlbnREaXJcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aC5yZWxhdGl2ZSh0aGlzLmN3ZCwgZmVhdHVyZURpcilcbiAgICB9KVxuICAgIHJldHVybiBfLnVuaXEoZmVhdHVyZURpcnMpXG4gIH1cblxuICBnZXRGb3JtYXRPcHRpb25zKCkge1xuICAgIGNvbnN0IGZvcm1hdE9wdGlvbnMgPSBfLmNsb25lKHRoaXMub3B0aW9ucy5mb3JtYXRPcHRpb25zKVxuICAgIGZvcm1hdE9wdGlvbnMuY3dkID0gdGhpcy5jd2RcbiAgICBfLmRlZmF1bHRzKGZvcm1hdE9wdGlvbnMsIHsgY29sb3JzRW5hYmxlZDogdHJ1ZSB9KVxuICAgIHJldHVybiBmb3JtYXRPcHRpb25zXG4gIH1cblxuICBnZXRGb3JtYXRzKCkge1xuICAgIGNvbnN0IG1hcHBpbmcgPSB7ICcnOiAncHJvZ3Jlc3MnIH1cbiAgICB0aGlzLm9wdGlvbnMuZm9ybWF0LmZvckVhY2goZm9ybWF0ID0+IHtcbiAgICAgIGNvbnN0IFt0eXBlLCBvdXRwdXRUb10gPSBPcHRpb25TcGxpdHRlci5zcGxpdChmb3JtYXQpXG4gICAgICBtYXBwaW5nW291dHB1dFRvIHx8ICcnXSA9IHR5cGVcbiAgICB9KVxuICAgIHJldHVybiBfLm1hcChtYXBwaW5nLCAodHlwZSwgb3V0cHV0VG8pID0+ICh7IG91dHB1dFRvLCB0eXBlIH0pKVxuICB9XG5cbiAgYXN5bmMgZ2V0VW5leHBhbmRlZEZlYXR1cmVQYXRocygpIHtcbiAgICBpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5lc3RlZEZlYXR1cmVQYXRocyA9IGF3YWl0IFByb21pc2UubWFwKHRoaXMuYXJncywgYXN5bmMgYXJnID0+IHtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGFyZylcbiAgICAgICAgaWYgKGZpbGVuYW1lWzBdID09PSAnQCcpIHtcbiAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbih0aGlzLmN3ZCwgYXJnKVxuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5yZWFkRmlsZShmaWxlUGF0aCwgJ3V0ZjgnKVxuICAgICAgICAgIHJldHVybiBfLmNoYWluKGNvbnRlbnQpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAubWFwKF8udHJpbSlcbiAgICAgICAgICAgIC5jb21wYWN0KClcbiAgICAgICAgICAgIC52YWx1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyZ1xuICAgICAgfSlcbiAgICAgIGNvbnN0IGZlYXR1cmVQYXRocyA9IF8uZmxhdHRlbihuZXN0ZWRGZWF0dXJlUGF0aHMpXG4gICAgICBpZiAoZmVhdHVyZVBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVQYXRoc1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWydmZWF0dXJlcy8qKi8qLmZlYXR1cmUnXVxuICB9XG59XG4iXX0=