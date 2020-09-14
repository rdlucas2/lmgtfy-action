const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    /*
    const payload = JSON.stringify(github, undefined, 2)
    console.log(`The event payload: ${payload}`);
    */

    const githubToken = core.getInput('github-token');
    const fieldToQuery = core.getInput('field-to-query');

    const config = {
        headers: { Authorization: `Bearer ${githubToken}` }
    };

    let encodedQuery = null;
    switch (fieldToQuery) {
        case 'body':
            encodedQuery = encodeURIComponent(github.context.payload.issue.body);
            break;
        case 'title':
            encodedQuery = encodeURIComponent(github.context.payload.issue.title);
            break;
        default:
            core.setFailed('No such field available');
    }

    if (encodedQuery === null) {
        core.setFailed('Query is empty');
        throw "Query is empty";
    }

    axios
        .post('https://api.lmgtfy.com/short_urls', {
            "short_url": {
                "url": "https://lmgtfy.com/?q=" + encodedQuery
            }
        })
        .then(res => {
            /*
            console.log(`statusCode1: ${res.statusCode}`);
            console.log(res);
            */

            axios.post(github.context.payload.issue.comments_url, {
                    "body": "Here's a link that might answer your question: " + res.data.short_url
                }, config)
                .then(r => {
                    /*
                    console.log(`statusCode2: ${r.statusCode}`);
                    console.log(r);
                    */
                })
                .catch(e => {
                    console.error(e);
                    core.setFailed(error.message);
                });
        })
        .catch(error => {
            console.error(error);
            core.setFailed(error.message);
        });
} catch (error) {
    core.setFailed(error.message);
}