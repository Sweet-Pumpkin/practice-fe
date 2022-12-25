/** 선언 */
let left = null;
let right = null; 
let oper = null;
let res = false;
let resValue = "";


/** input 출력 함수 */
function save() {
    const inp = document.getElementById('top-input');
    let value = "";

    if (left === null)
        return;
    value += left + " ";
    inp.value = value;

    if (oper === null)
        return;
    value += oper + " ";
    inp.value = value;

    if (right === null)
        return;
    value += right + " ";
    inp.value = value;

    if (res) {
        switch(oper) {
            case "+":
                resValue = parseInt(left) + parseInt(right);
                break;
            case "-":
                resValue = parseInt(left) - parseInt(right);
                break;
            case "*":
                resValue = parseInt(left) * parseInt(right);
                break;
            case "/":
                resValue = parseInt(left) / parseInt(right);
                break;
        }
        value += "= " + resValue;
        inp.value = value;
    }
}

/** 숫자 입력 함수 */
function inputNum(num) {
    if (oper === null) {
        if (left === null) {
            left = `${num}`;
        } else {
            if (num === 0 && parseInt(left) === 0) 
                return;
            left += `${num}`;
        }
    } else {
        if (right === null) {
            right = `${num}`;
        } else {
            if (num === 0 && parseInt(right) === 0) 
                return;
            right += `${num}`;
        }
    }
    save();
}

/** 연산자 입력 함수 */
function inputOper(op) {
    if (left === null && op === '-') {
        left = "-";
        save();
        return; 
    }

    if (left === "-" && op === '-') {
        return;
    }
    
    if (op === "-" && oper !== null && right === null) {
        right = "-";
        save();
        return;
    }

    oper = op;
    save();
}

/** 계산 함수 */
function inputEqu() {
    if (left === null || right === null || oper === null)
        return;

    if (res) {
        left = resValue
        right = null;
        resValue = null;
        oper = null;
        res = false;
    } else {
        res = true;
    }
    save();
}