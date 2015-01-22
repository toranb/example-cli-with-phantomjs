import Ember from 'ember';

var PeoplePersonRoute = Ember.Route.extend({
    model: function(params) {
        var repository = this.get('repository');
        return repository.findById(params.person_id);
    }
});

export default PeoplePersonRoute;
