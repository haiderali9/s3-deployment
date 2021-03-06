module.exports = {
    SERVER_BASE_URL: process.env.REACT_APP_SERVER_URL_PROD,
    SERVER_ENV: process.env.REACT_APP_SERVER_ENV,
    SERVER_API_VERSION: process.env.REACT_APP_SERVER_API_VERSION_PROD,
    SERVER_URL: `${this.SERVER_BASE_URL}/${this.SERVER_ENV}/dashboard/${this.SERVER_API_VERSION}`,
    HTTP_SERVER_URL: process.env.REACT_APP_HTTP_SERVER_URL
};
