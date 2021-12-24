const Contact = require('../contacts.js');
const mongoose = require('mongoose');
const dbConnect = require('../db.js');

describe('COntacts DB connection', () => {
    beforeAll(() => {
        return dbConnect(true);
    });

    beforeEach((done) => {
        Contact.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a contact in the DB', (done) => {
        const contact = new Contact({"name": "juan", "phone": "123456789"});
        contact.save((err, contact) => {
            expect(err).toBeNull();
            Contact.find({}, (err, contacts) => {
                expect(contacts).toBeArrayOfSize(1);
                done();
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});