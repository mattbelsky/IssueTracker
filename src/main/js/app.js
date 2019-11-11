import React from 'react';
import ReactDOM from 'react-dom';

const client = require('./client');

class Issue extends React.Component {

	render() {
		return (
			<ul>
				<li>{this.props.issue.issueSummary}</li>
				<li>{this.props.issue.identifiedByPersonId}</li>
			</ul>
		);
	}
}

class IssueList extends React.Component {
	
	render() {
		const issues = this.props.issues.map(issue => 
			<Issue key={issue._links.self.href} issue={issue} />
		);
		return issues;
	}
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {issues: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/issues'}).done(response => 
			this.setState({employees: response.entity._embedded.issues})
		);
	}

	render() {
		return <IssueList issues = {this.state.issues} />;
	}
}

const Test = () => <p>testing...</p>;

ReactDOM.render(<Test />, document.getElementById('app'));
