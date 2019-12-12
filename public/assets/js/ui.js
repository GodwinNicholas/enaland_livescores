function openLink() {
    this.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(e.target.href)
    });
}