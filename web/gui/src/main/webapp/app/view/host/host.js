/*
 * Copyright 2015 Open Networking Laboratory
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 ONOS GUI -- Host View Module
 */

(function () {
    'use strict';

    angular.module('ovHost', [])
    .controller('OvHostCtrl',
        ['$log', '$scope', '$location', 'FnService', 'WebSocketService',

        function ($log, $scope, $location, fs, wss) {
            var self = this;
            self.hostData = [];

            $scope.responseCallback = function(data) {
                self.hostData = data.hosts;
                $scope.$apply();
            };

            $scope.sortCallback = function (requestParams) {
                wss.sendEvent('hostDataRequest', requestParams);
            };

            var handlers = {
                hostDataResponse: $scope.responseCallback
            };
            wss.bindHandlers(handlers);

            // Cleanup on destroyed scope
            $scope.$on('$destroy', function () {
                wss.unbindHandlers(handlers);
            });

            $scope.sortCallback();

            $log.log('OvHostCtrl has been created');
        }]);
}());
