angular
    .module('altairApp')
    .controller('main_headerCtrl', [
        '$timeout',
        '$rootScope',
        '$scope',
        '$window',
        '$state',
        'sessionService',
        'mainService',
        '$http',
        '$cookies',
        function ($timeout,$rootScope,$scope,$window,$state,sessionService,mainService,$http,$cookies) {

        	mainService.withdomain('get','/api/users/extra')
	  			.then(function(data){
	  				$scope.user=data;
	  				$cookies.put("orgid",data.organizationId);
		  	});
        	 



            $scope.logout = function() {
                logout($scope.loginData);
            }

            function logout(params) {
                var req = {
                    method: 'DELETE',
                    url: "oauth/token"
                }
                $http(req).then(
                    function(data){
                        $cookies.remove("access_token");
                        $cookies.remove("remember");
                        $cookies.remove("orgid");
                        $state.go("login");
                    },function(){
                        console.log("error");
                    }
                );
            }


            $scope.user_data = {
                name: "Lue Feest",
                avatar: "assets/img/avatars/avatar_11_tn.png",
                alerts: [
                    {
                        "title": "Hic expedita eaque.",
                        "content": "Nemo nemo voluptatem officia voluptatum minus.",
                        "type": "warning"
                    },
                    {
                        "title": "Voluptatibus sed eveniet.",
                        "content": "Tempora magnam aut ea.",
                        "type": "success"
                    },
                    {
                        "title": "Perferendis voluptatem explicabo.",
                        "content": "Enim et voluptatem maiores ab fugiat commodi aut repellendus.",
                        "type": "danger"
                    },
                    {
                        "title": "Quod minima ipsa.",
                        "content": "Vel dignissimos neque enim ad praesentium optio.",
                        "type": "primary"
                    }
                ],
                messages: [
                    {
                        "title": "Reiciendis aut rerum.",
                        "content": "In adipisci amet nostrum natus recusandae animi fugit consequatur.",
                        "sender": "Korbin Doyle",
                        "color": "cyan"
                    },
                    {
                        "title": "Tenetur commodi animi.",
                        "content": "Voluptate aut quis rerum laborum expedita qui eaque doloremque a corporis.",
                        "sender": "Alia Walter",
                        "color": "indigo",
                        "avatar": "assets/img/avatars/avatar_07_tn.png"
                    },
                    {
                        "title": "At quia quis.",
                        "content": "Fugiat rerum aperiam et deleniti fugiat corporis incidunt aut enim et distinctio.",
                        "sender": "William Block",
                        "color": "light-green"
                    },
                    {
                        "title": "Incidunt sunt.",
                        "content": "Accusamus necessitatibus officia porro nisi consectetur dolorem.",
                        "sender": "Delilah Littel",
                        "color": "blue",
                        "avatar": "assets/img/avatars/avatar_02_tn.png"
                    },
                    {
                        "title": "Porro ut.",
                        "content": "Est vitae magni eum expedita odit quisquam natus vel maiores.",
                        "sender": "Amira Hagenes",
                        "color": "amber",
                        "avatar": "assets/img/avatars/avatar_09_tn.png"
                    }
                ]
            };

          //  $scope.logout = sessionService.logout;
            
            $scope.alerts_length = $scope.user_data.alerts.length;
            $scope.messages_length = $scope.user_data.messages.length;


            $('#menu_top').children('[data-uk-dropdown]').on('show.uk.dropdown', function(){
                $timeout(function() {
                    $($window).resize();
                },280)
            });

            // autocomplete
            $('.header_main_search_form').on('click','#autocomplete_results .item', function(e) {
                e.preventDefault();
                var $this = $(this);
                $state.go($this.attr('href'));
                $('.header_main_search_input').val('');
            })

        }
    ])
;