import Ember from 'ember';
import Person from 'example-cli-with-phantomjs/models/person';

var AddRoute = Ember.Route.extend({
    model: function() {
        return Person.create();
    }
});

export default AddRoute;
