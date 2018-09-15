(function () {
    angular
        .module('zispaApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$modalInstance', 'locationData', 'zispaData'];
    function reviewModalCtrl ($modalInstance, locationData, zispaData) {
        var vm = this;

        vm.modal = {
            cancel: function () {
                $modalInstance.dismiss('cancel');
            }
        };
        vm.locationData = locationData;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };

        vm.doAddReview = function (locationid, formData) {
            zispaData.addReviewById(locationid, {
                author: formData.name,
                rating: formData.rating,
                reviewText: formData.rating
            })
                .success(function (data) {
                    console.log("Success!");
                })
                .error(function (data) {
                    vm.formError = "Your review has not been saved, try again!";
                });
            return false;
        };
    }
})();
