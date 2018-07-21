function Hello() {
    var name;
    this.setName = function(newName) {
        name = newName;
    };
    this.sayHello = function() {
        console.log('Hello '+name);
    };
};
module.exports = Hello;