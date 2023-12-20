function $Jobber(to, from, head, date, body, call, error) {
    try {
       
let xhr = new XMLHttpRequest();
let url = xqlurl + '/addjob.php?sess=' + makeid(5);
let params = "sess="+makeid(5)+"&body="+encodeURIComponent(body)+"&to="+encodeURIComponent(to)+"&from="+encodeURIComponent(from)+"&head="+encodeURIComponent(head)+"&date="+encodeURIComponent(date);



xhr.open("POST", url, true);

xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
let data = xhr.response;
if (data.includes("success")) {

console.log("Job Creation Success");
if(call !== undefined) {
let newFunc = new Function(call); 
newFunc.call(this);
}

            } else {
if(error !== undefined) {              
error(data); 

}
            }
        }
    }
};

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);


 
 
     
alert(email + ": " + date + ": " + body);  



    
    
    } catch (err) { 
  
if(error !== undefined) {              
error(err); 

}


    }    
    
}


function $condition(thisVal) {
 let qregex = /!!\s*if\s*\[\[([^\]]*)\]\]\s*\[\[([^\]]*)\]\]\s*(.*?)\s*!!/g;

let resultString = "";
let lastIndex = 0;

let qmatch;
while ((qmatch = qregex.exec(thisVal)) !== null) {
  let ask = qmatch[1];
  let content = qmatch[2];
  let elsecon = qmatch[3];
  let elsem = elsecon.match(/else\s*\[\[([^\]]*)\]\]\s*/);
  let elsec = "";
  if(elsem) {
   
    elsec = elsem[1];  
  } else {
    elsec = "";
  }
  let key; let val; let type = "eq";
  if(ask.includes("&gt;")) {
  type = "more"; 
  key = ask.split("&gt;")[0].trim();
  val = ask.split("&gt;").pop().trim();
  val = parseInt(val);
  
  } else if(ask.includes("&lt;")) {
  type = "less"; 
  key = ask.split("&lt;")[0].trim();
  val = ask.split("&lt;").pop().trim();
  val = parseInt(val);
  
  }
  
   else {
  key = ask.split("==")[0].trim();
  val = ask.split("==").pop().trim();
  if(val.includes("$js-")) {
  val = val.split("$js-").pop().trim(); 
let newFunc = new Function(val);
val = newFunc.call(this); 
  
  if(val == undefined || val == null) {
   val = "";
  }
  }
  }
    rval = key;
  

if(type == "less") {
 rval = parseInt(rval); 
   if (rval < val) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index) + elsec;
  }
} else if(type == "more") {
rval = parseInt(rval); 
  if (rval > val) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index) + elsec;
  }
} else {
  if (rval == val) {
    resultString += thisVal.substring(lastIndex, qmatch.index) + content;
  } else {
    resultString += thisVal.substring(lastIndex, qmatch.index) + elsec;
  }
} 
  
  
  

  lastIndex = qmatch.index + qmatch[0].length;
}

resultString += thisVal.substring(lastIndex);

thisVal = resultString;

return thisVal;  
    
    
}

function seeExist() {
const exhex = document.querySelectorAll('[exist]'); 
exhex.forEach(function(hex){
if(hex.getAttribute('exist') == "false") {
hex.remove(); 
}
}); 

}





function loop(data, format, long) {
  let result = "";
let kill = data.length;
if(long !== undefined) {
kill = long; 
kil = parseInt(kill) - 1; 
}
  for (let i = 0; i < kill; i++) {
    result += format.replace(/\$(\w+)/g, (match, field) => data[i][field]);
  }

  return result.trim();
}

function $return(data, format) {
  let result = format.replace(/\$(\w+)/g, (match, field) => data[field]);
  return result.trim();
}

function $while(data, target) {
let place = document.querySelector(target); 
let format = place.innerHTML; 
place.innerHTML = "";
  let result = "";

  for (let i = 0; i < data.length; i++) {
    result += format.replace(/\$(\w+)/g, (match, field) => data[i][field]);
  }
place.innerHTML = result.trim(); 
  return result.trim();
}


function $temp(template, data) {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, key) => {
    return data[key.trim()] !== undefined ? data[key.trim()] : '';
  });
}

function $shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array; // Return the shuffled array
}


function $QUERY(passkey, db, query) {
let string = query; 
const match2 = string.match(/SELECT (\w+)/);
if (match2) {
  const dataSelector = match2[1];
  let conditionSelector = ""; 
  let conditionValue = "";
  let mtype = "null";
if(string.includes("WHERE")) {
const wmatch = string.match(/WHERE (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "where";
}
}  
  
if(string.includes("REGEX")) {
const wmatch = string.match(/REGEX (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "regex";
}
}  


if(string.includes("INDEX")) {
const wmatch = string.match(/INDEX (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "index";
}
} 

if(string.includes("COUNT")) {
const wmatch = string.match(/COUNT (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "count";
}
}  


  
  
let path = xqlget+"?key="+passkey+"&tab="+dataSelector+"&row="+db+"&sess="+makeid(5); 


 return {
pull: function(usage, killer) {
let kill = ""; 
return fetch(path).then(response => response.text()).then(data => {
if(data == "") { } else {
let hexql = JSON.parse(data);
if(hexql) {
} else {
kill  = "Empty or corrupt data";
if(typeof killer === 'function') {
 if(killer.length === 0) {
     killer(); 
 } else {  
    
killer(kill);

}

return "error"; 
}
}
let getData;  
const dataVal = hexql; 

if(mtype == "null") {
getData = dataVal;
}

if(mtype == "where" || mtype == "count") {
getData = dataVal.filter(item => item[conditionSelector] === conditionValue);

    
 if(string.includes("OR")) {
const wando = string.match(/OR (\w+) = '([^']+)'/);
if(wando){
coSelector = wando[1];
coValue = wando[2];

coData = dataVal.filter(item => item[coSelector] === coValue);
coData.forEach(item => {
const ioid = getData.filter(tcurr => tcurr === item);
if(ioid.length === 0) {
  getData.push(item);
} 
  
});

getData = dataVal.filter(item => getData.includes(item));

}
}  

    
    
    
    
    
    
}













if(mtype == "index") {
getData = dataVal.filter(item => item[conditionSelector] === conditionValue);
}



if(mtype == "regex") {
getData = dataVal.filter(item => item[conditionSelector].includes(conditionValue));
}

let selectedData = "";
if(conditionSelector == "Key") {
let fLen = dataVal.length - 1; 

if(conditionValue == "first") {
selectedData = dataVal.filter(function(obj, index){
return index === 0;
});    
} else if(conditionValue == "last") {
 selectedData = dataVal.filter(function(obj, index){
return index === fLen;
});       
} else {
let cVal = parseInt(conditionValue) - 1;
selectedData = dataVal.filter(function(obj, index){
return index === cVal;
});
}
} else {
  

selectedData = getData;
   
}


if(string.includes("AND")) {
const wand = string.match(/AND (\w+) = '([^']+)'/);
if(wand){
cSelector = wand[1];
cValue = wand[2];

selectedData = selectedData.filter(item => item[cSelector] === cValue);


}
}  

for(let i = 0; i < selectedData.length; i++) {
let imp = selectedData[i]; 
let index = dataVal.findIndex(item => item === imp); 
index = index + 1; 
imp['Key'] = index; 
} 






if(string.includes("ORDER")) {
const orA = string.match(/ORDER (\S+)/); 
if(orA)  {
orVal = orA[1]; 

if(orVal.includes("DESC")) {
selectedData = selectedData.slice().reverse();
const order = orVal.split("-").pop();
if(order !== "DESC") {
selectedData.sort((a, b) => b[order] - a[order]);
}}

if(orVal.includes("RAND")) {

selectedData = $shuffle(selectedData); 

}    
    
    
}}


if(string.includes("LIMIT")) {
const limA = string.match(/LIMIT (\d+)/); 
if(limA)  {
let limVa = limA[1];
selectedData = selectedData.slice(0, limVa); 

}}


let count = ""; 
if(mtype == "index") {
selectedData = dataVal.findIndex(item => item === selectedData[0]); 
selectedData = selectedData + 1;
} else if(mtype == "count") {
selectedData = selectedData.length; 
} else {
let count = selectedData.length;
}



if(usage) {
usage(selectedData);
}


return count;


}
}).catch(error => {
console.error('Error:', error);
if(typeof killer === 'function') {

 if(killer.length === 0) {
     killer(); 
 } else {  
    
killer(error);

}


return "error"; 
}



throw error; // throw error away lol
});
} };
} else {
    
    
 console.log('Invalid Query');
}
}








function $WHERE(JDATA, query) {
let string = query; 

    let conditionSelector = ""; 
  let conditionValue = "";
  let mtype = "null";
if(string.includes("WHERE")) {
const wmatch = string.match(/WHERE (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "where";
}
}  
  
if(string.includes("REGEX")) {
const wmatch = string.match(/REGEX (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "regex";
}
}  


if(string.includes("INDEX")) {
const wmatch = string.match(/INDEX (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "index";
}
} 

if(string.includes("COUNT")) {
const wmatch = string.match(/COUNT (\w+) = '([^']+)'/);
if(wmatch){
conditionSelector = wmatch[1];
conditionValue = wmatch[2];
mtype = "count";
}
}  


  


 return {
pull: function(usage) {
let hexql = JDATA;
let getData;  
const dataVal = hexql; 

if(mtype == "null") {
getData = dataVal;
}

if(mtype == "where" || mtype == "count") {
getData = dataVal.filter(item => item[conditionSelector] === conditionValue);

 if(string.includes("OR")) {
const wando = string.match(/OR (\w+) = '([^']+)'/);
if(wando){
coSelector = wando[1];
coValue = wando[2];

coData = dataVal.filter(item => item[coSelector] === coValue);
coData.forEach(item => {
const ioid = getData.filter(tcurr => tcurr === item);
if(ioid.length === 0) {
  getData.push(item);
} 
  
});

getData = dataVal.filter(item => getData.includes(item));

}
}  

    
    
    
}

if(mtype == "index") {
getData = dataVal.filter(item => item[conditionSelector] === conditionValue);
}



if(mtype == "regex") {
getData = dataVal.filter(item => item[conditionSelector].includes(conditionValue));
}

let selectedData = "";
if(conditionSelector == "Key") {
let fLen = dataVal.length - 1; 

if(conditionValue == "first") {
selectedData = dataVal.filter(function(obj, index){
return index === 0;
});    
} else if(conditionValue == "last") {
 selectedData = dataVal.filter(function(obj, index){
return index === fLen;
});       
} else {
let cVal = parseInt(conditionValue) - 1;
selectedData = dataVal.filter(function(obj, index){
return index === cVal;
});
}
} else {
  

selectedData = getData;
   
}


if(string.includes("AND")) {
const wand = string.match(/AND (\w+) = '([^']+)'/);
if(wand){
cSelector = wand[1];
cValue = wand[2];

selectedData = selectedData.filter(item => item[cSelector] === cValue);


}
}  

for(let i = 0; i < selectedData.length; i++) {
let imp = selectedData[i]; 
let index = dataVal.findIndex(item => item === imp); 
index = index + 1; 
imp['Key'] = index; 
} 






if(string.includes("ORDER")) {
const orA = string.match(/ORDER (\S+)/); 
if(orA)  {
orVal = orA[1]; 

if(orVal.includes("DESC")) {
selectedData = selectedData.slice().reverse();
const order = orVal.split("-").pop();
if(order !== "DESC") {
selectedData.sort((a, b) => b[order] - a[order]);
}}

if(orVal.includes("RAND")) {

selectedData = $shuffle(selectedData); 

}    
    
    
}}


if(string.includes("LIMIT")) {
const limA = string.match(/LIMIT (\d+)/); 
if(limA)  {
let limVa = limA[1];
selectedData = selectedData.slice(0, limVa); 

}}


let count = ""; 
if(mtype == "index") {
selectedData = dataVal.findIndex(item => item === selectedData[0]); 
selectedData = selectedData + 1;
} else if(mtype == "count") {
selectedData = selectedData.length; 
} else {
let count = selectedData.length;
}



if(usage) {
usage(selectedData);
}


return count;



    
} };

    

}
