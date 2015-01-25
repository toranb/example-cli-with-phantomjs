import Ember from 'ember';

//this function is half baked currently
//if a true computed gets "set" it will break everything
//looking for a way to identify ONLY the attr fields on the model
//because we should only clone/restore this specified
function keyIsSafeToClone(obj, key) {
    var keyIsPrivate = key.indexOf('_') === -1;
    var keyIsIdentifier = key.indexOf('id') === -1;
    var keyIsProtected = key.indexOf('isDirty') === -1;
    var keyIsFirstName = key.indexOf('firstName') === 0;
    var keyIsLastName = key.indexOf('lastName') === 0;
    //var keyIsComputed = key.indexOf('fullName') === 0; **problem here**
    //if (obj.hasOwnProperty(key) && keyIsPrivate && keyIsIdentifier && keyIsProtected) {
    if (obj.hasOwnProperty(key) && (keyIsFirstName || keyIsLastName)) {
        return key;
    }
}

function clone(obj) {
    var copy = {};
    for(var key in obj){
        if (keyIsSafeToClone(obj, key)) {
            copy[key] = obj.get(key);
        }
    }
    return copy;
}

var attr = function() {
    var value = '';
    return function(key, val) {
        if (arguments.length === 2) {
            if (!this.get('isDirty')) {
                var oldState = clone(this);
                this.set("_oldState", oldState);
            }
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
    rollback: function() {
        var oldState = this.get('_oldState');
        for(var key in oldState){
            this.set(key, oldState[key]);
        }
        this.set("isDirty", false);
    },
    save: function() {
        var oldState = clone(this);
        this.set("_oldState", oldState);
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
