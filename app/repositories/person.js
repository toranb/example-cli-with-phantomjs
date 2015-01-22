import Ember from 'ember';
import PromiseMixin from 'example-cli-with-phantomjs/models/promise';

var PersonRepository = Ember.Object.extend({
    save: function(model) {
        if(model.get('id')){
            model.save();
        }else{
            var person = {
                firstName: model.get('firstName'),
                lastName: model.get('lastName'),
                wat: model.get('wat')
            };
            //xhr -then on the return push into the store
            var store = this.get("store");
            store.push("person", person);
        }
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
