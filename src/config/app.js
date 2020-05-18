export default {
    name : process.env.APP_NAME || "ProjectName",
    log  : process.env.APP_LOG || "dev",
    port : process.env.APP_PORT || 800,
    secret : process.env.APP_SECRET || 'NodeJSProject',
    url : process.env.APP_URL || 'http://localhost',
    secure : (process.env.APP_SECURE == 'true') || false,
}