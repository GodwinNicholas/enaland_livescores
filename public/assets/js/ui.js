const find = document.querySelector(".search #find");

function openLink() {
    this.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(e.target.href)
    });
}

find.addEventListener("click", async e => {
    const word = document.querySelector("#searchTeam").value;
    found = window.find(word) ? "" : alert("Not found!");
});