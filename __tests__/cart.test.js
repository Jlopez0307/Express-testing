process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
let cart = require('../fakeDb');

let item = {
    name: "twix",
    price: 0.99
};

beforeEach(() => {
    cart.push(item);
});

afterEach(() => {
    cart.length = 0;
});

describe('GET /items', () =>{
    test("Gets all items", async () => {
        const resp = await request(app).get('/items');

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: cart});
    });
});

describe('POST /items', () => {
    test('Creates a new item', async () => {
        const resp = await request(app)
        .post('/items')
        .send({
            name: 'hershey',
            price: 0.99
        });

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({item: {
            name: 'hershey',
            price: 0.99
        }});
    });
});

describe('PATCH /items/:name', () => { 
    test('Updates an item', async () => {
        const resp = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name: "skittles",
            price: 1.00
        });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: {
                name: "skittles",
                price: 1.00
            }
        })
    })
})

describe("DELETE /item/:name", () => {
    test('Deletes an item', async () => {
        const resp = await request(app).delete(`/item/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Item Deleted"})
    })
})
