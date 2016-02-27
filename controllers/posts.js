import _ from 'lodash';

export default function($scope, postFactory) {
    let params = {
        createHasInput: false
    };

    postFactory.getPosts($scope);

    $scope.onCompletedClick = post => {
        post.isCompleted = !post.isCompleted;
    };

    $scope.onEditClick = post => {
        post.isEditing = true;
        post.updatedTitle = post.title;
        post.updatedContent = post.content;

    };

    $scope.onCancelClick = post => {
        post.isEditing = false;
    };

    const { createPost, updatePost, deletePost, watchCreatePostInput, watchContentInput } = postFactory;

    $scope.createPost = _.partial(createPost, $scope, params);
    $scope.updatePost = _.partial(updatePost, $scope);
    $scope.deletePost = _.partial(deletePost, $scope);
    $scope.$watch('createPostInput', _.partial(watchCreatePostInput, params, $scope));
    $scope.$watch('createContentInput', _.partial(watchContentInput, params, $scope));
}
