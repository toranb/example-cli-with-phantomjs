import Ember from 'ember';

var PeoplePersonRoute = Ember.Route.extend({
    actions: {
        willTransition: function(transition) {
          if (this.controller.get('model.isDirty') && !confirm("Are you sure you want to abandon progress?")) {
            transition.abort();
          } else {
            return true;
          }
        }
    },
    model: function(params) {
        var repository = this.get('repository');
        return repository.findById(params.person_id);
    }
});

export default PeoplePersonRoute;
