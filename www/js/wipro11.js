function bunitchange(){
$('#Vertical option[value != "%"]').remove();
$('#Vertical').val('%').change();

//set vertical
	vertical1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_label_entity", // Name of the Business Object
				context : document.getElementById('Vertical'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wp_pc_calendar",
									 dataType: "* json",
					method: "GetVerticalValues",	
				parameters:{
				le_lb_id:"VER",
				le_bu_id:$("#bunit").val(),
				}
}
	});
	vertical1.read().done(function (resposeObject){

for(i=0;i<resposeObject.length;i++){

$("#Vertical").append('<option value='+resposeObject[i].le_id+'>'+resposeObject[i].le_lb_value+'</option>');
}
});

$('#LeadSource option[value != "0"]').remove();
$('#LeadSource').val(0).change();
//set Lead Soirce
LeadSource1=new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_label_entity", // Name of the Business Object
				context : document.getElementById('LeadSource'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wp_pc_calendar",
									 dataType: "* json",
					method: "getDataforLabelIDinEntity",	
				parameters:{
				le_lb_id:'LS',
				}
}
	});
	LeadSource1.read().done(function (resposeObject){

for(i=0;i<resposeObject.length;i++){

$("#LeadSource").append('<option value='+resposeObject[i].le_lb_value+'>'+resposeObject[i].le_lb_value+'</option>');
}
});

}
function vertichange(){
$('#Region option[value != "%"]').remove();
$('#Region').val('%').change();
//set branch
//set region
	Region1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_regions", // Name of the Business Object
				context : document.getElementById('Region'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wp_tra_enquiry",
									 dataType: "* json",
					method: "getRegionsByVerticalId",	
				parameters:{
				rg_vertical_id:function() {if($("#Vertical").val()=="%"){return "0"}else{return $("#Vertical").val()}}
				}
}
	});
	Region1.read().done(function (resposeObject){

for(i=0;i<resposeObject.length;i++){

$("#Region").append('<option value='+resposeObject[i].rg_id+'>'+resposeObject[i].rg_name+'</option>');
}
});
$('#SubVertical option[value != "0"]').remove();
$('#SubVertical').val('0').change();
subvertical1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_label_entity", // Name of the Business Object
				context : document.getElementById('SubVertical'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wp_pc_calendar",
									 dataType: "* json",
					method: "getsubverticalforuser",	
				parameters:{
				le_bu_id:$("#bunit").val(),
				le_lb_parent_id:function(){if($("#Vertical").val()=="%"){return 0}else{return $("#Vertical").val()}
				}
				}
}
	});
	subvertical1.read().done(function (resposeObject){

for(i=0;i<resposeObject.length;i++){

$("#SubVertical").append('<option value='+resposeObject[i].le_id+'>'+resposeObject[i].le_lb_value+'</option>');
}
});
}

function Regionchange(){
$('#Branch option[value != "%"]').remove();
$(Branch).val('%').change();
//set branch
Branch1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_branches", // Name of the Business Object
				context : document.getElementById('Branch'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wiproDBMetadata",
									 dataType: "* json",
					method: "GetWp_mtr_branchesObjectsForbr_rg_id",	
				parameters:{
				Br_rg_id:function(){if($("#Region").val()=="%"){return 0}else{return $("#Region").val()}
				}
				}
}
	});
	Branch1.read().done(function (resposeObject){

for(i=0;i<resposeObject.length;i++){

$("#Branch").append('<option value='+resposeObject[i].br_id+'>'+resposeObject[i].br_name+'</option>');
}
});
}
function Branchchange(){
$('#SalesPerson option[value != "%"]').remove();
$('#SalesPerson').val('%').change();
//set sales person now SP hardcoded
SalesP1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_user_master", // Name of the Business Object
				context : document.getElementById('SalesPerson'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wiproDBMetadata",
									 dataType: "* json",
					method: "GetSalesPersonsByUser",	
				parameters:{
				UserId:"spal",
				BusinessUnit:$("#bunit").val(),
				Branch:function(){if($("#Branch").val()=="%"){return 0}else{return $("#Branch").val()}},
				Region:function(){if($("#Region").val()=="%"){return 0}else{return $("#Region").val()}}
				}
}
	});
	SalesP1.read().done(function (resposeObject){

for(i=0;i<resposeObject.length;i++){

$("#SalesPerson").append('<option value='+resposeObject[i].Usr_User_Id+'>'+resposeObject[i].Usr_Name+'</option>');
}
});
}
function SPchange(){
$("#EmployeeNo").val("");

//set Emp no person now SP hardcoded
EmployeeNo1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_user_master", // Name of the Business Object
				context : document.getElementById('EmployeeNo'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wiproDBMetadata",
									 dataType: "* json",
					method: "GetWp_user_masterObject",	
				parameters:{
				Usr_User_Id:function(){if($("#SalesPerson").val()==""){return 0}else{return $("#SalesPerson").val()}}
				}
}
	});
	EmployeeNo1.read().done(function (resposeObject){
	if(resposeObject.length>0){
$("#EmployeeNo").val(resposeObject[0].Usr_EMP_NO);
}
});
}
function subverticalchange(){
$('#Segment option[value != ""]').remove();
$('#Segment').val('').change();

Segment1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_segment", // Name of the Business Object
				context : document.getElementById('Segment'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wiproDBMetadata",
									 dataType: "* json",
					method: "QuerySearch",	
				parameters:{
				query:"select * from wp_mtr_segment where sg_sales_division="+$("#SubVertical").val()
				}
}
	});
	Segment1.read().done(function (resposeObject){
for(i=0;i<resposeObject.length;i++){

$("#Segment").append('<option value='+resposeObject[i].sg_id+'>'+resposeObject[i].sg_segment+'</option>');
}
});
}
function sgementchange(){
$('#SubSegment option[value != ""]').remove();
$('#SubSegment').val('').change();
Segment1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_subsegment", // Name of the Business Object
				context : document.getElementById('SubSegment'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wp_tra_enquiry",
									 dataType: "* json",
					method: "getSubSegmentforSegment",	
				parameters:{
				ssg_segment_id:function(){if($("#Segment").val()=="%"){return 0}else{return $("#Segment").val()}}
				}
}
	});
	Segment1.read().done(function (resposeObject){
for(i=0;i<resposeObject.length;i++){

$("#SubSegment").append('<option value='+resposeObject[i].ssg_id+'>'+resposeObject[i].ssg_subsegment_name+'</option>');
}
});
}
function myFunction(key1){
$("#"+key1.id).attr("autocomplete","on");
 $("#"+key1.id).autocomplete({
max:10,
     minLength:3,
      source: str1
    });
}
function getcustomer(){
Customer1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "sap_customer_master", // Name of the Business Object
				context : document.getElementById('Customer'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wiproDBMetadata",
									 dataType: "* json",
					method: "GetCustomersByVTWEG",	
				parameters:{
				VTWEG:"20",
				NAME1:$("#Customer").val()
				}
}
	});
	Customer1.read();
}
function getactivitystages(){

$('#Status option[value != "0"]').remove();
$('#Status').val("0").change();
Segment1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_stages", // Name of the Business Object
				context : document.getElementById('Status'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wp_pc_calendar",
									 dataType: "* json",
					method: "getActiveStages",	
				parameters:{
				
				}
}
	});
	Segment1.read().done(function (resposeObject){
for(i=0;i<resposeObject.length;i++){

$("#Status").append('<option value='+resposeObject[i].st_id+'>'+resposeObject[i].st_description+'</option>');
}
});
} 
function getDealer(){
Dealer1 = new $.cordys.model({									//model  for getting the travel id
				objectName: "wp_mtr_stages", // Name of the Business Object
				context : document.getElementById('Dealer'), // Where the data has to be bound to
				read: {
					// Settings for the read method
					namespace: "http://schemas.cordys.com/wiproDBMetadata",
									 dataType: "* json",
					method: "GetCustomersByVTWEG",	
				parameters:{
				VTWEG:"10", 
				NAME1:$("Dealer").val()
				}
}
	});
	Dealer1.read()
}

function open1(){
location.replace("land.htm");
}
function showMenu()
{
$("#lay").css("visibility","visible");
$('#lay').show().focus();
}
function hidemenu(){
if($("#lay").css("display")!="none");
$("#lay").css("display","none");
}
function leadhit(){
location.replace("LeadYearlyHitrate.htm");
}
function creatlead(){
location.replace("CreatLead.htm");
}

function signout()
{
$.cordys.authentication.logout();
document.cookie="userName=";
window.location.assign("login.htm","_self");

}