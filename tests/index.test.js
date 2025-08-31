const axios = require("axios");

const BACKEND_URL = "http://localhost:8000"

describe("Authentication", () => {
    test("User is able to Sign up only once", async () => {
        const username = "himanshu" + Math.floor(Math.random() * 1000);
        const password = "himanshu29"

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        expect(response.statusCode).toBe(200);

        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        expect(updatedResponse.statusCode).toBe(400);
    });

    test("Signup request fails if the username is empty", async () => {
        const username = "himanshu" + Math.floor(Math.random() * 1000);
        const password = "himanshu29"

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            password
        })

        expect((response.statusCode)).toBe(400);
    });

    test("Signin succeeds if the username and password are correct", async () => {
        const username = "himanshu" + Math.floor(Math.random() * 1000);
        const password = "himanshu29"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    test("Signin fails if the username is not registered", async () => {
        const username = "himanshu" + Math.floor(Math.random() * 1000);
        const password = "himanshu29"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username: "wrongusername",
            password
        });

        expect(response.statusCode).toBe(403);
    });
});


describe("User metadata endpoints", () => {
    let token = "";
    let avatarId = "";
    beforeAll(async () => {
        const username = "himanshu" + Math.floor(Math.random() * 1000);
        const password = "himanshu29"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });

        await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });

        token = response.data.token;

        const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
            "imageUrl": " ", //avatar image
            "name": "Tiny"
        });

        avatarId = avatarResponse.data.avatarId;

    })

    test("User can't update their metadata with a wrong avatar id", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId: "1222145658"
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        expect(response.statusCode).toBe(400);
    });

    test("User can update their metadata with a right avatar id", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        expect(response.statusCode).toBe(400);
    });

    test("User is not able to  update their metadata with a right avatar id if the token is not provided", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId
        })
        expect(response.statusCode).toBe(403);
    });
});

describe("User avatar information", () => {
    let avatarId;
    let token;
    let userId;
    beforeAll(async () => {
        const username = "himanshu" + Math.floor(Math.random() * 1000);
        const password = "himanshu29"

        const singupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });

        userId = singupResponse.data.userId;

        await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });

        token = response.data.token;

        const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
            "imageUrl": " ", //avatar image
            "name": "Tiny"
        });

        avatarId = avatarResponse.data.avatarId;

    });

    test("Get back avatar information of a user", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/vi/user/metadata/bulk?ids=[${userId}]`);
        expect(response.data.avatars.length).toBe(1);
        expect(response.data.avatars[0].userId).toBe(userId);
    });

    test("Available avatars list the recently created avatars", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
        expect(response.data.avatars.length).not.toBe(0);
        const currentAvatar = response.data.avatars.find(x => x.id == avatarId);
        expect(currentAvatar).toBeDefined();
    })

});

describe("Space information ", () => {
    let mapId;
    let element1Id;
    let element2Id;
    let token;
    let userId;

    beforeAll(async () => {
        const username = "himanshu" + Math.floor(Math.random() * 1000);
        const password = "himanshu29"

        const singupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });

        userId = singupResponse.data.userId;

        

        await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });

        token = response.data.token;

       

    });
})