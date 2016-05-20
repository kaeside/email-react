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



var EMAILS = {
    inbox: {
        0: {
            id: 0,
                from: "billg@microsoft.com",
                to: "TeamWoz@Woz.org",
                title: "Possible work opportunity",
                content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
                from: "zuck@facebook.com",
                to: "TeamWoz@Woz.org",
                title: "Do you know PHP?",
                content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
                from: "ChEaPFl1ghTZ@hotmail.com",
                to: "TeamWoz@Woz.org",
                title: "WaNt CHEEp FlitZ",
                content: "Theyre CheEp"
        },
        1: {
            id: 1,
                from: "NiKEAIRJordanZ@hotmail.com",
                to: "TeamWoz@Woz.org",
                title: "JorDanz For SAle",
                content: "Theyre REELY CheEp"
        }
    }
};


var Email = function(props) {
    return (
        <div>
            <p>{props.id}</p>
            <p>{props.from}</p>
            <p>{props.to}</p>
            <p>{props.title}</p>
            <p>{props.content}</p>
        </div>
    );
};

var EmailPreview = function(props) {
    return (
        <div>
            <p>{props.email.from}</p>
            <Link to={props.folder + '/' + props.email.id }>
                <p>{props.email.title}</p>
            </Link>
        </div>
    );
};


var EmailList = function(props) {
    var emails = Object.keys(props.emails).map(function(emailId, index) {
        var email = props.emails[emailId];
        return (
            <li key={index}>
                <EmailPreview folder={props.folder} email={email}/>
            </li>
        );
    });
    return (
        <ul>
            {emails}
        </ul>
    );
};

var InboxListContainer = function() {
    return <EmailList folder={'inbox'} emails={EMAILS.inbox}/>;
};
var SpamListContainer = function() {
    return <EmailList folder={'spam'} emails={EMAILS.spam}/>;
};

var App = function(props) {
    return (
        <div>
            <div className='sidebar'>
                <strong>
                    <Link to={'/inbox'}>
                        Inbox
                    </Link>
                    <Link to={'/spam'}>
                        Spam
                    </Link>
                </strong>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    );
};


var InboxContainer = function(props) {
    var folder = EMAILS.inbox[props.params.emailId];
    return <Email id={folder.id} from={folder.from} to={folder.to} title={folder.title} content={folder.content} />;
};

var SpamContainer = function(props) {
    var folder = EMAILS.spam[props.params.emailId];
    return <Email id={folder.id} from={folder.from} to={folder.to} title={folder.title} content={folder.content} />;
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/inbox" component={InboxListContainer}/>
            <Route path="/inbox/:emailId" component={InboxContainer}/>
            <Route path="/spam" component={SpamListContainer}/>
            <Route path="/spam/:emailId" component={SpamContainer}/>
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});
