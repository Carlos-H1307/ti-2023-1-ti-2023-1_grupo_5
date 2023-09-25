require('dotenv').config();
const Clientes  = require('../../models/clientes');
const Carrinhos = require('../../models/carrinhos');
const app       = require('../../app');
const request   = require('supertest');
const mongoose  = require('mongoose');

const jwt = require('jsonwebtoken');
const config = require('../../config');

describe("Register cliente", () => {
    
    beforeAll( async () => { 
        try {
            await mongoose.connect(process.env.DB_DEV_URL);

        } catch (error) {
            console.log(error);
        }
    })

    beforeEach( async () => {
        await Clientes.deleteMany({});
        await Carrinhos.deleteMany({});
    });

    afterAll( () => { 
        mongoose.connection.close() 
    });

    it("Should create client with valid credentials", async () => {        
        const response = await request(app)
        .post("/clientes")
        .send({
            username: "teste1@email.com",
            password: "123123",
        });

        expect(response.status).toBe(200);
    });

    it("Should return 400 when there is no password", async () => {
        const response = await request(app)
        .post("/clientes")
        .send({
            username: "teste1@email.com",
        });

        expect(response.status).toBe(400);
    });

    it("Should return 400 when there is no username", async () => {
        const response = await request(app)
        .post("/clientes")
        .send({
            password: "123",
        });

        expect(response.status).toBe(400);
    });

    it("Should return 400 if the username is already registered", async () => {        
        await request(app)
        .post("/clientes")
        .send({
            username: "teste1@email.com",
            password: "123123",
        });

        const response = await request(app)
        .post("/clientes")
        .send({
            username: "teste1@email.com",
            password: "123",
        });

        expect(response.status).toBe(400);
    });
});

describe("Login cliente", () => {
    
    beforeAll( async () => { 
        try {
            await mongoose.connect(process.env.DB_DEV_URL);

        } catch (error) {
            console.log(error);
        }
    })

    beforeEach( async () => {
        await Clientes.deleteMany({});
        await Carrinhos.deleteMany({});
    });

    afterAll( () => { 
        mongoose.connection.close() 
    });

    it("Should authenticate with valid credentials", async () => {      
        
        const client = {
            username: "teste1@email.com",
            password: "123123"
        }

        await request(app)
        .post("/clientes")
        .send(client);

        const response = await request(app)
        .post("/clientes/login")
        .send(client);

        let tokenData =  jwt.decode(response.body.token, config.secretKey);

        expect(tokenData.username).toBe(client.username);
        expect(response.body.email).toBe(client.username);
        expect(response.body._id).toBeTruthy();
    });

    it("Should return 401 with a unregistered username", async () => {      
        
        const client = {
            username: "unregistered@email.com",
            password: "123123"
        }

        const response = await request(app)
        .post("/clientes/login")
        .send(client);

        expect(response.status).toBe(401);
    });

    it("Should return 401 if the password is wrong", async () => {      
        
        const clientRegister = {
            username: "teste1@email.com",
            password: "123123"
        }

        const clientLogin = {
            username: "teste1@email.com",
            password: "010203"
        }

        await request(app)
        .post("/clientes")
        .send(clientRegister);

        const response = await request(app)
        .post("/clientes/login")
        .send(clientLogin);

        expect(response.status).toBe(401);
    });    
    //TESTAR COOKIE
});