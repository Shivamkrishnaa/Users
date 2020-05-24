export default {
    connection : process.env.DB_CONNECTION || "mongodb",
    host  : process.env.DB_HOST || "127.0.0.1",
    port : process.env.DB_PORT || 3306,
    database  : process.env.DB_DATABASE || "forge",
    username : process.env.DB_USERNAME || "forge",
    password : process.env.DB_PASSWORD || "",
    mongodbUrl : process.env.mongoUrl || "mongodb://root:rootuser1@ds263068.mlab.com:63068/bitusermanagement"
}