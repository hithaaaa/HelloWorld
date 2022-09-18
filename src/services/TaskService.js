export function getTaskLists() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken },
    };
    fetch('https://graph.microsoft.com/v1.0/me/todo/lists', requestOptions)
        .then(async response => {
            const data = await response.json();
            getAllTasks(data["value"])
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

export function getAllTasks(listOfTaskLists) {
    var allTasks = []
    for (var i = 0; i < listOfTaskLists.length; i++) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        };
        fetch('https://graph.microsoft.com/v1.0/me/todo/lists/' + listOfTaskLists[i] + '/tasks', requestOptions)
            .then(async response => {
                const data = await response.json();
                for (var j = 0; j < data["value"].length; j++) {
                    allTasks.push(data["value"][j])
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    return allTasks
}

export function createTask(title) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + accessToken, 'Content-Type': application/json },
    };
    fetch('https://graph.microsoft.com/v1.0/me/todo/lists/' + listOfTaskLists[i] + '/tasks', requestOptions)
        .then(async response => {
            const data = await response.json();
            for (var j = 0; j < data["value"].length; j++) {
                allTasks.push(data["value"][j])
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}