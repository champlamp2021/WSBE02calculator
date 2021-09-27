//operand operator
const calculatorDisplay =document.querySelector('h1');  //box show data
const inputBtn=document.querySelectorAll('button'); //input data Array
const clearBtn=document.getElementById('clear-btn');
/*
เช็ค data ที่ได้
console.log(calculatorDisplay);
console.log(inputBtn);
console.log(clearBtn);
*/

const calculate={
    "/":(firstNumber,secondNumber)=>firstNumber/secondNumber,
    "*":(firstNumber,secondNumber)=>firstNumber*secondNumber,
    "+":(firstNumber,secondNumber)=>firstNumber+secondNumber,
    "-":(firstNumber,secondNumber)=>firstNumber-secondNumber,
    "=":(firstNumber,secondNumber)=>secondNumber
}
console.log(calculate);

//create function input Data  from button
let firstValue=0;//ตัวเลขที่ 1
let operatorValue='';//เก็บสถานะตัวดำเนินการ
let waitForNext=false;//เก็บสถานะตัวเลขและตัวดำเนินการ

inputBtn.forEach((input)=>{
    //กรองเอาข้อมูล ปุ่มตัวเลข 0-9
//console.log(input.classList.length); 
    //เช็คข้อมูลจากคลาสที่มีค่าเป็น 0  เพื่อรับค่าข้อมุลจากแป้นพิมพ์
        if(input.classList.length===0){
             input.addEventListener('click',()=>setNumberValue(input.value));
        }else if(input.classList.contains("operator")){
             input.addEventListener('click',()=>callOperator(input.value));
        }else if(input.classList.contains("decimal")){
             input.addEventListener('click',()=>addDecimal());
        }
});

clearBtn.addEventListener('click',()=>resetAll()); //clear data at calculatorDisplay


//------------------------------- function ------------------------------------
function setNumberValue(number){
    if(waitForNext){
            calculatorDisplay.textContent=number;
            waitForNext=false;
    }else{
        // console.log(number);
        //นำข้อมูลที่เป็นตัวเลขที่ได้จากการกดปุ่มไปแสดงผลบน calculatorDisplay
        const displayValue = calculatorDisplay.textContent;  //เก็บค่าเริ่มต้น โดยค่าเริ่มต้นมาค่า=0
        calculatorDisplay.textContent=displayValue==='0'? number:displayValue+number;//ต่อตัวเลข
    }
}

function callOperator(operator){
    const currentValue=Number(calculatorDisplay.textContent);
    if(operatorValue&&waitForNext){
        operatorValue=operator;
        return;
    }
    if(!firstValue){
        firstValue=currentValue;//กำหนดค่าเริ่มต้น ตัวเลขที่ 1
    }else{
        const result=calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent=result;
        firstValue=result;
        console.log(firstValue);
        if(firstValue==="error"){
            resetAll();
        }
        /*console.log(firstValue);
        console.log(operatorValue);
        console.log(currentValue); */
    }
    operatorValue=operator;
    waitForNext=true;
}

function addDecimal(){
    //console.log("decimal");
    if(waitForNext)return;
    if(!calculatorDisplay.textContent.includes(".")){
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`;
    }
}

function resetAll(){
    firstValue=0;
    operatorValue='';
    waitForNext=false;
    calculatorDisplay.textContent='0';
}
