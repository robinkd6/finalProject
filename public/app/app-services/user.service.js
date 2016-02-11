angular.module('app', [])
    .factory('UserService', ['$http', function($http) {
        return  {
            getCurrent: function() {
                return $http.get('/users/current').then(this.handleSuccess, this.handleError);                    
            },
            getAll: function() {
                return $http.get('/users').then(this.handleSuccess, this.handleError);
            },
            getById: function(_id) {
                return $http.get('/users/' + _id).then(this.handleSuccess, this.handleError);
            },
            getByUsername: function(username) {
                 return $http.get('/users/' + username).then(this.handleSuccess, this.handleError);
            },
            create: function(user) {
                 return $http.post('/signup', user).then(this.handleSuccess, function success(res){console.log(res)});
            },
            update: function(user) {
                return $http.put('/users/' + user._id, user).then(this.handleSuccess, this.handleError);
            },
            delete: function(_id) {
                return $http.delete('/users/' + _id).then(this.handleSuccess, this.handleError);
            },
            handleSuccess: function() {
                console.log('success');
                console.log('Adele');
            // return res.data;

            },
            handleError: function(res) {
                console.log('error', res)
             //return res.reject(res.data);

            }
        };

    }]);

// function Service($http, $q) {
//     var service = {};

//     service.GetCurrent = GetCurrent;
//     service.GetAll = GetAll;
//     service.GetById = GetById;
//     service.GetByUsername = GetByUsername;
//     service.Create = Create;
//     service.Update = Update;
//     service.Delete = Delete;

//     return service;
//   }

 //        function GetCurrent() {
 //            return $http.get('/api/users/current').then(handleSuccess, handleError);
 //        }

 //        function GetAll() {
 //            return $http.get('/api/users').then(handleSuccess, handleError);
 //        }

 //        function GetById(_id) {
 //            return $http.get('/api/users/' + _id).then(handleSuccess, handleError);
 //        }

 //        function GetByUsername(username) {
 //            return $http.get('/api/users/' + username).then(handleSuccess, handleError);
 //        }

 //        function Create(user) {
 //            return $http.post('/api/users', user).then(handleSuccess, handleError);
 //        }

 //        function Update(user) {
 //            return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
 //        }

 //        function Delete(_id) {
 //            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
 //        }

 //        // private functions

 //        function handleSuccess(res) {
 //            console.log('hi', res);
 //            // return res.data;
 //        }

 //        function handleError(res) {
 //            return $q.reject(res.data);
 //        }
 //    };
 // 