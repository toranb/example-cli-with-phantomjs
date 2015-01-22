import Ember from 'ember';

var attr = function() {
    var value = '';
    return function(key, val) {
        if (arguments.length === 2) {
            this.isDirty = true;
            value = val;
        }
        return value;
    }.property()
};

var Person = Ember.Object.extend({
    init: function() {
        this.set("isDirty", false);
    },
    save: function() {
        this.set("isDirty", false);
    },
    firstName: attr(),
    lastName: attr(),
    fullName: function() {
        var first = this.get('firstName');
        var last = this.get('lastName');
        return first + ' ' + last;
    }.property('firstName', 'lastName')
});

export default Person;
