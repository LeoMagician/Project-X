(function(angular) {
    'use strict';
    angular.module('core-description',[])

    .component('coreDescription', {
        templateUrl: "view/component/postEvent/coreDescription/coreDescription.html",
        controller: BasicDescriptionController        
    });

    function BasicDescriptionController($scope) {
        $scope.basicDescrip = {
            text: "",
            tags: ['']
        }
        $scope.selectedTagCount = 0;
        $scope.selectTags = [];
        
        $scope.tagNames = [{name: '户外', disableTag: false, selectTag: false},
                            {name: '户外', disableTag: false, selectTag: false},
                            {name: '历史', disableTag: false, selectTag: false},
                            {name: '互联网', disableTag: false, selectTag: false},
                            {name: '节日', disableTag: false, selectTag: false},
                            {name: '科技', disableTag: false, selectTag: false},
                            {name: '游戏', disableTag: false, selectTag: false},
                            {name: '节日', disableTag: false, selectTag: false},
                            {name: '科技', disableTag: false, selectTag: false},
                            {name: '游戏', disableTag: false, selectTag: false},
                            {name: '户外', disableTag: false, selectTag: false},
                            {name: '户外', disableTag: false, selectTag: false},
                            {name: '历史', disableTag: false, selectTag: false},
                            {name: '互联网', disableTag: false, selectTag: false},
                            {name: '节日', disableTag: false, selectTag: false},
                            {name: '科技', disableTag: false, selectTag: false},
                            {name: '游戏', disableTag: false, selectTag: false},
                            {name: '节日', disableTag: false, selectTag: false},
                            {name: '科技', disableTag: false, selectTag: false},
                            {name: '游戏', disableTag: false, selectTag: false}]                        

        $scope.$watch("basicDescrip.text", function (newValue, oldValue) {
            var titleTemp = $scope.basicDescrip.text;
            var titleNum = 0;

            if (titleTemp !== null && !!titleTemp) {
                titleNum = $scope.basicDescrip.text.length;
            }
            
            $scope.titleNum = titleNum;
        });

        $scope.$watch("basicDescrip.tags", function (newValue, oldValue) {
            var index;
            var selectTagCount = 0;
            var selectedTagName;
            
            for(index in newValue) {
                if(!!newValue[index]) {
                    $scope.tagNames[index].selectTag = true;                                 
                    selectTagCount++;    
                } else {
                    $scope.tagNames[index].selectTag = false;
                    deleteSelectedTag(index);
                }                            
            }

           for(selectedTagName in $scope.tagNames) {
                if (!!$scope.tagNames[selectedTagName].selectTag) {
                    if (!containSelectedTag(selectedTagName)) {
                        $scope.selectTags.push({id : selectedTagName, name : $scope.tagNames[selectedTagName].name});
                        $scope.selectedTagCount++;
                    }
                     
                }
            } 

            if (selectTagCount > 5) {
                var tagName;
                for(tagName in $scope.tagNames) {                     
                    if (!$scope.tagNames[tagName].selectTag) {
                         $scope.tagNames[tagName].disableTag = true;
                    }
                }
            } else {
                var tagName;
                for(tagName in $scope.tagNames) {                                        
                    $scope.tagNames[tagName].disableTag = false;                    
                }
            }

            function deleteSelectedTag(tagId) {
                
                if (!!!$scope.selectTags || $scope.selectTags.length === 0) {
                    return;
                }

                var tag;
                for(tag in $scope.selectTags) {                    
                    if (tagId === $scope.selectTags[tag].id) {
                        $scope.selectTags.splice(tag, 1);      
                        $scope.selectedTagCount--;                  
                    }
                }
            }

            function containSelectedTag(tagId) {
                
                if (!!!$scope.selectTags || $scope.selectTags.length === 0) {
                    return false;
                }

                var tag;
                for(tag in $scope.selectTags) {                    
                    if (tagId === $scope.selectTags[tag].id) {
                        return true;                       
                    }
                }
            }

        }, true);

        $scope.deleteTag = function(index) {            
            $scope.basicDescrip.tags[index] = false;
        }

    }
})(window.angular);