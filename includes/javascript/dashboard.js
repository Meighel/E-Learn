function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
    });

    document.getElementById("current-datetime").textContent = formattedDate;
}

setInterval(updateDateTime, 1000);

updateDateTime();
