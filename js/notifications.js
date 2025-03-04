// Funktion, um die Nachricht nach 5 Sekunden zu entfernen
setTimeout(function() {
    var message = document.getElementById('notification');
    if (message) {
        message.style.opacity = '0';
        setTimeout(function() { 
            message.style.display = 'none'; 
        }, 1500); // Wartet, bis die Übergangszeit abgelaufen ist
    }
}, 5000); // zum Beispiel 5000 Millisekunden = 5 Sekunden

function closeNotification() {
    var notification = document.getElementById('notification');
    if (notification) {
        notification.style.display = 'none';
    }
}