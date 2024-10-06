const languageMap = {
    cpp: 105,
    python: 92,
    javascript: 93,
    java: 91
}
const apiKey = [
    '1cf2539e99msha13d785f43055cep160e54jsn0993d420e935',
    '3f269af60dmsh96e8973505231acp175997jsn3102d031b351',
    'deb050ec9cmsh769edad975ce90cp13ac1djsne10bab949785',
    '69f8ff3c93msh9c17c7ddc32453ep1e778ejsn7c21ade71a71'
]
async function getSubmission(tokenId, callback){
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '69f8ff3c93msh9c17c7ddc32453ep1e778ejsn7c21ade71a71',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        callback({
            apiStatus: 'error',
            message: JSON.stringify(error)
        });
    }
}
export async function makeSubmission(code, language, callback, stdin){
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?fields=*';
    const httpOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': '69f8ff3c93msh9c17c7ddc32453ep1e778ejsn7c21ade71a71',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
            language_id: languageMap[language],
            source_code: atob(btoa(code)),
            stdin: atob(btoa(stdin))
        })
    };
    try {
        callback({apiStatus: 'loading'});
        const response = await fetch(url, httpOptions);
        const result = await response.json();
        const tokenId = result.token;
        let statusCode=1;
        //1 for in queue and 2 for processing
        let apiSubmissionResult;
        while(statusCode === 2 || statusCode === 1){
            try{
                apiSubmissionResult = await getSubmission(tokenId);
                statusCode = apiSubmissionResult.status.id;
            } catch (error) {
                callback({
                    apiStatus: 'error',
                    message: JSON.stringify(error)
                });
                return;
            }
        }
        if(apiSubmissionResult){
            callback({
                apiStatus: 'success',
                data: apiSubmissionResult
            });
        }

    } catch (error) {
        callback({
            apiStatus: 'error',
            message: JSON.stringify(error)
        });
    }
}