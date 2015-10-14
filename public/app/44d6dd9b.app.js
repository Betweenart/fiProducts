"use strict";angular.module("fiProductsApp",["ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap","xeditable"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/"),c.html5Mode(!0)}]),angular.module("fiProductsApp").service("actionFigures",["$http","$q",function(a,b){var c=function(a){return angular.isObject(a.data)&&a.data.message?b.reject(a.data.message):b.reject("An unknown error occurred.")},d=function(a){return a.data};return{getAllProducts:function(){var b=a({method:"get",url:"/api/products"});return b.then(d,c)},getProduct:function(b){var e=a({method:"get",url:"/api/products/"+b});return e.then(d,c)},addProduct:function(b){b=b||{};var e=a({method:"post",url:"/api/products",data:b});return e.then(d,c)},updateProduct:function(b){console.log("updateProduct:"),console.dir(b);var e=a({method:"put",url:"/api/products/"+b.id,data:b});return e.then(d,c)},deleteProduct:function(b){var e=a({method:"delete",url:"/api/products/"+b,data:{id:b}});return e.then(d,c)}}}]),angular.module("fiProductsApp").controller("MainCtrl",["$scope","$http",function(a,b){a.awesomeThings=[],b.get("/api/things").success(function(b){a.awesomeThings=b})}]),angular.module("fiProductsApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("fiProductsApp").controller("ProductsCtrl",["$scope","$http","actionFigures",function(a,b,c){a.searchProduct="",a.sortType="id",a.sortReverse=!1,a.products=[],c.getAllProducts().then(function(b){a.products=b}),a.saveProduct=function(a,b){a.id=b,c.updateProduct(a).then(function(){console.log("Product Saved:")})},a.deleteProduct=function(b,d){c.deleteProduct(d).then(function(){a.products.splice(b,1)})},a.checkName=function(a){return a.length<2?(alert("Come on! Name is to short."),!1):void 0},a.addProduct=function(){c.addProduct().then(function(b){console.log("Product Added"),a.products.push(b)})}}]),angular.module("fiProductsApp").config(["$stateProvider",function(a){a.state("products",{url:"/products",templateUrl:"app/products/products.html",controller:"ProductsCtrl"})}]),angular.module("fiProductsApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("fiProductsApp").controller("NavbarCtrl",["$scope","$location",function(a,b){a.menu=[{title:"Home",link:"/"},{title:"Products",link:"/products"}],a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]),angular.module("fiProductsApp").run(["$templateCache",function(a){a.put("app/main/main.html",'<header class=hero-unit id=banner><div class=container><h1>Face It CRUD!</h1><p class=lead>Face the next generation of product lists<br>[ gl&amp;hf ]</p></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Features:</h1><ul class="nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6" ng-repeat="thing in awesomeThings"><li><a href=# tooltip-placement=top tooltip-trigger=mouseenter uib-tooltip={{thing.info}}>{{thing.name}}</a></li></ul></div></div></div><footer class=footer><div class=container><p>&copy;2015 Lukasz Oltarzewski</p></div></footer>'),a.put("app/products/products.html",'<div class=container><div class=row><div class=col-md-12><!-- Big title for... --><h1 class=page-header>Products</h1><!-- Search for product - affects da filterro --><form><div class=form-group><div class=input-group><div class=input-group-addon><i class="fa fa-search"></i></div><input class=form-control placeholder="Search for an Action Figure" ng-model=searchProduct.name></div></div></form><!-- Product list info if is empty --><div ng-if=!products>No heroes available... Come back in a bit...</div><!-- Product list table --><table ng-if=products class="table table-striped table-hover table-condensed"><thead><tr><td style=width:10%><a href=# ng-click="sortType = \'id\'; sortReverse = !sortReverse">id <span ng-show="sortType == \'id\' && !sortReverse" class="fa fa-caret-down"></span> <span ng-show="sortType == \'id\' && sortReverse" class="fa fa-caret-up"></span></a></td><td style=width:35%><a href=# ng-click="sortType = \'name\'; sortReverse = !sortReverse">Name <span ng-show="sortType == \'name\' && !sortReverse" class="fa fa-caret-down"></span> <span ng-show="sortType == \'name\' && sortReverse" class="fa fa-caret-up"></span></a></td><td style=width:25%><a href=# ng-click="sortType = \'price\'; sortReverse = !sortReverse">Price <span ng-show="sortType == \'price\' && !sortReverse" class="fa fa-caret-down"></span> <span ng-show="sortType == \'price\' && sortReverse" class="fa fa-caret-up"></span></a></td><td style=width:30%>Options</td></tr></thead><tbody><tbody><tr ng-repeat="product in products | orderBy : sortType : sortReverse | filter: searchProduct"><td>{{ product.id }}</td><td><!-- editable product name (text with validation) --><span editable-text=product.name e-name=name e-form=rowform onbeforesave=checkName($data) e-required>{{ product.name || \'empty\' }}</span></td><td><!-- editable status (select-local) --><span editable-text=product.price e-name=price e-form=rowform e-required>{{ product.price | currency : product.currency}}</span></td><td style="white-space: nowrap"><!-- form --><form editable-form name=rowform onbeforesave="saveProduct($data, product.id)" ng-show=rowform.$visible class="form-buttons form-inline" shown="inserted == product"><button type=submit ng-disabled=rowform.$waiting class="btn btn-primary">update</button> <button type=button ng-disabled=rowform.$waiting ng-click=rowform.$cancel() class="btn btn-default">cancel</button></form><div class=buttons ng-show=!rowform.$visible><button class="btn btn-primary" ng-click=rowform.$show()>edit</button> <button class="btn btn-danger" ng-click="deleteProduct($index, product.id)">delete</button></div></td></tr></tbody></tbody></table><button class="btn btn-default" ng-click=addProduct()>Add product</button></div></div></div>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>fi-products</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li></ul></div></div></div>')}]);