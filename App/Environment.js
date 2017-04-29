var _Environments = {
    production:  {BASE_URL: '', API_KEY: ''},
    staging:     {BASE_URL: '', API_KEY: ''},
    development: {AWS_DEFAULT_REGION: 'us-west-2',
    AWS_SECRET_ACCESS_KEY: 'xQ+MRA2AR3Ob4jakarPsv4idLMlxSqd9C4gZ/U5M',
    AWS_ACCESS_KEY_ID: "AKIAJSQRWL7PN6PSU2UQ"},
}

function getEnvironment() {
    // Insert logic here to get the current platform (e.g. staging, production, etc)
    var platform = 'development'

    // ...now return the correct environment
    return _Environments[platform]
}

var Environment = getEnvironment()
module.exports = Environment
