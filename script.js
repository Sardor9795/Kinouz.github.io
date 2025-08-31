function searchMovie() {
    const query = document.getElementById('searchBox').value;
    const resultsDiv = document.getElementById('results');
    if (!query) {
        resultsDiv.innerHTML = "<p>Iltimos, film nomini kiriting!</p>";
        return;
    }
    resultsDiv.innerHTML = `<p>Qidirilmoqda: <strong>${query}</strong> ... (namuna)</p>`;
}
