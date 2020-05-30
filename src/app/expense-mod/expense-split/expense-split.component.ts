import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListServiceService } from '../../list-service.service';
import { allResolved } from 'q';
import { Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
const shortid = require('shortid');
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { OrderPipe } from 'ngx-order-pipe';
import { UserServiceService } from '../../user-service.service';
import { SocketServiceService } from '../../socket-service.service';
import { SnotifyService } from 'ng-snotify';
import { SnotifyPosition } from 'ng-snotify';
import { Cookie } from 'ng2-cookies/ng2-cookies';

var moment = require('moment');


import * as $ from 'jquery';


@Component({
  selector: 'app-expense-split',
  templateUrl: './expense-split.component.html',
  styleUrls: ['./expense-split.component.css']
})
export class ExpenseSplitComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalContent1') modalContent1: TemplateRef<any>;
  @ViewChild('modalContent2') modalContent2: TemplateRef<any>;
  @ViewChild('modalContent3') modalContent3: TemplateRef<any>;



  constructor(private snotifyService: SnotifyService, public userService: UserServiceService, public el: ElementRef, public listService: ListServiceService, public router: Router, public _router: ActivatedRoute, private modal: NgbModal, public socketService: SocketServiceService) { }


 //Declaring variables 
  public userId;
  public currentUserDetails;
  public collabVal = null;
  public collabVal1 = null;
 
  public loading = false;
  public allUsers=[];
 
  public searchResult;
  searchName = '';
  modalReference = null;
  public config;
  public collabData;

  public config1;
  public collabData1;

  public notificationData =null;
  public userIdMap={};

  public newExpDesc ='';
  public newExpAmt ='';
  public newExpMembers ='';
  public currentExpense=null;

  public expenseModalStatus='new';
  public currentexpenseItemId=null;
  public settleMap={};

  public settleTo=null;
  public settleFrom=null;
  public settleAmt=null;
  public currency="₹";

  


  ngOnInit() {

	  
	this.chechUser();
    this.userId = this.userService.getUserInfoInLocalStorage().userId;
    this.checkauth();
    this.getCurrentUserInfo();
    this.register();
    this.getAllUsers();
    this.getAllLists();
    this.checkForChanges();
    this.refresh();
    this.newFriendNotification();
    this.requestRejectNotification();




  }


  
  public chechUser=()=>{

    //debugger;

    console.log(this.userService.getUserInfoInLocalStorage())
	  
	  if(this.userService.getUserInfoInLocalStorage()==null)
	  {
      this.router.navigate(['/login']);
	  }
  }


//Method to get all the users of the application
  public getAllUsers = () =>{

    let details={
      userId:this.userId
    }

    this.userService.getAllUsers(details).subscribe((response)=>{
      // console.log(response);
      if(response.status==200){

        
     this.allUsers=response.data;
     console.log(this.allUsers);


     for(let ind of this.allUsers)
     {
      this.userIdMap[ind.userId]=ind.firstName+' '+ind.lastName;
       }
     
    

    console.log(this.userIdMap);

     for(let each of this.currentUserDetails.friendReq)
     {
       
       for(let ind of this.allUsers)
     {
       if(each.fromUserId==ind.userId){
         console.log(ind);

         this.allUsers[this.allUsers.indexOf(ind)].status='received';
       }
     
    }
  }


  for(let each of this.currentUserDetails.friendList)
  {
    
    for(let ind of this.allUsers)
  {
    if(each.fromUserId==ind.userId){
      console.log(ind);

      this.allUsers[this.allUsers.indexOf(ind)].status='done';
    }
  
 }
}

    }
    else  if(response.status==404 || response.status==500)
    {
      this.logout();
    }
    

      //this.logout()
    });
    } // end of get all users method




  //Method to send userId to socket for registering the user
  public register = () => {

    this.socketService.sendUserId().subscribe((data) => {
      this.socketService.userId(this.userId);
    })

  } //  end of register method

  public addhtml = (expense,expenseId) =>
  {

    let tempCur='';

    if(expense.length!=0)
    {

    var members={};

    for (let list of this.allLists)
    {
      if(list.expenseId==expenseId)
      {
        tempCur=list.currency;
     
          for( let s in list.collabrators)
          {
            members[list.collabrators[s]]=0;
          }

      }
    }

   

    for(let i=0;i<expense.length;i++){

      


      if(expense[i].settledTo=='')
      {

        

    // debugger;
      let totalMem=expense[i].paidTo.length;
      let temp:number=(expense[i].amount/totalMem);
      let totalSharedAmount:any=temp.toFixed(2);
      members[expense[i].paidBy]+=totalSharedAmount*totalMem;
      for(let j=0;j<expense[i].paidTo.length;j++)
      {
        members[expense[i].paidTo[j]]-=totalSharedAmount;

        members[expense[i].paidTo[j]]=Math.round( members[expense[i].paidTo[j]] *100)/100;
        
      }

    }
    else
    {
      members[expense[i].settledTo]-=expense[i].amount;
      members[expense[i].settledTo]=Math.round(members[expense[i].settledTo] *100)/100;
      members[expense[i].paidBy]+=expense[i].amount;
      members[expense[i].paidBy]=Math.round( members[expense[i].paidBy] *100)/100;
      
    }

      
  }

 

    //debugger;

    let htmlRes=splitPayments(members,this.userIdMap,this.currentUserDetails,this.settleMap,tempCur);


  if(htmlRes!="")
    return htmlRes ;
    else
    {
      return '<h4>All Settled Up</h4>';
    }




  }
  



  function splitPayments(payments,userIdMap,currentUserDetails,settleMap,currency) {
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);
    const sum:any = valuesPaid.reduce((acc:any, curr:any) => curr + acc);
    const mean = sum / people.length;
    const sortedPeople = people.sort((personA, personB) => payments[personA] - payments[personB]);
    const sortedValuesPaid = sortedPeople.map((person) => payments[person] - mean);
    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    let html='';
    settleMap[expenseId]={};

    while (i < j) {
    debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
    sortedValuesPaid[i] += debt;
    sortedValuesPaid[j] -= debt;

    
    
   

    //console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} $${debt}`);
   
    if( settleMap[expenseId][sortedPeople[i]]==undefined)
    {
      if(debt!=0)
      {
      settleMap[expenseId][sortedPeople[i]]=[{
        paidTo:sortedPeople[j],
        amount:debt
      }];
    }
    }
    else
    {
      if(debt!=0)
      {
      settleMap[expenseId][sortedPeople[i]].push({
        paidTo:sortedPeople[j],
        amount:debt
      });
    }
    }

    if(debt!=0)
    {

    if(sortedPeople[i]==currentUserDetails.userId)
    {

    html+=`<p>You owe ${userIdMap[sortedPeople[j]]} <b>${currency}${debt}</b></p>`;
    }
    else if(sortedPeople[j]==currentUserDetails.userId)
    {
      html+=`<p>${userIdMap[sortedPeople[i]]} owes you <b>${currency}${debt}</b></p>`;
    }
    else
    {
      html+=`<p>${userIdMap[sortedPeople[i]]} owes ${userIdMap[sortedPeople[j]]} <b>${currency}${debt}</b></p>`;
    }
  }

    if (sortedValuesPaid[i] === 0) {
    i++;
    }
    if (sortedValuesPaid[j] === 0) {
    j--;
    }
    }

    return html;

    }

   
  // console.log(members);


  }

  

  public viewHistory(expense){

    this.currentExpense=expense;

    this.modalReference = this.modal.open(this.modalContent3);

  }

  public historyModal(expense){

    let html='';

    

    for (let list of this.allLists)
    {
      if(list.expenseId==expense)
      {

        let history=list.expenseHistory;

        for(let data of history){

         
          html+='<div><b>'+data.data+'</b> <p> - '+moment(data.created).format('MMMM Do YYYY, h:mm:ss a')+'('+moment(data.created).startOf('hour').fromNow()+')</p></div>';
         
        }

      }



       

      }

      return html;


  }



  


 //Method to perform changes of particular list
  public updateList(listId, expense, title,historyData) {

    for (let list of this.allLists) {

      if (list.expenseId == listId) {


        list.expense = expense;
       list.expenseHistory.push(historyData);
        list.title = title;

        this.listService.updateListUsingListId(list).subscribe((response) => {
          if (response.status == 200) {
           
            this.socketService.newChange(this.notificationData);

            this.getAllLists();

            //end

          }
          else  if(response.status==404 || response.status==500)
          {
            this.logout();
          }
       
        });
      }

    }


  }
  //End of updateList method


  


  //Method to check for changes performed by users
  public changeInfo;
  public checkForChanges = () => {

    this.socketService.check().subscribe((data) => {

      this.changeInfo = data.content.info
      this.snotifyService.success(data.content.info, {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      this.getAllLists();

    })
  } // end of check for change method


  public editExpense=(expenseId,expense)=>{

    this.config1 = {
      labelField: 'label',
      valueField: 'value',
      maxItems: 1,
      highlight: true,
      create: false,
    };

    this.config = {
      labelField: 'label',
      valueField: 'value',
      maxItems: 10,
      highlight: true,
      create: false,
    };

    this.currentExpense=expenseId;


    this.collabData = [];

    var members={};

    for (let list of this.allLists)
    {
      if(list.expenseId==expenseId)
      {
     
          for( let s in list.collabrators)
          {
            //members[list.collabrators[s]]=0;
            this.collabData.push({ 'label': this.userIdMap[list.collabrators[s]], 'value':list.collabrators[s] });
          }

      }
    }
 


    this.newExpDesc=expense.expenseItemDesc;
    this.collabVal1=expense.paidBy;
    this.collabVal=expense.paidTo;
    this.newExpAmt=expense.amount;

    this.currentExpense=expenseId;

    this.expenseModalStatus='edit';

    this.currentexpenseItemId=expense.expenseItemId;

    this.modalReference = this.modal.open(this.modalContent2);



  }





  public settleAmount=(expenseId)=>{

    this.currentExpense=expenseId;

     
    this.collabData1 = [];
    this.collabVal1=null;
    $('#settlePaidTo').val('');
    $('#settleAmt').val('');   


    
    this.config1 = {
      labelField: 'label',
      valueField: 'value',
      maxItems: 1,
      highlight: true,
      create: false,
       onChange: function(value) {
        $('#settlePaidTo').val('');
        $('#settleAmt').val('');       
    }
    };

    this.config = {
      labelField: 'label',
      valueField: 'value',
      maxItems: 1,
      highlight: true,
      create: false,
    };

    function changeConfig1(value){

      console.log(this.setteleMap);

    }

   

 
    //console.log(Object.keys(this.settleMap[this.currentExpense]));

    
    for( let s in this.settleMap[this.currentExpense])
    {
      //members[list.collabrators[s]]=0;
      this.collabData1.push({ 'label': this.userIdMap[s], 'value':s });
    }



    

    this.modalReference = this.modal.open(this.modalContent1);



  }





  //Method to check if user have authentication
  public checkauth = () => {

    if (Cookie.get('authToken') == '' || Cookie.get('authToken') == null || Cookie.get('authToken') == undefined || (!Cookie.get('authToken'))) {
      this.router.navigate(['/login']);
    }

  }
  //end of checkauth method


  //Method to get current user information
  public getCurrentUserInfo = () => {

    let details = {
      userId: this.userId
    }

    this.userService.getUserDetails(details).subscribe((response) => {

      //debugger;
      this.loading = true;

      console.log(response);
      if (response.status == 200) {
        this.currentUserDetails = response.data[0];
      }
      else  if(response.status==404 || response.status==500)
    {
      this.logout();
    }
    });

  } //  end of getCurrentUserInfo method


  
  public allLists;
  //Method to get all the list of the user
  public getAllLists = () => {

    this.listService.getAllListOfUser(this.userId).subscribe((response) => {

      console.log(response.status);

      if(response.status==200)
      {

      this.allLists = response.data;
      console.log(this.allLists)
      }
      else  if(response.status==404 || response.status==500)
      {
        this.logout();
      }

    });

  } // end of getAllLists metod

  //Method to close the modal
  public closeModal() {
    this.modalReference.close();
  }
  //end of closeModal method


//Method to create new List
  public newList = () => {

    this.config = {
      labelField: 'label',
      valueField: 'value',
      maxItems: 10,
      highlight: true,
      create: false,
    };


    let currentUserDetails = this.currentUserDetails;

    this.collabData = [];
    this.collabVal="";
    for (let each of currentUserDetails.friendList) {
      this.collabData.push({ 'label': each.fromName, 'value': each.fromUserId });

    }

    this.modalReference = this.modal.open(this.modalContent)
  } // end of newList method



  //Method to create new List
  public newExpense = (expenseId) => {

    this.newExpDesc='';
    this.collabVal1='';
    this.collabVal='';
    this.newExpAmt='';

    

    this.config1 = {
      labelField: 'label',
      valueField: 'value',
      maxItems: 1,
      highlight: true,
      create: false,
    };

    this.config = {
      labelField: 'label',
      valueField: 'value',
      maxItems: 10,
      highlight: true,
      create: false,
    };

    this.currentExpense=expenseId;


    this.collabData = [];

    var members={};

    for (let list of this.allLists)
    {
      if(list.expenseId==expenseId)
      {
     
          for( let s in list.collabrators)
          {
            //members[list.collabrators[s]]=0;
            this.collabData.push({ 'label': this.userIdMap[list.collabrators[s]], 'value':list.collabrators[s] });
          }

      }
    }

    this.expenseModalStatus='new';
 

    this.modalReference = this.modal.open(this.modalContent2);
  } // end of newList method



  public saveNewExpense=(ExpenseID)=>
  {

    //debugger;

   if(this.newExpDesc=="")
   {

    this.snotifyService.error('Expense Description cannot be empty.');
    return;
   }

   if(!(/^[0-9]+(\.[0-9]{1,2})?$/.test(this.newExpAmt)) || this.newExpAmt=="") 
   {
    this.snotifyService.error('Please enter valid Amount.(Allowed Numeric upto 2 decimals)');
    return;

   }
   if(this.collabVal1==null || this.collabVal1=="")
   {

    this.snotifyService.error('Please Select Paid By.');
    return;
   }

   if(this.collabVal==null || this.collabVal=="")
   {

    this.snotifyService.error('Please Select Paid For.');
    return;
   }

   if(this.collabVal.length==1 && this.collabVal[0] == this.collabVal1)
   {

    this.snotifyService.error('Cannot split the amount with payee, add more members or choose other member.');
    return;
   }




   this.closeModal();




    var tempData={
      expenseItemId:shortid.generate(),
      expenseItemDesc:this.newExpDesc,
      paidBy:this.collabVal1,
      paidTo:this.collabVal,
      amount:this.newExpAmt,
      settledTo:''
    }

    

    for (let list of this.allLists)
    {
      if(list.expenseId==ExpenseID)
      {
        list.expense.push(tempData);

        var tempHistory={data:`${this.currentUserDetails.firstName + " "+this.currentUserDetails.lastName} added ${this.newExpDesc}`,created:Date.now()};

        this.notificationData=  {
          sender:this.userId,
          collabrators: this.collabVal,
          content: {
            info:  `New Expense ${this.newExpDesc} added by ${this.currentUserDetails.firstName + " "+this.currentUserDetails.lastName} in ${list.expenseName}.`
          }
        }

        this.updateList(ExpenseID,list.expense,list.expenseName,tempHistory);
         

      }
    }

  }


  public saveEditedExpense=(ExpenseID)=>
  {

   // debugger;

   if(this.newExpDesc=="")
   {

    this.snotifyService.error('Expense Description cannot be empty.');
    return;
   }

   if(!(/^[0-9]+(\.[0-9]{1,2})?$/.test(this.newExpAmt)) || this.newExpAmt=="") 
   {
    this.snotifyService.error('Please enter valid Amount.(Allowed Numeric upto 2 decimals)');
    return;

   }
   if(this.collabVal1==null || this.collabVal1=="")
   {

    this.snotifyService.error('Please Select Paid By.');
    return;
   }

   if(this.collabVal==null || this.collabVal=="")
   {

    this.snotifyService.error('Please Select Paid From.');
    return;
   }

   if(this.collabVal.length==1 && this.collabVal[0] == this.collabVal1)
   {

    this.snotifyService.error('Cannot split the amount with payee, add more members or choose other member.');
    return;
   }




   this.closeModal();
    

    for (let list of this.allLists)
    {
      if(list.expenseId==ExpenseID)
      {

        for(let item of list.expense){
          if(this.currentexpenseItemId==item.expenseItemId)
          {
            item.expenseItemDesc=this.newExpDesc;
            item.paidBy=this.collabVal1;
            item.paidTo=this.collabVal;
            item.amount=this.newExpAmt;

          }
        }


        this.notificationData=  {
          sender:this.userId,
          collabrators: this.collabVal,
          content: {
            info:  `Expense ${this.newExpDesc} updated by ${this.currentUserDetails.firstName + " "+this.currentUserDetails.lastName} in ${list.expenseName}.`
          }
        }

        var tempHistory={data:`${this.currentUserDetails.firstName + " "+this.currentUserDetails.lastName} updated ${this.newExpDesc}`,created:Date.now()};

        this.updateList(ExpenseID,list.expense,list.expenseName,tempHistory);
         

      }
    }

  }



  public deleteExpense=(expenseId,expense)=>
  {

    this.currentExpense=expenseId;

    this.newExpDesc=expense.expenseItemDesc;
    this.collabVal1=expense.paidBy;
    this.collabVal=expense.paidTo;
    this.newExpAmt=expense.amount;


    this.expenseModalStatus='edit';

    this.currentexpenseItemId=expense.expenseItemId;
    

    for (let list of this.allLists)
    {
      if(list.expenseId==expenseId)
      {


        for(let item of list.expense){
          if(this.currentexpenseItemId==item.expenseItemId)
          {
            list.expense.splice(item,1);

          }
        }

        var tempHistory={data:`${this.currentUserDetails.firstName + " "+this.currentUserDetails.lastName} removed ${this.newExpDesc}`,created:Date.now()};

        this.notificationData=  {
          sender:this.userId,
          collabrators: this.collabVal,
          content: {
            info:  `Expense ${this.newExpDesc} deleted by ${this.currentUserDetails.firstName + " "+this.currentUserDetails.lastName} from ${list.expenseName}.`
          }
        }

        this.updateList(expenseId,list.expense,list.expenseName,tempHistory);
         

      }
    }

  }

  public saveSettledExpense=(ExpenseID)=>
  {


    let from=this.collabVal1;
    let to=String($('#settlePaidTo').val());
    let amt=Number($('#settleAmt').val());

    if(!this.isValid(from))
    {
      this.snotifyService.error('Paid From cannot be empty');
      return;

    }
    else if(!this.isValid(to))
    {
      this.snotifyService.error('Paid To cannot be empty');
      return;
    }

    this.closeModal();

    let tempData={
    expenseItemId:shortid.generate(),
    expenseItemDesc:'',
    paidBy:from,
    paidTo:[],
    amount:amt,
    settledTo:to
  }

  

  for (let list of this.allLists)
  {
    if(list.expenseId==ExpenseID)
    {
      list.expense.push(tempData);

     // var tempHistory=`${this.userIdMap[from]} paid $`+amt+` to ${this.userIdMap[to]}`;

     var tempHistory = {data:`${this.userIdMap[from]} paid ${amt} to ${this.userIdMap[to]}`,created:Date.now()};

     this.notificationData=  {
      sender:this.userId,
      collabrators: this.collabVal,
      content: {
        info:  `${this.userIdMap[from]} paid ${amt} to ${this.userIdMap[to]} in ${list.expenseName}.`
      }
    }

      this.updateList(ExpenseID,list.expense,list.expenseName,tempHistory);
       

    }
  }

  }



  //Method to save new list
  public newListName;
  public saveNew = () => {
   

    if(!(this.isValid(this.newListName)))
    {
      this.snotifyService.error('Please enter Group Name.');
      return;
    }
    if(!(this.isValid(this.collabVal)))
    {
      this.snotifyService.error('Please add friends in the group.');
      return;
    }

        if(this.collabVal!=null)
        {
          this.collabVal.push(this.userId);
        }

        let details = {
          userId: this.userId,
          expenseName: this.newListName,
          expense: [],
          expenseHistory:[{data:`${this.userIdMap[this.userId]} created the group.`,created:Date.now()}],
          collabrators: this.collabVal,
          currency:this.currency
        }

        this.listService.createNewList(details).subscribe((response) => {
          if (response.status == 200) {
            this.snotifyService.success('New Group created');

            this.closeModal();
            this.notificationData=  {
              sender:this.userId,
              collabrators: this.collabVal,
              content: {
                info:  `New Group "${details.expenseName}" Created by ${this.currentUserDetails.firstName} ${this.currentUserDetails.lastName} with you as collabrator.`
              }
            }

            this.getAllLists();
        
            

            this.socketService.newChange(this.notificationData);


          }
          else  if(response.status==404 || response.status==500)
          {
            this.logout();
          }
        })

        this.newListName = '';


  } //  end of saveNew method


 

 //Method to send friend request
public sendRequest = (data) =>{

  this.searchResult=data;


  if(this.currentUserDetails.userId == this.searchResult.userId){
      this.snotifyService.error('You cannot send a friend request to yourself')
  }
  else{
    

  let details = {

    userId:this.searchResult.userId,
    fromUserId:this.currentUserDetails.userId,
    fromName:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName,
    fromEmail:this.currentUserDetails.email
  }


  this.userService.sendFrndRequest(details).subscribe((response)=>{
  
    if(response.status==200){

    this.snotifyService.success('Friend request sent');
    this.socketService.frndRequestSent(details.userId);
    this.getCurrentUserInfo();
    this.getAllUsers();
  }
  else  if(response.status==404 || response.status==500)
  {
    this.logout();
  }

  });

}

} // end of sendRequest


public isValid=(data)=>
{
  if(data!=null && data!="" && data!=undefined && data!="null")
  {
    return true;
  }
  else
  {
    return false;
  }

}

//Method to accept friend request
public acceptRequest = (id) =>{
 
  let details = {
  userId:this.userId,
  fromUserId:id
}  




console.log(details);

  this.userService.acceptReq(details).subscribe((response)=>{
    if(response.status==200){
      // alert('user moved');
      this.getCurrentUserInfo();
      this.getAllUsers();
      let data = {
        id:details.fromUserId,
        name:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
      }
      this.socketService.requestAccepted(data);
    }
    else  if(response.status==404 || response.status==500)
    {
      this.logout();
    }
  })

} //  end of acceptRequest

//Method to reject friend request
public rejectRequest = (id) =>{
 
  let details = {
  userId:this.userId,
  fromUserId:id
}  

console.log(details);

  this.userService.rejectUser(details).subscribe((response)=>{
    if(response.status==200){
      // alert('user moved');
      this.getCurrentUserInfo();
      this.getAllUsers();
      let data = {
        id:details.fromUserId,
        name:this.currentUserDetails.firstName+' '+this.currentUserDetails.lastName
      }
      this.socketService.requestAccepted(data);
    }
    else  if(response.status==404 || response.status==500)
    {
      this.logout();
    }
  })

} //  end of rejectRequest



//Method to check if any new friend request
public refresh = () =>{
  this.socketService.refresh().subscribe((data)=>{
    this.getCurrentUserInfo();
    this.getAllUsers();
    this.snotifyService.create({
      title: `request`,
      body: 'new friend request',
      config: {
        position: SnotifyPosition.centerTop,
        type:'success'
      }
    });
  }); 
} //  end of refresh


//Method to check if any Friend Request accepted
public newFriendNotification = () =>{
  this.socketService.newFriend().subscribe((data)=>{
    this.getCurrentUserInfo();
    this.getAllUsers();
    this.snotifyService.create({
      title: `Friend Request`,
      body:`Friend Request accepted by ${data.name}`,
      config: {
        position: SnotifyPosition.centerTop,
        type:'info'
      }
    }); 
  });
} //  end of newFriendNotification



//Method to check if any Friend Request rejected
public requestRejectNotification = () =>{
  this.socketService.rejectFriend().subscribe((data)=>{

    this.getCurrentUserInfo();

    this.getAllUsers();
   
    // this.snotifyService.info(`Friend request accepted by ${data.name}`);
    this.snotifyService.create({
      title: `Friend Request`,
      body:`Friend Request Rejected by ${data.name}`,
      config: {
        position: SnotifyPosition.centerTop,
        type:'info'
      }
    });

   
  });
} //  end of requestRejectNotification



//Method to logout of application
  public logout = () => {

    this.userService.deleteLocalStorage();
    Cookie.delete('authToken');
    this.router.navigate(['/login'])
  }
  // end of logout

//Method to show/hide friends section 
  public showSections = () => {
  
    if($('#right_column')[0].style.display!="block")
    {
      $('#right_column')[0].style.display="block";
      $('#searchCol')[0].style.display="block";
    }
    else
    {
      $('#right_column')[0].style.display="none";
      $('#searchCol')[0].style.display="none";
    }
  }
  //end of showSections
}
