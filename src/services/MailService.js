export function fetchMail(accessToken) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken },
    };
    fetch('https://graph.microsoft.com/v1.0/me/messages?$top=200&$value', requestOptions)
        .then(async response => {
            const data = await response.json();
            getDetails(data["value"])
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

export function getMailBodies(listOfMails) {
    var textBodies = []
    for (var i = 0; i < listOfMails.length; i++) {
        var htmlBody = listOfMails[i]["body"]["content"]
        while (htmlBody.search("<!--") !== -1) {
            var startIndex = htmlBody.search("<!--")
            var endIndex = htmlBody.search("-->") + 3
            htmlBody = htmlBody.substring(0, startIndex) + htmlBody.substring(endIndex)
        }
        while (htmlBody.search("<") !== -1) {
            startIndex = htmlBody.indexOf("<")
            endIndex = htmlBody.indexOf(">") + 1
            htmlBody = (htmlBody.substring(0, startIndex) + htmlBody.substring(endIndex)).trim()
        }
        textBodies.push(htmlBody)
    }
    return textBodies
}

export function getDetails(listOfMails) {
    var textBodies = getMailBodies(listOfMails);
    var suggestions = []
    for (var i = 0; i < textBodies.length; i++) {
        var details = {}
        details["title"] = getTitle(textBodies[i])
        details["time"] = getTime(textBodies[i])
        details["date"] = getDayDate(textBodies[i])
        suggestions.push(details)
    }
    return suggestions
}

export function getTitle(text) {

}

export function getTime(text) {

}

export function getDayDate(text) {

}