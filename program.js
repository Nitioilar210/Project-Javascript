// var total=depts;
var names = [];
var depts = [];
var lists = [];
var sharings = [];
// sharings[0] = [1,2,3]
// shaerings[1] = [0,1,2,3]

//lists =    [ apple,       pizza  ]
//depts =    [  100 ,        50    ]
//sharings = [ [1,2,4] , [0,1,2] ];
//names   =  [ p0,p1,p2,p3]

// idx apple =0
// sharings[0] =

// idx food = 1
// idx person = 2

function removePerson(foodIdx, personIdx) {
  // sharings[] = []
  sharings[foodIdx] = sharings[foodIdx].filter((id) => id != personIdx);
  //= foodItem.people.filter((id) => id != personId);
  updateTable();
}

function addPerson(foodIdx, personIdx) {
  sharings[foodIdx] = sharings[foodIdx].push(personIdx);
  updateTable();
  //= foodItem.people.filter((id) => id != personId);
}
// [0, 1, 2]-- > Array.filter-- > [0, 1];
// row1col1
// idx = 1-1 = 0
// idxSharings = 0
// idxPerson = 0
// sharings[0] = [1,2,4]

// row1col2
// idx = 1-1 = 0
// idxSharings = 0
// idxPerson = 1
// sharings[0] = [1,2,4]
// share = depts[0]/sharing[0].length

var i = 0;
var j = 0;

function sum(arr, curr) {
  return arr + curr;
}

var table = document.getElementById("info");

//กดเพิ่มชื่ออาหาร
var addButton = document.getElementById("addButton");
addButton.addEventListener("click", createFoodList);
function createFoodList() {
  //foodLists
  var userList = document.getElementById("userList").value;
  var userDept = document.getElementById("userDept").value;

  if (userList === "" || userDept === "") {
    alert("Please fill information");
    return;
  }
  //deptLists
  lists.push(userList);
  depts.push(parseInt(userDept));
  sharings.push([]);
  var disPlay = table.insertRow(1 + i);
  var cell1 = disPlay.insertCell(0);
  cell1.innerHTML = lists[i] + "(" + depts[i] + ")";
  var totalCell = disPlay.insertCell(1);
  totalCell.innerHTML = depts[i];
  document.getElementById("totalSum").innerHTML = depts.reduce(sum);
  i++;
}
//กดเพิ่มชื่อคน
var addNameButton = document.getElementById("addNameButton");
addNameButton.addEventListener("click", createDiviList);
function createDiviList() {
  var userName = document.getElementById("userName").value;
  if (userName === "") {
    alert("Please fill name");
    return;
  }
  //namesList
  names.push(userName);
  var putColumn = document.getElementById("infoIn");
  var putName = putColumn.insertCell(table.rows[0].cells.length - 1);
  putName.innerHTML = names[j];
  var disNameSum = document.getElementById("total");
  var dySum = disNameSum.insertCell(1);
  dySum.innerHTML = depts.reduce(sum) / names.length;
    // }//เเก้ให้ ไดนามิก
  console.log(copd());
  function copd() {
      var l = -1;
      var p = 0;
      //   var table = document.getElementById("info");
      for (let i = 1; i < table.rows.length - 1; i++) {
        var row = table.rows[i];
        var cell = row.insertCell(table.rows[0].cells.length - 2);
        var check = document.createElement("input");   
        cell.appendChild(check);
        check.setAttribute("type", "checkbox");
        check.setAttribute("checked", "true"); //set default as true

        // checkBox_row:col
        let index = table.rows[0].cells.length - 2;
        console.log("checkmark col idx = ", index);
        let checkBoxRow = i;
        let checkBoxCol = table.rows[0].cells.length - 2;
        check.setAttribute("id","checkBox_" + i + ":" + (table.rows[0].cells.length - 2));
        // toggleCheckBox()
        check.addEventListener("change", function () {
          if (this.checked) {
            // Checkbox is checked..
            console.log("checked");
            console.log("col(personIdx) = ", checkBoxCol-1);
            console.log("row(foodIdx) = ", i-1);
            addPerson(i-1,checkBoxCol-1);
            //col1 row1
            // removePerson(1,1);
          } else {
            // Checkbox is not checked..
            console.log("not checked");
            console.log("col(personIdx) = ", checkBoxCol-1);
            console.log("row(foodIdx) = ", i-1);
            removePerson(i-1, checkBoxCol-1);
          }
        });

        // add <span>
        var span = document.createElement('span');
        cell.appendChild(span);

      }
      j++;
    }

  for (let i = 0; i < lists.length; i++) {
    sharings[i].push(names.length - 1);
    console.log(sharings);
  }
  updateTable();
}

function updateTable() {
  // col
  for (let j = 1; j < table.rows[0].cells.length - 1; j++) {
    let totalPerPerson = 0;
    //row
    for (let i = 1; i < table.rows.length - 1; i++) {
      // console.log("row = " + i + ": column = " + j);
      let foodItemIdx = i - 1;
      let share=0
      console.log("sharing = ", sharings[foodItemIdx]);
      console.log("pId = ", j-1);
      console.log(sharings[foodItemIdx].includes(j-1));
      if(sharings[foodItemIdx].includes(j-1)){
        // share = 500;
       share = depts[foodItemIdx] / sharings[foodItemIdx].length;
      if (share % 1 != 0) {
        share = share.toFixed(2);
        share = parseFloat(share);
      }
    }
      let span=table.rows[i].cells[j].querySelector('span');
      span.innerHTML=share;
  totalPerPerson = totalPerPerson + share;
}
    let totalRow = table.rows[table.rows.length - 1];
    // let totalRow = document.getElementById("total");
    totalRow.cells[j].innerHTML = totalPerPerson.toFixed(2);
  }
}

// function updateTable3(foodIdx,personIdx){
//   // let share = 0;
//   if (sharings[foodIdx].includes(personIdx)) {
//     share = depts[foodIdx] / sharings[foodIdx].length;
//     // if sharing price has decimals -> fix to 2 digits
//     if (share % 1 != 0) {
//       share = parseFloat(share.toFixed(2));
//     }
//     total += share;
//   let totalRow = table.rows[table.rows.length - 1];
//   totalRow.cells[personIdx+1].innerHTML = share;  
//   }
// }

// optional
// let share = 0;
// if (sharings[foodIdx].includes(personIdx)) {
//   share = depts[foodIdx] / sharings[foodIdx].length;
//   // if sharing price has decimals -> fix to 2 digits
//   if (share % 1 != 0) {
//     share = parseFloat(share.toFixed(2));
//   }
// }
// total += share;

// [1,2,3].includes(1);

//array.includes(x)