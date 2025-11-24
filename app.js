let user = { name: "Sinister" };
console.log(user);
const cache = new WeakMap();

cache.set(user, "userdata");

console.log(cache.get(user));
