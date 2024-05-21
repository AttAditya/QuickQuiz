function notificationTemplate(message) {
    let notification = document.createElement('div');

    notification.className = 'notification';
    notification.innerText = message;

    return notification;
}

function pushNotification(message) {
    let notificationContainer = document.querySelector('.notifications');
    let notification = notificationTemplate(message);

    notification.id = `notification-${Date.now()}`;
    notificationContainer.appendChild(notification);

    let notificationTimeout = window.setTimeout(() => {
        notification.remove();
    }, 3000);
}

function notify(message) {
    pushNotification(message);
}

