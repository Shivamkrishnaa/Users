require('dotenv').config();
var JWT = require('jsonwebtoken');
var request = require("request");
var baseUrl = process.env.APP_URL;


var JWTSign = function(companyId, date, appName, secret){
    return JWT.sign({
        iss : appName,
        sub : companyId,
        iat : date.getTime(),
        exp : new Date().setMinutes(date.getMinutes() + 30)
    }, secret);
}

// var connection = require('../../../../jasmine/database');
var cookie = 'connect.sid=s%3A_Sc_gd-FeBuV3ZweeQ0O2lfsovGw6ayM.5eAJYwja7fvV3a1y3YB%2ByNob2%2BZmRMPa2r7vhwtK1pQ; XSRF-token='+JWTSign(8, new Date(), 'ThreatCop', process.env.APP_SECRET);


describe("POST /auth/login", function() {

    it("Invalid Request method", function(done) {
        request.get(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: 'archit.jain@kratikal.com',
                    password: 'qwerty'
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(404);
                done();
            }
        )
    });

    it("Empty Fields", function(done) {
        request.post(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: '',
                    password: ''
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(400);
                expect(body.isJoi).toEqual(true);
                done();
            }
        )
    });

    it("Empty Email", function(done) {
        request.post(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: '',
                    password: 'qwerty'
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(400);
                expect(body.isJoi).toEqual(true);
                done();
            }
        )
    });

    it("Empty Password", function(done) {
        request.post(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: 'archit.jain@kratikal.com',
                    password: ''
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(400);
                expect(body.isJoi).toEqual(true);
                done();
            }
        )
    });

    it("Invalid Email", function(done) {
        request.post(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: 'archit@jkratikal.com',
                    password: 'qwerty'
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(401);
                expect(body).toEqual({"errors": ["Invalid Credentials" ]});
                done();
            }
        )
    });

    it("Wrong Password", function(done) {
        request.post(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: 'archit.jain@kratikal.com',
                    password: 'qwertysff'
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            }
        )
    });

    it("Email is not verified", function(done) {
        request.post(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: 'nikita.paliwal@kratikal.com',
                    password: 'qwerty'
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(403);
                done();
            }
        )
    });

    it("Password attempts", function(done) {
        request.post(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: 'sarvesh.patel@kratikal.com',
                    password: 'qwertyhkj'
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(403);
                done();
            }
        )
    });

    it("Successfully LoggedIn", function(done) {
        request.post(
            baseUrl + '/api/auth/login',
            { 
                json: {
                    email: 'archit.jain@kratikal.com',
                    password: 'qwerty'
                } 
            },
            function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(body).toEqual({success: true})
                done();
            }
        )
    });
});

// describe("PATCH /auth/changePassword", function() {

//     it("Invalid Request method", function(done) {
//         request.get(
//             baseUrl + '/api/auth/changePassword',
//             { 
//                 json: {
//                     oldPass: 'qwerty',
//                     password: 'qwerty123'
//                 },
//                 headers: {
//                     'Cookie': cookie,
//                 }
//             },
//             function (error, response, body) {
//                 expect(response.statusCode).toBe(404);
//                 done();
//             }
//         )
//     });

//     it("Empty password Fields", function(done) {
//         request.patch(
//             baseUrl + '/api/auth/changePassword',
//             { 
//                 json: {
//                     oldPass: '',
//                     password: ''
//                 },
//                 headers: {
//                     'Cookie': cookie,
//                 }
//             },
//             function (error, response, body) {

//                 expect(response.statusCode).toBe(400);
//                 expect(body.isJoi).toBe(true);
//                 done();
//             }
//         )
//     });

   
   
//     it("Empty old Password", function(done) {
//         request.patch(
//             baseUrl + '/api/auth/changePassword',
//             { 
//                 json: {
//                     oldPass: '',
//                     password: 'qwerty'
//                 },
//                 headers: {
//                     'Cookie': cookie,
//                 }
//             },
//             function (error, response, body) {
//                 expect(response.statusCode).toBe(400);
//                 expect(body.isJoi).toBe(true);
//                 done();
//             }
//         )
//     });
    
    
    
//     it("Empty New Password", function(done) {
//         request.patch(
//             baseUrl + '/api/auth/changePassword',
//             { 
//                 json: {
//                     oldPass: 'qwerty',
//                     password: ''
//                 },
//                 headers: {
//                     'Cookie': cookie,
//                 }
//             },
//             function (error, response, body) {
//                 expect(response.statusCode).toBe(400);
//                 expect(body.isJoi).toBe(true);
//                 done();
//             }
//         )
//     }); 
    
//     it("Current Password didn\'t Match!", function(done) {
//         request.patch(
//             baseUrl + '/api/auth/changePassword',
//             { 
//                 json: {
//                     oldPass: 'qwe345',
//                     password: 'qwerty456'
//                 },
//                 headers: {
//                     'Cookie': cookie,
//                 }
//             },
//             function (error, response, body) {
//                 expect(response.statusCode).toBe(500);
//                 expect(body).toEqual({ errors: [ 'Current Password didn\'t Match!' ] })
//                 done();
//             }
//         )
//     });
    
    
//     it("Password Succesfully Updated", function(done) {
//         request.patch( baseUrl + '/api/auth/changePassword',
//             { 
//                 json: {
//                     oldPass: 'qwerty456',
//                     password: 'qwerty456'
//                 },
//                 headers: {
//                     'Cookie': cookie,
//                 }
//             },

//             function (error, response, body) {
//                 expect(response.statusCode).toBe(200);
//                 done();
//             }
//         )
//     });

// });

// describe("Post /auth/sendReset", function() {
//     it("Invalid Request method", function(done) {
//         request.get(
//             baseUrl + '/api/auth/sendReset',
//             { 
//                 json: {
//                     email: 'archit.jain@kratikal.com',
//                 } 
//             },
//             function (error, response, body) {
//                 expect(response.statusCode).toBe(404);
//                 done();
//             }
//         )
//     });

//     // it("Email is not send", function(done) {
//     //     request.post(
//     //         baseUrl + '/api/auth/sendReset',
//     //         { 
//     //             json: {
//     //                 email: 'archit.jain@kratikal.com',
//     //             } 
//     //         },
//     //         function (error, response, body) {
//     //             expect(response.statusCode).toBe(500);
//     //             done();
//     //         }
//     //     )
//     // });

//     it("Email sent successfully", function(done) {
//         request.post(
//             baseUrl + '/api/auth/sendReset',
//             { 
//                 json: {
//                     email: 'archit.jain@kratikal.com',
//                 } 
//             },
//             function (error, response, body) {
//                 expect(response.statusCode).toBe(200);
//                 done();
//             }
//         )
//     });
// });

// describe("Post /auth/reset", function() {
//     // it("Invalid Request method", function(done) {
//     //     request.get(
//     //         baseUrl + '/api/auth/reset',
//     //         { 
//     //             json: {
//     //                 email: 'archit.jain@kratikal.com',
//     //                 verificationCode: 'a7d0s61uzip',
//     //                 password: 'qwerty'
//     //             } 
//     //         },
//     //         function (error, response, body) {
//     //             expect(response.statusCode).toBe(404);
//     //             done();
//     //         }
//     //     )
//     // });

//     // it("Email Field is empty", function(done) {
//     //     request.post(
//     //         baseUrl + '/api/auth/reset',
//     //         { 
//     //             json: {
//     //                 email: '',
//     //                 verificationCode: 'a7d0s61uzip',
//     //                 password: 'qwerty'
//     //             } 
//     //         },
//     //         function (error, response, body) {
//     //             expect(response.statusCode).toBe(400);
//     //             done();
//     //         }
//     //     )
//     // });

//     // it("Verification code is empty", function(done) {
//     //     request.post(
//     //         baseUrl + '/api/auth/reset',
//     //         { 
//     //             json: {
//     //                 email: 'archit.jain@kratikal.com',
//     //                 verificationCode: '',
//     //                 password: 'qwerty'
//     //             } 
//     //         },
//     //         function (error, response, body) {
//     //             expect(response.statusCode).toBe(400);
//     //             done();
//     //         }
//     //     )
//     // });
//     // it("Empty Password Fields", function(done) {
//     //     request.post(
//     //         baseUrl + '/api/auth/reset',
//     //         { 
//     //             json: {
//     //                 email: 'archit.jain@kratikal.com',
//     //                 verificationCode: 'a7d0s61uzip',
//     //                 password: ''
//     //             } 
//     //         },
//     //         function (error, response, body) {
//     //             expect(response.statusCode).toBe(400);
//     //             done();
//     //         }
//     //     )
//     // });

//     // it("Empty All Fields", function(done) {
//     //     request.post(
//     //         baseUrl + '/api/auth/reset',
//     //         { 
//     //             json: {
//     //                 email: '',
//     //                 verificationCode: '',
//     //                 password: ''
//     //             } 
//     //         },
//     //         function (error, response, body) {
//     //             expect(response.statusCode).toBe(400);
//     //             done();
//     //         }
//     //     )
//     // });
    
//     // it("Verification Code is Wrong", function(done) {
//     //     request.post(
//     //         baseUrl + '/api/auth/reset',
//     //         { 
//     //             json: {
//     //                 email: 'archit.jain@kratikal.com',
//     //                 verificationCode: 'a7d0s61uzif',
//     //                 password: 'qwerty'
//     //             } 
//     //         },
//     //         function (error, response, body) {
//     //             expect(response.statusCode).toBe(401);
//     //             expect(body).toEqual({ errors: [ 'Invalid verification code!' ] })
//     //             done();
//     //         }
//     //     )
//     // });

//     // it("Password Successfully Updated", function(done) {
//     //     request.post(
//     //         baseUrl + '/api/auth/reset',
//     //         { 
//     //             json: {
//     //                 email: 'archit.jain@kratikal.com',
//     //                 verificationCode: '7083cy1k99j',
//     //                 password: 'qwerty'
//     //             } 
//     //         },
//     //         function (error, response, body) {
//     //             expect(response.statusCode).toBe(200);
//     //             done();
//     //         }
//     //     )
//     // });
    