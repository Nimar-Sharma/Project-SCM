function toggleText(id, link) {
    const moreText = document.getElementById(id);
    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline";
        link.textContent = "Read less ←";
    } else {
        moreText.style.display = "none";
        link.textContent = "Read more →";
    }
}
