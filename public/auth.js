// Toggle between login and register views and handle form submissions.
(function () {
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const goRegister = document.getElementById("go-register");
  const goLogin = document.getElementById("go-login");
  const messageEl = document.getElementById("auth-message");

  const showMessage = (text, tone = "muted") => {
    messageEl.textContent = text;
    messageEl.style.color =
      tone === "error" ? "#b91c1c" : tone === "success" ? "#065f46" : "#6b7280";
  };

  const switchMode = (mode) => {
    const loginActive = mode === "login";
    tabLogin.classList.toggle("auth-tab--active", loginActive);
    tabRegister.classList.toggle("auth-tab--active", !loginActive);
    loginForm.classList.toggle("auth-form--hidden", !loginActive);
    registerForm.classList.toggle("auth-form--hidden", loginActive);
    showMessage("");
  };

  const submitAuth = async (url, body) => {
    showMessage("Working...", "muted");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const reason = data.error || "auth_error";
      throw new Error(reason);
    }

    return res.json();
  };

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    try {
      await submitAuth("/auth/login", { username, password });
      showMessage("Signed in. Redirecting...", "success");
      window.location.href = "/welcome";
    } catch (err) {
      showMessage("Invalid credentials. Please try again.", "error");
    }
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document
      .getElementById("register-username")
      .value.trim();
    const password = document
      .getElementById("register-password")
      .value.trim();

    try {
      await submitAuth("/auth/register", { username, password });
      showMessage("Account created. Redirecting...", "success");
      window.location.href = "/welcome";
    } catch (err) {
      const msg =
        err.message === "username_taken"
          ? "Username is taken. Choose another."
          : "Could not register. Try again.";
      showMessage(msg, "error");
    }
  });

  tabLogin.addEventListener("click", () => switchMode("login"));
  tabRegister.addEventListener("click", () => switchMode("register"));
  goRegister.addEventListener("click", (e) => {
    e.preventDefault();
    switchMode("register");
  });
  goLogin.addEventListener("click", (e) => {
    e.preventDefault();
    switchMode("login");
  });

  // Default to login view.
  switchMode("login");
})();
