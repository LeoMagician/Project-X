	// add the module with global defaults for froala
	var myApp = angular.module('myApp', ['froala']).
	value('froalaConfig', {
		toolbarInline: false,
		placeholderText: 'Edit Your Content Here!'
	});

	// create the controller and inject Angular's $scope
	myApp.controller('mainController', function($scope) {

		$scope.titleOptions = {
			placeholderText: 'Add a Title',
			charCounterCount: false,
			toolbarInline: true,
			events: {
				'froalaEditor.initialized': function() {
					console.log('initialized');
				}
			}
		};

		$scope.initialize = function(initControls) {
			$scope.initControls = initControls;
			$scope.deleteAll = function() {
				initControls.getEditor()('html.set', '');
			};
		};

		$scope.myTitle = '<span style="font-family: Verdana,Geneva,sans-serif; font-size: 30px;">My Document\'s Title</span><span style="font-size: 18px;"></span></span>';
		$scope.sample2Text = '';
		$scope.sample3Text = '';

		$scope.imgModel = {src: 'image.jpg'};

		$scope.buttonModel = {innerHTML: 'Click Me'};

		$scope.inputModel = {placeholder: 'I am an input!'};
		$scope.inputOptions = {
			angularIgnoreAttrs: ['class', 'ng-model', 'id', 'froala']
		}

		$scope.initializeLink = function(linkInitControls) {
			$scope.linkInitControls = linkInitControls;
		};
		$scope.linkModel = {href: 'https://www.froala.com/wysiwyg-editor'}

	});
