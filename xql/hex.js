const xqlurl = "https://hexxe.000webhostapp.com";
const xqlget = xqlurl+"/getrow.php";
const xlog = [];
const xerror = [];
let xui = "";
let hru = "";
const xrouter = []; 
const xlogs = [];
const allRoute = [];
const pileRoute = [];
const ruClass = [];
let routeAll;
let noRoute;
// http get method 

function $GET(urlh, linkh) {
let url = "";
var thelink = linkh;
if(thelink == null) {
url = window.location.href;   
} else {
url = thelink; 
}

let urlParams = new URLSearchParams(new URL(url).search);
let hexget = urlParams.get(urlh);
return hexget; 
}


function inText(targ, val) {
let target = document.querySelectorAll(targ);
if(target) {
target.forEach(function(ele) { 
ele.innerText = val;
});     
}   
}


function inHTML(targ, val) {
let target = document.querySelectorAll(targ);
if(target) {
target.forEach(function(ele) { 
ele.innerHTML = val;
});     
}   
}

function inValue(targ, val) {
let target = document.querySelectorAll(targ);
if(target) {
target.forEach(function(ele) { 
ele.value = val;
});     
}  
}

function inHref(targ, val) {
let target = document.querySelectorAll(targ);
if(target) {
target.forEach(function(ele) { 
ele.href = val;
});     
} 
}

function inSrc(targ, val) {
let target = document.querySelectorAll(targ);
if(target) {
target.forEach(function(ele) { 
ele.src = val;
});     
}   
}


function inAttr(targ, name, val) {
let target = document.querySelectorAll(targ);
if(target) {
target.forEach(function(ele) { 
ele.setAttribute(name, val);
});     
}   
}



function $encode(str) {
let string = str.replace(/”/g, '"');
string = string.replace(/’/g, "'");
return string;
}

function nl2br(str) {
    return str.replace(/\\n/g, '\n'); 
}

function $nl2br(str) {
let res = str.replace(/\\n/g, '<br>'); 
res = res.replace(/\n/g, '<br>'); 
return res; 
     
}

function $time() {
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let seconds = currentTime.getSeconds();

let formattedTime = hours + ":" + minutes + ":" + seconds;
return formattedTime; 
}

function $date() {
let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();

let formattedDate = month + "/" + day + "/" + year;
return formattedDate;   
}

function $dtime() {
let currentDateTime = new Date();
let fullDate = currentDateTime.toLocaleString();
return fullDate;   
}


function $sort(ql) {
return {
by: function(order, cha) { 

let data = ql; 
let ord = "ASC"; 
if(cha !== undefined) {
ord = cha;     
}
if(ord == "ASC"){
data.sort((a, b) => a[order] - b[order]);
} else if(ord == "DESC") {
data.sort((a, b) => b[order] - a[order]);

}

return data;  
}
};
}



function $START(bundle) {
if(bundle == "router")  {
routeLink();
hru = "yes"; 
}
if(bundle == "logs")  {
exeLogs();
}
if(bundle.includes("XQL")) {
  let key = bundle.split("XQL:").pop();
    INIXQL(key);
    formInQL();
    upInQL();
}
}

let xqlacc;
let xqlfile;
function INIXQL(key) {
xqlacc = key;
xqlfile = xqlurl + "/files/" + xqlacc + "/"; 
let xparam = [];
const queryX = document.querySelectorAll('query');
queryX.forEach(function(elem){ 
let call = elem.getAttribute("call"); 
if(call == null) {
    call = "";
}
elem.id = makeid(9); 
elem.style.display = 'none';
$XQL(elem.id, call);

});
}







function $DELETE(base, param, call) {
let db = base;
let hexql = [];
let string = param; 

const upmatch = string.match(/DELETE (\w+) WHERE (\w+) = '([^']+)'/);

if (upmatch) {
let table = upmatch[1];
let ukey = upmatch[2];
ukey = ukey.trim();
let uval = upmatch[3];
uval = uval.trim();
 
let path = xqlget+"?key="+xqlacc+"&tab="+table+"&row="+db+"&sess="+makeid(5); 


fetch(path).then(function(response) { response.text().then(function(text) {

let data = text;

if(data == "") {
query.remove();
console.log(`No result for query, "${string}"`);
} else {

data = JSON.parse(data);
hexql.length = 0;
hexql.push(...data);
}

let dataVal = hexql;

selectedData = dataVal.filter(item => item[ukey] === uval);


if(string.includes("AND")) {
const wand = string.match(/AND (\w+) = '([^']+)'/);
if(wand){
cSelector = wand[1];
cValue = wand[2];

selectedData = selectedData.filter(item => item[cSelector] === cValue);


}
}  

selectedData.forEach(function(row) {

hexql = hexql.filter(item => item !== row);

});

let codetest = JSON.stringify(hexql);
try {
JSON.parse(codetest);
  } catch (error) {
    return "error";
  }


let inidata = encodeURIComponent(JSON.stringify(hexql));

let xhr = new XMLHttpRequest();
let url = xqlurl+'/newrow.php';
let params = "sess=x808&key="+xqlacc+"&name="+inidata+"&tab="+table+"&row="+db;

xhr.open("POST", url, true);

xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let data = xhr.response;
            if (data.includes("success")) {
              
console.log("Record Deleted Successfully");
if(call !== undefined) {
let newFunc = new Function(call); 
 newFunc.call(this)
 
}
      
}}}};

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);
   
}); });
} else {
console.log('Invalid query format');
} 
}


function $INSERT(base, param, call) {
let db = base;
let hexql = [];
let string = param;        
let regex = /INSERT (\w+) FIELDS\(([^)]+)\) VALUES\(([^)]+)\)/;
const match = string.match(regex)

if (match) {
  const dataSelector = match[1];
  let fields = match[2];
  fields = fields.trim();
  fields = fields.replace(/\s/g, "");
  let vals = match[3];
  vals = vals.trim();
  const fieldsArr = fields.split(',');
  const valsArr = vals.split(',');

 
let path = xqlget+"?key="+xqlacc+"&tab="+dataSelector+"&row="+db+"&sess="+makeid(5); 


fetch(path).then(function(response) { response.text().then(function(text) {

let data = text;
if(data == "") {
query.remove();
console.log(`No result for query, "${string}"`);
} else {

data = JSON.parse(data);
hexql.length = 0
hexql.push(...data);
}

let poll = "{";
for(let i = 0; i < fieldsArr.length; i++) {
let obj = fieldsArr[i]; 
let key = valsArr[i]; 
key = key.trim();
let elv = key; 
elv = elv.replace(/"/g, '”');
elv = elv.replace(/'/g, '’');
key = elv;
if(key == "$time") {
 key = $time(); 
}

if(key == "$date") {
    key = $date(); 
}

if(key == "$dtime") { 
 key = $dtime();    
}

poll = poll + `"${obj}":"${key}"`;  
 if (i < fieldsArr.length - 1) {
    poll = poll + ",";
  }  
}
poll = poll + "}";
poll = JSON.parse(poll);
hexql.push(poll);
console.log(hexql);


let codetest = JSON.stringify(hexql);
try {
JSON.parse(codetest);
  } catch (error) {
    return "error";
  }
  


let inidata = encodeURIComponent(JSON.stringify(hexql));


let xhr = new XMLHttpRequest();
let url = 'https://hexxe.000webhostapp.com/newrow.php';
let params = "sess=x88&key="+xqlacc+"&name="+inidata+"&tab="+dataSelector+"&row="+db;

xhr.open("POST", url, true);

xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let data = xhr.response;
            if (data.includes("success")) {
console.log("Record Created Successfully");
if(call !== undefined) {
 let newFunc = new Function(call); 
 newFunc.call(this)
}      
      
}}}};

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);

   
}); });

} else {
console.log('Invalid query format')
} 

}

function rander() {
  const uniqueId = new Date().getTime();
  const randomCode = `${uniqueId}${Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substring(2, 8)}`;
  return randomCode;
}

function $UPDATE(base, param, call) {
let db = base;
let hexql = [];
let string = param; 

       
const upmatch = string.match(/UPDATE (\w+) SET (\w+) = '([^']+)' WHERE (\w+) = '([^']+)'/);

if (upmatch) {
let table = upmatch[1];
let nkey = upmatch[2];
nkey = nkey.trim();
let nval = upmatch[3]; 
nval = nval.trim();





let ukey = upmatch[4];
ukey = ukey.trim();
let uval = upmatch[5];
uval = uval.trim();

 
let path = xqlget+"?key="+xqlacc+"&tab="+table+"&row="+db+"&sess="+makeid(5); 


fetch(path).then(function(response) { response.text().then(function(text) {

let data = text;

if(data == "") {
query.remove();
console.log(`No result for query, "${string}"`);
} else {

data = JSON.parse(data);
hexql.length = 0
hexql.push(...data);
}


let dataVal = hexql;
let fkey; let fval; let ofval; 

let elv = nval; 
elv = elv.replace(/"/g, '”');
elv = elv.replace(/'/g, '’');
nval = elv;

if(nval == "$time") {
 nval = $time(); 
}

if(nval == "$date") {
    nval = $date(); 
}

if(nval == "$dtime") { 
 nval = $dtime();    
}


if(ukey == "Key")  { 
let indel = parseInt(uval) - 1;
let item = hexql[indel];
if(item){
if(item.hasOwnProperty(nkey))   {
if(nval.includes("++")) {
fkey = nval.split("++")[0].trim(); 
fval = nval.split("++").pop().trim();
fval = parseInt(fval);
if(item.hasOwnProperty(fkey))   {
ofval = item[fkey]; 
ofval = parseInt(ofval);
nval = ofval + fval; 
}    
} else if(nval.includes("--")) {
fkey = nval.split("--")[0].trim(); 
fval = nval.split("--").pop().trim();
fval = parseInt(fval);
if(item.hasOwnProperty(fkey))   {
ofval = item[fkey]; 
ofval = parseInt(ofval);
nval = ofval - fval; 
}    
}
item[nkey] = nval;

}
}
} else {  
hexql.forEach(item => {
if(item.hasOwnProperty(ukey)) {
if(item[ukey] == uval)  {
if(item.hasOwnProperty(nkey))   {
 if(nval.includes("$")) {
nval = nval.split("$").pop(); 
nval = eval(nval);
}

if(nval.includes("++")) {
fkey = nval.split("++")[0].trim(); 
fval = nval.split("++").pop().trim();
fval = parseInt(fval);
if(item.hasOwnProperty(fkey))   {
ofval = item[fkey]; 
ofval = parseInt(ofval);
nval = ofval + fval; 
}    
} else if(nval.includes("--")) {
fkey = nval.split("--")[0].trim(); 
fval = nval.split("--").pop().trim();
fval = parseInt(fval);
if(item.hasOwnProperty(fkey))   {
ofval = item[fkey]; 
ofval = parseInt(ofval);
nval = ofval - fval; 
}    
}
if(nval.includes("makeid0")) {
item[nkey] = makeid(8);    
} else {
item[nkey] = nval;
}
}
}     
}     
}); 

}

let codetest = JSON.stringify(hexql);
try {
JSON.parse(codetest);
  } catch (error) {
    return "error";
  }


let inidata = encodeURIComponent(JSON.stringify(hexql));

let xhr = new XMLHttpRequest();
let url = xqlurl+'/newrow.php';
let params = "sess=x808&key="+xqlacc+"&name="+inidata+"&tab="+table+"&row="+db;

xhr.open("POST", url, true);

xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let data = xhr.response;
            if (data.includes("success")) {
console.log("Record Updated Successfully");
if(call !== undefined) {
 let newFunc = new Function(call); 
 newFunc.call(this)
 
    
}            
}}}};

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);
   
}); });
} else {
console.log('Invalid query format')
} 
}







async function formInQL(){
 try{ 
const qin = document.querySelectorAll('insert'); 
qin.forEach(function(ins){
let db = ins.getAttribute('data');
let table = ins.getAttribute('table');
let call = ins.getAttribute('call'); 
let insert = ins.getAttribute('insert');

if(call == null) {
call = "";
}
let form = ins.querySelector('form');
let fields = []; 
let values = []; 

if (form.hasAttribute("data-listener")) {
    form.removeEventListener("submit", form.getAttribute("data-listener"));
}

form.setAttribute("data-listener", "submitListener");



form.onsubmit = async function(e) {
    try {
e.preventDefault();
const fileUploadPromises = [];
let hadfile = "false"; 
for (let i = 0; i < form.elements.length; i++) {
  let elem = form.elements[i];

if (elem.tagName === "INPUT" && elem.type === "file") {
    const filePromises = [];

for (let j = 0; j < elem.files.length; j++) {
let formData = new FormData();
formData.append('key', xqlacc);
formData.append('file', elem.files[j]);
let filecall = elem.getAttribute('filecall');

const filePromise = new Promise((resolve) => {
let mri = new XMLHttpRequest();
let url = xqlurl + '/filestore.php?sess=' + makeid(5);

mri.open("POST", url, true);
mri.onload = () => {
if (mri.readyState === XMLHttpRequest.DONE) {
if (mri.status === 200) {
 let data = mri.response;
if (data.includes("success")) {
console.log("File Stored Successfully");
hadfile = "true"; 
resolve(); 
// Resolve the promise when the file upload is complete
              }
            }
          }
        };
mri.send(formData);
      });
filePromises.push(filePromise);
    }
const filesUploadForInput = async () => {
await Promise.all(filePromises);
    };

fileUploadPromises.push(filesUploadForInput);
  }
}

// Wait for all file uploads to complete
await Promise.all(fileUploadPromises.map((filesUploadForInput) => filesUploadForInput()));








for(let elem of form.elements) {
if(elem.tagName === "INPUT" || elem.tagName === "SELECT" || elem.tagName === "TEXTAREA"){
if(elem.type !== "submit" && elem.type !== "reset" && elem.type !== "button"){
fields.push(elem.name);

let handle = elem.getAttribute('handle');
let ask = elem.getAttribute('ask');
let dem = false; 
let asked = document.getElementById(ask);
if(asked) {
 if(asked.value !== "")  {
   dem = true; 
 } else if(hadfile == "true")  {
    dem = true; 
    
 } 
}


let flag = elem.getAttribute('flag'); 
if(handle == "required") { 
if(elem.value == "") {
if(dem == true) {} else {
    if(flag !== undefined || flag !== null) {
 let newFunc = new Function(flag); 
 newFunc.call(this)
}      

 return "required";    

}    
    
    
}  
}









if(elem.type !== "file") {
let fval = elem.value;
if(fval.includes("$js-")) {
fval = fval.split("$js-").pop(); 
fval = eval(fval);
} else { 
elem.value = "";     

}
fval = fval.replace(/\)/g, "&rpar;");
fval = fval.replace(/\(/g, "&lpar;");
fval = fval.replace(/'/g, "&apos;");
fval = fval.replace(/"/g, "&quot;");
fval = fval.replace(/\n/g, '\\n'); 
fval = fval.replace(/,/g, "&comma;");

values.push(fval); 
} else {

let filer = elem.files;
let allfick = ""; 
for(let i = 0; i < filer.length; i++) {
let file = filer[i]; 
let fick = file.name; 
fick = fick.replace(/\s/, '-');
fick = fick.replace(/\(/, '');
fick = fick.replace(/\)/, '');
fick = fick.replace(/"/, '');
fick = fick.replace(/'/, '');
allfick = allfick + fick + " ";
}   
values.push(allfick);

elem.value = "";     




} 
}     
}        
}   

$INSERT(db, "INSERT "+table+" FIELDS("+fields.join(',')+") VALUES("+values.join(',')+")", call);

if(insert !== null) {

    
$INSERT(db, "INSERT "+insert+" FIELDS("+fields.join(',')+") VALUES("+values.join(',')+")", call);


    
}



    
} catch(error) {
    alert(error); 
}
}});
 

} catch(error) {
    console.log(error); 
} 
}    
    
    
    
    
async function upInQL(){
let hexql = []; 
const qup = document.querySelectorAll('update');
for(let ins of qup){
let form = ins.querySelector('form');
let fields = []; 
let values = [];


form.onsubmit = async function(e) {
e.preventDefault();

let db = ins.getAttribute('data');
let table = ins.getAttribute('table');
let insert = ins.getAttribute('insert'); 
let call = ins.getAttribute('call'); 
if(call == null) {
call = "";
}
let query = ins.getAttribute('query');
let ukey = query.split("=")[0].trim(); 
let uval = query.split("=").pop().trim();
if(uval.includes("$js-")) {
uval = uval.split("$js-").pop(); 
uval = eval(uval);
}
console.log(uval)


const fileUploadPromises = [];

for (let i = 0; i < form.elements.length; i++) {
  let elem = form.elements[i];

if (elem.tagName === "INPUT" && elem.type === "file") {
    const filePromises = [];

for (let j = 0; j < elem.files.length; j++) {
let formData = new FormData();
formData.append('key', xqlacc);
formData.append('file', elem.files[j]);
let filecall = elem.getAttribute('filecall');

const filePromise = new Promise((resolve) => {
let mri = new XMLHttpRequest();
let url = xqlurl + '/filestore.php?sess=' + makeid(5);

mri.open("POST", url, true);
mri.onload = () => {
if (mri.readyState === XMLHttpRequest.DONE) {
if (mri.status === 200) {
 let data = mri.response;
if (data.includes("success")) {
console.log("File Stored Successfully");
resolve(); 
// Resolve the promise when the file upload is complete
              }
            }
          }
        };
mri.send(formData);
      });
filePromises.push(filePromise);
    }
const filesUploadForInput = async () => {
await Promise.all(filePromises);
    };

fileUploadPromises.push(filesUploadForInput);
  }
}

// Wait for all file uploads to complete
await Promise.all(fileUploadPromises.map((filesUploadForInput) => filesUploadForInput()));






let path = xqlget+"?key="+xqlacc+"&tab="+table+"&row="+db+"&sess="+makeid(5); 


fetch(path).then(function(response) { response.text().then(function(text) {

let data = text;

if(data == "") {
console.log(`No result for query, "${table}"`);
data = `[{"File":"null"}]`;
}

data = JSON.parse(data);
hexql.length = 0
hexql.push(...data);


let dataVal = hexql;

for(let i = 0; i < form.elements.length; i++) {

let elem = form.elements[i];

if(elem.tagName === "INPUT" || elem.tagName === "SELECT" || elem.tagName === "TEXTAREA"){
if(elem.type !== "submit" && elem.type !== "reset" && elem.type !== "button"){
let name = elem.name;
let usage = elem.getAttribute('use'); 
if(usage == "dummy") {} else {
fields.push(name);
}
let pull = elem.getAttribute("find"); 
let val; 
if(elem.type !== "file") { 
val = elem.value;
val = val.replace(/,/g, "&comma;");
values.push(val);
} else {

let filer = elem.files;
let allfick = ""; 
for(let i = 0; i < filer.length; i++) {
let file = filer[i]; 
let fick = file.name; 
fick = fick.replace(/\s/, '-');
fick = fick.replace(/\(/, '');
fick = fick.replace(/\)/, ''); 
allfick = allfick + fick + " ";
}   
val = allfick;
if(usage == "dummy") {} else {
    
values.push(val); }
}

let elv = val; 
elv = elv.replace(/"/g, '”');
elv = elv.replace(/'/g, '’');
val = elv;

if(val == "$time" || val == "$date" || val == "$dtime") {
if(val == "$time") {
 val = $time(); 
}

if(val == "$date") {
    val = $date(); 
}

if(val == "$dtime") { 
 val = $dtime();    
}
} else {
if(elem.type !== "file")  { 
    
 if(val.includes("$js-")) {} else { 
    
 elem.value = "";     
 }
 
 
}    
    
}

if(ukey == "Key")  { 

let indel = parseInt(uval) - 1;
let item = hexql[indel];
if(item){
if(item.hasOwnProperty(name))   {
 if(pull !== null) {   
if(pull.includes("++")) {
fkey = pull.split("++")[0].trim(); 
fval = parseInt(val);
if(item.hasOwnProperty(fkey))   {
ofval = item[fkey]; 
ofval = parseInt(ofval);
val = ofval + fval; 
}    
} else if(pull.includes("--")) {
fkey = pull.split("--")[0].trim(); 
fval = parseInt(val);
if(item.hasOwnProperty(fkey))   {
ofval = item[fkey]; 
ofval = parseInt(ofval);
val = ofval - fval; 
}    
}
}
    
    
    
    item[name] = val;  
}
}}

else {
    
hexql.forEach(item => {
if(item.hasOwnProperty(ukey)) {
if(item[ukey] == uval)  {
if(item.hasOwnProperty(name))   {
 if(pull !== null)  {  
if(pull.includes("++")) {
fkey = pull.split("++")[0].trim(); 
fval = parseInt(val);
if(item.hasOwnProperty(fkey))   {
ofval = item[fkey]; 
ofval = parseInt(ofval);
val = ofval + fval; 
}    
} else if(pull.includes("--")) {
fkey = pull.split("--")[0].trim(); 
fval = parseInt(val);
if(item.hasOwnProperty(fkey))   {
ofval = item[fkey]; 
ofval = parseInt(ofval);
val = ofval - fval; 
}    
}
}
    
    





item[name] = val;  
}
}     
}    
}); 

}

}     
}      
}

if(insert !== null) {

    
$INSERT(db, `INSERT ${insert} FIELDS(${fields}) VALUES(${values})`);


    
}



upDateIt(hexql, call);
}); });



function upDateIt(hex, call) {
    
let code = JSON.stringify(hex);
try {
JSON.parse(code);
  } catch (error) {
    return "error";
  }



let inidata = encodeURIComponent(JSON.stringify(hex));


let xhr = new XMLHttpRequest();
let url = xqlurl+'/newrow.php';
let params = "sess=x808&key="+xqlacc+"&name="+inidata+"&tab="+table+"&row="+db;

xhr.open("POST", url, true);

xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let data = xhr.response;
            if (data.includes("success")) {
console.log("Record Updated Successfully");
if(call !== undefined) {
 let newFunc = new Function(call); 
 newFunc.call(this)
}      
}}}};

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);
    
    
    
    
}


}
    
}
 
}    
    
    
    









function $IMPORT(src) {
if(src.includes("@")) {
var bundle = src.split('@').pop(); 
if(bundle == "UI") {

rootHex();
xui = "yes"; 

}
if(bundle == "events") {
let startTime = performance.now();
console.log('IMPORTING EVENTS')
actTributes();
let endTime = performance.now();
const executionTime = endTime - startTime;
const roundExTime = executionTime.toFixed(2);
xlogs.push(`EVENTS LOADED: ${roundExTime} milliseconds`);
}
} else {
var data = src.split(':').map(item => item.trim());
var moduleName = data[0]; 
var modulePath = data[1]; 
const routeRec = { name: moduleName, path: modulePath };
xrouter.push(routeRec);
xlogs.push(new Error().stack.split('\n')[2].trim() + ` Imported ${moduleName} from '${modulePath}'`)
} 
}

HTMLElement.prototype.Component = Component;

function Depend(mod) {
const name = mod.trim();
const record = xrouter.find(record => record.name === name);
if (record) {
    return record.path;
} else {
xlogs.push(`Component ${mod} does not exist`)
    return "none";
}}



function Component(mod) {
if(mod !== undefined) {
const path = Depend(mod);
elem = this; 
if(path == "none") {
this.innerHTML = "";
} else {
fetch(path).then(function(response) { response.text().then(function(text) {
let data = text;
let regexx = /{ this\.route\.(\w+) }/;

// Use replace with a callback function to replace the matched content

data = data.replace(regexx, function (match, captureGroup) {
 
 return getRouteInfo(allRoute, captureGroup);
});


var parser = new DOMParser();
var doc = parser.parseFromString(data, 'text/html');
var rMarkUp = doc.querySelector('hexxe');
if(rMarkUp)  {
data = rMarkUp.innerHTML;    
 } else {
data = "";
 }
elem.innerHTML = data;


var rScript = doc.getElementsByTagName('script'); 
for(var i = 0; i < rScript.length;i++) {
const rScripter = rScript[i];
const hasApp = hasAttr(rScripter, 'local');if(hasApp == true){

const nScripter = document.getElementsByTagName("script");


let parseScript = rScripter.textContent;
eval(parseScript); 

}}

var rStyle = doc.getElementsByTagName('style'); 
for(var i = 0; i < rStyle.length;i++) {
const rStyler = rStyle[i];
const hasSty = hasAttr(rStyler, 'local');if(hasSty == true){

const nStyler = document.createElement("style");
nStyler.textContent = rStyler.textContent;
document.head.appendChild(nStyler);

}
}
}); });
}
}

return {
inject: function(data) {
$IMPORT(data)   
}      
}

}




function allModulePaths() {
  return xrouter.map(record => record.path);
}

function readModule(mod) {

const name = mod.trim();
const record = xrouter.find(record => record.name === name);
if (record) {
    return record.path;
} else {
    return "none";
}}







function modModule(mod) {
const nowRoute = pileRoute.find(record => record.path === mod);
if(nowRoute) { 
    return nowRoute.module; 
} else {
    return "none";
}
}

function dirModule(mod) {
const name = mod.trim();
const nowRoute = pileRoute.find(record => record.module === mod);
if(nowRoute) { 
    return nowRoute.path; 
} else {
    return "none";
}
}


function mtpRoute(name) {
var mod = name.trim(); 
const nowRoute = pileRoute.find(record => record.module === mod);
if(nowRoute) { 
    return nowRoute.path; 
} else {
    return "none";
}
}
function addLPListener(elementId, callback, duration) {
    var pressTimer;
    
 document.getElementById(elementId).addEventListener('touchstart', function() {
     
 pressTimer = setTimeout(function() {
     
  let newFunc = new Function(callback)
 newFunc.call(this); 
        }.bind(this), duration);
   
   
   
    });

    document.getElementById(elementId).addEventListener('touchend', function() {
        clearTimeout(pressTimer);
    });
 
}

// swipe.js





function addSwipeListener(elementId, direction, callback, threshold) {
    var startX;
    var initialX;
    var isSwipe = false; // Flag to track if it's a swipe or press

    var element = document.getElementById(elementId);

    element.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        initialX = element.getBoundingClientRect().left;
        isSwipe = false; // Reset the flag for each touchstart
    });

    element.addEventListener('touchmove', function(event) {
        var currentX = event.touches[0].clientX;
        var deltaX = currentX - startX;

        // Move the element based on swipe distance
        var translatedX = deltaX + initialX;
        element.style.transform = 'translateX(' + translatedX + 'px)';
        isSwipe = true; // Set the flag to true during touchmove
    });

    element.addEventListener('touchend', function(event) {
        // Reset the element's position when the swipe ends
        element.style.transform = 'translateX(0)';
        var endX = event.changedTouches[0].clientX;
        var deltaX = endX - startX;

        // Check if it's a significant swipe in the specified direction to trigger the callback
        if (isSwipe && Math.abs(deltaX) > threshold && ((direction === 'left' && deltaX < 0) || (direction === 'right' && deltaX > 0))) {


setTimeout(function() {
  let newFunc = new Function(callback)
 newFunc.call(this); 
        }.bind(this), 0); 




        }
    });

    // Prevent the default behavior of the element when dragging for swipe has started
}





// Calling longPress to set


function hexLongPress() {
let elem = document.querySelectorAll('[press]'); 
if(elem) {
elem.forEach(function(press){  
let pid = press.id; 
if(pid == null || pid == undefined) {
press.id = "P" + makeid(4); 
}
pid = press.id;
let act = press.getAttribute("press"); 
let int = press.getAttribute("press-interval"); 
if(int == null || int == undefined) {
int = "500";
}
else {
int = int;
}
addLPListener(pid, act, int);
press.removeAttribute('press');    
});  
}   
}
function hexSwipevent() {
    
let elem = document.querySelectorAll('[onswipe]'); 
if(elem) {
elem.forEach(function(press){  
let pid = press.id; 
if(pid == null || pid == undefined) {
press.id = "P" + makeid(4); 
}
pid = press.id;
let act = press.getAttribute("onswipe"); 
let int = press.getAttribute("swipe-to"); 
if(int == null || int == undefined) {
int = "left";
}
else {
int = int;
}
addSwipeListener(pid, int, act, '200');
press.removeAttribute('onswipe');    
});  
}   

}



function hexEventsL() {
    hexLongPress(); 
         hexSwipevent();
         
}


setInterval(hexEventsL, 500); 

function $Router(routeData) {

const currPathwin =  window.location.pathname;
xlogs.push(new Error().stack.split('\n')[2].trim() + `Current Pathname: ${currPathwin}`);
const rClass = routeData.class;
ruClass.push(rClass); 
var urlParams = new URLSearchParams(new URL(window.location).search);
var currPath = urlParams.get(rClass);
if(currPath == undefined) {
var currPath = "@";    
}

const rError = routeData.error; 
noRoute = rError; 
xlogs.push(`Location Route Class: ${rClass}`);
const routeObjects = routeData.routes || [];
  routeObjects.forEach(route => {
  
    const rPath = route.path;
    const rName = route.name;
    const rModule = route.module;
const rPile = { path: rPath, name: rName, module: rModule}; 
pileRoute.push(rPile);
xlogs.push(`Route Path "${rPath}" Set! Name: ${rName}, Module: ${rModule}`);
  });
  allRoute.push(routeObjects); 
const nowRoute = pileRoute.find(record => record.path === currPath);
if(nowRoute) { 
setRoute(nowRoute.module);
} else {
if(rError) { 
setRoute(rError); 
} else {
console.error('404: Not Found');
xlogs.push(new Error().stack.split('\n')[2].trim() + ' 404: Not Found'); 
}   
}
routeAll = routeData; 
return {
    UI: function() {
  xui = "yes"; 
    }
}
}


function getRouteInfo(objData, specify) {
let currPath; 
var urlParams = new URLSearchParams(new URL(window.location).search);
currPath = urlParams.get(ruClass);
if(currPath == undefined) {
currPath = "@";    
}

var path = currPath; 
var setit = "null";
const matchedRoute = objData[0].find(record => record.path === path);
if(matchedRoute && specify && matchedRoute.hasOwnProperty(specify)) {
var setit = matchedRoute[specify];
}
return setit;
}


function setRoute(vacuum) {
const xPath = readModule(vacuum); 
xlog.push(new Error().stack.split('\n')[2].trim() + ' ' + xPath); 
const routeV = document.getElementsByTagName('routeview')[0];

if(routeV) {

fetch(xPath).then(function(response) {
response.text().then(function(text) {
var data = text;

var regexx = /{ this\.route\.(\w+) }/g;

// Use replace with a callback function to replace the matched content
var data = data.replace(regexx, function (match, captureGroup) {
 
 return getRouteInfo(allRoute, captureGroup);
});




var parser = new DOMParser();
var doc = parser.parseFromString(data, 'text/html');
var rMarkUp = doc.querySelector('hexxe');
if(rMarkUp)  {
var data = rMarkUp.innerHTML;   
 } else {
 var data = "";
 }
routeV.innerHTML = data;

 



var rScript = doc.getElementsByTagName('script'); 
for(var i = 0; i < rScript.length;i++) {
const rScripter = rScript[i];
const hasApp = hasAttr(rScripter, 'local');if(hasApp == true){

const nScript = document.createElement("script");
nScript.setAttribute("local", "0");
let parseScript = rScripter.textContent;
parseScript = parseScript.replace(/\$IMPORT\('@UI'\)/g, "");
nScript.textContent = parseScript;
document.head.appendChild(nScript);

}
}
var rStyle = doc.getElementsByTagName('style'); 
for(var i = 0; i < rStyle.length;i++) {
const rStyler = rStyle[i];
const hasSty = hasAttr(rStyler, 'local');if(hasSty == true){
const nStyle = document.createElement("style");
nStyle.setAttribute("local", "0");
nStyle.textContent = rStyler.textContent;
document.head.appendChild(nStyle); 
}
}

if(xui == "yes") {
    rootHex(); 
}

}); }); 


} else {
console.error("No View To Load Content"); 
xlogs.push(new Error().stack.split('\n')[2].trim() + ' Error :! No View To Load Content');
}
}




let oldRoute; 
let newRoute; 

 
 function onRouteBack(theRr) {
   var urlParams = new URLSearchParams(new URL(window.location).search);
currPath = urlParams.get(ruClass);
if(currPath == undefined) {
currPath = "@";    
}

pushRoute(currPath); 

 }
  
  




function upRoute(vacuum, realpath) {
let xPath; 
if(realpath !== undefined) {
var orpath = realpath;
} else {
var orpath = "@";
}
xPath = vacuum; 
const routeV = document.getElementsByTagName('routeview')[0]; 
if(routeV) {
const nowrec = xrouter.find(record => record.path === vacuum);
if(nowrec) { } else {

xPath = readModule(noRoute); 
}

let url;
var obj = orpath;  
url = "?"+ruClass+"="+obj;
var locate = window.location.href; 
var findurl = new URL(locate); 
findurl.searchParams.delete(ruClass);
var baseurl = findurl.toString(); 
oldRoute = locate; 
newRoute = baseurl + url;
if(newRoute.includes("@")) {
newRoute = baseurl;     
}
console.log(new Error().stack.split('\n')[2].trim() + ` Go to: ${url}`);
if(oldRoute == newRoute) {
console.log(` Reload Path: ${obj}`) 
} else {
history.pushState(null, null, url);
}

fetch(xPath).then(function(response) {
response.text().then(function(text) {
var data = text; 
var regexx = /{ this\.route\.(\w+) }/;

// Use replace with a callback function to replace the matched content
var data = data.replace(regexx, function (match, captureGroup) {
 
 return getRouteInfo(allRoute, captureGroup);
});


var parser = new DOMParser();
var doc = parser.parseFromString(data, 'text/html');
var rMarkUp = doc.querySelector('hexxe');
if(rMarkUp)  {
var data = rMarkUp.innerHTML;    
 } else {
 var data = "";
 }
routeV.innerHTML = data;

window.scrollTo(0, 0);

var rScript = doc.getElementsByTagName('script'); 
for(var i = 0; i < rScript.length;i++) {
const rScripter = rScript[i];
const hasApp = hasAttr(rScripter, 'local');if(hasApp == true){

const nScripter = document.getElementsByTagName("script");

for(var i = 0; i < nScripter.length;i++) {
const nScript = nScripter[i];
const hasSny = hasAttr(nScript, 'local');if(hasSny == true){
let parseScript = rScripter.textContent;
parseScript = parseScript.replace(/\$IMPORT\('@UI'\)/g, "");
nScript.textContent = parseScript;
eval(nScript.textContent); 

}
}

if(xui == "yes") {

    rootHex(); 
}

}
}
var rStyle = doc.getElementsByTagName('style'); 
for(var i = 0; i < rStyle.length;i++) {
const rStyler = rStyle[i];
const hasSty = hasAttr(rStyler, 'local');if(hasSty == true){

const nStyler = document.getElementsByTagName("style");

for(var i = 0; i < nStyler.length;i++) {
const nStyle = nStyler[i];
const hasStr = hasAttr(nStyle, 'local');if(hasStr == true){
nStyle.textContent = rStyler.textContent;
}
}



}
}


}); }); 

} else {
console.error("No View To Load Content"); 
xlogs.push(new Error().stack.split('\n')[2].trim() + ' Error :! No View To Load Content')
}
}


function pushRoute(router) {
let route;
let rPath; 
route = router; 
var preserve = router; 
route = modModule(route);
if(router.includes("{")) {    
const regex = /{([^}]+)}/g;
const matches = router.match(regex);
if (matches) {
route = matches.map(match => match.match(/{\s*(.*?)\s*}/)[1].trim());
route = " " + route;
var preserve = mtpRoute(route); 
}
}

rPath = readModule(route); 

xlogs.push(new Error().stack.split('\n')[2].trim() + ` Compiled Module Path: '${rPath}'`);

upRoute(rPath, preserve);
}

function getClass() {
    return ruClass
}

function retRo(path) {
window.addEventListener('popstate', function(event) {
var currentState = history.state;
var previousState = currentState;
currentState = event.state;
if (!currentState) { onRouteBack(path); 
}});}

function routeLink() {

const setOroute = document.getElementsByTagName('route');
for(var i = 0; i < setOroute.length; i++) {
var setRoute = setOroute[i];
if(setRoute.getAttribute("parsed") == "true") {} else {
var theRr = setRoute.getAttribute(":go");
const wrapRr = document.createElement("div");
const newRr = document.createElement("rep");
newRr.classList.add("routelink"); 
newRr.href = "javascript:void(0)";
newRr.innerHTML = setRoute.innerHTML; 
newRr.setAttribute('onclick', `pushRoute('${theRr}'); retRo('${theRr}'); actRr(this)`); 
wrapRr.appendChild(newRr); 
setRoute.innerHTML = "";
setRoute.innerHTML = wrapRr.innerHTML; 
setRoute.setAttribute("parsed", "true");
}}

}


function actRr(element) {
var allLR = document.getElementsByClassName('routelink'); 
for(var i = 0; i < allLR.length; i++) {
var active = allLR[i]; 
active.classList.remove("route-active");   
}
element.classList.add("route-active"); 
}



function actTributes() {
const xfor = document.querySelectorAll('[x-for]'); 
for(var i = 0; i < xfor.length; i++) {
const xFor = xfor[i]; 
let forVal; 
forVal = xFor.innerHTML; 
const forAct = xFor.getAttribute("x-for");
xFor.innerHTML = '';
var [obj, objdata] = forAct.split(':in').map(item => item.trim());
const objData = eval(objdata); 

let forEnter = ""; 
let addVal; 
const forPat = new RegExp(`{\\s*${obj}\\.(\\w+)\\s*}`, 'g');
const forDex = new RegExp(`{\\s*${obj}\\.this\\.index\\s*}`, 'g');
const forGet = xFor.getAttribute("get");
const forLast = parseInt(objData.length) - 1; 
if(forGet !== null) {
let forDexer = forGet; 
if(forGet == "last") {
forDexer = forLast;
} 
if(forGet == "first") {
forDexer = 0;
} 

forPat.lastIndex = 0;
addVal = forVal.replace(forPat, function (match, captureKey) {
return objData[forDexer][captureKey]; 

}); 
let Dex = parseInt(forDexer) + 1;
addVal = addVal.replace(forDex, Dex); 
forEnter = forEnter + addVal;  
  
} else {
for(var x = 0; x < objData.length; x++) {
forPat.lastIndex = 0;
addVal = forVal.replace(forPat, function (match, captureKey) {
return objData[x][captureKey]; 

}); 
let Dex = parseInt(x) + 1;
addVal = addVal.replace(forDex, Dex); 
forEnter = forEnter + addVal;  
 }
}

xFor.innerHTML = forEnter;  
forEnter = "";
xFor.removeAttribute("x-for")
xFor.classList.add(makeid(7));  
}


}





function $reRoute(routeData) {

const currPathwin =  window.location.pathname;
xlogs.push(new Error().stack.split('\n')[2].trim() + ' Current Pathname:', currPath);
const rClass = routeData.class;
ruClass.push(rClass); 
var currPath  = $GET[rClass];
if(currPath == undefined) {
var currPath = "@";    
}
const rError = routeData.error; 
xlogs.push(new Error().stack.split('\n')[2].trim() + ' ' + rClass); 
const routeObjects = routeData.routes || [];
  routeObjects.forEach(route => {
    const rPath = route.path;
    const rName = route.name;
    const rModule = route.module;
const rPile = { path: rPath, name: rName, module: rModule}; 
pileRoute.push(rPile);
xlogs.push(new Error().stack.split('\n')[2].trim() + ` Class: ${rClass}, Path: ${rPath}, Name: ${rName}, Module: ${rModule}`);
  });
const nowRoute = pileRoute.find(record => record.path === currPath);
if(nowRoute) { 
upRoute(nowRoute.module);
} else {
if(rError) { 
upRoute(rError); 
} else {
console.error('404: Not Found');
}   
}
routeAll = routeData; 

}





function pullRoute(router) {
 let route; 
route = router;   
if(router.includes("{")) {    
const regex = /{([^}]+)}/g;
const matches = router.match(regex);
if (matches) {
route = matches.map(match => match.match(/{\s*(.*?)\s*}/)[1].trim());
route = " " + route; 
alert(route); 
route = dirModule(route); 
 

}
}    
    
alert(route); 
$reRoute(routeAll);  
}


HTMLElement.prototype.code = codeText;
HTMLElement.prototype.coder = codeTexter;

function codeText(ui) {
const cfont = document.createElement("link");
cfont.rel = "stylesheet";
cfont.href = "https://fonts.googleapis.com/css?family=Source+Code+Pro"; 
document.head.appendChild(cfont); 

var wordsToColor = [];
let text; 
if(ui !== "snippet") {
this.style.background = '#0a0a0a';
this.style.color = 'rgba(255,255,255,0.8)'
} 


text = this.innerHTML; 


var impPattern = /<imp[^>]*>[\s\S]*?<\/imp>/g;

 // Replace "imp" tags with a unique marker to preserve their content
var preservedContent = [];
text = text.replace(impPattern, function (match) {
preservedContent.push(match);

return '##IMPTAG##';

});



    
text = text.replace(/sscript/g, "script");
text = text.replace(/sstyle/g, "style");

text = text.replace(/(<script>)([\s\S]*?)(<\/script>)/g, (match, openTag, scriptContent, closeTag) => {
    // Use a regex to change the color of words before a colon to blue
scriptContent = scriptContent.replace(/(".*?")/g, '<imp color=#CE9178>$1</imp>');
scriptContent = scriptContent.replace(/('.*?')/g, '<imp color=#CE9178>$1</imp>');
scriptContent = scriptContent.replace(/\[([a-zA-Z0-9]+)\]/g, '\[<imp color=#CE9178>$1</imp>\]');
  
scriptContent = scriptContent.replace(/(\w+):/g, '<imp color=#81B4CF>$1</imp>:');
scriptContent = scriptContent.replace(/([^\s\n\(\)\[\]]+)\(/g, '<imp color=#CD666A>$1</imp>\(');
scriptContent = scriptContent.replace(/function\s*(\w+)/g, '<imp color=#cd666a>function</imp>&nbsp;<imp color=#70658d>$1</imp>');
scriptContent = scriptContent.replace(/const\s*(\w+)/g, '<imp color=#cd666a>const</imp>&nbsp;<imp color=#70658d>$1</imp>');

scriptContent = scriptContent.replace(/function/g, '<imp color=#cd666a>function</imp>');
scriptContent = scriptContent.replace(/const/g, '<imp color=#cd666a>const</imp>');   

    // Return the modified script content wrapped in script tags
    return `${openTag}${scriptContent}${closeTag}`;
});


 // Replace "imp" tags with a unique marker to preserve their content
var preservedContentSCR = [];
text = text.replace(impPattern, function (match) {
preservedContentSCR.push(match);

return '##IMPSCR##';

});




text = text.replace(/\n/g, "b-r");
text = text.replace(/</g, "&lt;");
text = text.replace(/>/g, "&gt;");


text = text.replace(/(\w+)=/g, '<imp colore-q-t#4D9699>$1</imp>=');


text = text.replace(/e-q-t([^>]+)/g, '=$1');

 text = text.replace(/(".*?")/g, '<imp style="color: #7f8fa1;">$1</imp>');
text = text.replace(/('.*?')/g, '<imp style="color: #7f8fa1;">$1</imp>');
text = text.replace(/&lt;([^\s]+)/g, '<imp style="color: #BAA669;">&lt;$1</imp>');
text = text.replace(/&lt;\/(\w+)&gt;/g, '<imp style="color: #BAA669;">&lt;/$1&gt;</imp>');

text = text.replace(/b-r/g, "<br>");
text = text.replace(/h-r/g, "<hr>");
 
if(ui !== undefined) {
text = `<br>&#128308;&nbsp;&\#128993;&nbsp;&\#128994;<br><br>` + text + `<br><br>`;
}

text = text.replace(/\/\/\s*([a-zA-Z0-9\s\(\)\[\]]+)/g, '<imp style="opacity: 0.5">\/\/$1</imp>');


text = text.replace(/##IMPSCR##/g, function () {

 return preservedContentSCR.shift();

});



// Restore the preserved "imp" tags

text = text.replace(/##IMPTAG##/g, function () {

 return preservedContent.shift();

});
text = text.replace(/&lt;\/imp&gt;/g, '');

 this.style.padding = '10px';
const snip = document.createElement("button"); 
snip.style.background = '#0a0a0a';
snip.style.border = 'none';
snip.style.textAlign = 'left';
snip.style.color = 'rgba(255,255,255,0.8)';
snip.style.width = 'auto';
snip.style.fontFamily = 'Source Code Pro';
snip.style.padding = '10px 15px'; 
snip.style.borderRadius = '12px'; 
     snip.innerHTML = text;




if(ui !== "snippet") {
this.innerHTML = "";
 this.appendChild(snip);
 } else {
this.innerHTML = "";
const back = document.createElement("button");
back.id = "codesnap";
back.style.textAlign = 'left';
back.style.width = 'auto';
back.style.border = 'none';
back.style.borderRadius = '12px'; 
back.style.background = 'linear-gradient(to bottom right, #0695E7, #1A9FE1, #49B6D5, #61C1CF, #6AC5CC)'; 
back.style.padding = '25px 50px';
     back.appendChild(snip); 
     this.appendChild(back);
 }

}




function codeTexter(ui) {
const cfont = document.createElement("link");
cfont.rel = "stylesheet";
cfont.href = "https://fonts.googleapis.com/css?family=Source+Code+Pro"; 
document.head.appendChild(cfont); 
var wordsToColor = [];
let text; 
this.style.background = '#0a0a0a';
this.style.color = 'white';
text = this.innerHTML; 
    

// Change the color of text inside double quotes to orange

var impPattern = /<imp[^>]*>[\s\S]*?<\/imp>/g;

 // Replace "imp" tags with a unique marker to preserve their content
var preservedContent = [];
text = text.replace(impPattern, function (match) {
preservedContent.push(match);

return '##IMPTAG##';

});

// Change the color of text inside double quotes to orange
text = text.replace(/<br>/g, "b:r");
text = text.replace(/</g, "&lt;");
text = text.replace(/>/g, "&gt;");





 text = text.replace(/(".*?")/g, '<imp style="color: #7f8fa1;">$1</imp>');
text = text.replace(/('.*?')/g, '<imp style="color: #7f8fa1;">$1</imp>');
text = text.replace(/&lt;([^ ]+)/g, '<imp style="color: #BAA669;">&lt;$1</imp>');
text = text.replace(/&lt;\/(\w+)&gt;/g, '<imp style="color: #BAA669;">&lt;/$1&gt;</imp>');
text = text.replace(/function\s(\w+)/g, 'function&nbsp;<imp style="color: orange;">$1</imp>');
text = text.replace(/function\s(\w+)/g, 'function&nbsp;<imp style="color: #70658d;">$1</imp>');
text = text.replace(/const\s([^ =]+)/g, 'const&nbsp;<imp style="color: #70658d;">$1</imp>');

// Change the color of specified words to red

for (var i = 0; i < wordsToColor.length; i++) {
 var word = wordsToColor[i];
 var regex = new RegExp("\\b" + word + "\\b", "g");
 text = text.replace(regex, '<imp style="color: #e8511a;">' + word + '</imp>');

 }
 
 

var gold = ["var", "label", "col", "value", "placeholder", "type", "name", "width", "height", "icon", "list", "page-middle", "absolute", "x-for", "x-input", "x-click", "font", "theme", "margin", "back", "rootHexApp", "Router", "src", "href", "class", "bold", "const", "let", "this", "function", "class", "parseFloat", "parseInt", "Math", "console.log", "forEach", ".push", "npm install"]; 
 for (var i = 0; i < gold.length; i++) {

var gword = gold[i];

var regex = new RegExp(gword + "\\b", "g");

text = text.replace(regex, '<imp style="color: #cd666a;">' + gword + '</imp>');
 }
 text = text.replace(/b:r/g, "<br>");
 text = text.replace(/h:r/g, "<hr>");
  text = text.replace(/sscript/g, "script");
text = text.replace(/sstyle/g, "style");

// Restore the preserved "imp" tags

text = text.replace(/##IMPTAG##/g, function () {

 return preservedContent.shift();

});
text = text.replace(/&lt;\/imp&gt;/g, '');

 this.style.padding = '10px';


 this.innerHTML = text;

}






function colorCode() {
    let result = '';
    const characters = 'ABCDEF0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    xlogs.push(new Error().stack.split('\n')[2].trim() + ` #${result}`); 
    return '#'+result;
}

function rootHexSize(target='', display) {

if(display == null) {
var result = document.createElement("in");
result.id = "hexsize";
document.body.appendChild(result); } else {
var result = document.querySelector(display);
}
function hexSpecTarget(resources) {
const targetDom = document.querySelector(resources); 
let targetTotSize;
const targetImg = targetDom.querySelectorAll('img,video,audio,iframe,embed');
var textLen = targetDom.innerHTML
var textSize = unescape(encodeURIComponent(textLen)).length;
var textIntS = Number(textSize);

var totalSizeInMB = (textIntS / 1024).toFixed(2);

var oldSizeMB = result.innerText;
var passOldSize = Number(oldSizeMB); 

result.innerText = Number(totalSizeInMB) + passOldSize; 
result.value = Number(totalSizeInMB) + passOldSize; 


for (var x = 0; x < targetImg.length; x++) {
const targetSrc = targetImg[x].src;
const tarGate = checkFileSize(targetSrc, function(tarFileSize){ enterSize(tarFileSize);});
}

}

function enterSize(resources) {
thesize = resources;
showTotSize(thesize);
}
function calculateSize(resources){
let totalSize = 0; resources.forEach((resource) => {
          totalSize += resource.encodedBodySize;
        });
totalSize = parseInt(totalSize);
var totalSizeInMB = (totalSize / 1024).toFixed(2);
result.innerText = totalSizeInMB;
result.value = totalSizeInMB;

}

function checkFileSize(resources, callback) {
let tarFileSize; 
var xhr = new XMLHttpRequest();
xhr.open('HEAD', resources, true);
xhr.onreadystatechange = function(){
  if ( xhr.readyState == 4 ) {
    if ( xhr.status == 200 ) {
tarFileSize =  xhr.getResponseHeader('Content-Length');
callback(tarFileSize);
    } else {
      alert('Hex Error: Trouble Getting DOM size');
    }
  }
};
xhr.send(null);


}
if (performance && performance.getEntriesByType) {
const resources = performance.getEntriesByType('resource');
let totalSize;
if (target) {

 const targetElement = document.querySelector(target);
 if (targetElement) {
totalSize = hexSpecTarget(target);
} else {

result.innerHTML = 'Target element not found.';
result.value = 'Target element not found.';
return;
}
} else {
calculateSize(resources);
        }
function showTotSize(resources){
var thesource = resources;
if(thesource == null) {
var thesource = "0";
}
var totalSizeInMB = (thesource / 1024).toFixed(2);

var oldSizeMB = result.innerText;
var passOldSize = Number(oldSizeMB); 

result.innerText = Number(totalSizeInMB) + passOldSize; 
result.value = Number(totalSizeInMB) + passOldSize; 

}

} else {
console.error('Hex Error: Unsupported Browser - Cannot Track Page Size');
}}



// data binding 

function rootHexApp(initialData){

return function (targetSelector){
const targetElement = document.querySelector(targetSelector);
if (targetElement) {
const template = targetElement.innerHTML;
// Function to render the template with data
function render(data) {

const renderedContent = template.replace(/\{\{ (.*?) \}\}/g, (match, variable) => {
var key = variable.trim();
var key = key.replace(/\s/g, "");
if(key.includes("@html")) {
var key = key.replace(/@html/g, "");
}

var renKey = data[key] || '';
if(match.includes("@html")) {
var renKey = renKey.replace(/</g, "&lt;");
var renKey = renKey.replace(/>/g, "&gt;"); 
}
return renKey; 
});

return renderedContent; }

function getAll(exist) {
let info = "";
for (let propertyName in initialData) {
if (initialData.hasOwnProperty(propertyName)) {
const value = initialData[propertyName];
      
if(propertyName !== exist) {
info += propertyName+": '" + value + "'," }
    } else {
console.log(`Key: ${propertyName}, Value: ${value}`);    
    }
  }
return info
}

function addKey(data) {
var set = 'initialData.' + data;
var setData = eval(set);
if(setData == null) {
console.error('Key does not exist');
}
targetElement.innerHTML = template; 
var addData = parseInt(setData) + 1;
var all = getAll(data);

var dothis = `const upApp = rootHexApp({
`+data+`: addData,` + all +`
});
upApp(targetSelector).listen()`;
eval(dothis);
rootHex(targetSelector); 
var listen = "{{ click }}";
}

function setKey(data, value) {
if(data !== undefined) {
var set = 'initialData.' + data;
} else {
data = "";
}
if(value == undefined) {
    value = "";
}
var setData = eval(set);
if(setData == null) {
console.error('Key does not exist');
}
targetElement.innerHTML = template; 
var addData = value;
var all = getAll(data);
var dothis = `const upApp = rootHexApp({
`+data+`: addData,` + all +`
});
upApp(targetSelector).listen()`;
eval(dothis);
rootHex(targetSelector);
var listen = "{{ click }}";
}




function impKey(target) {
var setData = document.querySelector(target);
if(setData == null) {
console.error('Input Object does not exist');
} else {
var data = setData.getAttribute('x-input');
var set = 'initialData.' + data;
var checkKey = eval(set);
if(checkKey == null) {
console.log(`Undefined key, "${data}" updated`);
}  
targetElement.innerHTML = template; 
var addData = document.querySelector(target).value;
var all = getAll(data);
var dothis = `const upApp = rootHexApp({
`+data+`: addData,` + all +`
});
upApp(targetSelector).listen()`;
eval(dothis);
rootHex(targetSelector);
var listen = "{{ click }}";
}}


function getKey(data, listen) {
let key = null;  
const keyCont = template.replace(/\{\{ (.*?) \}\}/g, (match, variable) => {
key = variable.trim();
});
 return key;} 
// Update the content
targetElement.innerHTML = render(initialData);



        } else {
console.log("Hex Error: Target element not found!"); 
}
return { 
listen: function () {
var actionHTML = document.querySelector(targetSelector);

const elemInput = actionHTML.querySelectorAll('[x-enter]');
elemInput.forEach((eleEnter, index) => {
const hasInput = eleEnter;
const theInput = hasInput.getAttribute('x-enter');  

hasInput.addEventListener("keyup", function() {
var inValue = hasInput.value;
 setKey(theInput, inValue);
   });
   
}); 


const elemClick = actionHTML.querySelectorAll('[x-click]');
elemClick.forEach((eleClick, index) => {
const hasClick = eleClick;
  const theActionor = hasClick.getAttribute('x-click');  
const theActionsplit  = theActionor.split(";");


 for (var i = 0; i < theActionsplit.length; i++) {
 (function (index) {
var theAction = theActionsplit[i]; 
if(theAction.includes("++")) {
const currKeyor = theAction.split("++")[0]; 
const currKey = currKeyor.split(" ").pop();
hasClick.addEventListener("click", function() {
addKey(currKey);
 });
} else if(theAction.includes("=")) {
var theK = theAction.match(/([^=]+)\s*=/);
if (theK) {
  var currKey = theK[1].trim(); 
  
var parts = theAction.split('=').map(item => item.trim());
// Check if the first part (parts[0]) matches the key
if (parts[0] === currKey) {
  var posValue = parts[1]; 
hasClick.addEventListener("click", function() {
 setKey(currKey, posValue);
   });
} else {
console.log("Inject not found in the target");
} } else {
    
console.log("no attribute found"); 
}
} })(i); }

  });           
},

action: function (val) {
   eval(val);
},

input: function(target) {
var inpelem = document.querySelector(target);

inpelem.addEventListener("keyup", function() {

 impKey(target);
   });
   
  
    
}
};
};}

// Hexxe Icons


// exeLogs 


function exeLogs() {
 const logEle = document.querySelectorAll('xlog')[0]; 
if(logEle) {
const logbut = document.createElement("button");
logbut.style.background = 'white';
logbut.style.border = 'black 1px solid';
logbut.style.borderRadius = '5px';
logbut.style.fontSize = '17px';
logbut.innerText = 'GET LOGS';
logbut.style.fontWeight = '650';
logbut.style.padding = '5px 12px'; 

logbut.addEventListener("click", function() {

let log = "";
for(var i = 0; i < xlogs.length; i++) {
log = log + xlogs[i] + '\n\n\n';   
}
const blob = new Blob([log], {type: 'log'});
const fileUrl = URL.createObjectURL(blob);
const link = document.createElement("a");
 link.href = fileUrl;
 link.id = 'xlogs'; 
 if(logEle.getAttribute("download") == "true") {
 link.download = 'HEXXE'
 }
 link.click();
    

   
})
logEle.parentNode.replaceChild(logbut, logEle);   
}
       
    
    
}



function xcon(icon) {
let gxcon;
if(icon.includes("brand")) {
var bcon = icon.split("brand-").pop(); 
gxcon = "<i class='fab fa-"+bcon+"'></i>"; 
} else {
gxcon = "<i class='fa fa-"+icon+"'></i>"; 
} 
return gxcon;    
}

// form validation

function rootHexForm(validationRules) {
function validateForm(formSelector) {
const formElement = document.querySelector(formSelector);
if (formElement) {
const errorhex = document.createElement("div");
errorhex.style.color = "red";
errorhex.id = "errorhex";
formElement.appendChild(errorhex);
formElement.addEventListener('submit', (event) => {
let valid = true;
const errorMessages = [];
for (const fieldName in validationRules) {
const fieldElement = formElement.querySelector(`[name="${fieldName}"]`);
if (fieldElement) {
const value = fieldElement.value;
const rules = validationRules[fieldName];
if (rules.required && value.trim() === '') {
valid = false;
errorMessages.push(`The ${fieldName} field is required.`);
}
if (rules.minLength && value.length < rules.minLength) {
valid = false;
 errorMessages.push(`The ${fieldName} field must be at least ${rules.minLength} characters.`);
}

if (rules.maxLength && value.length > rules.maxLength) {
  valid = false;
  errorMessages.push(`The ${fieldName} field cannot exceed ${rules.maxLength} characters.`);
}

if (rules.minValue && parseFloat(value) < rules.minValue) {
  valid = false;
  errorMessages.push(`The ${fieldName} field must be greater than or equal to ${rules.minValue}.`);
}

if (rules.maxValue && parseFloat(value) > rules.maxValue) {
  valid = false;
  errorMessages.push(`The ${fieldName} field must be less than or equal to ${rules.maxValue}.`);
}

if (rules.isNumber && isNaN(value)) {
  valid = false;
  errorMessages.push(`The ${fieldName} field must be a number.`);
}

if (rules.containsUppercase && !/[A-Z]/.test(value)) {
  valid = false;
  errorMessages.push(`The ${fieldName} field must contain at least one uppercase letter.`);
}

if (rules.containsDigit && !/\d/.test(value)) {
  valid = false;
  errorMessages.push(`The ${fieldName} field must contain at least one digit.`);
}

if (rules.regex && !new RegExp(rules.regex).test(value)) {
valid = false;
errorMessages.push(`The ${fieldName} field does not match the required pattern.`);
}


// You can add more validation rules here

if (!valid) { 
event.preventDefault();
document.getElementById('errorhex').innerHTML = errorMessages.join('<br>'); 
}}}});
} else {
console.log("Hex Error: Form element not found!");
}}
return validateForm;

}

// hexTable - create tables

 function hexTable(targetSelector, config) {
config.forEach(paramObj => {
const tr = document.createElement("tr");
for (const key in paramObj) {
 if (paramObj.hasOwnProperty(key)) {
const value = paramObj[key];
tr.innerHTML += "<td>"+value+"</td>";
     
 }}

        
const targetTr = document.querySelector(targetSelector);
targetTr.appendChild(tr); 
        
    });
}


// rootHexState function
function rootHexState(options) {
const state = {};
const eventBus = {};
const stateTarget = document.querySelector(options.target);
const stateKey = options.state;
function setState(value) {
state[stateKey] = value;
if (eventBus[stateKey]) {
eventBus[stateKey].forEach((callback) => callback(value));
}}
function getState() {
return state[stateKey];
}
function subscribeToState(callback) {
if (!eventBus[stateKey]) {
eventBus[stateKey] = [];
}
eventBus[stateKey].push(callback);}
return function () {
var stateUse = "";
if(options.use == null) {
var stateUse = "innerText"; 
} else {
var stateUse = options.use;
}
const stateEffect = stateUse;

subscribeToState((newValue) => {
stateTarget[stateEffect] = newValue;
});
var newStateVal = "";
if(options.content == "prompt") {
var newStateVal = prompt("Enter a new username:");
} else {
var newStateVal = options.content;
}
setState(newStateVal);
};}


function newHexForm(initialFields) {
const fields = initialFields || [];
function generateForm(target) {
const formElement = document.querySelector(target);
formElement.innerHTML = "";
if (!formElement || fields.length === 0) {return;}
const form = document.createElement("div");
fields.forEach((field) => {
const hfitype = Object.keys(field)[0]; 
const hexformInput = document.createElement(hfitype); 
if(hfitype == "select" || hfitype == "datalist") {
hfioptions = field.options.split(",");
for(var x = 0; x < hfioptions.length; x++) {
const hexformSelectOpt = document.createElement("option");
hexformSelectOpt.value = hfioptions[x];
if(hfitype == "select") {
hexformSelectOpt.innerText = hfioptions[x]; }
hexformInput.appendChild(hexformSelectOpt);
}
}


for (const hexformInputAttr in field) {
        if (field.hasOwnProperty(hexformInputAttr)) {
if(!field[hexformInputAttr]) {
 } else {

var hexformInputAttrVal = field[hexformInputAttr];          hexformInput.setAttribute(hexformInputAttr, hexformInputAttrVal);
       }   
        }
      }


form.appendChild(hexformInput);
});
formElement.appendChild(form)
}
return generateForm;

}


const sumhead = document.getElementsByTagName('HEAD')[0];

const calcjs = document.createElement('script');
calcjs.src = 'calc.hex.js';



   
const hexuse = document.getElementsByTagName('use'); 
if(hexuse.length > 0) {
for(var i = 0; i < hexuse.length; i++) { 
const theuse = hexuse[i];
const usesrc = theuse.getAttribute("src"); 
if(usesrc.includes("js")) {
const uscript = document.createElement("script"); uscript.src = usesrc; uscript.type = "text/javascript"; sumhead.appendChild(uscript); } 
else { 
if(usesrc.includes("css")) {
const ustyle = document.createElement("link"); ustyle.rel = "stylesheet"; ustyle.type = "text/css"; ustyle.href = usesrc; sumhead.appendChild(ustyle); } else {
let xhr = new XMLHttpRequest(); xhr.open("POST", usesrc, true); xhr.onload = ()=>{ if(xhr.readyState === XMLHttpRequest.DONE){ if(xhr.status === 200){ let data = xhr.response; if(data == "") { } else { 
var newidd = makeid(5);
function sendIt(){
var newuse = document.createElement("div");
newuse.id = newidd;
newuse.innerHTML = data;
theuse.parentNode.replaceChild(newuse, theuse);
}
sendIt();
rootHex();
}}}}; 
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); xhr.send("sess=hex8080");}} 
    
}
} 




function newPlayer() {
const pscript = document.createElement("script"); 
pscript.src = "/Sum/player.hex.js";
document.body.appendChild(pscript); 
newAud();
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}



const hasAttr = (el, attr) => el.getAttribute(attr) != null;


function typeText(elementh) {
var typeele = document.querySelector(elementh);

const stype = typeele.getElementsByTagName('*'); for(var i = 0; i < stype.length;i++) {const typea = stype[i];
const types = hasAttr(typea, 'typetext');if(types == true){
typev = typea.getAttribute("typetext"); 
const typestr = typev.split(' ');
var sTin = parseInt(typestr[0]);
if(typestr[0] > 0){ } else {var sTin = parseInt("100");} 
const words = typea.innerHTML;
let charIndex = 0;
setInterval(function(){
var sdText = typea;
var formertext = sdText.innerHTML;
sdText.innerText = "";
var currentWord = words;
var currentChar = currentWord.substring(0, charIndex);
sdText.innerHTML = currentChar;
if(sdText.innerHTML == formertext) {sdText.classList.remove("is-blinking");  
} else {
if(typestr[1] == "") {
 sdText.classList.add("is-blinking");   
} else {
if(typestr[1] == "noblink") { } else {
  sdText.classList.add("is-blinking");      
    }}}
charIndex++;
}, sTin);
}}

    
}




function rootHex(target) {

var startTime = performance.now();
xlogs.push(`at ( <anonymous> ) UI Running`);

let hexxer;   
if(target !== undefined) {
hexxer = document.querySelector(target);  
} else {
hexxer = document;
} 
const sumicon = document.createElement('script');
sumicon.src= '/Sum/xcon.hex'; 
const sumcss = document.createElement('link');
sumcss.rel = 'stylesheet';
sumcss.type = 'text/css';
sumcss.href = '/Sum/hex.css';
const popcss = document.createElement('link');
popcss.rel = 'stylesheet';
popcss.type = 'text/css';
popcss.href = 'https://fonts.googleapis.com/css?family=Poppins';
const urbcss = document.createElement('link');
urbcss.rel = 'stylesheet';
urbcss.type = 'text/css';
urbcss.href = 'https://fonts.googleapis.com/css?family=Urbanist';
const rubcss = document.createElement('link');
rubcss.rel = 'stylesheet';
rubcss.type = 'text/css';
rubcss.href = 'https://fonts.googleapis.com/css?family=Rubik';
const chacss = document.createElement('link');
chacss.rel = 'stylesheet';
chacss.type = 'text/css';
chacss.href = 'https://fonts.googleapis.com/css?family=Charm';
const outcss = document.createElement('link');
outcss.rel = 'stylesheet';
outcss.type = 'text/css';
outcss.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;900&display=swap';
sumhead.appendChild(sumicon);
sumhead.appendChild(sumcss);  
sumhead.appendChild(popcss);  
sumhead.appendChild(urbcss);  
sumhead.appendChild(rubcss);  
sumhead.appendChild(chacss);  
sumhead.appendChild(outcss);

const mobX = hexxer.querySelectorAll('[mobile]'); 
mobX.forEach(function(mobile) {
const state = mobile.getAttribute("mobile");
const mob = document.createElement("div");
mob.setAttribute("state", "mobile-only");
const desk = document.createElement("div");
desk.setAttribute("state", "desktop-only");
if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
if(state == "false") {
mobile.parentNode.replaceChild(desk, mobile);  
xlogs.push(`${mobile} removed from mobile view`);    
}                      
} else {
if(state == "true") {
mobile.parentNode.replaceChild(mob, mobile);  
xlogs.push(`${mobile} removed from desktop view`);    
}                       
}});



 
const hexnav = hexxer.querySelectorAll('nav');
for(var i = 0; i < hexnav.length;i++) {
var thenavv = hexnav[i];
const navtype = thenavv.getAttribute("type");
const navicon = thenavv.getAttribute("logo");
const navfont = thenavv.getAttribute("font");
const navname = thenavv.getAttribute("name");
let stat = "";
if(thenavv.getAttribute("blink") == "1") {
stat = "typetext"
}

var thenav = document.createElement("div");
document.body.appendChild(thenav); 
if(navtype == "footer") {
const naval = thenavv.innerHTML;
thenav.innerHTML = naval;
thenav.id = "footer-nav";
thenav.style.width = '100vw';
thenavv.innerHTML = '';
thenavv.remove();
}
if(navtype == "header") {
var hasnavh = document.getElementById('header-nav'); 
if(hasnavh !== null) {} else {
const naval = thenavv.innerHTML;
thenavv.innerHTML = '';
const navhead = document.createElement("div");
navhead.id = "navhead";
navhead.classList.add("navhead");
thenav.appendChild(navhead);
const navlogo = document.createElement("div");
navlogo.classList.add("navlogo");
navlogo.innerHTML = '<img id="logonav" src="'+navicon+'" width="40"><p '+stat+' style="margin-left: 10px;">'+navname+'</p><i class="fa fa-list opennav" id="imgnav" onclick="togNav();"></i>';
if(navfont !== null) {
navlogo.style.setProperty('font-family', navfont);    
} 
navhead.appendChild(navlogo);
var logonav = document.getElementById('logonav'); 
if(logonav !== null) {
logonav.onerror = function() {
 logonav.remove(); }
 }

const headernav = document.createElement("div");
headernav.id = "header-nav";
headernav.style.setProperty("user-select", "none");
thenav.appendChild(headernav);
const closenav = document.createElement("div");
closenav.classList.add("navlogo");
closenav.innerHTML = `<img id="logonav2" src="`+navicon+`" width="40"><p '+stat+' style="margin-left: 10px; font-family: '`+navfont+`'">`+navname+`</p><p class="closenav" style="font-weight: 100;" style="margin-right: 20px;" onclick="togNav();">&times;</p>`;
headernav.appendChild(closenav);
var logonav2 = document.getElementById('logonav2'); 
if(logonav !== null) {
logonav2.onerror = function() {
 logonav2.remove(); }
 }
const innernav = document.createElement("div");
innernav.classList.add("navinner");
innernav.innerHTML = naval;
headernav.appendChild(innernav);
thenavv.remove();
} }
}


const pophome = hexxer.getElementsByTagName('body')[0];
const spop = hexxer.getElementsByTagName('*');for(var i = 0; i < spop.length;i++) {
const sumpop = spop[i];
const haspop = hasAttr(spop[i], 'pop');if(haspop == true){
const popinput = sumpop.getAttribute("pop");
const pclass = sumpop.getAttribute("pop-class");
const pclose = sumpop.getAttribute("pop-close");
const popen = sumpop.getAttribute("pop-open"); 
popray = popinput.split(' ');
poprole = popray[0]; 
const popval = sumpop.innerHTML;
const popbody = document.createElement("div");
popbody.setAttribute("class", "popbody");
popbody.id = poprole;
if(pclose !== undefined) {
popbody.setAttribute("pop-close", pclose);    
}
if(popen !== undefined) {
popbody.setAttribute("pop-open", popen);    
}
pophome.appendChild(popbody);
const newpop = document.createElement("div");
newpop.classList.add("s-pop");
if(pclass !== undefined || pclass !== null) {
newpop.classList.add(pclass);
 
}

popbody.appendChild(newpop);
const popcan = document.createElement("div");
popcan.id = "popcan";
popcan.classList.add("popcan");
popcan.innerHTML = `<in onclick="hexPop('`+poprole+`')">&times;</in>`;
newpop.appendChild(popcan);
const poptext = document.createElement("div");
poptext.setAttribute("class", "poptext");
poptext.innerHTML = popval;
const popdel = document.createElement("button");
popdel.id = "popdel"; 
popdel.setAttribute("class", "smart fill-line pulse shadow");
if(popray[2]) {
popdel.setAttribute("onclick", "location.href='"+popray[2]+"'; hexPop('"+poprole+"');");   
} else {
popdel.setAttribute("onclick", "hexPop('"+poprole+"');"); }
if(popray[1]) { var popgin = popray[1]; var popkay = popgin.replace(/_/g, " ");} else { var popkay = "OKAY"; }
popdel.innerText = popkay;
newpop.appendChild(poptext);
newpop.appendChild(popdel);
sumpop.innerHTML = '';
sumpop.style.display='none';
}}


const aspop = hexxer.getElementsByTagName('*');for(var i = 0; i < aspop.length;i++) {
const asumpop = aspop[i];
const ahaspop = hasAttr(aspop[i], 'alert');if(ahaspop == true){
var apoprole = asumpop.getAttribute("alert");
if(apoprole == null) {
var apoprole = "0";
} else {
var apoprole = apoprole*1000;
}
const apopval = asumpop.innerHTML;
const apopbody = document.createElement("div");
apopbody.setAttribute("class", "popbody");
const alertid = makeid(7);
apopbody.id = alertid;
pophome.appendChild(apopbody);
const anewpop = document.createElement("div");
anewpop.setAttribute("class", "s-pop");
apopbody.appendChild(anewpop);
const apopcan = document.createElement("div");
apopcan.id = "popcan";
apopcan.classList.add("popcan");
apopcan.innerHTML = `<in onclick="hexPop('`+alertid+`')">&times;</in>`;
anewpop.appendChild(apopcan);
const apoptext = document.createElement("div");
apoptext.setAttribute("class", "poptext");
apoptext.innerHTML = apopval;
const apopdel = document.createElement("button");
apopdel.id = "popdel"; 
apopdel.setAttribute("class", "smart fill-line pulse shadow");
var apopkay = "OKAY"; 
apopdel.innerText = apopkay;
apopdel.setAttribute("onclick", "hexPop('"+alertid+"');");
anewpop.appendChild(apoptext);
anewpop.appendChild(apopdel);
asumpop.innerHTML = '';
asumpop.removeAttribute("alert");
asumpop.style.display='none';
setTimeout(function() {
  hexPop(alertid); 
}, apoprole);
}}






const hexdrop = document.querySelectorAll('drop'); for(var i = 0; i < hexdrop.length;i++) {
const thedropp = hexdrop[i];
const dropback = thedropp.style.background; 
dropid = makeid(9);
const dropname = thedropp.getAttribute("name");
const thedrop = document.createElement("div");
thedrop.style.width = '100%';
thedrop.style.background = thedropp.parentElement.style.background; 
const dropval = thedropp.innerHTML;
thedropp.innerHTML = '';
thedropp.parentNode.replaceChild(thedrop, thedropp);
const drophead = document.createElement("div");
drophead.innerHTML = '<div style="position: relative; display: flex;" noselect><p style="margin: 0px">'+dropname+'</p><p id="drop'+dropid+'" style="position: absolute; right: 0; margin: 0 10px 0 0;">+</p></div><hr>';
drophead.setAttribute("onclick", "togDrop('"+dropid+"')");
thedrop.appendChild(drophead);
const sdrop = document.createElement("div");
sdrop.classList.add("drophex");
sdrop.style.overflow = 'hidden';
sdrop.style.background = dropback; 
sdrop.style.zIndex = '9';
sdrop.style.height = '0';
sdrop.id = dropid; 
sdrop.innerHTML = dropval; 
thedrop.appendChild(sdrop);

}

    
 
const stype = hexxer.getElementsByTagName('*'); for(var i = 0; i < stype.length;i++) {const typea = stype[i];
const types = hasAttr(typea, 'typetext');if(types == true){
typev = typea.getAttribute("typetext"); 
const typestr = typev.split(' ');
var sTin = parseInt(typestr[0]);
if(typestr[0] > 0){ } else {var sTin = parseInt("100");} 
const words = typea.innerHTML;
let charIndex = 0;
typea.removeAttribute("typetext"); 
setInterval(function(){
var sdText = typea;
var formertext = sdText.innerHTML;
sdText.innerText = "";
var currentWord = words;
var currentChar = currentWord.substring(0, charIndex);
sdText.innerHTML = currentChar;
if(sdText.innerHTML == formertext) {sdText.classList.remove("is-blinking");
} else {
if(typestr[1] == "") {
 sdText.classList.add("is-blinking");   
} else {
if(typestr[1] == "noblink") { } else {
  sdText.classList.add("is-blinking");      
    }}}
charIndex++;
}, sTin);
}}










 const shide = hexxer.getElementsByTagName('*'); for(var i = 0; i < shide.length;i++) {const hides = shide[i];const hashide = hasAttr(hides, 'hidden');if(hashide == true){hides.style.display = 'none';}}
 
    


const slideEle = document.querySelectorAll('[slide]'); 
for(var i = 0; i < slideEle.length; i++) {
const slideUi = slideEle[i];
const dirSlide = slideUi.getAttribute("slide"); 
if(dirSlide == "up") {
slideUi.classList.add("slideui-up"); 
}    

if(dirSlide == "down") {
slideUi.classList.add("slideui-down"); 
}  

if(dirSlide == "left") {
slideUi.classList.add("slideui-left"); 
} 

if(dirSlide == "right") {
slideUi.classList.add("slideui-right"); 
}         
    
}  
      



 
    
const divs = document.querySelectorAll('size'); for(var i = 0; i < divs.length;i++){const esize = divs[i];const upsize = esize.getAttribute("up");const downsize = esize.getAttribute("down");const parent = divs[i].parentElement;const parentsize = window.getComputedStyle(parent, null).getPropertyValue('font-size');const pfontSize = parseFloat(parentsize);const oldsize = parseInt(pfontSize);const upex = hasAttr(esize, 'up');if(upex == true){if(upsize > 0) {const addsize = parseInt(upsize);const newsize = oldsize + addsize;esize.style.fontSize = newsize+'px';}else{esize.style.fontSize = (pfontSize + 5) + 'px';
    }}     
const downex = hasAttr(esize, 'down');if(downex == true) { 
if(downsize > 0){const subsize = parseInt(downsize);const newsize = oldsize - subsize;esize.style.fontSize = newsize + 'px';}else{esize.style.fontSize = (pfontSize - 5) + 'px';}}}



const imgr = document.querySelectorAll('img'); for(var i = 0; i < imgr.length;i++) {const rimg = imgr[i];const sround = hasAttr(rimg, 'round');if(sround == true){rimg.style.borderRadius = '50%';}}
const squo = hexxer.getElementsByTagName('*'); for(var i = 0; i < squo.length;i++) {const quos = squo[i];const hasquo = hasAttr(quos, 'quote');if(hasquo == true){quos.classList.add("quote");}}
const formno = document.querySelectorAll('form'); for(var i = 0; i < formno.length;i++) {const rformno = formno[i];const sformno = hasAttr(rformno, 'nosubmit');if(sformno == true){
    rformno.onsubmit = function(evt){evt.preventDefault();};
}}
const imgf = document.querySelectorAll('img'); for(var i = 0; i < imgf.length;i++) {const fimg = imgf[i];const sfallimg = hasAttr(fimg, 'fallback');if(sfallimg == true){const simgfall = fimg.getAttribute("fallback"); fimg.onerror = function() { fimg.src = simgfall;  };}} 


const hexgrad = hexxer.querySelectorAll('[gradient]'); for(var i = 0; i < hexgrad.length;i++) {const gradh = hexgrad[i];
 const gradtype = gradh.getAttribute("gradient"); 
gradh.classList.add("gradient");
gradh.style.backgroundImage = 'linear-gradient('+gradtype+')';
gradh.removeAttribute("gradient");  
}






const hexbgrad = document.querySelectorAll('[back-gradient]'); for(var i = 0; i < hexbgrad.length;i++) {const bgradh = hexbgrad[i];
 const bgradtype = bgradh.getAttribute("back-gradient"); 
bgradh.style.backgroundImage = 'linear-gradient('+bgradtype+')'; 
bgradh.removeAttribute("back-gradient"); 
}


const hexbord = document.querySelectorAll('[noborder]'); for(var i = 0; i < hexbord.length;i++) {const bordh = hexbord[i];
bordh.style.border= 'none';
bordh.removeAttribute("noborder");  
}


const hexopac = document.querySelectorAll('[opacity]'); 
for(var i = 0; i < hexopac.length;i++) {const opach = hexopac[i]; const opacval = opach.getAttribute("opacity"); 
opach.style.opacity = opacval;
opach.removeAttribute("opacity");
    
}


const abs = hexxer.querySelectorAll('[absolute]');
for(var i = 0; i < abs.length;i++) {const abso = abs[i]; abso.style.position = 'absolute'; abso.removeAttribute('absolute'); }



const fabs = hexxer.querySelectorAll('[fixed]');
for(var i = 0; i < fabs.length;i++) {const fabso = fabs[i]; fabso.style.position = 'fixed'; fabso.removeAttribute('fixed');}

const rabs = hexxer.querySelectorAll('[relative]');
for(var i = 0; i < rabs.length;i++) {const rabso = rabs[i]; rabso.style.position = 'relative'; rabso.removeAttribute('relative');}

const cens = hexxer.querySelectorAll('[center]');
for(var i = 0; i < cens.length;i++) {const censo = cens[i]; censo.style.textAlign = 'center'; censo.removeAttribute('center'); }

const cenls = hexxer.querySelectorAll('[left]');
for(var i = 0; i < cenls.length;i++) {const cenlso = cenls[i]; cenlso.style.textAlign = 'left'; cenlso.removeAttribute('left');}

const cenrs = hexxer.querySelectorAll('[right]');
for(var i = 0; i < cenrs.length;i++) {const cenrso = cenrs[i]; cenrso.style.textAlign = 'right'; cenrso.removeAttribute('right');}

const locens = hexxer.querySelectorAll('[lowercase]');
for(var i = 0; i < locens.length;i++) {const locenso = locens[i]; locenso.style.textTransform = 'lowercase';
locenso.removeAttribute('lowercase');}

const cacens = hexxer.querySelectorAll('[capital]');
for(var i = 0; i < cacens.length;i++) {const cacenso = cacens[i]; cacenso.style.textTransform = 'capitalize';
cacenso.removeAttribute('capital');}

const upcens = hexxer.querySelectorAll('[uppercase]');
for(var i = 0; i < upcens.length;i++) {const upcenso = upcens[i]; upcenso.style.textTransform = 'uppercase';
upcenso.removeAttribute('uppercase');}

const nosels = hexxer.querySelectorAll('[noselect]');
for(var i = 0; i < nosels.length;i++) {const noselso = nosels[i]; noselso.style.setProperty("user-select", "none");
noselso.removeAttribute('noselect');}

const sels = hexxer.querySelectorAll('[select]');
for(var i = 0; i < sels.length;i++) {const selso = sels[i]; selso.style.setProperty("user-select", "auto");
selso.removeAttribute('select');}

const sflex = hexxer.querySelectorAll('[flex]');
for(var i = 0; i < sflex.length;i++) {const flexso = sflex[i]; flexso.style.display = 'flex';
flexso.removeAttribute('flex');}

const sflexw = hexxer.querySelectorAll('[flex-wrap]');
for(var i = 0; i < sflexw.length;i++) {const flexwso = sflexw[i]; flexwso.style.display = 'flex';flexwso.style.flexWrap = 'wrap';
flexwso.removeAttribute('flex-wrap');}

const maqs = hexxer.querySelectorAll('[marquee]');
for(var i = 0; i < maqs.length;i++) {const maqso = maqs[i]; maqso.classList.add("marquee");
maqso.removeAttribute('marquee');}

const nosc = hexxer.querySelectorAll('[noscroll]');
for(var i = 0; i < nosc.length;i++) {const thenosc = nosc[i]; thenosc.classList.add("noscroll");
thenosc.removeAttribute('noscroll');}  

const stheme = hexxer.querySelectorAll('[theme]');
for(var i = 0; i < stheme.length;i++) {const sthemecurr = stheme[i];  sthemepick = sthemecurr.getAttribute("theme"); const themestr = sthemepick.split(' ');
sthemecurr.setAttribute("class", themestr[0] + " " + themestr[1] + " " + themestr[2] + " " + themestr[3]);
sthemecurr.removeAttribute('theme');}

const spush = hexxer.querySelectorAll('[push]');
for(var i = 0; i < spush.length;i++) {const pusha = spush[i];
pushv = pusha.getAttribute("push"); 
 const pushstr = pushv.split(' ');
if(pushstr[0] == null) {} else {pusha.style.setProperty(pushstr[0], '0'); }  
if(pushstr[1] == null) {} else {pusha.style.setProperty(pushstr[1], '0');}
pusha.removeAttribute('push');
}


const slink = hexxer.querySelectorAll('[link]');
for(var i = 0; i < slink.length;i++) {const linka = slink[i]; linkv = linka.getAttribute("link"); 
const linkstr = linkv.split(' ');
if(linkstr[1] == null) {linka.onclick = function() {location.href = linkstr[0];};}else{linka.onclick = function() {window.open(linkstr[0], linkstr[1]);}}
linka.removeAttribute('link');}  
  
  
const sfont = hexxer.querySelectorAll('[font]');
for(var i = 0; i < sfont.length;i++) {const fonta = sfont[i]; fontv = fonta.getAttribute("font"); 
fonta.style.fontFamily = fontv;
fonta.removeAttribute('font');}
    
const sbold = hexxer.querySelectorAll('[bold]');
for(var i = 0; i < sbold.length;i++) {const bolda = sbold[i]; boldv = bolda.getAttribute("bold");if(boldv > 0) {if(boldv > 4) {boldv = "4"; } const boldm = boldv*100; const boldf = boldm+600;
    bolda.style.fontWeight = boldf; } else { bolda.style.fontWeight = 650;}
bolda.removeAttribute('bold');}
        
const scol = hexxer.querySelectorAll('[color]');
for(var i = 0; i < scol.length;i++) {const cola = scol[i]; colv = cola.getAttribute("color"); 
cola.style.color = colv;
cola.removeAttribute('color');}
    
  
const behex = hexxer.querySelectorAll('[back]');
for(var i = 0; i < behex.length;i++) {const behind = behex[i]; behexv = behind.getAttribute("back"); behind.style.background = behexv;
behind.removeAttribute('back');}
    
  const bohex = hexxer.querySelectorAll('[border]');
  for(var i = 0; i < bohex.length;i++) {const bordhex = bohex[i]; bohexv = bordhex.getAttribute("border"); 
bordhex.style.border = bohexv;
bordhex.removeAttribute('border');}
    

   
const beflow = hexxer.querySelectorAll('[flow]');
for(var i = 0; i < beflow.length;i++) {const flowhex = beflow[i]; beflowv = flowhex.getAttribute("flow"); 
flowhex.style.overflow = beflowv;
flowhex.removeAttribute('flow');}
    
      
    
const zdex = hexxer.querySelectorAll('[index]');
for(var i = 0; i < zdex.length;i++) {const dexin = zdex[i]; dexv = dexin.getAttribute("index"); 
dexin.style.zIndex = dexv;
dexin.removeAttribute('index');}

const disp = hexxer.querySelectorAll('[display]');
for(var i = 0; i < disp.length;i++) {const currdis = disp[i]; dispv = currdis.getAttribute("display"); 
currdis.style.display = dispv;
currdis.removeAttribute('display');}
  
 
const hsize = hexxer.querySelectorAll('[size]');
for(var i = 0; i < hsize.length;i++) {const sizehe = hsize[i]; sizehev = sizehe.getAttribute("size"); 
sizehe.style.fontSize = sizehev;
sizehe.removeAttribute('size');} 

    
const srat = hexxer.querySelectorAll('[ratio]');
for(var i = 0; i < srat.length;i++) {const rata = srat[i]; ratv = rata.getAttribute("ratio"); 
rata.style.setProperty("aspect-ratio", ratv);
rata.removeAttribute('ratio');}


const sblend = hexxer.querySelectorAll('[blend]');
for(var i = 0; i < sblend.length;i++) {const blenda = sblend[i]; blendv = blenda.getAttribute("blend"); 
blenda.style.setProperty("mix-blend-mode", blendv);
blenda.removeAttribute('blend');}
    
const spadw = hexxer.querySelectorAll('[padding]');
for(var i = 0; i < spadw.length;i++) {const padwa = spadw[i]; var padwvv = padwa.getAttribute("padding"); const padstr = padwvv.split(' '); var padwv = padstr[0]; var padhex = padwv.replace(/,/g, ' '); if(padstr[1]) {padwa.style.setProperty("padding-"+padstr[1], padwv); } else {
    padwa.style.padding = padhex; }
padwa.removeAttribute('padding');   
}
const smarw = hexxer.querySelectorAll('[margin]');
for(var i = 0; i < smarw.length;i++) {const marwa = smarw[i]; var marwvv = marwa.getAttribute("margin"); const marstr = marwvv.split(' '); var marwv = marstr[0]; var marhex = marwv.replace(/,/g, ' '); if(marstr[1]) {marwa.style.setProperty("margin-"+marstr[1], marwv); } else {
    marwa.style.margin = marhex; }
marwa.removeAttribute('margin');
}
const scolw = hexxer.querySelectorAll('[width]');
for(var i = 0; i < scolw.length;i++) {const colwa = scolw[i]; var colwvv = colwa.getAttribute("width"); const widstr = colwvv.split(' '); var colwv = widstr[0]; if(widstr[1]) {colwa.style.setProperty(widstr[1]+"-width", colwv); } else {
    colwa.style.width = colwv; }}
const scolr = hexxer.querySelectorAll('*');for(var i = 0; i < scolr.length;i++) {const colra = scolr[i];
const scolrs = hasAttr(colra, 'radius');if(scolrs == true){var colrv = colra.getAttribute("radius");
    colra.style.borderRadius = colrv; }}
const scolh = hexxer.querySelectorAll('[height]');
for(var i = 0; i < scolh.length;i++) {const colha = scolh[i]; var colhvv = colha.getAttribute("height"); const histr = colhvv.split(' '); var colhv = histr[0]; if(histr[1]) {colha.style.setProperty(histr[1]+"-height", colhv); } else {
    colha.style.height = colhv; }}






const pagem = hexxer.querySelectorAll('[page-middle]'); 
for(var i = 0; i < pagem.length;i++) {const pagemo = pagem[i]; pagemo.style.position = 'absolute';
      pagemo.style.top = '50%';
      pagemo.style.left = '50%';
      pagemo.style.setProperty('transform', 'translate(-50%, -50%');
pagemo.removeAttribute('page-middle');}
const pagehm = hexxer.querySelectorAll('[page-middle-h]'); 
for(var i = 0; i < pagehm.length;i++) {const pagehmo = pagehm[i]; pagehmo.style.display = 'table';
      pagehmo.style.marginLeft = 'auto';
      pagehmo.style.marginRight = 'auto';
pagehmo.removeAttribute('page-middle-h');}
const pagevm = hexxer.querySelectorAll('[page-middle-v]'); 
for(var i = 0; i < pagevm.length;i++) {const pagevmo = pagevm[i]; pagevmo.style.position = 'absolute';
      pagevmo.style.top = '50%';
      pagevmo.style.setProperty('transform', 'translate(0, -50%');
pagevmo.removeAttribute('page-middle-v');}




const xmgroup = hexxer.getElementsByTagName('xmetergroup'); 
 for(var i = 0; i < xmgroup.length;i++) {
const xmgroup0 = xmgroup[i]; 
const xmheight = xmgroup0.getAttribute("height"); 
const xmeterhome = document.createElement("div"); 
const xmeterg = document.createElement("div"); 
const xmeterl = document.createElement("div");
xmeterg.classList.add("xmeterg");
if(xmheight == null) {
xmeterg.style.minHeight = "8px";
xmeterg.style.borderRadius = "4px"; 
} else {
xmeterg.style.minHeight = xmheight; 
xmeterg.style.borderRadius = parseInt(xmheight) / 2 + "px";
}
const xmeter = xmgroup0.getElementsByTagName('xmeter'); 
var metertot = 0;  
for(var x = 0; x < xmeter.length;x++) {
const xmeter0 = xmeter[x]; 
const meterval = xmeter0.getAttribute("value"); 
var metertot = metertot + parseInt(meterval);
const metername = xmeter0.getAttribute("label"); 
const metercon = xmeter0.getAttribute("icon"); 
const metercol = xmeter0.getAttribute("col"); 
const meterx = document.createElement("div"); 
meterx.classList.add("meterx");
let meterBack;
var checkCol = "";
if(metercol !== null) {
meterBack = metercol;      
} else {
meterBack = colorCode();
}
if(checkCol.includes(meterBack)) {
meterBack = colorCode();        
}
checkCol = checkCol + " " + meterBack; 
meterx.style.background = meterBack; 
meterx.style.width = meterval + "%";
xmeterg.appendChild(meterx);
xmeter0.innerHTML = ""; 

const xlist = hasAttr(xmgroup0, 'list');
if(xlist == true){
if(metername !== null) {
const gxlist = document.createElement("p"); 
var gxval = ""; 
var gxcon = "<b style='font-size: 30px; line-height: 1em;'>•&nbsp;</b>"; 
if(metercon !== null) {
if(metercon.includes("brand")) {
var bmetercon = metercon.split("brand-").pop(); 
var gxcon = "<i class='fab fa-"+bmetercon+"'></i>&nbsp;&nbsp;"; 
} else {
var gxcon = "<i class='fa fa-"+metercon+"'></i>&nbsp;&nbsp;"; 
} 
}
if(xmgroup0.getAttribute("list") !== "null") {
var gxval = " (" + meterval + "%" + ")";
}
gxlist.classList.add("oxlist"); 
gxlist.innerHTML = gxcon + metername + gxval;
gxlist.style.color = meterBack; 
xmeterl.appendChild(gxlist); 
}
}
}
xmeterhome.appendChild(xmeterg);
xmeterhome.appendChild(xmeterl);
xmgroup0.innerHTML = xmeterhome.innerHTML; 
console.log('Hexxe UI: Metergroup created');
if(metertot > 100) {
 console.log(`Hexxe UI: Total Meter Value exceeds 100%: ${metertot}% `)
} 
 }
 
const onexm = hexxer.getElementsByTagName('xmeter'); 
for(var i = 0; i < onexm.length; i++) {
const onexmeter = onexm[i];
const parXm = onexmeter.parentNode.tagName; 
if(parXm == "XMETERGROUP") {
xlogs.push(new Error().stack.split('\n')[2].trim() + " meter belongs to a group");  
} else {
const xmeterval = onexmeter.getAttribute("value"); 
const xmetercon = onexmeter.getAttribute("icon"); 
const xmetername = onexmeter.getAttribute("label"); 
const xmetercol = onexmeter.getAttribute("col"); 
const onexmeterhome = document.createElement("div"); 
const onexmeterg = document.createElement("div"); 
onexmeterg.classList.add("onexmeter");
if(onexmeter.getAttribute("list") == "boxed") {
onexmeterg.classList.add("bonexmeter"); 
}
const onexmheight = onexmeter.getAttribute("height"); 
if(onexmheight == null) {
onexmeterg.style.minHeight = "8px";
onexmeterg.style.borderRadius = "4px"; 
} else {
onexmeterg.style.minHeight = onexmheight; 
onexmeterg.style.borderRadius = parseInt(onexmheight) / 2 + "px";
}
const colonex = document.createElement("div"); 
colonex.classList.add("onexm"); 
if(onexmeter.getAttribute("list") == "boxed") {
colonex.classList.add("bonexm"); 
}
if(xmetercol !== null) {
xmeterBack = xmetercol;      
} else {
xmeterBack = colorCode();
}
colonex.style.background = xmeterBack; colonex.style.width = xmeterval + "%";
onexmeterg.appendChild(colonex);
onexmeterhome.appendChild(onexmeterg);

if(xmetername !== null) {
const oxlist = document.createElement("p"); 
var oxval = ""; 
var oxcon = "<b style='font-size: 30px; line-height: 1em;'>•&nbsp;</b>"; 
if(xmetercon !== null) {
if(xmetercon.includes("brand")) {
var bxmetercon = xmetercon.split("brand-").pop(); 
var oxcon = "<i class='fab fa-"+bxmetercon+"'></i>&nbsp;&nbsp;"; 
} else {
var oxcon = "<i class='fa fa-"+xmetercon+"'></i>&nbsp;&nbsp;";  
} }
if(onexmeter.getAttribute("list") !== "null") {
var oxval = xmeterval + "%";
}
oxlist.classList.add("oxlist"); 
if(onexmeter.getAttribute("list") == "boxed") {
oxlist.classList.add("boxlist"); 
}
oxlist.innerHTML = oxcon + xmetername + " (" + oxval + ")";
oxlist.style.color = xmeterBack; 
onexmeterhome.appendChild(oxlist); 
}
onexmeter.innerHTML = onexmeterhome.innerHTML; 
}     
}




const dVd = hexxer.getElementsByTagName('divider'); 
for(var i = 0; i < dVd.length; i++) {
const xDivide = dVd[i]; 
const dvdname = xDivide.getAttribute("name");
const dvdcol = xDivide.getAttribute("col");
const dvdfont = xDivide.getAttribute("font");
const dvdcon = xDivide.getAttribute("icon");
const dvdtype = xDivide.getAttribute("type");
const dvdsize = xDivide.getAttribute("size");
const setDv = document.createElement("div"); 
setDv.style.width = '100%';
xDivide.classList.add("setDv");
let repDv;
repDv = document.createElement("p");
repDv.classList.add("prepDv"); 
if(dvdtype == "dashed") {
repDv.setAttribute("class", "prepDv prepDa");
}
repDv.style.fontSize = dvdsize;
repDv.style.height = dvdsize; 
repDv.style.color = dvdcol;
repDv.style.setProperty("font-family", dvdfont);

if(dvdcon !== null) {
let oxcon; 
if(dvdcon.includes("brand")) {
var bdvdcon = dvdcon.split("brand-").pop(); 
oxcon = "<i class='fab fa-"+bdvdcon+"'></i>"; 
} else {
oxcon = "<i class='fa fa-"+dvdcon+"'></i>";  
}
repDv.innerHTML = oxcon; 
} else {

repDv.innerHTML = dvdname;

}
setDv.appendChild(repDv);
xDivide.innerHTML = setDv.innerHTML; 
xlogs.push(new Error().stack.split('\n')[2].trim() + ' Divider created');    

}


var endTime = performance.now();
const executionTime = endTime - startTime;
const roundExTime = executionTime.toFixed(2);
xlogs.push(`at ( <anonymous> ) UI LOADED: ${roundExTime} milliseconds`);







}




// end of rootHex


 const clickhex = document.getElementsByTagName('*');for(var i = 0; i < clickhex.length;i++) {const hexclick = clickhex[i];
const hasclick = hasAttr(hexclick, 'click');if(hasclick == true){clickhexv = hexclick.getAttribute("click"); 
const eachclick = clickhexv.split(";");
hexclick.addEventListener("click", function() { 
  
  for (var i = 0; i < eachclick.length; i++) {  
    
    eval(eachclick[i]);

  }  
    
})}}



    
 function hexIfText(sumifh, typeh, wordh) {const sum = sumifh;const stype = typeh;const stext = wordh;var element = document.querySelector(`[s-if="${sum}"]`);var ogtext = element.innerText;if(ogtext == stext){if(stype == "hide"){element.style.display='none';}if(stype == "show"){
     element.style.display='block';}}}
     
     
    
HTMLElement.prototype.show = show;
HTMLElement.prototype.hide = hide;
HTMLElement.prototype.load = load;
HTMLElement.prototype.toggle = toggle;
HTMLElement.prototype.reload = reload;


function toggle(elem) {
let togele;
var ele = elem;

if (ele !== undefined) {
 togel = document.querySelectorAll(ele);
} else {
 togel = this;    
}

togel.forEach(function(togele){
let poss = togele.style.display;

if(poss == "none") {
  poss = togele.parentElement.style.display; 
}


if(poss == undefined) {
  poss = togele.parentElement.style.display; 
}

if(poss == null) {
  poss = togele.parentElement.style.display; 
}


if(poss == "") {
  poss = "block";
}


if(poss == "none") {
  poss = "block";
}


if(poss == undefined) {
  poss = "block";
}
if(poss == null) {
  poss = "block";
}

var stat = togele.getAttribute("toghex");
if(stat !== null) {
if(togele.style.display !== 'none') {
togele.setAttribute("toghex", "show"); 

} else {
togele.setAttribute("toghex", "hide"); 

}  
}

if(togele.style.display !== 'none') {
if(stat !== null) {
if(stat == "show") {
 togele.style.display='none';
togele.setAttribute("toghex", "hide");  
   
}   
} else {
togele.style.display='none';
togele.setAttribute("toghex", "hide");  
}
} else {
if(stat !== null) {
if(stat == "hide") {
togele.style.display = poss;
togele.setAttribute("toghex", "show");  }
} else {
togele.style.display = poss;
togele.setAttribute("toghex", "show"); 
}
}
});
}



function show(elem) {
let showele;
var ele = elem;


if (ele !== undefined) {
 showele = document.querySelector(ele);
} else {
 showele = this;    
}

let poss = showele.style.display;

if(poss == "none") {
  poss = showele.parentElement.style.display; 
}


if(poss == undefined) {
  poss = showele.parentElement.style.display; 
}

if(poss == null) {
  poss = showele.parentElement.style.display; 
}





if(poss == undefined) {
  poss = "block";
}
if(poss == null) {
  poss = "block";
}

showele.style.display = poss;

}


function hide(elem) {
        
let showele;
var ele = elem;

if (ele !== undefined) {
 showele = document.querySelector(ele);
} else {
 showele = this;    
}


showele.style.display='none';
    
}


function reload(elem) {
let showele;
var ele = elem;
if (ele !== undefined) {
showele = ele;
} 
else {
if (this.id) {
showele = "#" + this.id; 
} else {
showele = "." + this.className; } 
}
var url = window.location.href;
load(url, showele, showele);
}






function load(linkh, innerh, placeh){
var locateh = linkh;
if(locateh.includes("?")) { 
var locateh = locateh;
} else {
var locateh = locateh;
}
let pend;
fetch(locateh).then(function(response) {
response.text().then(function(text) {
var data = text;
if(placeh !== undefined){
var parser = new DOMParser();
var doc = parser.parseFromString(data, 'text/html');
var findit = doc.querySelector(placeh);
if(findit)  {
var data = findit.innerHTML;   
 } else {
var data = data;
 }  
} 
if(data == null) { 
 } else {
if(data == "") {
  } else {
if (innerh !== undefined) {
if(locateh.includes("txt")) {
document.querySelector(innerh).innerText = data;
} else {    
document.querySelector(innerh).innerHTML = data;
}} 
else {
pend = this; 
alert(pend);
if(locateh.includes("txt")) {
pend.innerText = data;
 } else {
pend.innerHTML = data;
}}
if(placeh !== undefined){
if(xui == "yes") {} else {
rootHex(innerh); } 
} else {
if(xui == "yes") {} else {
rootHex(); } 
}
} } });});}



 
function getHTML(elementh) {
var ele = document.querySelector(elementh);
var elehtml = ele.innerHTML; 
return elehtml; 
}
    
     

 
 
 
 
     
function hexIfNum(sumifh, typeh, wordh) {const sum = sumifh; const stype = typeh;const ostext = wordh; const stext = parseInt(ostext);var element = document.querySelector(`[s-if="${sum}"]`);var rogtext = element.innerText;var ogtext = parseInt(rogtext);
if(stype == "more"){
if(ogtext > stext){element.style.display='block';}else{element.style.display='none'; }}
if(stype == "less"){
if(ogtext < stext){element.style.display='block';}else{element.style.display='none'; }}}     
 function newCalc(headh) {
if(headh) {
var targetid = headh;
var target = document.querySelector(targetid);} else {
  var target = document.querySelector('body');}
const calc = document.createElement("form");
calc.setAttribute("class", "sum-calc");
calc.setAttribute("name", "sumcalc"); 
target.appendChild(calc);
const calcre = document.createElement("input");
calcre.setAttribute("class", "result");
calcre.setAttribute("type", "text");
calcre.id = "sumdisplay";
calcre.setAttribute("name", "sumdisplay");
calc.appendChild(calcre);
const calcray = ["s-zero", "s-one", "s-two", "s-three", "s-four", "s-five", "s-six", "s-seven", "s-eight", "s-nine"]; 
for(var i = 0; i < calcray.length; i++) {
var calcnum = document.createElement("input");
calcnum.setAttribute("class", "num");
calcnum.setAttribute("type", "button");
calcnum.id = calcray[i];
calcnum.value = i;
calc.appendChild(calcnum);}
const charay = ["+", "-", "×", ".", "/", "C"]; 
const charid = ["s-add", "s-subs", "s-multi", "s-dot", "s-divide", "s-clear"]; 
for(var x = 0; x < charay.length; x++) {
var calcar = document.createElement("input");
calcar.setAttribute("class", "char num");
calcar.setAttribute("type", "button");
calcar.id = charid[x];
calcar.value = charay[x];
calc.appendChild(calcar);}
const calcreq = document.createElement("input");
calcreq.setAttribute("class", "equal");
calcreq.setAttribute("type", "button");
calcreq.id = "s-equal";
calcreq.value = "=";
calc.appendChild(calcreq);
}

function hexPop(elementh) {
const popid = elementh;
const thepop = document.getElementById(popid);
if(thepop) {
const pclose = thepop.getAttribute("pop-close");
const popen = thepop.getAttribute("pop-open");


if(thepop) {
if(thepop.style.display == 'block') {
thepop.style.display='none';
if(pclose !== undefined) {
let cFunc = new Function(pclose); 
cFunc.call(this); 
    
    
}
} else {
    thepop.style.display='block';
if(popen !== undefined) {
let cFunc = new Function(popen); 
cFunc.call(this); 
    
    
}

 
    
}}
}
}
 
function togNav() {
const upnav = document.getElementById('header-nav');
if(upnav) {
if(upnav.style.height == '100vh'){
upnav.style.height = '0'; 
upnav.style.width = '0'; 
} else {
upnav.style.height = '100vh';
upnav.style.width = '100vw';
}
}
}

function togDrop(elementh) {
var plusele = "drop"+elementh;
const upnav = document.getElementById(elementh);
const plusnav = document.getElementById(plusele);
if(upnav.style.height == 'auto'){
upnav.style.height = '0'; 
plusnav.innerText = '+';
} else {
upnav.style.height = 'auto';
plusnav.innerText = '-';
}
}

console.log(xlog);

function $XQLO(data, el) {
let startTime = performance.now();

let query;
if(data !== "inject") {
query = document.getElementById(data);

} else {
query = document.querySelector('.'+el);
}
query.show(); 
let qparam = query.getElementsByTagName('data')[0];
let string = qparam.textContent;
let outdata = query.getElementsByTagName('result')[0]; 
let ogput = outdata.innerHTML;
qparam.style.display = 'none';


let checkterm = document.getElementById('xqlbt'+query.id);
if(checkterm) {} else {
const terminal = document.createElement("button");
terminal.innerText = "what";
terminal.style.display = 'none'; 
terminal.id = "xqlbt"+query.id; 
terminal.addEventListener('click', function() {
swapQL(ogput);
});
document.body.appendChild(terminal); 
}

if(data !== "inject") {} else {   document.getElementById('xqlbt'+query.id).click();
}

const forPat = new RegExp(`{\\s*(\\w+)\\s*}`, 'g');
const match = string.match(/SELECT (\w+) WHERE (\w+) = '([a-zA-Z0-9]+)'/);
if (match) {
  const dataSelector = match[1];
  const conditionSelector = match[2];
  const conditionValue = match[3];
  const dataVal = eval(dataSelector); 
 
const selectedData = dataVal.filter(item => item[conditionSelector] === conditionValue);
let result;

function swapQL(ogh) {
let output;
if(ogh !== undefined) {
output = ogh;
} else {
output = outdata.innerHTML;
}
addVal = output.replace(forPat, function (match, captureKey) {
if(selectedData[0].hasOwnProperty(captureKey)) {
result = selectedData[0][captureKey];  
} else { result = ""; }
if(result == "null") {
result = "";
}
return result;
});


outdata.innerHTML = addVal; 

} 

if(data !== "inject") { swapQL(); 

let endTime = performance.now();
const executionTime = endTime - startTime;
const roundExTime = executionTime.toFixed(2);
console.log(`XQL COMPILED: ${roundExTime} milliseconds`);
}
} else {
  console.log("Invalid string format");
}
}

