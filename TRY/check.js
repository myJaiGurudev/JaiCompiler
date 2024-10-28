const languageMap = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 91
}

const code = `
#include<iostream>
using namespace std;
int main(){
    int a,b;
    cin>>a>>b;
    cout<<2*a+3*b<<"Output"<<endl;
    return 0;
}
`
const input = "20 10";

const url = 'https://judge0-ce.p.rapidapi.com/submissions?fields=*';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': '3f269af60dmsh96e8973505231acp175997jsn3102d031b351',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    },
    body: JSON.stringify({
        language_id: 54,
        source_code: atob(btoa(code)),
        stdin: atob(btoa(input))
    })
};

async function callApi() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const tokenId = result.token;
        let statusCode=2;
        //1 for in queue and 2 for processing
        while(statusCode === 2 || statusCode == 1){
            let result = await getSubmission(tokenId);
            statusCode = result.status.id;
            console.log(result.status,{result});
        }

    } catch (error) {
        console.error("Error occurred: ", error);
    }
}

async function getSubmission(tokenId){
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3f269af60dmsh96e8973505231acp175997jsn3102d031b351',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error({error});
}
}
callApi();