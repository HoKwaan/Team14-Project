document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault(); // 폼 제출 중단

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // 저장: localStorage에 사용자 정보 저장
    localStorage.setItem(username, password);
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html"; // 로그인 페이지로 이동
});
