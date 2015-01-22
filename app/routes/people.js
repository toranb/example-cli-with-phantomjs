import Ember from 'ember';

var PeopleRoute = Ember.Route.extend({
    model: function() {
        var repository = this.get('repository');
        return repository.find();
    }
});

export default PeopleRoute;
