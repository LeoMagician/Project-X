# angular-froala
> For AngularJS 2 bindings see https://github.com/froala/angular2-froala-wysiwyg.

## Version 2
This repository contains bindings for the latest version of the Froala Editor (version 2). Checkout the `V1` branch for support of Version 1 of the editor.


## Installation

1. Clone this repo or download the zip.

2. Run `bower install` or Download the editor from [https://www.froala.com/wysiwyg-editor/](https://www.froala.com/wysiwyg-editor/) and jQuery

3. Load Froala WYSIWYG editor (and all desired plugins), jQuery and the angular-froala files into your project.  
	- src/angular-froala.js

 ***NB***: You must ensure jQuery is included *before* angular, otherwise Angular will use it's own jqLite which doesn't provide the necessary functions.
 
## Usage

1. Add the `froala` dependency to your Angular project. example:
	* `angular.module('myApp', ['froala'])`
2. Create a textarea with the froala directive in your view and give it a model, where `myHtml` is a variable on `$scope`.
	* `<textarea froala ng-model="myHtml"></textarea> `

### Options

**Setting Defaults**: to set defaults for the editor pass a config object to angular.value with the key `froalaConfig` like this:

```javascript
angular.module('myApp', ['froala']).
	value('froalaConfig', {
		toolbarInline: false,
		placeholderText: 'Enter Text Here'
	});
```

**From the Controller**: to set options from the controller, create an options object on scope and simply pass it to the froala directive. example:

_app.js_

```javascript
function myCtrl($scope){
	$scope.myHtml = "<h1>Hello World</h1>"
	$scope.froalaOptions = {
		toolbarButtons : ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"]
	}
}
```
_view.html_

```html
<textarea froala="froalaOptions" ng-model="myHtml"></textarea>
```

You can pass any existing Froala option. Consult the [Froala documentation](https://www.froala.com/wysiwyg-editor/docs/options) to view the list of all the available options.

#### Directive Specific Option
The *angular-froala* directive exposes the following additional option:

 * **immediateAngularModelUpdate**: (default: false) This option synchronizes the angular model as soon as a key is released in the editor. Note that it may affect
  performances.
  
### Methods

To use the methods available, access the editor instance from your froalaOptions object `$scope.options.froalaEditor(method)` and use it as described in the [method docs](http://froala.com/wysiwyg-editor/docs/methods). example:

```javascript
function myCtrl($scope){
	$scope.myHtml = "";
	$scope.froalaOptions = {
		toolbarButtons : ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"],
		events: {
			'froalaEditor.initialized': function () {
				// Use the methods like this.
				$scope.froalaOptions.froalaEditor('selection.get');
			}
		}
	}
```
### Events

 Events can be passed in with the options, with a key events and object where the key is the event name and the value is the callback function.
 
#### Attribute
_app.js_

```js
$scope.froalaOptions = {
	placeholder: "Edit Me",
	events : {
		'froalaEditor.focus' : function(e, editor) {/* ... */}
	}
```

### Special tags
You can also use the editor on **img**, **button**, **input** and **a** tags:

```html
<img froala ng-model="imgObj"/>
```

The model must be an object containing the attributes for your special tags. Example:

```javascript
$scope.imgObj = {
  src: 'path/to/image.jpg'
};
```

The ng-model will change as the attributes change during usage.

* Ng-model can contain a special attribute named **innerHTML** which inserts innerHTML in the element: If you are using 'button' tag, you can specify the button text like this:

```javascript
$scope.buttonObj = {
  innerHTML: 'Button text'
};
```
As the button text is modified by the editor, the **innerHTML** attribute from buttonObj model will be modified too.

#### Specific option for special tags

 * **angularIgnoreAttrs**: (default: null) This option is an array of attributes that you want to ignore when the editor updates the ng-model:

 ```javascript
$scope.inputOptions = {
  angularIgnoreAttrs: ['class', 'ng-model', 'id']
};
 ```

### Manual Instantiation
Sometimes you want to control when the Froala Editor will be instantiated. The directive includes a **froala-init** attributes which will provide you with the controls required to initialize and close the editor.

```html
<div froala froala-init="myControllerFunction(initControls)"></div>
```

Where *MyControllerFunction* is the name of a function in your controller which will receive an object with different methods to control the editor initialization process. It is primordial that the name of the parameter be *initControls* otherwise your function will not receive the controls.

The object received by the function will contain the following methods:

- **initialize**: Call this method to initialize the Froala Editor
- **destroy**: Call this method to destroy the Froala Editor
- **getEditor**: Call this method to retrieve the editor that was created. This method will return *null* if the editor was not yet created

Checkout the demo file to see a working example.

<!-- ### Displaying Html -->

![screenshot 2016-02-25 16 47 15](https://cloud.githubusercontent.com/assets/597735/13335505/774c0a76-dbdf-11e5-94c5-b0eb9c5b4923.png)

To display content created with the froala editor use the froala-view directive.
if `myHtml` is your model, then the following will render your content.

```html
<div froala-view="myHtml"></div>
```

If you are using the old `ng-bind-html` that will continue to work however it still requires froala-sanitize.js to be used and not all of froala is supported with it. The updated directive does __not__ require froala-sanitize.

Congrats all is done!

## License

The `angular-froala` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).

## Development environment setup

If you want to contribute to Angular-Froala, you will first need to install the required tools to get the project going.

#### Prerequisites

* [Node Package Manager](https://npmjs.org/) (NPM)
* [Git](http://git-scm.com/)

#### Dependencies

* [Grunt CLI](http://gruntjs.com/getting-started) (task automation)
* [Bower](http://bower.io/) (package management)

#### Installation
Clone the Git [Angular-Froala](https://github.com/froala/angular-froala) repository on your local machine and run the commands below in the project root directory.

##### 1. Install Grunt and Bower

    $ npm install -g grunt-cli bower

##### 2. Install project dependencies

    $ npm install
    $ bower install

#### Running tests
Each contribution to the project should come with its set of unit tests thus ensuring that the new behaviour will not be altered by subsequent commits.
So, before each commit to the repository, run the tests by running the following grunt task:

    $ grunt test

This will first run a javascript linting tool (JSHint) to make sure that the code is clean and in accordance to the standards.
If any errors or warnings are found, they will be displayed on the console. Fix them and rerun the task. When the code is
doesn't have any linting warning, the unit tests will be run.
