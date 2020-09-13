const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    /*
    const payload = JSON.stringify(github, undefined, 2)
    console.log(`The event payload: ${payload}`);
    */

    const encodedQuery = encodeURIComponent(github.context.payload.issue.body);

    axios
        .post('https://api.lmgtfy.com/short_urls', {
            "short_url": {
                "url": "https://lmgtfy.com/?q=" + encodedQuery
            }
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`);
            console.log(res);

            axios.post(github.context.payload.issue.comments_url, {
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
} catch (error) {
    core.setFailed(error.message);
}