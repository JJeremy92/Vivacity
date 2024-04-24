var getApplicants = require('./src/db').getApplicants;
var createApplicant = require('./src/db').createApplicant;
var updateApplicant = require('./src/db').updateApplicant;
var deleteApplicant = require('./src/db').deleteApplicant;

describe('getApplicants', function () {
  it('should return an array of applicants', function (done) {
    getApplicants().then(function (applicants) {
      expect(applicants).toBeInstanceOf(Array);
      applicants.forEach(function (applicant) {
        expect(applicant).toHaveProperty('id');
        expect(applicant).toHaveProperty('name');
        expect(applicant).toHaveProperty('email');
        expect(applicant).toHaveProperty('location');
        expect(applicant).toHaveProperty('phone_number');
      });
      done();
    }).catch(function (error) {
      done.fail(error);
    });
  });
});

describe('createApplicant', function () {
  it('should create a new applicant and return the ID', function (done) {
    createApplicant('John Doe', 'john@example.com', 'New York', '1234567890').then(function (applicant) {
      expect(applicant).toBeGreaterThan(0);
      done();
    }).catch(function (error) {
      done.fail(error);
    });
  });
});

describe('updateApplicant', function () {
  it('should update an existing applicant and return the ID', function (done) {
    var applicantId = 1; // Replace with the ID of the applicant you want to update
    var updatedName = 'Jane Doe';
    var updatedEmail = 'jane@example.com';
    var updatedLocation = 'San Francisco';
    var updatedPhoneNumber = '0987654321';
    updateApplicant(applicantId, updatedName, updatedEmail, updatedLocation, updatedPhoneNumber).then(function (updatedApplicantId) {
      expect(updatedApplicantId).toBe(applicantId);
      done();
    }).catch(function (error) {
      done.fail(error);
    });
  });
});

describe('deleteApplicant', function () {
  it('should delete an existing applicant and return the ID', function (done) {
    var applicantId = 1; // Replace with the ID of the applicant you want to delete
    deleteApplicant(applicantId).then(function (deletedApplicantId) {
      expect(deletedApplicantId).toBe(applicantId);
      done();
    }).catch(function (error) {
      done.fail(error);
    });
  });
});