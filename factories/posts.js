import _ from 'lodash';
import angular from 'angular';

const postFactory = angular.module('app.postFactory', [])

.factory('postFactory', ($http) => {
    function getPosts($scope) {
        $http.get('/posts').success(response => {
            $scope.posts = response.posts;
        });
    }

    function createPost($scope, params) {
        if (!$scope.createTaskInput) { return; }

        $http.post('/posts', {
            title: $scope.createTaskInput,
            content: $scope.createContentInput,
            isCompleted: false,
            isEditing: false
        }).success(response => {
            getTasks($scope);
            $scope.createTaskInput = '';
            $scope.createContentInput = '';
        });

        // params.createHasInput = false;
        // $scope.createTaskInput = '';
    }

    function updatePost($scope, post) {
        console.log(post);
        $http.put(`/posts/${post._id}`, { title: post.updatedTitle, content: post.updatedContent }).success(response => {
            getPosts($scope);
            post.isEditing = false;
        });
    }

    function deletePost($scope, postToDelete) {
        $http.delete(`/posts/${postToDelete._id}`).success(response => {
            getTasks($scope);
        });

        // _.remove($scope.todos, todo => todo.task === todoToDelete.task);
    }

    function watchCreatePostInput(params, $scope, val) {
        const createHasInput = params.createHasInput;

        if (!val && createHasInput) {
            $scope.posts.pop();
            params.createHasInput = false;
        } else if (val && !createHasInput) {
            $scope.posts.push({ title: val, isCompleted: false });

            params.createHasInput = true;
        } else if (val && createHasInput) {
            $scope.posts[$scope.posts.length - 1].title = val;
        }
    }

    function watchContentInput(params, $scope, val) {
      const createHasInput = params.createHasInput;

      if (!val && createHasInput) {
          $scope.posts.pop();
          params.createHasInput = false;
      } else if (val && !createHasInput) {
          $scope.posts.push({ content: val, isCompleted: false });

          params.createHasInput = true;
      } else if (val && createHasInput) {
          $scope.posts[$scope.posts.length - 1].content = val;
      }
    }

    return {
        getPosts,
        createPost,
        updatePost,
        deletePost,
        watchCreatePostInput,
        watchContentInput
    };
});

export default postFactory;
