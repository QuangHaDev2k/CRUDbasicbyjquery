
$(function(){
  $(".main").load("home.html"); 
  $(".header").load("header.html"); 

});

function onclickhome(){
    $(function(){
        $(".main").load("home.html"); 
      });
}

function onclickviewlist() {
    $(function(){
        $(".main").load("viewlist.html"); 
      });
    buildTable();
};

var employees = [];
var counter = 0;

function Employee(id,name,department,phone) {
  this.id = id;
  this.name = name;
  this.department = department; 
  this.phone = phone;
}

function getListEmployees() {
  $.get("https://622033b4ce99a7de19529eb3.mockapi.io/employees", function(data, status){
    employees = [];
    if(status == "error") {
      alert("Error when loading data");
      return ;
    }
  parseData(data);
  fillEmployeeToTable();
  });
}

function parseData(data) {
  data.forEach(function(item){
    employees.push(new Employee(item.id,item.fullname,item.department,item.phone));
  });
}

function fillEmployeeToTable() {
  employees.forEach(function(item) {
    $('tbody').append(
      '<tr>'+
          '<td>'+item.name+'</td>'+
          '<td>'+item.department+'</td>'+
          '<td>'+item.phone+'</td>'+
          '<td class="icon-action">'+
              '<a onclick="openUpdateModal('+item.id+')" class="icon-edit"><i class="fa fa-edit"></i></a>'+
              '<a onclick="openConfirmDelete('+item.id+')" class="icon-delete"><i class="fa fa-trash"></i></a>'+
          '</td>'+
      '</tr>'
    )
  });
}
function buildTable() {
    getListEmployees();
    $('tbody').empty();
}

function openModal() {
  $('#modal').css('display','block');
}

function addEmployee() {
  var name = $("#name").val();
  var department = $("#department").val();
  var phone = $("#phone").val();
  $.post("https://622033b4ce99a7de19529eb3.mockapi.io/employees",{
    fullname :name,
    department : department,
    phone : phone
  },function(data,status){
    if(status == "error") {
      alert("Error when loading data");
      return ;
    }
  });
  $('#modal').css('display','none');
  buildTable();
  // Reset Form
  $("#id").val("");
  $("#name").val("");
  $("#department").val("");
  $("#phone").val("");
}

function openUpdateModal(id) {
  openModal();
  var index = employees.findIndex(x => x.id == id);
  $("#id").val(employees[index].id);
  $("#name").val(employees[index].name);
  $("#department").val(employees[index].department);
  $("#phone").val(employees[index].phone); 
}

function save() {
  var id = $("#id").val();
  if(id == null ||  id =="") {
    addEmployee();
  }else {
    UpdateModal();
  }
}

function UpdateModal() {
  var id = $("#id").val();
  var name = $("#name").val();
  var department = $("#department").val();
  var phone = $("#phone").val();
  var employee = {
  fullname :name,
  department : department,
  phone : phone
};
  $.ajax({
    url: 'https://622033b4ce99a7de19529eb3.mockapi.io/employees/'+id,
    type: 'PUT',
    data:employee,
    success: function(result) {
      
      buildTable();
    }
  })
  buildTable();
  $('#modal').css('display','none');
  // Reset Form
  $("#id").val("");
  $("#name").val("");
  $("#department").val("");
  $("#phone").val("");
}

function openConfirmDelete(id) {
  var result = confirm("Want to delete ?");
  var index = employees.findIndex(x => x.id == id);
  if(result) {
    deleteEmployee(id);
  }
}
function deleteEmployee(id) {
  $.ajax({
    url: 'https://622033b4ce99a7de19529eb3.mockapi.io/employees/'+id,
    type: 'DELETE',
    success: function(result) {
      
      buildTable();
    }
  })

  
}