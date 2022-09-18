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

export function getMailHeaders(listOfMails) {
    var headers = []
    for (var i = 0; i < listOfMails.length; i++) {
        headers.push(listOfMails[i]["bodyPreview"])
    }
    return headers
}

export function getDetails(listOfMails) {
    var mailHeaders = getMailHeaders(listOfMails);
    var suggestions = []
    for (var i = 0; i < mailHeaders.length; i++) {
        var details = {}
        details["title"] = getTitle(mailHeaders[i])
        details["time"] = getDayDateTime(mailHeaders[i])
        suggestions.push(details)
    }
    return suggestions
}

export function getTitle(text) {
    var words = text.split(" ");
    for (var i = 0; i < words.length - 1; i++) {
        if (words[i] + words[i + 1] === "Fall 2022") {
            words = words.slice(i, i + 6)
        } else {
            words = words.slice(0, 6)
        }
    }
    // console.log(words.join(" "))
    return words.join(" ")
}

export function getDayDateTime(text) {
    var words = text.split(" ");
    for (var i = 0; i < words.length - 1; i++) {
        if ((words[i] + words[i + 1]).startsWith("Due date") && i < words.length - 9) {
            console.log(words.slice(i + 2, i + 8).join())
            return words.slice(i + 2, i + 8).join()
        }
    }
}