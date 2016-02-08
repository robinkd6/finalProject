angular.module('app', [])
    .factory('UserService', ['$http', function($http) {
        return  {
            getCurrent: function() {
                return $http.get('/api/users/current').then(this.handleSuccess, handleError);                    
            },
            getAll: function() {
                return $http.get('/api/users').then(this.handleSuccess, handleError);
            },
            getById: function(_id) {
                return $http.get('/api/users/' + _id).then(this.handleSuccess, handleError);
            },
            getByUsername: function(username) {
                 return $http.get('/api/users/' + username).then(this.handleSuccess, handleError);
            },
            create: function(user) {
                 return $http.post('/signup', user).then(this.handleSuccess, this.handleError);
            },
            update: function(user) {
                return $http.put('/api/users/' + user._id, user).then(this.handleSuccess, handleError);
            },
            delete: function(_id) {
                return $http.delete('/api/users/' + _id).then(this.handleSuccess, handleError);
            },
            handleSuccess: function() {
                console.log('hi', res);
            // return res.data;

            },
            handleError: function() {
             return $q.reject(res.data);

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