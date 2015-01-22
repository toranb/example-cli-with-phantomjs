import Ember from 'ember';

var AddController = Ember.ObjectController.extend({
    actions: {
        save: function() {
            var model = this.get('model');
            var repository = this.get('repository');
            repository.save(model);
            this.transitionToRoute("/");
        }
    }
});

export default AddController;
