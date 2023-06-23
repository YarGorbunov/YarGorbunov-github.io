document.getElementById("send").addEventListener("click", function () {
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://oauth.vk.com/authorize?client_id=51687171&display=page&redirect_uri=https://yargorbunov.github.io/testvkapp/&response_type=code&v=5.131");
    xhr.send();
});