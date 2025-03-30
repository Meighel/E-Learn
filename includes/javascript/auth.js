document.addEventListener("DOMContentLoaded", function () {
    // **SIGN-UP FUNCTION**
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let username = document.getElementById("reg-username").value.trim();
            let email = document.getElementById("reg-email").value.trim();
            let password = document.getElementById("reg-password").value.trim();

            if (!username || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            if (localStorage.getItem(email)) {
                alert("User already exists!");
            } else {
                let user = { 
                    username, 
                    email, 
                    password, 
                    profilePic: "default-avatar.png"
                };
                localStorage.setItem(email, JSON.stringify(user));
                alert("Registration Successful! Redirecting to login...");
                window.location.href = "login.html"; 
            }
        });
    }

    // **LOGIN FUNCTION**
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let email = document.getElementById("login-email").value.trim();
            let password = document.getElementById("login-password").value.trim();

            let user = JSON.parse(localStorage.getItem(email));

            if (user && user.password === password) {
                sessionStorage.setItem("loggedInUser", email);
                alert("Login Successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password!");
            }
        });
    }

    // **DASHBOARD - LOAD USER DATA**
    if (window.location.pathname.includes("dashboard.html")) {
        let loggedInEmail = sessionStorage.getItem("loggedInUser");

        if (!loggedInEmail) {
            window.location.href = "login.html";
        } else {
            let user = JSON.parse(localStorage.getItem(loggedInEmail));            
            if (user) {
                document.getElementById("profile-username").innerText = user.username;
                document.getElementById("profile-username-display").innerText = user.username;
                document.getElementById("profile-email").innerText = user.email;
                document.getElementById("profile-img").src = user.profilePic;

            } else {
                alert("User data not found! Try logging in again.");
                sessionStorage.removeItem("loggedInUser");
                window.location.href = "login.html"; 
            }
        }
    }

    // **UPDATE PROFILE FUNCTION**
    const updateForm = document.getElementById("update-form");
    if (updateForm) {
        updateForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let newUsername = document.getElementById("update-username").value.trim();
            let newEmail = document.getElementById("update-email").value.trim();

            let loggedInEmail = sessionStorage.getItem("loggedInUser");
            let user = JSON.parse(localStorage.getItem(loggedInEmail));

            if (!user) {
                alert("User not found!");
                return;
            }

            if (newUsername) user.username = newUsername;

            if (newEmail && newEmail !== loggedInEmail) {
                localStorage.removeItem(loggedInEmail); 
                user.email = newEmail;
                sessionStorage.setItem("loggedInUser", newEmail);
            }

            localStorage.setItem(user.email, JSON.stringify(user));
            alert("Profile Updated!");
            location.reload();
        });
    }

    // **PROFILE PICTURE UPLOAD**
    const profilePicInput = document.getElementById("profile-pic");
    if (profilePicInput) {
        profilePicInput.addEventListener("change", function (event) {
            let reader = new FileReader();
            reader.onload = function () {
                let loggedInEmail = sessionStorage.getItem("loggedInUser");
                let user = JSON.parse(localStorage.getItem(loggedInEmail));
                user.profilePic = reader.result;
                localStorage.setItem(loggedInEmail, JSON.stringify(user));
                document.getElementById("profile-img").src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        });
    }

    // **CHANGE PASSWORD FUNCTION**
    const changePasswordForm = document.getElementById("change-password-form");
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let oldPass = document.getElementById("old-password").value.trim();
            let newPass = document.getElementById("new-password").value.trim();

            let loggedInEmail = sessionStorage.getItem("loggedInUser");
            let user = JSON.parse(localStorage.getItem(loggedInEmail));

            if (user && user.password === oldPass) {
                user.password = newPass;
                localStorage.setItem(loggedInEmail, JSON.stringify(user));
                alert("Password changed successfully!");
                document.getElementById("old-password").value = "";
                document.getElementById("new-password").value = "";
            } else {
                alert("Incorrect current password!");
            }
        });
    }

    // **DELETE ACCOUNT FUNCTION**
    const deleteAccountBtn = document.getElementById("delete-account-btn");
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                let loggedInEmail = sessionStorage.getItem("loggedInUser");
                localStorage.removeItem(loggedInEmail);
                sessionStorage.removeItem("loggedInUser");
                alert("Your account has been deleted.");
                window.location.href = "index.html";
            }
        });
    }

    // **LOGOUT FUNCTION**
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }
});

