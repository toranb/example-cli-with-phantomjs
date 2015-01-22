import Ember from 'ember';

var PeoplePersonController = Ember.ObjectController.extend({
    actions: {
        save: function() {
            var model = this.get('model');
            var repository = this.get('repository');
            repository.save(model);
        }
    }
});

export default PeoplePersonController;
