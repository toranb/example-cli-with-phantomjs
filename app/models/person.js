import Ember from 'ember';

var Person = Ember.Object.extend({
    firstName: '',
    lastName: '',
    fullName: function() {
        var first = this.get('firstName');
        var last = this.get('lastName');
        return first + ' ' + last;
    }.property('firstName', 'lastName')
});

export default Person;
