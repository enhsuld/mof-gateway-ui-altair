angular
    .module('altairApp')
    	.controller("cmmOrgCtrl",['$rootScope','$scope','p_org','mainService','$state','sweet','$cookies',
	        function ($rootScope,$scope,p_org,mainService,$state,sweet,$cookies) {
	    		var aj=p_org;
	    		var init={"text":"ROOT","value":"null"};	    	
				aj.push(init);
				
	        	$scope.domain="com.macro.dev.models.LutCmmOrganization.";

				$scope.pOrgGrid = {
					dataSource: {

						transport: {
							read:  {
								url: "/api/core/list/LutCmmOrganization?access_token="+$cookies.get('access_token'),
								data: {"sort":[{field: 'id', dir: 'asc'}]},
								type: 'GET',
								dataType: "json"
							},
							update: {
								url: "/api/core/update/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                                dataType: "json",
								type:"POST",
								complete: function(e) {
									$(".k-grid").data("kendoGrid").dataSource.read();
								}
							},
							destroy: {
								url: "/api/core/delete/"+$scope.domain+"",
                                dataType: "json",
								type:"POST"
							},
							create: {
								url: "/api/core/create/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                                dataType: "json",
								type:"POST",
								complete: function(e) {
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
									 id: { editable: false,nullable: true},
									 name: { type: "string", validation: { required: true } },
                                     phone: { type: "string"},
                                     dirname: { type: "string"},
                                     fax: { type: "string"},
                                     enybo: { type: "string"},
                                     tnybo: { type: "string"},
                                     web: { type: "string"},
                                     email: { type: "string"},
                                     regno: { type: "string"},
                                     ndno: { type: "string"},
                                     aimag: { type: "string"},
                                     sum: { type: "string"},
                                     bag: { type: "string"},
                                     activity: { type: "string"},
                                     isactive: { type: "boolean"},
								 }
							 }
						 },
						pageSize: 8,
						serverFiltering: true,
						serverPaging: true,
						serverSorting: true
					},
					//toolbar: ["create"],
					//toolbar: kendo.template($("#addorg").html()),
					filterable:{
							 mode: "row"
						},
					sortable: true,
					resizable: true,
					pageable: {
						refresh: true,
						pageSizes: true,
						buttonCount: 5
					},
					columns: [
					    {title: "#",template: "<span class='row-number'></span>", width:"60px"},
					    { field:"name", title: "Нэр /Mn/" , width: "200px"},
					    { field: "phone", title:"URL" , width: "200px"},
					    { field: "dirname", title:"IKON", width: "200px"},
					    { field: "fax", values: aj, title:"Эцэг цэс", width: "200px"},
					    { field: "enybo", title:"Дараалал", width: "200px" },
						{ field: "tnybo", title:"Дараалал", width: "200px" },
						{ field: "web", title:"Дараалал", width: "200px" },
						{ field: "email", title:"Дараалал", width: "200px" },
						{ field: "regno", title:"Дараалал", width: "200px" },
						{ field: "ndno", title:"Дараалал", width: "200px" },
						{ field: "aimag", title:"Дараалал", width: "200px" },
						{ field: "sum", title:"Дараалал", width: "200px" },
                        { field: "bag", title:"Дараалал", width: "200px" },
                        { field: "activity", title:"Дараалал", width: "200px" },
                        { field: "isactive", title:"Дараалал", width: "200px" },
							//  {template: kendo.template($("#extend").html()), width: "200px"}
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

				};

			if($rootScope.ruptype==1){
                $scope.pOrgGrid.toolbar= ["create"];
                $scope.pOrgGrid.editable="inline";
                $scope.pOrgGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: "250px" });
			}
			if($rootScope.ruptype==2){
				$scope.pOrgGrid.toolbar= ["create"];
				$scope.pOrgGrid.editable="popup";
				$scope.pOrgGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: "250px" });
			}
			if($rootScope.ruptype==3){
				$scope.pOrgGrid.toolbar= ["create", "save", "cancel"];
				$scope.pOrgGrid.editable=true;
				$scope.pOrgGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: "140px" });
			}
			if($rootScope.ruptype==4){
				$scope.pOrgGrid.toolbar= ["create"];
				$scope.pOrgGrid.editable="popup";
				$scope.pOrgGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: "250px" });
			}

		}
    ]);
