"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var list_service_service_1 = require("../../list-service.service");
var core_2 = require("@angular/core");
var shortid = require('shortid');
var modal_module_1 = require("@ng-bootstrap/ng-bootstrap/modal/modal.module");
var user_service_service_1 = require("../../user-service.service");
var socket_service_service_1 = require("../../socket-service.service");
var ng_snotify_1 = require("ng-snotify");
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var TreeView = require('js-treeview');
var TodoListComponent = /** @class */ (function () {
    function TodoListComponent(snotifyService, userService, el, listService, router, _router, modal, socketService) {
        var _this = this;
        this.snotifyService = snotifyService;
        this.userService = userService;
        this.el = el;
        this.listService = listService;
        this.router = router;
        this._router = _router;
        this.modal = modal;
        this.socketService = socketService;
        this.collabVal = null;
        this.currentItemValue = null;
        this.currentItem = null;
        this.currentList = null;
        this.loading = false;
        this.selectedUiList = null;
        this.modalReference = null;
        this.notificationData = null;
        this.getAllUsers = function () {
            _this.userService.getAllUsers().subscribe(function (response) {
                // console.log(response);
                if (response.status == 200) {
                    _this.allUsers = response.data;
                }
            });
        }; // end of get all users
        this.register = function () {
            _this.socketService.sendUserId().subscribe(function (data) {
                _this.socketService.userId(_this.userId);
            });
        }; //  end of register
        this.checkForChanges = function () {
            _this.socketService.check().subscribe(function (data) {
                _this.changeInfo = data.content.info;
                //this.snotifyService.info(data.content.info);
                _this.snotifyService.success(data.content.info, {
                    timeout: 5000,
                    showProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true
                });
                _this.getAllLists();
            });
        }; // end of check for change
        this.deleteList = function (listId) {
            // debugger;
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userService.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var details = {
                        listId: listId
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var each = _a[_i];
                        if (each.listId == details.listId)
                            _this.notificationData = {
                                sender: _this.userId,
                                collabrators: each.collabrators,
                                content: {
                                    info: "List \"" + each.listName + "\" deleted by " + _this.currentUserDetails.firstName + " " + _this.currentUserDetails.lastName + "."
                                }
                            };
                    }
                    _this.listService.deleteList(details).subscribe(function (response) {
                        if (response.status == 200) {
                            _this.getAllLists();
                            // alert('list deleted successfully');
                            _this.socketService.newChange(_this.notificationData);
                        } // end
                    });
                } // end of response status
            });
        };
        this.createSublist = function (container, args) {
            var ul = document.createElement('ul');
            for (var j = 0; j < args.length; j++) {
                // debugger;
                var row = args[j];
                var li = document.createElement('li');
                li.innerText = row.title;
                var nodes = row.children;
                if (nodes && nodes.length) {
                    _this.createSublist(li, nodes);
                }
                ul.appendChild(li);
            }
            console.log(ul.outerHTML);
            // document.getElementById('"'+container+'"').appendChild(ul);
        };
        this.checkauth = function () {
            if (ng2_cookies_1.Cookie.get('authToken') == '' || ng2_cookies_1.Cookie.get('authToken') == null || ng2_cookies_1.Cookie.get('authToken') == undefined || (!ng2_cookies_1.Cookie.get('authToken'))) {
                _this.router.navigate(['/login']);
            }
        };
        this.getCurrentUserInfo = function () {
            var details = {
                userId: _this.userId
            };
            _this.userService.getUserDetails(details).subscribe(function (response) {
                //debugger;
                _this.loading = true;
                console.log(response);
                if (response.status == 200) {
                    _this.currentUserDetails = response.data[0];
                }
            });
        }; //  end of get currentUserInfo
        this.getAllLists = function () {
            _this.listService.getAllListOfUser(_this.userId).subscribe(function (response) {
                console.log(response.status);
                if (response.status == 200) {
                    _this.allLists = response.data;
                    console.log(_this.allLists);
                }
                else if (response.status == 500) {
                    _this.logout();
                }
            });
        }; // end of  get alll lists of user
        this.newList = function () {
            _this.config = {
                labelField: 'label',
                valueField: 'value',
                maxItems: 10,
                highlight: true,
                create: false,
            };
            var currentUserDetails = _this.currentUserDetails;
            _this.collabData = [];
            for (var _i = 0, _a = currentUserDetails.friendList; _i < _a.length; _i++) {
                var each = _a[_i];
                _this.collabData.push({ 'label': each.fromName, 'value': each.fromUserId });
            }
            _this.modalReference = _this.modal.open(_this.modalContent);
        }; // end of new list
        this.saveNew = function () {
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userService.updateList(abc).subscribe(function (response) {
                // console.log(response);
                if (response.status == 200) {
                    if (_this.collabVal != null) {
                        _this.collabVal.push(_this.userId);
                    }
                    var details = {
                        userId: _this.userId,
                        listName: _this.newListName,
                        cards: [],
                        collabrators: _this.collabVal
                    };
                    _this.listService.createNewList(details).subscribe(function (response) {
                        if (response.status == 200) {
                            // alert('new list create')
                            _this.snotifyService.success('List created');
                            _this.notificationData = {
                                sender: _this.userId,
                                collabrators: _this.collabVal,
                                content: {
                                    info: "New List \"" + _this.newListName + "\" added by " + _this.currentUserDetails.firstName + " " + _this.currentUserDetails.lastName + " with you as collabrator."
                                }
                            };
                            _this.getAllLists();
                            _this.socketService.newChange(_this.notificationData);
                        }
                    });
                    _this.newListName = '';
                }
            });
        }; //  end of save new list
        this.saveNewKeyUp = function (event) {
            if (event.keyCode == 13) {
                _this.saveNew();
                _this.closeModal();
            }
        }; // end of save new key up
        this.logout = function () {
            debugger;
            ng2_cookies_1.Cookie.delete('authToken');
            _this.router.navigate(['/home']);
        };
    }
    TodoListComponent.prototype.ngAfterViewInit = function () {
        this.el.nativeElement.ownerDocument.body.style.backgroundColor = '#eee';
    };
    TodoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = this._router.snapshot.paramMap.get('userId');
        this.checkauth();
        this.getCurrentUserInfo();
        this.register();
        this.getAllUsers();
        this.getAllLists();
        this.checkForChanges();
        document.onclick = function (event) {
            var targetId = event.target.className;
            debugger;
            console.log(event.target);
            if (targetId.includes('node_')) {
                var currentlistId = jQuery(event.target).closest('div')[0].id;
                _this.currentItem = targetId;
                _this.currentList = currentlistId;
                if (!targetId.includes('fa-trash') && !targetId.includes('fa-check-circle')) {
                    if (targetId.includes('fa-edit')) {
                        if (jQuery(event.target)[0].title) {
                            _this.currentItemValue = jQuery(event.target)[0].title;
                        }
                    }
                    else {
                        _this.currentItemValue = null;
                    }
                    _this.modalReference = _this.modal.open(_this.modalContent2);
                }
                else {
                    //debugger;
                    _this.saveUpdatedList();
                }
            }
        };
    };
    //public viewContent='<h1>here<h1>'
    TodoListComponent.prototype.addhtml = function (cards) {
        var htmlObj = this.parseNodes(cards);
        var trashEle = jQuery('.fa-trash');
        for (var ind = 0; ind < trashEle.length; ind++) {
            trashEle[ind].style.color = '#dc3545';
            trashEle[ind].style.cursor = 'pointer';
        }
        var editEle = jQuery('.fa-edit');
        for (var ind = 0; ind < editEle.length; ind++) {
            editEle[ind].style.color = '#007bff';
            editEle[ind].style.cursor = 'pointer';
        }
        var addEle = jQuery('.fa-plus');
        for (var ind = 0; ind < addEle.length; ind++) {
            addEle[ind].style.color = 'green';
            addEle[ind].style.cursor = 'pointer';
        }
        var checkEle = jQuery('.far.fa-check-circle');
        for (var ind = 0; ind < checkEle.length; ind++) {
            checkEle[ind].style.color = 'orange';
            checkEle[ind].style.cursor = 'pointer';
        }
        var checkEle1 = jQuery('.fas.fa-check-circle');
        for (var ind = 0; ind < checkEle1.length; ind++) {
            checkEle1[ind].style.color = 'green';
            checkEle1[ind].style.cursor = 'pointer';
        }
        jQuery('.cardData').css('font-size', '18px');
        jQuery('.cardData').css('font-family', 'cursive');
        if (this.currentList != null) {
            jQuery('#card_' + this.currentList).css('border', '3px solid black');
        }
        return htmlObj.outerHTML;
    };
    TodoListComponent.prototype.processList = function (listId, cards, cardTitle) {
        this.currentList = listId;
        this.currentItemValue = cardTitle;
        this.modalReference = this.modal.open(this.modalContent1);
    };
    TodoListComponent.prototype.saveUpdatedCard = function () {
        if (this.modalReference != null) {
            this.closeModal();
        }
        var currentListArr = this.currentList.split('_-_');
        for (var _i = 0, _a = this.allLists; _i < _a.length; _i++) {
            var each = _a[_i];
            console.log(each);
            if (each.listId == currentListArr[1]) {
                if (currentListArr[0] == 'add') {
                    each.cards.push({
                        children: [],
                        id: shortid.generate(),
                        status: false,
                        title: this.currentItemValue
                    });
                    this.notificationData = {
                        sender: this.userId,
                        collabrators: each.collabrators,
                        content: {
                            info: "New List Item \"" + this.currentItemValue + "\" added by " + this.currentUserDetails.firstName + " " + this.currentUserDetails.lastName
                        }
                    };
                }
                else if (currentListArr[0] == 'edit') {
                    this.notificationData = {
                        sender: this.userId,
                        collabrators: each.collabrators,
                        content: {
                            info: "List title changed from \"" + each.listName + "\" to \"" + this.currentItemValue + "\" by " + this.currentUserDetails.firstName + " " + this.currentUserDetails.lastName + "."
                        }
                    };
                    each.listName = this.currentItemValue;
                }
                this.updateList(each.listId, each.cards, each.listName);
                this.currentItemValue = null;
            }
        }
    };
    TodoListComponent.prototype.updateList = function (listId, cards, title) {
        var _this = this;
        for (var _i = 0, _a = this.allLists; _i < _a.length; _i++) {
            var list = _a[_i];
            if (list.listId == listId) {
                list.cards = cards;
                list.title = title;
                this.listService.updateListUsingListId(list).subscribe(function (response) {
                    if (response.status == 200) {
                        // alert('list updated successfully');
                        // debugger;
                        _this.socketService.newChange(_this.notificationData);
                        _this.getAllLists();
                        //end
                    }
                    // event.target.value=''
                    //this.showAdd(this.addCardEvent);
                });
            }
        }
    };
    TodoListComponent.prototype.saveUpdatedList = function () {
        if (this.modalReference != null) {
            this.closeModal();
        }
        var itemArr = this.currentItem;
        var listId = this.currentList;
        var notifUserId = this.userId;
        var notifUserDetails = this.currentUserDetails;
        var notificationData = this.notificationData;
        var currentItemValue = this.currentItemValue;
        console.log(itemArr);
        var itemId = itemArr.replace(/  +/g, ' ').split(' ')[2].split('node_')[1];
        var itemClass = itemArr.replace(/  +/g, ' ').split(' ')[1];
        console.log(itemId);
        var listName = '';
        var collabrators;
        for (var _i = 0, _a = this.allLists; _i < _a.length; _i++) {
            var each = _a[_i];
            console.log(each);
            if (each.listId == listId) {
                listName = each.listName;
                collabrators = each.collabrators;
                if (itemClass == 'fa-trash') {
                    for (var ind in each.cards) {
                        if (each.cards[ind].id == itemId) {
                            notificationData = {
                                sender: notifUserId,
                                collabrators: collabrators,
                                content: {
                                    info: "Item \"" + each.cards[ind].title + "\" of List \"" + listName + "\" deleted by " + notifUserDetails.firstName + " " + notifUserDetails.lastName + "."
                                }
                            };
                            each.cards.splice(ind, 1);
                        }
                        else {
                            notificationData = {
                                sender: notifUserId,
                                collabrators: collabrators,
                                content: {
                                    info: "SubItems from List\" " + listName + "\" deleted by " + notifUserDetails.firstName + " " + notifUserDetails.lastName + "."
                                }
                            };
                            removeFromTree(each.cards[ind], itemId);
                        }
                    }
                }
                else if (itemClass == 'fa-check-circle') {
                    markComplete(each.cards);
                }
                else {
                    recurse(each.cards);
                }
                this.notificationData = notificationData;
                this.updateList(listId, each.cards, listName);
                this.currentItemValue = null;
            }
        }
        function recurse(obj) {
            for (var key in obj) {
                var item = obj[key];
                if (typeof item === "object")
                    recurse(item);
                else {
                    if (item == itemId) {
                        //console.log(itemArr[1]);
                        if (itemClass == 'fa-plus') {
                            obj.children.push({
                                children: [],
                                id: shortid.generate(),
                                status: false,
                                title: currentItemValue
                            });
                            notificationData = {
                                sender: notifUserId,
                                collabrators: collabrators,
                                content: {
                                    info: "New Child Item \"" + currentItemValue + "\"  added to \"" + listName + "\" by " + notifUserDetails.firstName + " " + notifUserDetails.lastName + "."
                                }
                            };
                        }
                        else if (itemClass == 'fa-edit') {
                            console.log(obj);
                            notificationData = {
                                sender: notifUserId,
                                collabrators: collabrators,
                                content: {
                                    info: "Child Item title of List \"" + listName + "\" changed from \"" + obj.title + "\" to " + currentItemValue + "\" by " + notifUserDetails.firstName + " " + notifUserDetails.lastName + "."
                                }
                            };
                            obj.title = currentItemValue;
                        }
                    }
                }
            }
        }
        function markComplete(obj) {
            for (var key in obj) {
                var item = obj[key];
                if (typeof item === "object")
                    markComplete(item);
                else {
                    //debugger;
                    if (item == itemId) {
                        markCheck(obj, !obj.status);
                        if (!obj.status) {
                            notificationData = {
                                sender: notifUserId,
                                collabrators: collabrators,
                                content: {
                                    info: "Item \"" + obj.title + "\" marked as open by " + notifUserDetails.firstName + " " + notifUserDetails.lastName + "."
                                }
                            };
                        }
                        else {
                            notificationData = {
                                sender: notifUserId,
                                collabrators: collabrators,
                                content: {
                                    info: "Item \"" + obj.title + "\" marked as closed by " + notifUserDetails.firstName + " " + notifUserDetails.lastName + "."
                                }
                            };
                        }
                    }
                }
            }
        }
        function markCheck(obj, status) {
            for (var key in obj) {
                var item = obj[key];
                if (typeof item === "object")
                    markCheck(item, status);
                else {
                    obj.status = status;
                }
            }
        }
        function removeFromTree(parent, childNameToRemove) {
            parent.children = parent.children
                .filter(function (child) { return child.id !== childNameToRemove; })
                .map(function (child) { return removeFromTree(child, childNameToRemove); });
            return parent;
        }
    };
    TodoListComponent.prototype.parseNodes = function (nodes) {
        var ol = document.createElement("UL");
        ol.className = "list-group list-group-flush";
        for (var i = 0; i < nodes.length; i++) {
            ol.appendChild(this.parseNode(nodes[i]));
        }
        return ol;
    };
    TodoListComponent.prototype.parseNode = function (node) {
        var li = document.createElement("LI");
        li.innerHTML += node.title;
        if (node.status) {
            li.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i style=\"cursor: pointer;\"  class=\"fas fa-check-circle node_" + node.id + "\" ></i>";
        }
        else {
            li.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i style=\"cursor: pointer;\"  class=\"far fa-check-circle node_" + node.id + "\" ></i>";
        }
        li.innerHTML += "&nbsp;&nbsp;&nbsp;<i style=\"cursor: pointer;\"  class=\"fas fa-trash node_" + node.id + "\" ></i>";
        li.innerHTML += "&nbsp;&nbsp;&nbsp;<i style=\"cursor: pointer;\" title=" + node.title + " class=\"fas fa-edit node_" + node.id + "\" ></i>";
        li.innerHTML += "&nbsp;&nbsp;&nbsp;<i  style=\"cursor: pointer;\" class=\"fas fa-plus node_" + node.id + "\" ></i>&nbsp;&nbsp;&nbsp;";
        li.setAttribute('id', node.id);
        li.className = "list-group-item";
        if (node.children) {
            li.appendChild(this.parseNodes(node.children));
        }
        return li;
    };
    TodoListComponent.prototype.closeModal = function () {
        this.modalReference.close();
    };
    TodoListComponent.prototype.openNav = function () {
        document.getElementById("mySidebar").style.width = "350px";
    };
    TodoListComponent.prototype.closeNav = function () {
        document.getElementById("mySidebar").style.width = "0";
    };
    __decorate([
        core_2.ViewChild('modalContent'),
        __metadata("design:type", core_1.TemplateRef)
    ], TodoListComponent.prototype, "modalContent", void 0);
    __decorate([
        core_2.ViewChild('modalContent1'),
        __metadata("design:type", core_1.TemplateRef)
    ], TodoListComponent.prototype, "modalContent1", void 0);
    __decorate([
        core_2.ViewChild('modalContent2'),
        __metadata("design:type", core_1.TemplateRef)
    ], TodoListComponent.prototype, "modalContent2", void 0);
    TodoListComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-list',
            templateUrl: './todo-list.component.html',
            styleUrls: ['./todo-list.component.css']
        }),
        __metadata("design:paramtypes", [ng_snotify_1.SnotifyService, user_service_service_1.UserServiceService, core_2.ElementRef, list_service_service_1.ListServiceService, router_1.Router, router_1.ActivatedRoute, modal_module_1.NgbModal, socket_service_service_1.SocketServiceService])
    ], TodoListComponent);
    return TodoListComponent;
}());
exports.TodoListComponent = TodoListComponent;
//# sourceMappingURL=todo-list.component.js.map