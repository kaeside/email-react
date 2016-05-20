var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var CONTACTS = {
    0: {
        id: 0,
        name: 'Sarah Hughes',
        phoneNumber: '01234 567890'
    },
    1: {
        id: 1,
        name: 'Tim Taylor',
        phoneNumber: '02345 678901'
    },
    2: {
        id: 2,
        name: 'Sam Smith',
        phoneNumber: '03456 789012'
    }
};

var Contact = function(props) {
    return (
        <div>
            <strong>
                <Link to={'/contacts/' + props.id}>
                    {props.name}
                </Link>
            </strong>
            &nbsp;
            {props.phoneNumber}
        </div>
    );
};

var ContactList = function(props) {
    var contacts = Object.keys(props.contacts).map(function(contactId, index) {
        var contact = props.contacts[contactId];
        return (
            <li key={index}>
                <Contact id={contact.id} name={contact.name} phoneNumber={contact.phoneNumber}/>
            </li>
        );
    });
    return (
        <ul>
            {contacts}
        </ul>
    );
};

var ContactListContainer = function() {
    return <ContactList contacts={CONTACTS}/>;
};

var App = function(props) {
    return (
        <div>
            <div className='sidebar'>
                <strong>
                    <Link to={'/contacts/' + props.id}>
                        {props.name}
                    </Link>
                </strong>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    );
};

var ContactContainer = function(props) {
    var contact = CONTACTS[props.params.contactId];
    return <Contact id={contact.id} name={contact.name} phoneNumber={contact.phoneNumber}/>;
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/contacts" component={App}>
            <IndexRoute component={ContactListContainer}/>
            <Route path="/contacts/:contactId" component={ContactContainer}/>
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});
