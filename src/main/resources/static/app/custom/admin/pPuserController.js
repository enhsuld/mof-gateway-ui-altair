angular
    .module('altairApp')
    	.controller("userCtrl",['$cookies','$scope','p_role','p_org','mainService','$state','sweet',
	        function ($cookies,$scope,p_role,p_org,mainService,$state,sweet) {

    			$scope.domain="com.macro.dev.models.LutUser.";
    			
    			
    			$scope.selectize_a_data=p_org;
    			$scope.selectize_b_data= [];
			    var planets_data = $scope.selectize_role = p_role;
    			
    			$scope.ud = {
	                "id":0,
	            };
    			
    			$scope.res=function(){
    				$scope.ud = {
    					id:0
					};
    			}
    				
				$scope.addUser = function() {
					 var mdl = UIkit.modal("#modal_update_user");
  	    		     mainService.withdata('PUT','/api/core/user/add/'+$scope.ud.id, $scope.ud)
	  		   			.then(function(data){
	  		   				mdl.hide();
	  		   				
	  		   				$(".k-grid").data("kendoGrid").dataSource.read(); 
	  		   				if(data.re==1){
	  		   					sweet.show('Мэдээлэл', 'Амжилттай засагдлаа.', 'success');
	  		   				}  		   				
	  		   				if(data.re==0){
	  		   					sweet.show('Мэдээлэл', 'Амжилттай хадгаллаа.', 'success');
	  		   				}		   				
	  		   			});	 
                         
               }
				
    			$scope.selectize_a_config = {
    	                plugins: {
    	                    'disable_options': {
    	                        disableOptions: ["c1","c2"]
    	                    }
    	                },
    	                create: false,
    	                maxItems: 1,
    	                placeholder: 'Сонгох...',
    	                optgroupField: 'parent_id',
    	                optgroupLabelField: 'title',
    	                optgroupValueField: 'ogid',
    	                valueField: 'value',
    	                labelField: 'text',
    	                searchField: 'title',	                	
    	            };
    			
    			 $scope.selectize_planets_config = {
	                plugins: {
	                    'remove_button': {
	                        label     : ''
	                    }
	                },
	                maxItems: null,
	                valueField: 'id',
	                labelField: 'title',
	                searchField: 'title',
	                create: false,
	                render: {
	                    option: function(planets_data, escape) {
	                        return  '<div class="option">' +
	                            '<span class="title">' + escape(planets_data.title) + '</span>' +
	                            '</div>';
	                    },
	                    item: function(planets_data, escape) {
	                        return '<div class="item"><a href="' + escape(planets_data.url) + '" target="_blank">' + escape(planets_data.title) + '</a></div>';
	                    }
	                }
	            };
                
			$scope.update=function(vdata){

				var cars = vdata.lutRoles;
				if (cars==null || cars==""){}
				else{
					var array = [];
                    angular.forEach(cars, function(value, key) {
                    	array.push(value.id);
                    });
				}

				$scope.ud = {
					"id": vdata.id,
					"organizationid": vdata.organizationid,
					"positionid": vdata.positionid,
					"familyname": vdata.familyname,
					"givenname": vdata.givenname,
					"mobile": vdata.mobile,
					"email": vdata.email,
					"username": vdata.username,
					"password": vdata.password,
					"isactive": vdata.isactive,
					roles: array,
				};
			}

       	    $scope.puserGrid = {
				dataSource: {
					transport: {
						read:  {
							url: "/api/core/list/LutUser?access_token="+$cookies.get('access_token'),
                            type: 'GET',
                            dataType: "json"
						},
						update: {
							url: "/api/core/update/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
							contentType:"application/json; charset=UTF-8",
							  complete: function(e) {
								UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
								$(".k-grid").data("kendoGrid").dataSource.read();
							},
							type:"POST"
						},
						destroy: {
							url: "/api/core/delete/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                            dataType: "json",
							type:"POST"
						},
						create: {
							url: "/api/core/create/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
							contentType:"application/json; charset=UTF-8",
							type:"POST",
							complete: function(e) {
								$("#notificationSuccess").trigger('click');
								$(".k-grid").data("kendoGrid").dataSource.read();
							}
						},
                        parameterMap: function(options) {
                            options.data=JSON.stringify( options)
                            return options;
                        }
					},
					schema: {
						data:"data",

						total:"total",
						 model: {
							 id: "id",
							 fields: {
								id: { type: "number", editable: false,nullable: false},
								departmentid: { type: "number",  validation: { required: true } },
								email: { type: "string"},
								positionid: { type: "number"},
								roleid: { type: "string"},
								givenname: { type: "string"},
								familyname: { type: "string"},
								mobile: { type: "string"},
								username: { type: "string", validation: { required: true} },
								password: { type: "string", validation: { required: true} },
								isactive: { type: "boolean" }
							 }
						 }

					 },
					pageSize: 8,
					serverPaging: true,
					serverSorting: true,
					serverFiltering: true
				},
				toolbar: [{template: $("#add").html()},"excel","pdf"],
				filterable:{
					 mode: "row"
				},
				excel: {
					fileName: "Organization Export.xlsx",
					proxyURL: "//demos.telerik.com/kendo-ui/service/export",
					filterable: true,
					allPages: true
				},
				sortable: true,
				resizable: true,
				columnMenu:true,
				pageable: {
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				},
				columns: [
					 { title: "#",template: "<span class='row-number'></span>", locked: true, width:"70px"},
                     { field:"organizationid", title: "Байгууллага",values:p_org,width: 150},
					 { field:"familyname", title: "Овог",width: 150},
					 { field:"givenname", title: "Нэр",width: 150 },
					 { field:"mobile", title: "Утас",width: 150},
					 { field:"email", title: "E-mail",width: 150},
					 { field:"roleid", title: "Эрх" ,width: 150},
					 { field:"username", title: "Нэвтрэх нэр" ,width: 150},
					 { field:"password",hidden:true, title: "Нууц үг" ,width: 150},
					 { field:"isactive", title: "Идэвхитэй эсэх" ,width: 150},
					 { template: kendo.template($("#update").html()),  width: "240px"}
				],
				dataBound: function () {
					 var rows = this.items();
					 $(rows).each(function () {
						 var index = $(this).index() + 1
							 + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
						 var rowLabel = $(this).find(".row-number");
						 $(rowLabel).html(index);
					 });
				},
				editable: "popup"
			}
		}
    ]);
