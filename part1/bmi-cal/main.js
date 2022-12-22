function onSubmit(e) {
    // onsubmit 방지
    e.preventDefault();

    // 개발자 도구로 숫자 외 다른 값 또는 0 이하의 값을 입력하는 것을 방지
    const weight = parseFloat(e.target[0].value);
    const height = parseInt(e.target[1].value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("적절한 값이 아닙니다.");
        return;
    }
}