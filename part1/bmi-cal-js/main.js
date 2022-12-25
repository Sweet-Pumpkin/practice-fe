function onSubmit(e) {
    // onsubmit 방지
    e.preventDefault();

    // 개발자 도구로 숫자 외 다른 값 또는 0 이하의 값을 입력하는 것을 방지
    const weight = parseFloat(e.target[0].value);
    const height = parseFloat(e.target[1].value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("적절한 값이 아닙니다.");
        return;
    }

    // bmi 값
    const bmi = weight / (height * height);
    // 값 출력
    const res = document.getElementById('res');
    const bmiValue = document.getElementById('bmi');
    const stateValue = document.getElementById('state');
    const meter = document.getElementById('meter');
    let state = "정상";
    let common = true;
    
    res.style.display = "flex";

    if (bmi < 18.5) {
        state = "저체중";
        common = false;
    }
    if (bmi >= 25) {
        state = "과체중";
        common = false;
    }

    meter.value = bmi;
    bmiValue.innerText = bmi.toFixed(2);
    stateValue.innerText = state;
    stateValue.style.color = common ? "#29FF21" : "#FF3A3A"
}

