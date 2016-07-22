var addCtrl = angular.module('addCtrl', []);
addCtrl.controller('addCtrl', function($scope, $http) {

  $scope.formList = [];

  $http.get('http://api.conceptdrop.com/api/OrderForms/')
    .success( function (data) {
      data.forEach( function(item){
        item.Description = '';
        switch(item.Type) {
          case  'Presentation':
            item.Description = 'Some powerpoint description';
            break;
          case  'Keynote':
            item.Description = 'Some keynote description';
            break;
          case  'Infographic':
            item.Description = 'Some infographic description';
            break;
          case  'One Pager':
            item.Description = 'Some once pager description';
            break;
          case  'Flyer/Ad':
            item.Description = 'Some flyer description';
            break;
          case  'HTML5 Pitch':
            item.Description = 'Some html5 description';
            break;
          case  'Email':
            item.Description = 'Some email description';
            break;
          case  'Logo':
              item.Description = 'Some logo description';
              break;
          case  'Brochure':
              item.Description = 'Some brochure description';
              break;
          default:
            item.Description = 'A design that is just right for you';
        }
        $scope.formList = data;
      });
      console.log(JSON.stringify(data));
    });
});
