export Mocha;

var Mocha = function () {
	this.before = function(name, fn){};

    this.after = function(name, fn){};

    /**
     * Execute before each test case.
     */

    this.beforeEach = function(name, fn){};

    /**
     * Execute after each test case.
     */

    this.afterEach = function(name, fn){};

    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */

    this.describe = this.this = function(title, fn){};

    /**
     * Pending describe.
     */

    this.xdescribe =
    this.xthis =
    this.describe.skip = function(title, fn){};

    /**
     * Exclusive suite.
     */

    this.describe.only = function(title, fn){};

    /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */

    this.it = this.specify = function(title, fn){};

    /**
     * Exclusive test-case.
     */

    this.it.only = function(title, fn){};

    /**
     * Pending test case.
     */

    this.xit =
    this.xspecify =
    this.it.skip = function(title){};


}