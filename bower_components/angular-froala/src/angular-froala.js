angular.module('froala', []).
value('froalaConfig', {})
.directive('froala', ['froalaConfig', function (froalaConfig) {
    "use strict"; //Scope strict mode to only this directive
    var generatedIds = 0;
    var defaultConfig = {
        immediateAngularModelUpdate: false,
        angularIgnoreAttrs: null
    };

    var innerHtmlAttr = 'innerHTML';

    var scope = {
        froalaOptions: '=froala',
        initFunction: '&froalaInit'
    };

    froalaConfig = froalaConfig || {};

    // Constants
    var MANUAL = "manual";
    var AUTOMATIC = "automatic";
    var SPECIAL_TAGS = ['img', 'button', 'input', 'a'];

    return {
        restrict: 'A',
        require: 'ngModel',
        scope: scope,
        link: function (scope, element, attrs, ngModel) {

            var specialTag = false;
            if (SPECIAL_TAGS.indexOf(element.prop("tagName").toLowerCase()) != -1) {
                specialTag = true;
            }

            var ctrl = {
                editorInitialized: false
            };

            scope.initMode = attrs.froalaInit ? MANUAL : AUTOMATIC;

            ctrl.init = function () {
                if (!attrs.id) {
                    // generate an ID if not present
                    attrs.$set('id', 'froala-' + generatedIds++);
                }

                //init the editor
                if (scope.initMode === AUTOMATIC) {
                    ctrl.createEditor();
                }

                //Instruct ngModel how to update the froala editor
                ngModel.$render = function () {
                    if (ctrl.editorInitialized) {
                        if (specialTag) {
                            var tags = ngModel.$modelValue;

                            // add tags on element
                            if (tags) {
                                for (var attr in tags) {
                                    if (tags.hasOwnProperty(attr) && attr != innerHtmlAttr) {
                                        element.attr(attr, tags[attr]);
                                    }
                                }
                                if (tags.hasOwnProperty(innerHtmlAttr)) {
                                    element[0].innerHTML = tags[innerHtmlAttr];
                                }
                            }
                        } else {
                            element.froalaEditor('html.set', ngModel.$viewValue || '', true);
                            //This will reset the undo stack everytime the model changes externally. Can we fix this?
                            element.froalaEditor('undo.reset');
                            element.froalaEditor('undo.saveStep');
                        }
                    }
                };

                ngModel.$isEmpty = function (value) {
                    if (!value) {
                        return true;
                    }

                    var isEmpty = element.froalaEditor('node.isEmpty', jQuery('<div>' + value + '</div>').get(0));
                    return isEmpty;
                };
            };

            ctrl.createEditor = function (froalaInitOptions) {
                ctrl.listeningEvents = ['froalaEditor'];
                if (!ctrl.editorInitialized) {
                    froalaInitOptions = (froalaInitOptions || {});
                    ctrl.options = angular.extend({}, defaultConfig, froalaConfig, scope.froalaOptions,froalaInitOptions);

                    if (ctrl.options.immediateAngularModelUpdate) {
                        ctrl.listeningEvents.push('keyup');
                    }

                    // flush means to load ng-model into editor
                    var flushNgModel = function() {
                        ctrl.editorInitialized = true;
                        ngModel.$render();
                    }

                    if (specialTag) {
                        // flush before editor is initialized
                        flushNgModel();
                    } else {
                        ctrl.registerEventsWithCallbacks('froalaEditor.initialized', function() {
                            flushNgModel();
                        });
                    }

                    // Register events provided in the options
                    // Registering events before initializing the editor will bind the initialized event correctly.
                    for (var eventName in ctrl.options.events) {
                        if (ctrl.options.events.hasOwnProperty(eventName)) {
                            ctrl.registerEventsWithCallbacks(eventName, ctrl.options.events[eventName]);
                        }
                    }

                    ctrl.froalaElement = element.froalaEditor(ctrl.options).data('froala.editor').$el;
                    ctrl.froalaEditor = angular.bind(element, element.froalaEditor);
                    ctrl.initListeners();

                    //assign the froala instance to the options object to make methods available in parent scope
                    if (scope.froalaOptions) {
                        scope.froalaOptions.froalaEditor = ctrl.froalaEditor;
                    }
                }
            };

            ctrl.initListeners = function () {
                if (ctrl.options.immediateAngularModelUpdate) {
                    ctrl.froalaElement.on('keyup', function () {
                        scope.$evalAsync(ctrl.updateModelView);
                    });
                }

                element.on('froalaEditor.contentChanged', function () {
                    scope.$evalAsync(ctrl.updateModelView);
                });

                element.bind('$destroy', function () {
                    element.off(ctrl.listeningEvents.join(" "));
                    element.froalaEditor('destroy');
                    element = null;
                });
            };

            ctrl.updateModelView = function () {

                var modelContent = null;

                if (specialTag) {
                    var attributeNodes = element[0].attributes;
                    var attrs = {};

                    for (var i = 0; i < attributeNodes.length; i++ ) {
                        var attrName = attributeNodes[i].name;
                        if (ctrl.options.angularIgnoreAttrs && ctrl.options.angularIgnoreAttrs.indexOf(attrName) != -1) {
                            continue;
                        }
                        attrs[attrName] = attributeNodes[i].value;
                    }
                    if (element[0].innerHTML) {
                        attrs[innerHtmlAttr] = element[0].innerHTML;
                    }
                    modelContent = attrs;
                } else {
                    var returnedHtml = element.froalaEditor('html.get');
                    if (angular.isString(returnedHtml)) {
                        modelContent = returnedHtml;
                    }
                }

                ngModel.$setViewValue(modelContent);
                if (!scope.$root.$$phase) {
                    scope.$apply();
                }
            };

            ctrl.registerEventsWithCallbacks = function (eventName, callback) {
                if (eventName && callback) {
                    ctrl.listeningEvents.push(eventName);
                    element.on(eventName, callback);
                }
            };

            if (scope.initMode === MANUAL) {
                var _ctrl = ctrl;
                var controls = {
                    initialize: ctrl.createEditor,
                    destroy: function () {
                        if (_ctrl.froalaEditor) {
                            _ctrl.froalaEditor('destroy');
                            _ctrl.editorInitialized = false;
                        }
                    },
                    getEditor: function () {
                        return _ctrl.froalaEditor ? _ctrl.froalaEditor : null;
                    }
                };
                scope.initFunction({initControls: controls});
            }
            ctrl.init();
        }
    };
}])
.directive('froalaView', ['$sce', function ($sce) {
	return {
		restrict: 'ACM',
		scope: false,
		link: function (scope, element, attrs) {
			element.addClass('fr-view');
			scope.$watch(attrs.froalaView, function (nv) {
				if (nv || nv === ''){
					var explicitlyTrustedValue = $sce.trustAsHtml(nv);
					element.html(explicitlyTrustedValue.toString());
				}
			});
		}
	};
}]);
