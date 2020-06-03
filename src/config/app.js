export default {
    name : process.env.APP_NAME || "ProjectName",
    log  : process.env.APP_LOG || "dev",
    port : process.env.PORT|| process.env.APP_PORT || 8000,
    secret : process.env.APP_SECRET || 'NodeJSProject',
    url : "https://bit-user-management.herokuapp.com/"||  process.env.APP_URL || 'http://localhost',
    secure : true|| (process.env.APP_SECURE == 'true') || false,
}