export function createCalendarEvent(title, accessToken) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            subject: title,
            start: {
                dateTime: '2019-03-15T12:00:00',
                timeZone: 'Eastern Standard Time'
            },
            end: {
                dateTime: '2019-03-15T14:00:00',
                timeZone: 'Eastern Standard Time'
            },
        })
    };
    fetch('https://graph.microsoft.com/v1.0/me/calendar/events', requestOptions)
        .then(async response => {
            const data = await response.json();
            console.log(data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}