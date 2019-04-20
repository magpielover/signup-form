/*
 *
 * This method creates fake users with id, name and email fields.
 * num: The number of users to create
 */

var faker = require("faker");
export function GenerateFakeUsers(num) {
  console.log("Fake users creating...");
  let users = [];
  for (let index = 0; index < num; index++) {
    var user = {
      id: index + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    };
    users.push(user);
  }
  return users;
}
