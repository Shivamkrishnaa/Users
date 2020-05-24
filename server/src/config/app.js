export default {

    /**
     * Stores the name of Application which can be used 
     * throughout the application. 
     */
    name : process.env.APP_NAME || "ProjectName",


    /**
     * Specifies the log level which will be used
     * while setting up project Log level
     */
    log  : process.env.APP_LOG || "dev",

    
    /**
     * Stores the port number on which the application will
     * listen to the requests
     */
    port : process.env.APP_PORT || 8000,

    
    /**
     * Stores the phishing port number on which the application will
     * listen to the requests for phishing
     */
    landingPort : process.env.APP_LANDING_PORT || 80,

    
    /**
     * Stores the secret text which will be used while generating 
     * hash keys
     */
    secret : process.env.APP_SECRET || 'NodeJSProject',

    
    /**
     * Stores the secret text which will be used while generating 
     * hash keys
     */
    url : process.env.APP_URL || 'http://localhost',
    

    /**
     * Stores if server is Secure or not for Secure flag in cookies
     */
    secure : (process.env.APP_SECURE == 'true') || false,
}