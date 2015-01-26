import Ember from 'ember';

function clone(obj) {
    var copy = {};
    var factory = obj.get('constructor.ClassMixin.ownerConstructor');
    factory.eachComputedProperty(function (key, meta) {
        if (meta.isAttribute) {
            copy[key] = obj.get(key);
        }
    });
    return copy;
}

var attr = function() {
    var value = '';
    var meta = {isAttribute: true};
    return Ember.computed(function(key, val) {
        if (arguments.length === 2) {
            if (!this.get('isDirty')) {
                var oldState = clone(this);
                this.set("_oldState", oldState);
            }
            this.set('isDirty', true);
            value = val;
        }
        return value;
    }).meta(meta);
};

var Model = Ember.Object.extend({
    init: function() {
        this.set('isDirty', false);
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
    }
});

var Person = Model.extend({
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
