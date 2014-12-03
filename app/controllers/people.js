import Ember from 'ember';

var PeopleController = Ember.ArrayController.extend({
    actions: {
        go: function() {
            var callback = function() {
                console.log('wat');
            };
            callback.bind(this);
        }
    }
});

export default PeopleController;
