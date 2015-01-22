import PersonRepository from 'example-cli-with-phantomjs/repositories/person';

export function initialize(container, application) {
    application.register('repositories:person', PersonRepository);
    application.inject('repositories:person', 'store', 'store:main');
    application.inject('route:people', 'repository', 'repositories:person');
    application.inject('route:people/person', 'repository', 'repositories:person');
    application.inject('controller:people/person', 'repository', 'repositories:person');
    application.inject('controller:add', 'repository', 'repositories:person');
}

export default {
    name: 'person-repository',
    after: 'store',
    initialize: initialize
};
