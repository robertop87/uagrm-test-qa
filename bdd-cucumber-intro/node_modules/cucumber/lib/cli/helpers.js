'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTestCases = exports.getTestCasesFromFilesystem = exports.getExpandedArgv = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var getExpandedArgv = exports.getExpandedArgv = function () {
  var _ref2 = (0, _bluebird.coroutine)(function* (_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd;

    var _ArgvParser$parse = _argv_parser2.default.parse(argv),
        options = _ArgvParser$parse.options;

    var fullArgv = argv;
    var profileArgv = yield new _profile_loader2.default(cwd).getArgv(options.profile);
    if (profileArgv.length > 0) {
      fullArgv = _lodash2.default.concat(argv.slice(0, 2), profileArgv, argv.slice(2));
    }
    return fullArgv;
  });

  return function getExpandedArgv(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getTestCasesFromFilesystem = exports.getTestCasesFromFilesystem = function () {
  var _ref4 = (0, _bluebird.coroutine)(function* (_ref3) {
    var cwd = _ref3.cwd,
        eventBroadcaster = _ref3.eventBroadcaster,
        featureDefaultLanguage = _ref3.featureDefaultLanguage,
        featurePaths = _ref3.featurePaths,
        pickleFilter = _ref3.pickleFilter;

    var result = [];
    yield _bluebird2.default.each(featurePaths, function () {
      var _ref5 = (0, _bluebird.coroutine)(function* (featurePath) {
        var source = yield _fs2.default.readFile(featurePath, 'utf8');
        result = result.concat((yield getTestCases({
          eventBroadcaster: eventBroadcaster,
          language: featureDefaultLanguage,
          source: source,
          pickleFilter: pickleFilter,
          uri: _path2.default.relative(cwd, featurePath)
        })));
      });

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
    return result;
  });

  return function getTestCasesFromFilesystem(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var getTestCases = exports.getTestCases = function () {
  var _ref7 = (0, _bluebird.coroutine)(function* (_ref6) {
    var eventBroadcaster = _ref6.eventBroadcaster,
        language = _ref6.language,
        pickleFilter = _ref6.pickleFilter,
        source = _ref6.source,
        uri = _ref6.uri;

    var result = [];
    var events = _gherkin2.default.generateEvents(source, uri, {}, language);
    events.forEach(function (event) {
      eventBroadcaster.emit(event.type, _lodash2.default.omit(event, 'type'));
      if (event.type === 'pickle') {
        var pickle = event.pickle;

        if (pickleFilter.matches({ pickle: pickle, uri: uri })) {
          eventBroadcaster.emit('pickle-accepted', { pickle: pickle, uri: uri });
          result.push({ pickle: pickle, uri: uri });
        } else {
          eventBroadcaster.emit('pickle-rejected', { pickle: pickle, uri: uri });
        }
      }
      if (event.type === 'attachment') {
        throw new Error(event.data);
      }
    });
    return result;
  });

  return function getTestCases(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _argv_parser = require('./argv_parser');

var _argv_parser2 = _interopRequireDefault(_argv_parser);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _gherkin = require('gherkin');

var _gherkin2 = _interopRequireDefault(_gherkin);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _profile_loader = require('./profile_loader');

var _profile_loader2 = _interopRequireDefault(_profile_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaGVscGVycy5qcyJdLCJuYW1lcyI6WyJhcmd2IiwiY3dkIiwicGFyc2UiLCJvcHRpb25zIiwiZnVsbEFyZ3YiLCJwcm9maWxlQXJndiIsImdldEFyZ3YiLCJwcm9maWxlIiwibGVuZ3RoIiwiY29uY2F0Iiwic2xpY2UiLCJnZXRFeHBhbmRlZEFyZ3YiLCJldmVudEJyb2FkY2FzdGVyIiwiZmVhdHVyZURlZmF1bHRMYW5ndWFnZSIsImZlYXR1cmVQYXRocyIsInBpY2tsZUZpbHRlciIsInJlc3VsdCIsImVhY2giLCJmZWF0dXJlUGF0aCIsInNvdXJjZSIsInJlYWRGaWxlIiwiZ2V0VGVzdENhc2VzIiwibGFuZ3VhZ2UiLCJ1cmkiLCJyZWxhdGl2ZSIsImdldFRlc3RDYXNlc0Zyb21GaWxlc3lzdGVtIiwiZXZlbnRzIiwiZ2VuZXJhdGVFdmVudHMiLCJmb3JFYWNoIiwiZW1pdCIsImV2ZW50IiwidHlwZSIsIm9taXQiLCJwaWNrbGUiLCJtYXRjaGVzIiwicHVzaCIsIkVycm9yIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3VDQVFPLGlCQUE4QztBQUFBLFFBQWJBLElBQWEsUUFBYkEsSUFBYTtBQUFBLFFBQVBDLEdBQU8sUUFBUEEsR0FBTzs7QUFBQSw0QkFDL0Isc0JBQVdDLEtBQVgsQ0FBaUJGLElBQWpCLENBRCtCO0FBQUEsUUFDM0NHLE9BRDJDLHFCQUMzQ0EsT0FEMkM7O0FBRW5ELFFBQUlDLFdBQVdKLElBQWY7QUFDQSxRQUFNSyxjQUFjLE1BQU0sNkJBQWtCSixHQUFsQixFQUF1QkssT0FBdkIsQ0FBK0JILFFBQVFJLE9BQXZDLENBQTFCO0FBQ0EsUUFBSUYsWUFBWUcsTUFBWixHQUFxQixDQUF6QixFQUE0QjtBQUMxQkosaUJBQVcsaUJBQUVLLE1BQUYsQ0FBU1QsS0FBS1UsS0FBTCxDQUFXLENBQVgsRUFBYyxDQUFkLENBQVQsRUFBMkJMLFdBQTNCLEVBQXdDTCxLQUFLVSxLQUFMLENBQVcsQ0FBWCxDQUF4QyxDQUFYO0FBQ0Q7QUFDRCxXQUFPTixRQUFQO0FBQ0QsRzs7a0JBUnFCTyxlOzs7Ozs7dUNBVWYsa0JBTUo7QUFBQSxRQUxEVixHQUtDLFNBTERBLEdBS0M7QUFBQSxRQUpEVyxnQkFJQyxTQUpEQSxnQkFJQztBQUFBLFFBSERDLHNCQUdDLFNBSERBLHNCQUdDO0FBQUEsUUFGREMsWUFFQyxTQUZEQSxZQUVDO0FBQUEsUUFEREMsWUFDQyxTQUREQSxZQUNDOztBQUNELFFBQUlDLFNBQVMsRUFBYjtBQUNBLFVBQU0sbUJBQVFDLElBQVIsQ0FBYUgsWUFBYjtBQUFBLDJDQUEyQixXQUFNSSxXQUFOLEVBQXFCO0FBQ3BELFlBQU1DLFNBQVMsTUFBTSxhQUFHQyxRQUFILENBQVlGLFdBQVosRUFBeUIsTUFBekIsQ0FBckI7QUFDQUYsaUJBQVNBLE9BQU9QLE1BQVAsRUFDUCxNQUFNWSxhQUFhO0FBQ2pCVCw0Q0FEaUI7QUFFakJVLG9CQUFVVCxzQkFGTztBQUdqQk0sd0JBSGlCO0FBSWpCSixvQ0FKaUI7QUFLakJRLGVBQUssZUFBS0MsUUFBTCxDQUFjdkIsR0FBZCxFQUFtQmlCLFdBQW5CO0FBTFksU0FBYixDQURDLEVBQVQ7QUFTRCxPQVhLOztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQU47QUFZQSxXQUFPRixNQUFQO0FBQ0QsRzs7a0JBckJxQlMsMEI7Ozs7Ozt1Q0F1QmYsa0JBTUo7QUFBQSxRQUxEYixnQkFLQyxTQUxEQSxnQkFLQztBQUFBLFFBSkRVLFFBSUMsU0FKREEsUUFJQztBQUFBLFFBSERQLFlBR0MsU0FIREEsWUFHQztBQUFBLFFBRkRJLE1BRUMsU0FGREEsTUFFQztBQUFBLFFBRERJLEdBQ0MsU0FEREEsR0FDQzs7QUFDRCxRQUFNUCxTQUFTLEVBQWY7QUFDQSxRQUFNVSxTQUFTLGtCQUFRQyxjQUFSLENBQXVCUixNQUF2QixFQUErQkksR0FBL0IsRUFBb0MsRUFBcEMsRUFBd0NELFFBQXhDLENBQWY7QUFDQUksV0FBT0UsT0FBUCxDQUFlLGlCQUFTO0FBQ3RCaEIsdUJBQWlCaUIsSUFBakIsQ0FBc0JDLE1BQU1DLElBQTVCLEVBQWtDLGlCQUFFQyxJQUFGLENBQU9GLEtBQVAsRUFBYyxNQUFkLENBQWxDO0FBQ0EsVUFBSUEsTUFBTUMsSUFBTixLQUFlLFFBQW5CLEVBQTZCO0FBQUEsWUFDbkJFLE1BRG1CLEdBQ1JILEtBRFEsQ0FDbkJHLE1BRG1COztBQUUzQixZQUFJbEIsYUFBYW1CLE9BQWIsQ0FBcUIsRUFBRUQsY0FBRixFQUFVVixRQUFWLEVBQXJCLENBQUosRUFBMkM7QUFDekNYLDJCQUFpQmlCLElBQWpCLENBQXNCLGlCQUF0QixFQUF5QyxFQUFFSSxjQUFGLEVBQVVWLFFBQVYsRUFBekM7QUFDQVAsaUJBQU9tQixJQUFQLENBQVksRUFBRUYsY0FBRixFQUFVVixRQUFWLEVBQVo7QUFDRCxTQUhELE1BR087QUFDTFgsMkJBQWlCaUIsSUFBakIsQ0FBc0IsaUJBQXRCLEVBQXlDLEVBQUVJLGNBQUYsRUFBVVYsUUFBVixFQUF6QztBQUNEO0FBQ0Y7QUFDRCxVQUFJTyxNQUFNQyxJQUFOLEtBQWUsWUFBbkIsRUFBaUM7QUFDL0IsY0FBTSxJQUFJSyxLQUFKLENBQVVOLE1BQU1PLElBQWhCLENBQU47QUFDRDtBQUNGLEtBZEQ7QUFlQSxXQUFPckIsTUFBUDtBQUNELEc7O2tCQXpCcUJLLFk7Ozs7O0FBekN0Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0EiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBBcmd2UGFyc2VyIGZyb20gJy4vYXJndl9wYXJzZXInXG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnXG5pbXBvcnQgR2hlcmtpbiBmcm9tICdnaGVya2luJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBQcm9maWxlTG9hZGVyIGZyb20gJy4vcHJvZmlsZV9sb2FkZXInXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEV4cGFuZGVkQXJndih7IGFyZ3YsIGN3ZCB9KSB7XG4gIGNvbnN0IHsgb3B0aW9ucyB9ID0gQXJndlBhcnNlci5wYXJzZShhcmd2KVxuICBsZXQgZnVsbEFyZ3YgPSBhcmd2XG4gIGNvbnN0IHByb2ZpbGVBcmd2ID0gYXdhaXQgbmV3IFByb2ZpbGVMb2FkZXIoY3dkKS5nZXRBcmd2KG9wdGlvbnMucHJvZmlsZSlcbiAgaWYgKHByb2ZpbGVBcmd2Lmxlbmd0aCA+IDApIHtcbiAgICBmdWxsQXJndiA9IF8uY29uY2F0KGFyZ3Yuc2xpY2UoMCwgMiksIHByb2ZpbGVBcmd2LCBhcmd2LnNsaWNlKDIpKVxuICB9XG4gIHJldHVybiBmdWxsQXJndlxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VGVzdENhc2VzRnJvbUZpbGVzeXN0ZW0oe1xuICBjd2QsXG4gIGV2ZW50QnJvYWRjYXN0ZXIsXG4gIGZlYXR1cmVEZWZhdWx0TGFuZ3VhZ2UsXG4gIGZlYXR1cmVQYXRocyxcbiAgcGlja2xlRmlsdGVyLFxufSkge1xuICBsZXQgcmVzdWx0ID0gW11cbiAgYXdhaXQgUHJvbWlzZS5lYWNoKGZlYXR1cmVQYXRocywgYXN5bmMgZmVhdHVyZVBhdGggPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IGF3YWl0IGZzLnJlYWRGaWxlKGZlYXR1cmVQYXRoLCAndXRmOCcpXG4gICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChcbiAgICAgIGF3YWl0IGdldFRlc3RDYXNlcyh7XG4gICAgICAgIGV2ZW50QnJvYWRjYXN0ZXIsXG4gICAgICAgIGxhbmd1YWdlOiBmZWF0dXJlRGVmYXVsdExhbmd1YWdlLFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIHBpY2tsZUZpbHRlcixcbiAgICAgICAgdXJpOiBwYXRoLnJlbGF0aXZlKGN3ZCwgZmVhdHVyZVBhdGgpLFxuICAgICAgfSlcbiAgICApXG4gIH0pXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlc3RDYXNlcyh7XG4gIGV2ZW50QnJvYWRjYXN0ZXIsXG4gIGxhbmd1YWdlLFxuICBwaWNrbGVGaWx0ZXIsXG4gIHNvdXJjZSxcbiAgdXJpLFxufSkge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBjb25zdCBldmVudHMgPSBHaGVya2luLmdlbmVyYXRlRXZlbnRzKHNvdXJjZSwgdXJpLCB7fSwgbGFuZ3VhZ2UpXG4gIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICBldmVudEJyb2FkY2FzdGVyLmVtaXQoZXZlbnQudHlwZSwgXy5vbWl0KGV2ZW50LCAndHlwZScpKVxuICAgIGlmIChldmVudC50eXBlID09PSAncGlja2xlJykge1xuICAgICAgY29uc3QgeyBwaWNrbGUgfSA9IGV2ZW50XG4gICAgICBpZiAocGlja2xlRmlsdGVyLm1hdGNoZXMoeyBwaWNrbGUsIHVyaSB9KSkge1xuICAgICAgICBldmVudEJyb2FkY2FzdGVyLmVtaXQoJ3BpY2tsZS1hY2NlcHRlZCcsIHsgcGlja2xlLCB1cmkgfSlcbiAgICAgICAgcmVzdWx0LnB1c2goeyBwaWNrbGUsIHVyaSB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnRCcm9hZGNhc3Rlci5lbWl0KCdwaWNrbGUtcmVqZWN0ZWQnLCB7IHBpY2tsZSwgdXJpIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChldmVudC50eXBlID09PSAnYXR0YWNobWVudCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihldmVudC5kYXRhKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuIl19