const users = [];

function registerUser() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    let hasError = false;

    if (!username) {
        usernameError.textContent = '유저이름을 입력해주세요.';
        hasError = true;
    }

    if (!email) {
        emailError.textContent = '이메일을 입력해주세요.';
        hasError = true;
    }

    if (!password) {
        passwordError.textContent = '비밀번호는 필수요소입니다.';
        hasError = true;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordError.textContent = '비밀번호는 최소 하나의 특수문자가 포함되어야 합니다!!';
        hasError = true;
    }

    if (!hasError) {
        const isUsernameDuplicate = users.some(user => user.username === username);
        const isEmailDuplicate = users.some(user => user.email === email);

        if (isUsernameDuplicate) {
            usernameError.textContent = '이미 존재하는 닉네임입니다.';
            hasError = true;
        }

        if (isEmailDuplicate) {
            emailError.textContent = '이미 존재하는 이메일입니다.';
            hasError = true;
        }

        if (!hasError) {
            const user = { username, email, password };
            users.push(user);

            console.log(users);

            alert('회원가입 성공!!');
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        }
    }
}