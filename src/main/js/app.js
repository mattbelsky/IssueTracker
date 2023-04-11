import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../resources/static/main.css';

// const { useState, useEffect } = React; // necessary in Codepen, otherwise can use import statement

const Close = (props) => <span className='close' id={props.id}
                               onClick={props.onClick}>X</span>;

/******************** PROJECTS ********************/

const ProjectSummary = (props) => {
  const assigned = props.assigned === 'true' ? 'assigned' : 'unassigned';

  return (
    <div className='summary-item-container'>
      <h2>{props.projectName}</h2>
      <div>{props.numIssues} {props.numIssues == 1 ? 'issue' : 'issues'} pending</div>
      <div className={assigned}>{assigned}</div>
      <a href='javascript:;' id='view-project'
        onClick={() => props.onClick(props.projectName + 'view-project', props.id)}>
        view project
      </a>
      <span style={{float: 'right'}}>
        <a href='javascript:;' id='view-issues'
          onClick={() => { props.onClick('view-issues', props.id)}}>
          view issues
        </a>
      </span>
    </div>
  );
};

class ProjectSummaryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const projects = this.props.projects.map(p => {
      const key = p.projectName + 'project-key';
      return (
        <ProjectSummary
          key={key}
          id={p._links.self.href.match(/\w+$/)[0]}
          projectName={p.projectName}
          numIssues={p.numIssues}
          assigned={p.assigned}
          onClick={this.props.onClick}/>
      );
    });
    return (
      <div id='project-summary-list' className='left-col'>
        {projects}
        <div className='add-new' onClick={() => this.props.onClick('new-project')}>+</div>
      </div>
    );
  }
};

const Project = (props) => {

  const unfinished = (
    <div>
      <h2>{props.content.projectName}</h2>
      <div>
        Start Date<br/>
        {props.content.startDate}
      </div>
      <div>
        Target End Date<br/>
        {props.content.targetEndDate}
      </div>
    </div>
  );

  const finished = (
    <div>
      Actual End Date<br/>
      {props.content.actualEndDate}
    </div>
  );

  const modifications = (
    <div>
      <table>
        <tr>
          <td></td>
          <td>Date</td>
          <td>Person</td>
        </tr>
        <tr>
          <td>Created</td>
          <td>{props.content.createdOn}</td>
          <td>{props.content.createdBy}</td>
        </tr>
        <tr>
          <td>Last Modified</td>
          <td>{props.content.modifiedOn}</td>
          <td>{props.content.modifiedBy}</td>
        </tr>
      </table>
    </div>
  );

  if (props.finished) {
    return <div id='project'>{unfinished}{finished}{modifications}</div>;
  } else {
    return <div id='project'>{unfinished}{modifications}</div>
  }
};

class NewProject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      targetEndDate: new Date().toISOString().slice(0,10),
      startDate: new Date(),
      createdOn: new Date(),
      createdBy: 'Mike Holliday',
      validProjectName: true,
      validDate: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.projectName === '') {
      this.setState({validProjectName: false});
      return;
    }
    else
      this.setState({validProjectName: true});

    if (new Date(this.state.targetEndDate) < new Date()) {
      this.setState({validDate: false});
      return;
    }
    else
      this.setState({validDate: true});

    fetch('http://localhost:8080/api/projects', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(this.state)
    })
      .then(response => {
        this.props.onClick(this.state.projectName + 'view-project');
        alert('Submitted successfully!');
      })
      .catch(error => alert('Form submit error', error));
  }

  render() {
    return (
      <div className='new-project'>
        This is a NEW project. Did you spot the change?
        <form onSubmit={this.handleSubmit}>
          <label>Project Name</label><br/>
            <input name='projectName' type='text' value={this.state.projectName} onChange={this.handleChange}/><br/>
            {!this.state.validProjectName &&
              <p>Invalid project name.</p>
            }
          <label>Target End Date</label><br/>
            <input name='targetEndDate' type='date' value={this.state.targetEndDate} onChange={this.handleChange}/><br/>
            {!this.state.validDate &&
              <p>Target end date must be today or later.</p>
            }
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
};

/******************** PEOPLE ********************/

const PersonSummary = (props) => {
  return (
    <div className='summary-item-container' onClick={() => props.onClick('view-person', props.id)}>
      <div>{props.personName}</div>
      <div className='person-summary-role'>{props.personRole}</div>
    </div>
  );
};

class PersonSummaryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const people = this.props.people.map(p => {
      const personId = p._links.self.href.match(/\w+$/)[0];
      return (
        <PersonSummary
          id={personId}
          key={personId + p.personName + 'person-key'}
          personName={p.personName}
          personRole={p.personRole}
          onClick={this.props.onClick}/>
      );
    });
    return (
      <div id='person-summary-list' className='left-col'>
        {people}
        <div className='add-new' onClick={() => this.props.onClick('new-person')}>+</div>
      </div>
    );
  }
}

const Person = (props) => {
  return (
    <div id='person'>
      <h3>{props.content.personName}</h3>
      <p>{props.content.personRole}</p>
      <p>{props.content.username}</p>
      <p>{props.content.personEmail}</p>
    </div>
  );
};

class NewPerson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      personName: '',
      personRole: '',
      username: '',
      password: '',
      personEmail: '',
      createdOn: new Date(),
      createdBy: 'Mike Holliday',
      modifiedOn: new Date(),
      modifiedBy: 'Mike Holliday'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const stateArray = Object.values(this.state);
    if (stateArray.filter(item => item === '').length > 0) {
      alert('Missing input. Please ensure that all fields are filled out.');
      return;
    }
    if (this.state.personEmail.match(/^[A-Za-z0-9.]+@[A-Za-z0-9]+.[A-Za-z0-9]{2,}$/g) === null) {
      alert('Invalid email address.');
      return;
    }

    fetch('http://localhost:8080/api/people', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(this.state)
    })
      .then(response => {
        if (response.status === 409) {
          alert('Duplicate entry. Try a different username or email.');
          return;
        }
        this.props.onClick('view-person', this.state.personName);
        alert('Submitted successfully!');
      })
      .catch(error => {
        alert('Form submit error', error);
        console.error(error);
      });
  }

  render() {
    return (
      <div className='new-person'>
        <form onSubmit={this.handleSubmit}>
          Name<br/>
          <input type='text' name='personName' onChange={this.handleChange}/><br/>
          Role<br/>
          <input type='radio' name='personRole' value='team member' onChange={this.handleChange}/>Team Member<br/>
          <input type='radio' name='personRole' value='project lead' onChange={this.handleChange}/>Project Lead<br/>
          <input type='radio' name='personRole' value='manager' onChange={this.handleChange}/>Manager<br/>
          Username<br/>
          <input type='text' name='username' onChange={this.handleChange}/><br/>
          Password<br/>
          <input type='password' name='password' onChange={this.handleChange}/><br/>
          E-mail<br/>
          <input type='text' name='personEmail' onChange={this.handleChange}/><br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
};

/******************** ISSUES ********************/

const IssueSummary = (props) => {
  return (
    <div className='issue' onClick={() => props.onClick('view-issue', props.id)}>
      <h2>{props.relatedProject}</h2>
      <div>{props.issueSummary}</div>
      <div>{props.issueDescription}</div>
      <div>{props.assignedTo}</div>
      <div style={{float: 'left'}}>{props.createdOn}</div>
      <div style={{float: 'right'}}>{props.targetResolutionDate}</div>
    </div>
  );
};

const IssueList = (props) => {

  let issueSummaries = [];
  let relatedProject = props.content[0].relatedProject;

  function preload(elements) {
    elements.forEach(e => {
      issueSummaries.push(
        <IssueSummary
          id={e._links.self.href.match(/\w+$/)}
          key={e.issueSummary + e.createdOn + 'key'} // screen for duplicates before assigning key
          relatedProject={e.relatedProject}
          issueSummary={e.issueSummary}
          issueDescription={e.issueDescription}
          assignedTo={e.assignedTo}
          createdOn={e.createdOn}
          targetResolutionDate={e.targetResolutionDate}
          onClick={props.onClick}/>
        );
    });
  }

  console.log(props);
  console.log(issueSummaries);
  preload(props.content);
  console.log(relatedProject);

  return (
    <div id='issues-list'>
      {issueSummaries}
      <div className='add-new' onClick={() => props.onClick('new-issue', relatedProject)}>+</div>
    </div>
  );
}

const Issue = (props) => {

  console.log(props);
  return (
    <div id='issue'>
      <h2>{props.content.relatedProject}</h2>
      <span>&#10006;</span>
      <span
        className={props.content.assignedTo === null ? 'unassigned' : 'assigned'}
        style={{float: 'right'}}>
        <b>&#9679;</b>
      </span>
      <p><b>{props.content.issueSummary}</b></p>
      <p>{props.content.issueDescription}</p>
      <div>
        <h3>Assigned To</h3>
        {props.content.assignedTo}
      </div>
      <div>{props.content.resolutionSummary === null ? '' : props.resolutionSummary}</div>
      <div>
        <div>
          <h3>Target Resolution Date</h3>
          {props.content.targetResolutionDate}
        </div>
        <div>
          <h3>Actual Resolution Date</h3>
          {props.content.actualResolutionDate === null ? 'unresolved' : props.content.actualResolutionDate}
        </div>
      </div>
      <div>
        <h3>Progress</h3>
        <p>{props.content.progress}</p>
      </div>
      <div>
        <table id='issue-status-table'>
          <tbody>
            <tr>
              <th></th>
              <th className='issue-status-table-header'>Date</th>
              <th className='issue-status-table-header'>Person</th>
            </tr>
            <tr>
              <td className='issue-status-table-header'>Identified</td>
              <td>{props.content.identifiedDate}</td>
              <td>{props.content.identifiedBy}</td>
            </tr>
            <tr>
              <td className='issue-status-table-header'>Created</td>
              <td>{props.content.createdOn}</td>
              <td>{props.content.createdDate}</td>
            </tr>
            <tr>
              <td className='issue-status-table-header'>Last Modified</td>
              <td>{props.content.modifiedOn}</td>
              <td>{props.content.modifiedBy}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type='button' onClick={() => props.onClick('delete-issue', props.content._links.self.href.match(/\w+$/)[0])}>Delete</button>
    </div>
  );
};

//const NewIssue = () => {
//  return <div>This is a NEW issue.</div>;
//};

class NewIssue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      issueSummary: '',
      issueDescription: '',
      identifiedByPersonId: 8,
      identifiedDate: new Date().toISOString().slice(0,10),
      relatedProject: this.props.relatedProject,
      assignedTo: 9,
      status: 'open',
      priority: 'urgent',
      targetResolutionDate: new Date().toISOString().slice(0,10),
      progress: '',
      actualResolutionDate: '',
      resolutionSummary: '',
      createdOn: new Date().toISOString().slice(0,10),
      createdBy: 'Mike Holliday',
      modifiedOn: new Date().toISOString().slice(0,10),
      modifiedBy: 'Mike Holliday',
      validDate: true,
      issues: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // For now need to set a default user for application

  componentDidMount() {
    // Get list of issues. For comparing new submissions with existing to ensure no duplicates.
    fetch('http://localhost:8080/api/issues')
      .then(response => response.json())
      .then(data => {
        this.setState({issues: data._embedded.issues});
        console.log(data._embedded.issues);
      })
  }

  handleChange() {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // Ensures that the target resolution date is not in the past
    if (new Date(this.state.targetResolutionDate) < new Date()) {
      this.setState({validDate: false});
      return;
    }
    else
      this.setState({validDate: true});

    // Alerts user and stops submit if a duplicate issue is submitted
    if (this.state.issues.find(issue =>
      issue.issueSummary === this.state.issueSummary
      && issue.relatedProject === this.state.relatedProject) !== undefined) {
      alert('Duplicate issue. Cannot submit.');
      return;
    }

    console.log(this.state);

    fetch('http://localhost:8080/api/issues', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(this.state)
    })
      .then(response => {
        console.log(this.props.relatedProject);
        console.log(this.state.relatedProject);
        this.props.onClick('view-issues', this.state.relatedProject);
        alert('Submitted successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('Form submit error', error);
      });
  }

  render() {
    return (
      <div className='new-issue'>
        <form onSubmit={this.handleSubmit}>
          <label>Issue Summary</label><br/>
          <input type='text' name='issueSummary' value={this.state.issueSummary} onChange={this.handleChange}/><br/>
          <label>Issue Description</label><br/>
          <input type='textarea' name='issueDescription' value={this.state.issueDescription} onChange={this.handleChange}/><br/>
          <label>Target Resolution Date</label><br/>
          <input type='date' name='targetResolutionDate' value={this.state.targetResolutionDate} onChange={this.handleChange}/><br/>
          {!this.state.validDate &&
            <p>Target end date must be today or later.</p>
          }
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

const TopBar = (props) => {
  return (
    <div id='top-bar'>
      <span>Welcome {props.name}</span>
      <span id='logout'>Logout</span>
    </div>
  );
};

const SideBar = (props) => {
  return (
    <div id={'sidebar-' + props.toggle} onClick={props.onClickSidebar}>
      <b>...</b><br/>
      <div id='sidebar-text'>
        <a href='javascript:;' id='menu-item-people' className='sidebar-menu'
          onClick={props.onClickMenuItem}>People</a><br/>
        <a href='javascript:;' id='menu-item-projects' className='sidebar-menu'
          onClick={props.onClickMenuItem}>Projects</a>
      </div>
    </div>
  );
};

const SubContent = (props) => {

  var content = '';
  const defaultContent = 'Nothing to see here. Move along.';

  // function onClickCloseButton() {
  //   console.log("clicked");
  //   return <div id='sub-content'>{defaultContent}</div>;
  // }

  switch (props.type) {
    case 'issues':
      content = <IssueList content={props.content} onClick={props.onClick}/>;
      console.log(props);
      break;
    case 'issue':
      content = <Issue content={props.content} onClick={props.onClick}/>;
      console.log(props);
      break;
    case 'project':
      content = <Project content={props.content}/>;
      break;
    case 'person':
      content = <Person content={props.content}/>;
      break;
    case 'new-project':
      content = <NewProject onClick={props.onClick}/>;
      break;
    case 'new-issue':
      content = <NewIssue relatedProject={props.content} onClick={props.onClick}/>;
      break;
    case 'new-person':
      content = <NewPerson onClick={props.onClick}/>;
      break;
    default:
      content = defaultContent;
  }

  return <div id='sub-content'>{content}</div>;
};

const MainContent = (props) => {
  return <SubContent type={props.type} content={props.content} onClick={props.onClick}/>;
};

/******************** LOGIN ********************/

const LoginDialog = (props) => {
  return (
    <div id='login'>
      <form>
        Email:<br/>
        <input type='text'/><br/>
        Password:<br/>
        <input type='text'/><br/>
        <input type='submit' value='Submit'/>
        <input type='button' value='Cancel' onClick={props.onClick}/>
      </form>
    </div>
  );
};

/******************** APP ********************/

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true,
      sidebar: 'closed',
      leftCol: 'projects',
      mainWidth: 'wide',
      contentType: '',
      content: '',
      projects: [],
      people: [],
      issues: [],
      activeProject: ''
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSummaryCol = this.toggleSummaryCol.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/projects')
      .then(response => response.json())
      .then(data => this.setState({projects: data._embedded.projects}));
    fetch('http://localhost:8080/api/people')
      .then(response => response.json())
      .then(data => this.setState({people: data._embedded.people}));
  }

  toggleSidebar() {
    if (this.state.sidebar === 'open') {
      this.setState({sidebar: 'closed'});
      document.getElementById('sidebar-open').setAttribute('id', 'sidebar-closed');
      document.getElementById('main-narrow').setAttribute('id', 'main-wide');
    } else {
      this.setState({sidebar: 'open'});
      document.getElementById('sidebar-closed').setAttribute('id', 'sidebar-open');
      document.getElementById('main-wide').setAttribute('id', 'main-narrow');
    }
  };

  toggleSummaryCol(e) {
    const projectSummaries = document.getElementById('project-summary-list');
    const peopleSummaries = document.getElementById('person-summary-list');
//    const issuesList = document.getElementById('issues-list');
    console.log(e.target);
    console.log(projectSummaries);
    console.log(peopleSummaries);
//    console.log(issuesList);
    if (e.target.id === 'menu-item-people') {
      this.setState({leftCol: 'projects', contentType: ''});
      projectSummaries.style.display = 'none';
      peopleSummaries.style.display = 'initial';
//      issuesList.style.display = 'none';
    } else if (e.target.id === 'menu-item-projects') {
      this.setState({leftCol: 'people', contentType: ''});
      peopleSummaries.style.display = 'none';
      projectSummaries.style.display = 'initial';
//      issuesList.style.display = 'initial';
    }
  }

  handleClick(itemKey, id) {
    const issuesList = document.getElementById('issues-list');

    if (itemKey.includes('view-project')) {
      let projectName = itemKey.match(/[A-Za-z0-9_ ]+(?=view-project)/)[0];
      const project = (name) => this.state.projects.find(p => p.projectName === name);
      if (project(projectName) === undefined) {
        fetch("http://localhost:8080/api/projects")
          .then(response => response.json())
          .then(data => {
            this.setState({projects: data._embedded.projects});
            this.setState({
              contentType: 'project',
              content: project(projectName)
            });
          });
      }
      else {
        this.setState({contentType: 'project', content: project(projectName)});
      }
    }
    else if (itemKey.includes('view-issues')) {
      fetch('http://localhost:8080/api/issues/search/findByRelatedProject?projectId=' + id)
        .then(response => response.json())
        .then(data => {
          data = data._embedded.issues;
          console.log(data);
          if (data.length === 0)
            this.setState({
              contentType: '',
              content: ''
            });
          else {
            this.setState({
              contentType: 'issues',
              content: data,
              activeProject: data[0].relatedProject
            });
            console.log(this.state);
          }
        });
    }
    else if (itemKey === 'view-issue') {
      fetch('http://localhost:8080/api/issues/' + id)
        .then(response => response.json())
        .then(data => {
          this.setState({
            contentType: 'issue',
            content: data
          });
        });
    }
    else if (itemKey === 'delete-issue') {
      fetch('http://localhost:8080/api/issues/' + id, {
        method: 'DELETE',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(this.state)
      })
      .then(response => {
        fetch('http://localhost:8080/api/issues/search/findByRelatedProject?projectId=' + this.state.activeProject)
          .then(response => response.json())
          .then(data => {
            data = data._embedded.issues;
            this.setState({
              contentType: 'issues',
              content: data
            });
          });
        alert('Issue Deleted.');
      })
      .catch(error => alert(error));
    }
    else if (itemKey === 'new-project') {
      this.setState({contentType: itemKey});
    }
    else if (itemKey === 'new-issue') {
      this.setState({
        contentType: itemKey,
        content: id
      });
    }
    else if (itemKey === 'view-person') {
      // If a name is returned. Should only be after a new person is added.
      if (id.match(/[A-Za-z]+/g) !== null) {
        let name = id.trim().replace(/ /g, '%20'); // Replaces spaces in employee name with "%20" for URL.
        fetch('http://localhost:8080/api/people/search/findByPersonName?name=' + name)
          .then(response => response.json())
          .then(data => {
            this.setState({
              contentType: 'person',
              content: data._embedded.people[data._embedded.people.length - 1] // In case of duplicate names, gets newest.
            });
          })
          .catch(e => console.error(e));

        // Refreshes the list of employees.
        fetch('http://localhost:8080/api/people')
          .then(response => response.json())
          .then(data => {
            this.setState({people: data._embedded.people});
          })
          .catch(error => console.error(error));
        return;
      }

      // Displays the employee whose name is clicked from the list of employees.
      fetch('http://localhost:8080/api/people/' + id)
        .then(response => response.json())
        .then(data => {
          this.setState({
            contentType: 'person',
            content: data
          });
        })
        .catch(e => console.error(e));
    }
    else if (itemKey === 'new-person') {
      this.setState({contentType: itemKey});
    }
    console.log('\'' + itemKey + '\' clicked');
  }

  logIn() {
    this.setState({isLoggedIn: true});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn) {
      return (
          <div>
            <SideBar
              onClickSidebar={this.toggleSidebar} toggle={this.state.sidebar}
              onClickMenuItem={this.toggleSummaryCol}/>
            <div id={'main-' + this.state.mainWidth}>
              <TopBar/>
              <div id='main-content'>
                <ProjectSummaryList projects={this.state.projects} onClick={this.handleClick}/>
                <PersonSummaryList people={this.state.people} onClick={this.handleClick}/>
                <MainContent type={this.state.contentType} content={this.state.content} onClick={this.handleClick}/>
              </div>
            </div>
          </div>
      );
    }
    else {
      return <LoginDialog onClick={this.logIn}/>;
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));