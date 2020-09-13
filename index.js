const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const payload1 = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload1: ${payload1}`);

    const payload2 = JSON.stringify(github.context, undefined, 2)
    console.log(`The event payload2: ${payload2}`);

    const payload3 = JSON.stringify(github, undefined, 2)
    console.log(`The event payload3: ${payload3}`);

    const encodedQuery = encodeURIComponent(github.context.payload.issue.body);
    const issueNumber = github.context.payload.issue.id;

    /*
    axios
        .post('https://api.lmgtfy.com/short_urls', {
            "short_url": {
                "url": "https://lmgtfy.com/?q=" + encodedQuery
            }
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`);
            console.log(res);

            axios.post('https: //api.github.com/repos/' + github.repository + '/issues/' + issueNumber + '/comments/', {
                    "body": "Here's a link that can answer your question: " + res.body.short_url
                })
                .then(r => {
                    console.log(`statusCode: ${r.statusCode}`);
                    console.log(r);
                })
                .catch(e => {
                    console.error(e);
                });
        })
        .catch(error => {
            console.error(error);
        });
    */
} catch (error) {
    core.setFailed(error.message);
}