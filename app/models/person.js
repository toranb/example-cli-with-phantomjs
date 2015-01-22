import Ember from 'ember';

var attr = function() {
    var value = '';
    return function(key, val) {
        if (arguments.length === 2) {
            this.set('isDirty', true);
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
    enteredWat: attr(),
    wat: function() {
        return this.get('enteredWat').trim();
    }.property('enteredWat'),
    watError: function() {
        var wat = this.get('wat');
        var isDirty = this.get('isDirty');
        if(!wat && isDirty) {
            return 'please enter a valid wat';
        }
    }.property('wat', 'isDirty'),
    fullName: function() {
        var first = this.get('firstName');
        var last = this.get('lastName');
        return first + ' ' + last;
    }.property('firstName', 'lastName')
});

export default Person;
