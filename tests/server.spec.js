const request = require("supertest");
const app = require("../index"); 

const cafes = require("../cafes.json");

describe("Operaciones CRUD de cafes", () => {
    it("debe devolver un arreglo de cafes al hacer una solicitud GET a /cafes", async () => {
        const response = await request(app).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("debe devolver un código 404 al intentar eliminar un café con un id que no existe", async () => {
        const response = await request(app).delete("/cafes/999"); // Supongamos que el ID 999 no existe
        expect(response.status).toBe(404);
    });

    it("debe agregar un nuevo café y devolver un código 201 al hacer una solicitud POST a /cafes", async () => {
        const newCafe = { id: 5, nombre: "Latte" }; // Puedes ajustar los datos según lo necesites
        const response = await request(app).post("/cafes").send(newCafe);
        expect(response.status).toBe(201);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(cafe => cafe.id === newCafe.id)).toBe(true);
    });

    it("debe devolver un código 400 al intentar actualizar un café con un id diferente en el payload", async () => {
        const cafeToUpdate = { id: 1, nombre: "Cortado actualizado" };
        const response = await request(app).put("/cafes/1").send(cafeToUpdate);
        expect(response.status).toEqual(400);
    });
    
});
