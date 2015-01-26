import Ember from 'ember';

var PeoplePersonRoute = Ember.Route.extend({
    actions: {
        willTransition: function(transition) {
            var model = this.controller.get('model');
            if (model.get('isDirty')) {
                if(!confirm("Are you sure you want to abandon progress?")) {
                    transition.abort();
                }else{
                    model.rollback();
                    return true;
                }
            }
        }
    },
    model: function(params) {
        var repository = this.get('repository');
        return repository.findById(params.person_id);
    }
});

export default PeoplePersonRoute;
