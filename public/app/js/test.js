// Unit tests for LOGIN

var user = {
  email: "office@casualino.com",
  password: "awesome"
};

var result = '';

describe('Login tests:', function () {

  var mockList = [{
    id: 1,
    firstName: "Jeremy",
    lastName: "Likness"
  }];

  var user = {
    email: "office@casualino.com",
    password: "awesome"
  };

  var url = '/login';

  var response = { email: "office@casualino.com" };

  function successCallback(data){
    result = data;
  }

  it("1. Expects login to succeed",

    inject(function ($http, $httpBackend) {
      // Create expectation
      $httpBackend.expectPOST(url, user).respond(200, response);

      // Call http service
      $http.post(url, user).success(successCallback);

      // flush response
      $httpBackend.flush();

      // Verify expectations
      expect( result.email ).toBe("office@casualino.com");
    })
  );

  it("2. Expects login to NOT succeed",

    inject(function ($http, $httpBackend) {
      // Create expectation
      $httpBackend.expectPOST(url, user).respond(200, response);

      // change user password with wrong one
      user.password = 123;

      // Call http service
      $http.post(url, user).success(successCallback);

      // flush response
      $httpBackend.flush();

      // Verify expectations
      expect( result.email ).toBe("office@casualino.com");
    })
  );

});