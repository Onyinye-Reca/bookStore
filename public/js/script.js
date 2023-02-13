const tabs = document.querySelector(".tabs");
const tabButton = document.querySelectorAll(".navTab");
const content = document.querySelectorAll(".content");
const loginForm = document.getElementById("loginform")

tabs.addEventListener("click", e => {
  const id = e.target.dataset.toggle;
  if (id) {
    tabButton.forEach(navTab => {
      navTab.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  content.forEach(content => {
    content.classList.remove("active");
  });

  const element = document.getElementById(id);
  element.classList.add("active");
});

loginForm.addEventListener("submit", (handleLogin) => {
  handleLogin.preventDefault()
  handleLogin.stopPropagation()

  const prevPayLoad = new FormData(loginForm)
  const payLoad = new URLSearchParams(prevPayLoad)

  fetch("/users/login", {
    method: "POST",
    body: payLoad 
  })
  .then((response) => {
    if(response.ok) {
      alert("login successful !")
      // console.log('hiiii');
      window.location.assign("/books/dashboard")
      return response.json()
    }else{
      alert("login failed !")
    }
  })
  .catch((err) => {
    console.log(err);
  })
})