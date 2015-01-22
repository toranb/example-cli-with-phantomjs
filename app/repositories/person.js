import Ember from 'ember';
import PromiseMixin from 'example-cli-with-phantomjs/models/promise';

var PersonRepository = Ember.Object.extend({
    save: function(model) {
        //in the future invoke save on this model
    },
    find: function() {
        var store = this.get("store");
        PromiseMixin.xhr("/api/people", "GET").then(function(response) {
            response.forEach(function(data) {
                store.push("person", data);
            });
        });
        return store.find("person");
    },
    findById: function(id) {
        var store = this.get("store");
        return store.find("person", id);
    }
});

export default PersonRepository;
