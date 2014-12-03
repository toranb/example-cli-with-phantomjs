import Ember from 'ember';
import startApp from '../helpers/start-app';
import stubEndpointForHttpRequest from '../helpers/stub';

var App;

module('Acceptance: ItWorks', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visit and click button', function() {
  stubEndpointForHttpRequest('/api/people', []);
  visit('/');
  click('#go');
  andThen(function() {
    equal(1, 1);
  });
});
