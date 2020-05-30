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
var ng_snotify_2 = require("ng-snotify");
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var ListviewComponent = /** @class */ (function () {
    function ListviewComponent(snotifyService, userSerrvice, el, listService, router, _router, modal, socketService) {
        var _this = this;
        this.snotifyService = snotifyService;
        this.userSerrvice = userSerrvice;
        this.el = el;
        this.listService = listService;
        this.router = router;
        this._router = _router;
        this.modal = modal;
        this.socketService = socketService;
        this.getCurrentUserInfo = function () {
            var details = {
                userId: _this.userId
            };
            _this.userSerrvice.getUserDetails(details).subscribe(function (response) {
                if (response.status == 200) {
                    _this.currentUserDetails = response.data[0];
                }
            });
        }; //  end of get currentUserInfo
        this.getAllLists = function () {
            _this.listService.getAllListOfUser(_this.userId).subscribe(function (response) {
                _this.allLists = response.data;
                // console.log(this.allLists)
            });
        }; // end of  get alll lists of user
        this.record = function () {
            //start 
            // let uo = {userId:this.userId}
            // this.userSerrvice.getUserDetails(uo).subscribe((response)=>{
            //   let ci = response.data[0].currentIndex;
            //   ci = ci+1 
            //   let ucido = {
            //     userId:this.userId,
            //     currentIndex:ci
            //   }
            //   this.userSerrvice.updateIndex(ucido).subscribe((response));
            //   let data;
            //   this.listService.getAllListOfUser(this.userId).subscribe((response)=>{
            //   })
            //     let ld = {
            //       userId:this.userId,
            //       indexPos:ci-1,
            //       hList:this.allLists
            //     } 
            //     this.userSerrvice.updateList(ld).subscribe((response));
            // }) // end of http call
            // end
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) { });
        };
        this.addCard = function (event) {
            if (event.keyCode == 13) {
                var abc = {
                    userId: _this.userId,
                    list: _this.allLists
                };
                _this.userSerrvice.updateList(abc).subscribe(function (response) {
                    if (response.status == 200) {
                        var id = event.target.id.slice(7);
                        var value = event.target.value;
                        var _loop_1 = function (list) {
                            if (list.listId == id) {
                                var newCard_1 = {
                                    title: value,
                                    cardId: shortid.generate(),
                                    done: '',
                                    subcard: []
                                };
                                list.cards.push(newCard_1);
                                _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                    if (response.status == 200) {
                                        // alert('list updated successfully');
                                        if (_this.guestUserId) {
                                            var data = {
                                                userId: _this.currentUserDetails.userId,
                                                frndList: _this.currentUserDetails.friendList,
                                                content: {
                                                    info: "New card " + newCard_1.title + " add to " + _this.currentUserDetails.firstName + "'s list " + list.listName + " by " + _this.guestUserDetails.firstName
                                                }
                                            };
                                            // let obj ={
                                            //   fromUserId:this.currentUserDetails.userId,
                                            //   fromEmail:this.currentUserDetails.email,
                                            //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                            // }
                                            // data.frndList.push(obj);
                                            _this.socketService.newChange(data);
                                        }
                                        else {
                                            var data = {
                                                frndList: _this.currentUserDetails.friendList,
                                                content: {
                                                    info: "New card " + newCard_1.title + " add to " + _this.currentUserDetails.firstName + "'s list " + list.listName + " by him/her self"
                                                }
                                            };
                                            _this.socketService.newChange(data);
                                        }
                                        //end
                                    }
                                    event.target.value = '';
                                    _this.showAdd(_this.addCardEvent);
                                });
                            }
                        };
                        for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                            var list = _a[_i];
                            _loop_1(list);
                        }
                    }
                });
                //   setTimeout(() => {
                // }, 500);
            }
        }; // end of add card
        this.showAdd = function (event) {
            // console.log(event.target.parentElement.id);
            _this.addCardEvent = event;
            var id = event.target.parentElement.id.slice(3);
            var x = document.getElementById("af" + id);
            if (x.style.display === "none") {
                x.style.display = "block";
            }
            else {
                x.style.display = "none";
            }
        }; // end of showadd
        this.addSubCard = function (event) {
            if (event.keyCode == 13) {
                var abc = {
                    userId: _this.userId,
                    list: _this.allLists
                };
                _this.userSerrvice.updateList(abc).subscribe(function (response) {
                    if (response.status == 200) {
                        var listId = event.target.id.slice(10, 19);
                        var cardId = event.target.id.slice(20, 29);
                        var _loop_2 = function (list) {
                            if (list.listId == listId) {
                                var _loop_3 = function (card) {
                                    if (card.cardId == cardId) {
                                        var newSubCard_1 = {
                                            cardId: cardId,
                                            subCardTitle: event.target.value
                                        };
                                        card.subcard.push(newSubCard_1);
                                        _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                            if (response.status == 200) {
                                                // alert('Subcard added successfully');
                                                if (_this.guestUserId) {
                                                    var data = {
                                                        userId: _this.currentUserDetails.userId,
                                                        frndList: _this.currentUserDetails.friendList,
                                                        content: {
                                                            info: "New Subcard: " + newSubCard_1.subCardTitle + " added to " + _this.currentUserDetails.firstName + "'s List: " + list.listName + ", Card:" + card.title + " by " + _this.guestUserDetails.firstName
                                                        }
                                                    };
                                                    // let obj ={
                                                    //   userId:this.currentUserDetails.userId,
                                                    //   fromUserId:this.currentUserDetails.userId,
                                                    //   fromEmail:this.currentUserDetails.email,
                                                    //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                                    // }
                                                    // data.frndList.push(obj);
                                                    _this.socketService.newChange(data);
                                                }
                                                else {
                                                    var data = {
                                                        frndList: _this.currentUserDetails.friendList,
                                                        content: {
                                                            info: "New Subcard: " + newSubCard_1.subCardTitle + " added to " + _this.currentUserDetails.firstName + "'s List: " + list.listName + ", Card:" + card.title + "  by him/herself"
                                                        }
                                                    };
                                                    _this.socketService.newChange(data);
                                                } // end
                                            }
                                            event.target.value = '';
                                            _this.showAddSubCard(_this.showAddSubCardEvent);
                                        });
                                    }
                                };
                                for (var _i = 0, _a = list.cards; _i < _a.length; _i++) {
                                    var card = _a[_i];
                                    _loop_3(card);
                                }
                            } // end of if
                        };
                        for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                            var list = _a[_i];
                            _loop_2(list);
                        }
                    } // end of response status
                });
            }
            // console.log(event.srcElement.parentElement.childNodes[0].innerText)
        }; //  end of add subcard
        this.showAddSubCard = function (event) {
            // console.log(event.target.parentElement)
            _this.showAddSubCardEvent = event;
            var id = event.target.parentElement.id.slice(2);
            var x = document.getElementById("i" + id);
            if (x.style.display === "none") {
                x.style.display = "block";
            }
            else {
                x.style.display = "none";
            }
        }; // end of show add subcard
        this.newList = function () {
            _this.modal.open(_this.modalContent, { size: 'lg' });
        }; // end of new list
        this.saveNew = function () {
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                // console.log(response);
                if (response.status == 200) {
                    var details_1 = {
                        userId: _this.userId,
                        listName: _this.newListName,
                        cards: []
                    };
                    _this.listService.createNewList(details_1).subscribe(function (response) {
                        if (response.status == 200) {
                            // alert('new list create')
                            _this.snotifyService.success('List created');
                            _this.getAllLists();
                            if (_this.guestUserId) {
                                var data = {
                                    userId: _this.currentUserDetails.userId,
                                    frndList: _this.currentUserDetails.friendList,
                                    content: {
                                        info: "new List " + details_1.listName + " has been added to " + _this.currentUserDetails.firstName + "'s list by " + _this.guestUserDetails.firstName
                                    }
                                };
                                // let obj ={
                                //   userId:this.currentUserDetails.userId,
                                //   fromUserId:this.currentUserDetails.userId,
                                //   fromEmail:this.currentUserDetails.email,
                                //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                // }
                                // data.frndList.push(obj);
                                _this.socketService.newChange(data);
                            }
                            else {
                                var data = {
                                    frndList: _this.currentUserDetails.friendList,
                                    content: {
                                        info: "new List " + details_1.listName + " has been added to " + _this.currentUserDetails.firstName + "'s list by him/her self"
                                    }
                                };
                                _this.socketService.newChange(data);
                            }
                        }
                    });
                    _this.newListName = '';
                }
            });
            // setTimeout(() => {
            // }, 500);
        }; //  end of save new list
        this.editCardTitle = function (event) {
            //  console.log(event.path[1].id);
            _this.listtIdForEditing = event.target.id.slice(5, 14);
            _this.cardIdForEditing = event.target.id.slice(15);
            // console.log(this.listtIdForEditing);
            // console.log(this.cardIdForEditing)
            _this.modal.open(_this.modalContent1);
        }; // end of edit card title
        this.saveEditedCard = function () {
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var _loop_4 = function (list) {
                        if (list.listId == _this.listtIdForEditing) {
                            var _loop_5 = function (card) {
                                if (card.cardId == _this.cardIdForEditing) {
                                    card.title = _this.cardNameEdited;
                                    _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                        if (response.status == 200) {
                                            // alert('card title has been edited successfully');
                                            if (_this.guestUserId) {
                                                var data = {
                                                    userId: _this.currentUserDetails.userId,
                                                    frndList: _this.currentUserDetails.friendList,
                                                    content: {
                                                        info: "A card title has been edited to " + card.title + " in " + _this.currentUserDetails.firstName + "'s list:" + list.listName + " by " + _this.guestUserDetails.firstName
                                                    }
                                                };
                                                // let obj ={
                                                //   userId:this.currentUserDetails.userId,
                                                //   fromUserId:this.currentUserDetails.userId,
                                                //   fromEmail:this.currentUserDetails.email,
                                                //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                                // }
                                                // data.frndList.push(obj);
                                                _this.socketService.newChange(data);
                                            }
                                            else {
                                                var data = {
                                                    frndList: _this.currentUserDetails.friendList,
                                                    content: {
                                                        info: "A card title has been edited to " + card.title + " in " + _this.currentUserDetails.firstName + "'s list:" + list.listName + " by him/her self"
                                                    }
                                                };
                                                _this.socketService.newChange(data);
                                            } // end
                                            _this.cardNameEdited = '';
                                        }
                                    });
                                }
                            };
                            for (var _i = 0, _a = list.cards; _i < _a.length; _i++) {
                                var card = _a[_i];
                                _loop_5(card);
                            }
                        }
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var list = _a[_i];
                        _loop_4(list);
                    }
                } // end of response status
            });
        }; // end of save edited card
        this.deleteCard = function (event) {
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var listId = event.target.id.slice(4, 13);
                    var cardId = event.target.id.slice(14);
                    var _loop_6 = function (list) {
                        if (list.listId == listId) {
                            var _loop_7 = function (card) {
                                if (card.cardId == cardId) {
                                    var index = list.cards.indexOf(card);
                                    list.cards.splice(index, 1);
                                    _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                        if (response.status == 200) {
                                            // alert('card deleted successfully');
                                            if (_this.guestUserId) {
                                                var data = {
                                                    userId: _this.currentUserDetails.userId,
                                                    frndList: _this.currentUserDetails.friendList,
                                                    content: {
                                                        info: "Card: " + card.title + " has been delete in " + _this.currentUserDetails.firstName + "'s list: " + list.listName + " by " + _this.guestUserDetails.firstName
                                                    }
                                                };
                                                // let obj ={
                                                //   userId:this.currentUserDetails.userId,
                                                //   fromUserId:this.currentUserDetails.userId,
                                                //   fromEmail:this.currentUserDetails.email,
                                                //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                                // }
                                                // data.frndList.push(obj);
                                                _this.socketService.newChange(data);
                                            }
                                            else {
                                                var data = {
                                                    frndList: _this.currentUserDetails.friendList,
                                                    content: {
                                                        info: "Card: " + card.title + " has been delete in " + _this.currentUserDetails.firstName + "'s list: " + list.listName + " by him/her self"
                                                    }
                                                };
                                                _this.socketService.newChange(data);
                                            } // end
                                        }
                                    });
                                }
                            };
                            for (var _i = 0, _a = list.cards; _i < _a.length; _i++) {
                                var card = _a[_i];
                                _loop_7(card);
                            }
                        }
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var list = _a[_i];
                        _loop_6(list);
                    }
                } // end of response.status
            });
            // console.log(event.path[1].id);
            // console.log(event.path[1].id.slice(4,13));
            // console.log(event.path[1].id.slice(14));
        }; // end of delete card
        this.deleteSubCard = function (event) {
            // console.log(event.target.id);
            // console.log(event.path[0].id)
            // console.log(event.path[0].id.slice(5,14));
            // console.log(event.path[0].id.slice(15,24));
            // console.log(event.path[0].id.slice(25));
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var listId = event.target.id.slice(5, 14);
                    var cardId = event.target.id.slice(15, 24);
                    var subCardTitle = event.target.id.slice(25);
                    var _loop_8 = function (list) {
                        if (list.listId == listId) {
                            var _loop_9 = function (card) {
                                if (card.cardId == cardId) {
                                    var _loop_10 = function (subCard) {
                                        if (subCard.subCardTitle == subCardTitle) {
                                            var index = card.subcard.indexOf(subCard);
                                            card.subcard.splice(index);
                                            _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                                if (response.status == 200) {
                                                    // alert('subcard deleted successfully');
                                                    if (_this.guestUserId) {
                                                        var data = {
                                                            userId: _this.currentUserDetails.userId,
                                                            frndList: _this.currentUserDetails.friendList,
                                                            content: {
                                                                info: "SubCard:" + subCard.subCardTitle + " has been delete in Card: " + card.title + " in " + _this.currentUserDetails.firstName + "'s List: " + list.listName + " by " + _this.guestUserDetails.firstName
                                                            }
                                                        };
                                                        // let obj ={
                                                        //   userId:this.currentUserDetails.userId,
                                                        //   fromUserId:this.currentUserDetails.userId,
                                                        //   fromEmail:this.currentUserDetails.email,
                                                        //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                                        // }
                                                        // data.frndList.push(obj);
                                                        _this.socketService.newChange(data);
                                                    }
                                                    else {
                                                        var data = {
                                                            frndList: _this.currentUserDetails.friendList,
                                                            content: {
                                                                info: "SubCard:" + subCard.subCardTitle + " has been delete in Card: " + card.title + " in " + _this.currentUserDetails.firstName + "'s List: " + list.listName + " by him/her self"
                                                            }
                                                        };
                                                        _this.socketService.newChange(data);
                                                    } // end
                                                }
                                            });
                                        }
                                    };
                                    for (var _i = 0, _a = card.subcard; _i < _a.length; _i++) {
                                        var subCard = _a[_i];
                                        _loop_10(subCard);
                                    }
                                }
                            };
                            for (var _i = 0, _a = list.cards; _i < _a.length; _i++) {
                                var card = _a[_i];
                                _loop_9(card);
                            }
                        }
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var list = _a[_i];
                        _loop_8(list);
                    }
                } // end of response status
            });
        };
        this.editListTitle = function (event) {
            // console.log(event.path[0].id)
            // console.log(event.path[0].id.slice(5));
            _this.idOfListTitleToBeEdited = event.target.id.slice(5);
            _this.modal.open(_this.modalContent2);
        }; // end of edit list title
        this.saveEditedList = function () {
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var _loop_11 = function (list) {
                        if (list.listId == _this.idOfListTitleToBeEdited) {
                            list.listName = _this.ListNameEdited;
                            _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                if (response.status == 200) {
                                    // alert('list title edited');
                                    if (_this.guestUserId) {
                                        var data = {
                                            userId: _this.currentUserDetails.userId,
                                            frndList: _this.currentUserDetails.friendList,
                                            content: {
                                                info: "A list in " + _this.currentUserDetails.firstName + "'s list's has been edited to " + list.listName + " by " + _this.guestUserDetails.firstName
                                            }
                                        };
                                        // let obj ={
                                        //   userId:this.currentUserDetails.userId,
                                        //   fromUserId:this.currentUserDetails.userId,
                                        //   fromEmail:this.currentUserDetails.email,
                                        //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                        // }
                                        // data.frndList.push(obj);
                                        _this.socketService.newChange(data);
                                    }
                                    else {
                                        var data = {
                                            frndList: _this.currentUserDetails.friendList,
                                            content: {
                                                info: "A list in " + _this.currentUserDetails.firstName + "'s list's has been edited to " + list.listName + " by him/her self"
                                            }
                                        };
                                        _this.socketService.newChange(data);
                                    } // end
                                }
                                _this.ListNameEdited = '';
                            });
                        }
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var list = _a[_i];
                        _loop_11(list);
                    }
                } // end of response status
            });
        }; //  end of save edited list
        this.deleteList = function (event) {
            // console.log(event.path[0].id);
            // console.log(event.path[0].id.slice(4));
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var details = {
                        listId: event.target.id.slice(4)
                    };
                    var temp_1;
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var each = _a[_i];
                        if (each.listId == details.listId)
                            temp_1 = each.listName;
                    }
                    _this.listService.deleteList(details).subscribe(function (response) {
                        if (response.status == 200) {
                            _this.getAllLists();
                            // alert('list deleted successfully');
                            if (_this.guestUserId) {
                                var data = {
                                    userId: _this.currentUserDetails.userId,
                                    frndList: _this.currentUserDetails.friendList,
                                    content: {
                                        info: _this.currentUserDetails.firstName + "'s list: " + temp_1 + " has been deleted by " + _this.guestUserDetails.firstName
                                    }
                                };
                                // let obj ={
                                //   userId:this.currentUserDetails.userId,
                                //   fromUserId:this.currentUserDetails.userId,
                                //   fromEmail:this.currentUserDetails.email,
                                //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                // }
                                // data.frndList.push(obj);
                                _this.socketService.newChange(data);
                            }
                            else {
                                var data = {
                                    frndList: _this.currentUserDetails.friendList,
                                    content: {
                                        info: _this.currentUserDetails.firstName + "'s list: " + temp_1 + " has been deleted by him/herself"
                                    }
                                };
                                _this.socketService.newChange(data);
                            } // end
                        }
                    });
                } // end of response status
            });
        }; // end of delete list
        this.undo = function () {
            var abc = {
                userId: _this.userId
            };
            _this.userSerrvice.getUserDetails(abc).subscribe(function (response) {
                var index = response.data[0].listArr.length - 1;
                _this.allLists = response.data[0].listArr[index];
                response.data[0].listArr.pop();
                var xyz = {
                    userId: _this.userId,
                    listArr: response.data[0].listArr
                };
                _this.userSerrvice.UpdateUser(xyz).subscribe(function (response1) {
                });
            });
            var forDeleting = {
                userId: _this.userId
            };
            setTimeout(function () {
                _this.listService.deleteAllListsOfUser(forDeleting).subscribe(function (response) {
                    if (response.status == 200) {
                        for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                            var list = _a[_i];
                            _this.listService.createNewList(list).subscribe((response));
                        }
                    } // end of response status
                });
                if (_this.guestUserId) {
                    _this.socketService.undo(_this.userId);
                }
                _this.snotifyService.warning('Rolling back please wait');
            }, 500);
            // for(let list of this.allLists){
            //   if(list.cards.length==0){
            //     this.listService.deleteList(list).subscribe((response)=>{})
            //   }else if(!list.cards){
            //     this.listService.updateListUsingListId(list).subscribe((response)=>{})
            //   }else{
            //     this.listService.updateListUsingListId(list).subscribe((response)=>{})
            //   }
            // }
        }; //  end of undo
        this.markAsDone = function (event) {
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var id = event.target.id.slice(2);
                    var _loop_12 = function (list) {
                        if (list.listId == id) {
                            list.done = "(Done)";
                            _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                if (response.status == 200) {
                                    if (_this.guestUserId) {
                                        var data = {
                                            userId: _this.currentUserDetails.userId,
                                            frndList: _this.currentUserDetails.friendList,
                                            content: {
                                                info: "List:" + list.listName + " in " + _this.currentUserDetails.firstName + "'s list's has been marked as done by " + _this.guestUserDetails.firstName
                                            }
                                        };
                                        // let obj ={
                                        //   userId:this.currentUserDetails.userId,
                                        //   fromUserId:this.currentUserDetails.userId,
                                        //   fromEmail:this.currentUserDetails.email,
                                        //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                        // }
                                        // data.frndList.push(obj);
                                        _this.socketService.newChange(data);
                                    }
                                    else {
                                        var data = {
                                            frndList: _this.currentUserDetails.friendList,
                                            content: {
                                                info: "List:" + list.listName + " in " + _this.currentUserDetails.firstName + "'s list's has been marked as done by him/her self"
                                            }
                                        };
                                        _this.socketService.newChange(data);
                                    } //end
                                }
                            });
                        }
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var list = _a[_i];
                        _loop_12(list);
                    }
                } // end of response status
            });
        }; // end of mark as Done
        this.markAsOpen = function (event) {
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var id = event.target.id.slice(2);
                    var _loop_13 = function (list) {
                        if (list.listId == id) {
                            list.done = '';
                            _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                if (response.status == 200) {
                                    if (_this.guestUserId) {
                                        var data = {
                                            userId: _this.currentUserDetails.userId,
                                            frndList: _this.currentUserDetails.friendList,
                                            content: {
                                                info: "List:" + list.listName + " in " + _this.currentUserDetails.firstName + "'s list's has been marked as Open by " + _this.guestUserDetails.firstName
                                            }
                                        };
                                        // let obj ={
                                        //   userId:this.currentUserDetails.userId,
                                        //   fromUserId:this.currentUserDetails.userId,
                                        //   fromEmail:this.currentUserDetails.email,
                                        //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                        // }
                                        // data.frndList.push(obj);
                                        _this.socketService.newChange(data);
                                    }
                                    else {
                                        var data = {
                                            frndList: _this.currentUserDetails.friendList,
                                            content: {
                                                info: "List:" + list.listName + " in " + _this.currentUserDetails.firstName + "'s list's has been marked as open by him/her self"
                                            }
                                        };
                                        _this.socketService.newChange(data);
                                    } //end
                                }
                            });
                        }
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var list = _a[_i];
                        _loop_13(list);
                    }
                } // end of response status
            });
        }; // end of mark as Open
        this.markCardAsDone = function (event) {
            // console.log(event.target.id);
            // console.log(event.target.id.slice(3,12))
            // console.log(event.target.id.slice(13));
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var listId = event.target.id.slice(3, 12);
                    var cardId = event.target.id.slice(13);
                    var _loop_14 = function (list) {
                        if (list.listId = listId) {
                            var _loop_15 = function (card) {
                                if (card.cardId == cardId) {
                                    card.done = "(Done)";
                                    _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                        if (response.status == 200) {
                                            if (_this.guestUserId) {
                                                var data = {
                                                    userId: _this.currentUserDetails.userId,
                                                    frndList: _this.currentUserDetails.friendList,
                                                    content: {
                                                        info: "Card:" + card.title + " in list " + list.listName + " in " + _this.currentUserDetails.firstName + "'s list's has been marked as done by " + _this.guestUserDetails.firstName
                                                    }
                                                };
                                                // let obj ={
                                                //   userId:this.currentUserDetails.userId,
                                                //   fromUserId:this.currentUserDetails.userId,
                                                //   fromEmail:this.currentUserDetails.email,
                                                //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                                // }
                                                // data.frndList.push(obj);
                                                _this.socketService.newChange(data);
                                            }
                                            else {
                                                var data = {
                                                    frndList: _this.currentUserDetails.friendList,
                                                    content: {
                                                        info: "Card:" + card.title + " in list " + list.listName + " in " + _this.currentUserDetails.firstName + "'s list's has been marked as done by him/her self"
                                                    }
                                                };
                                                _this.socketService.newChange(data);
                                            } //end  
                                        }
                                    });
                                }
                            };
                            for (var _i = 0, _a = list.cards; _i < _a.length; _i++) {
                                var card = _a[_i];
                                _loop_15(card);
                            }
                        }
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var list = _a[_i];
                        _loop_14(list);
                    }
                } //  end of response status
            });
        }; // end of mark card as done
        this.markCardAsOpen = function (event) {
            // console.log(event.target.id);
            // console.log(event.target.id.slice(3,12))
            // console.log(event.target.id.slice(13));
            var abc = {
                userId: _this.userId,
                list: _this.allLists
            };
            _this.userSerrvice.updateList(abc).subscribe(function (response) {
                if (response.status == 200) {
                    var listId = event.target.id.slice(3, 12);
                    var cardId = event.target.id.slice(13);
                    var _loop_16 = function (list) {
                        if (list.listId = listId) {
                            var _loop_17 = function (card) {
                                if (card.cardId == cardId) {
                                    card.done = '';
                                    _this.listService.updateListUsingListId(list).subscribe(function (response) {
                                        if (response.status == 200) {
                                            if (_this.guestUserId) {
                                                var data = {
                                                    userId: _this.currentUserDetails.userId,
                                                    frndList: _this.currentUserDetails.friendList,
                                                    content: {
                                                        info: "Card:" + card.title + " in list " + list.listName + " in " + _this.currentUserDetails.firstName + "'s list's has been marked as open by " + _this.guestUserDetails.firstName
                                                    }
                                                };
                                                // let obj ={
                                                //   userId:this.currentUserDetails.userId,
                                                //   fromUserId:this.currentUserDetails.userId,
                                                //   fromEmail:this.currentUserDetails.email,
                                                //   fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
                                                // }
                                                // data.frndList.push(obj);
                                                _this.socketService.newChange(data);
                                            }
                                            else {
                                                var data = {
                                                    frndList: _this.currentUserDetails.friendList,
                                                    content: {
                                                        info: "Card:" + card.title + " in list " + list.listName + " in " + _this.currentUserDetails.firstName + "'s list's has been marked as open by him/her self"
                                                    }
                                                };
                                                _this.socketService.newChange(data);
                                            } //end  
                                        }
                                    });
                                }
                            };
                            for (var _i = 0, _a = list.cards; _i < _a.length; _i++) {
                                var card = _a[_i];
                                _loop_17(card);
                            }
                        }
                    };
                    for (var _i = 0, _a = _this.allLists; _i < _a.length; _i++) {
                        var list = _a[_i];
                        _loop_16(list);
                    }
                } //  end of response status
            });
        }; // end of mark card as open
        this.searchKey = {
            email: ''
        };
        this.searchFunction = function () {
            _this.userSerrvice.getUserDetailsUsingEmail(_this.searchKey).subscribe(function (response) {
                _this.alreadyFrnd = false;
                _this.requestAlreadySent = false;
                // console.log(response);
                if (response.status == 200) {
                    _this.searchResult = response.data;
                    for (var _i = 0, _a = _this.currentUserDetails.friendList; _i < _a.length; _i++) {
                        var each = _a[_i];
                        if (response.data.userId == each.fromUserId) {
                            _this.alreadyFrnd = true;
                        }
                    }
                    for (var _b = 0, _c = _this.searchResult.friendReq; _b < _c.length; _b++) {
                        var each = _c[_b];
                        if (each.fromUserId == _this.currentUserDetails.userId) {
                            _this.requestAlreadySent = true;
                        }
                    }
                }
                else {
                    _this.snotifyService.warning('no such user exists');
                }
            }, (function (err) {
                _this.snotifyService.error('some error occured');
            }));
        }; //  end of search function
        this.userDetails = this.userSerrvice.getUserInfoInLocalStorage();
        this.sendRequest = function () {
            if (_this.userDetails.userId == _this.searchResult.userId) {
                _this.snotifyService.error('You cannot send a friend request to yourself');
            }
            else {
                var details_2 = {
                    userId: _this.searchResult.userId,
                    fromUserId: _this.userDetails.userId,
                    fromName: _this.userDetails.firstName + ' ' + _this.userDetails.lastName,
                    fromEmail: _this.userDetails.email
                };
                _this.userSerrvice.sendFrndRequest(details_2).subscribe(function (response) {
                    if (response.status == 200) {
                        _this.snotifyService.success('frnd request sent');
                        _this.searchFunction();
                        _this.socketService.frndRequestSent(details_2.userId);
                    }
                });
            }
        }; // end of send request
        this.acceptRequest = function (event) {
            // alert(event.target.id.slice(3));
            // console.log(event.path[0].id);
            // console.log(event.path[0].id.slice(3));
            var details = {
                userId: _this.userId,
                fromUserId: event.target.id.slice(3)
            };
            console.log(details);
            _this.userSerrvice.moveUser(details).subscribe(function (response) {
                if (response.status == 200) {
                    // alert('user moved');
                    _this.getCurrentUserInfo();
                    var data = {
                        id: details.fromUserId,
                        name: _this.currentUserDetails.firstName + ' ' + _this.currentUserDetails.lastName
                    };
                    _this.socketService.requestAccepted(data);
                }
            });
        }; //  end of accept request
        this.goToUserList = function (event) {
            var id = event.path[0].id.slice(2);
            window.open("/frnd/" + _this.userId + "/" + id, "_blank", "toolbar=yes,top=1000,left=1000,width=1000,height=1000");
        }; //  end of go to user List
        this.getGuestUserDetails = function () {
            var details = {
                userId: _this.guestUserId
            };
            _this.userSerrvice.getUserDetails(details).subscribe(function (response) {
                if (response.status == 200) {
                    _this.guestUserDetails = response.data[0];
                }
            });
        }; //  end of getGuestUserDetails
        this.register = function () {
            _this.socketService.sendUserId().subscribe(function (data) {
                _this.socketService.userId(_this.userId);
            });
        }; //  end of register
        this.checkForChanges = function () {
            _this.socketService.check().subscribe(function (data) {
                if (_this.guestUserId) {
                }
                else {
                    _this.changeInfo = data.content.info;
                    _this.modal.open(_this.modalContent3);
                    _this.getAllLists();
                }
            });
        }; // end of check for change
        this.searchEmailKeyUp = function (event) {
            if (event.keyCode == 13) {
                _this.searchFunction();
            }
            else {
                if (!_this.searchKey.email) {
                    _this.searchResult = '';
                    _this.getAllUsers();
                }
            }
        }; // end of search email keyup
        this.getAllUsers = function () {
            _this.userSerrvice.getAllUsers().subscribe(function (response) {
                // console.log(response);
                if (response.status == 200) {
                    _this.allUsersEmail = response.data;
                }
            });
        }; // end of get all users
        this.refresh = function () {
            _this.socketService.refresh().subscribe(function (data) {
                _this.getCurrentUserInfo();
                _this.snotifyService.create({
                    title: "request",
                    body: 'new friend request',
                    config: {
                        position: ng_snotify_2.SnotifyPosition.centerTop,
                        type: 'success'
                    }
                });
                document.getElementById('navbarDropdown').click();
            });
        }; //  end of refresh
        this.newFriend = function () {
            _this.socketService.newFriend().subscribe(function (data) {
                _this.getCurrentUserInfo();
                // this.snotifyService.info(`Friend request accepted by ${data.name}`);
                _this.snotifyService.create({
                    title: "Friend Request",
                    body: "Friend Request accepted by " + data.name,
                    config: {
                        position: ng_snotify_2.SnotifyPosition.centerTop,
                        type: 'confirm'
                    }
                });
            });
        }; //  end of new friend
        this.saveNewKeyUp = function (event) {
            if (event.keyCode == 13) {
                _this.saveNew();
                _this.click(1, 1);
            }
        }; // end of save new key up
        this.saveEditedCardKeyUp = function (event) {
            if (event.keyCode == 13) {
                _this.saveEditedCard();
                _this.click(1, 1);
            }
        }; //  end of save edited card key up
        this.saveEditedListKeyUp = function (event) {
            if (event.keyCode == 13) {
                _this.saveEditedList();
                _this.click(1, 1);
            }
        }; //  end of save edited list keyup
        this.routeCheck = function () {
            if (ng2_cookies_1.Cookie.get('authToken') == '' || ng2_cookies_1.Cookie.get('authToken') == null || ng2_cookies_1.Cookie.get('authToken') == undefined || (!ng2_cookies_1.Cookie.get('authToken'))) {
                _this.router.navigate(['/login']);
            }
        };
        this.logout = function () {
            ng2_cookies_1.Cookie.delete('authToken');
            _this.router.navigate(['/home']);
        };
        this.checkForUndo = function () {
            _this.socketService.undoEvent().subscribe(function (data) {
                if (_this.guestUserId) {
                }
                else {
                    _this.snotifyService.create({
                        title: "Change",
                        body: 'an action has been undone in your lists, the list has been updated',
                        config: {
                            position: ng_snotify_2.SnotifyPosition.leftTop,
                            type: 'warning'
                        }
                    });
                    setTimeout(function () {
                        _this.getAllLists();
                    }, 500);
                }
            });
        }; // end of checkForUndo
    }
    ListviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeCheck();
        this.userId = this._router.snapshot.paramMap.get('userId');
        this.guestUserId = this._router.snapshot.paramMap.get('guestUserId');
        this.getAllLists();
        this.getCurrentUserInfo();
        document.onkeydown = function (event) {
            // console.log(event.keyCode );
            if (event.keyCode == 90 && event.ctrlKey) {
                _this.undo();
            }
        };
        this.getGuestUserDetails();
        this.register();
        this.checkForChanges();
        this.getAllUsers();
        this.refresh();
        this.newFriend();
        this.checkForUndo();
    }; // end of on init
    ListviewComponent.prototype.KeyPress = function (e) {
        // if (e.keyCode == 90 && e.ctrlKey) alert("Ctrl+z");
        alert(e.keyCode);
    };
    ListviewComponent.prototype.click = function (x, y) {
        var ev = document.createEvent("MouseEvent");
        var el = document.elementFromPoint(x, y);
        ev.initMouseEvent("click", true /* bubble */, true /* cancelable */, window, null, x, y, 0, 0, /* coordinates */ false, false, false, false, /* modifier keys */ 0 /*left*/, null);
        el.dispatchEvent(ev);
    }; //  end of click
    __decorate([
        core_2.ViewChild('modalContent'),
        __metadata("design:type", core_1.TemplateRef)
    ], ListviewComponent.prototype, "modalContent", void 0);
    __decorate([
        core_2.ViewChild('modalContent1'),
        __metadata("design:type", core_1.TemplateRef)
    ], ListviewComponent.prototype, "modalContent1", void 0);
    __decorate([
        core_2.ViewChild('modalContent2'),
        __metadata("design:type", core_1.TemplateRef)
    ], ListviewComponent.prototype, "modalContent2", void 0);
    __decorate([
        core_2.ViewChild('modalContent3'),
        __metadata("design:type", core_1.TemplateRef)
    ], ListviewComponent.prototype, "modalContent3", void 0);
    ListviewComponent = __decorate([
        core_1.Component({
            selector: 'app-listview',
            templateUrl: './listview.component.html',
            styleUrls: ['./listview.component.css']
        }),
        __metadata("design:paramtypes", [ng_snotify_1.SnotifyService, user_service_service_1.UserServiceService, core_2.ElementRef, list_service_service_1.ListServiceService, router_1.Router, router_1.ActivatedRoute, modal_module_1.NgbModal, socket_service_service_1.SocketServiceService])
    ], ListviewComponent);
    return ListviewComponent;
}()); // end of class
exports.ListviewComponent = ListviewComponent;
//# sourceMappingURL=listview.component.js.map