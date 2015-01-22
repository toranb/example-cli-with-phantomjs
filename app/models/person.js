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
    enteredWat: {
        value: '',
        dirty: false
    },
    wat: function() {
        var value = this.get('enteredWat.value').trim();
        if(!this.get('enteredWat.dirty')) {
            this.set('enteredWat.dirty', value.length > 0);
        }
        return value;
    }.property('enteredWat.value'),
    watError: function() {
        var wat = this.get('wat');
        var isDirty = this.get('enteredWat.dirty');
        if(!wat && isDirty) {
            return 'please enter a valid wat';
        }
    }.property('wat', 'enteredWat.dirty'),
    fullName: function() {
        var first = this.get('firstName');
        var last = this.get('lastName');
        return first + ' ' + last;
    }.property('firstName', 'lastName')
});

export default Person;
