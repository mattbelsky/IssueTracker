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
        onClick={() => props.onClick(props.projectName + 'view-project')}>
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
    const projects = this.props.projects.map(p =>
      {
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
      }
    );
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
      targetEndDate: '2025-03-31',
      startDate: new Date(),
      createdOn: new Date(),
      createdBy: 'Mike Holliday'
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
    fetch('http://localhost:8080/api/projects', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(this.state)
    })
      .then(response => {
        console.log(this.state.projectName + 'view-project');
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
          <label>Target End Date</label><br/>
            <input name='targetEndDate' type='date' value={this.state.targetEndDate} onChange={this.handleChange}/><br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
};

/******************** PEOPLE ********************/

const PersonSummary = (props) => {
  return (
    <div className='summary-item-container'>
      <div>{props.personName}</div>
      <div className='person-summary-role'>{props.personRole}</div>
    </div>
  );
};

class PersonSummaryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      people: []
    }
    this.preload = this.preload.bind(this);
  }

  preload() {
    var people = [];
    var makePeople = (personName, personRole) => people.push(
      {
        personName: personName,
        personRole: personRole
      }
    );
    makePeople('Mike Holliday', 'manager');
    makePeople('Max Power', 'team member');
    makePeople('Midge Simpson', 'team member');
    this.setState({people: people});
  }

  componentWillMount() {
    this.preload();
  }

  render() {
    const people = this.state.people.map(p =>
      <PersonSummary
        key={p.personName + 'person-key'} // needs improved but ok for now
        personName={p.personName}
        personRole={p.personRole}/>
    );
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
      <h3>{props.personName}</h3>
      <p>{props.personRole}</p>
      <p>{props.username}</p>
      <p>{props.personEmail}</p>
    </div>
  );
};

const NewPerson = () => {
  return (
    <div className='new-person'>
      <form>
        Name<br/>
        <input type='text' name='name'/><br/>
        Role<br/>
        <input type='radio' name='role' value='team-member' checked/>Team Member<br/>
        <input type='radio' name='role' value='project-lead' checked/>Project Lead<br/>
        <input type='radio' name='role' value='manager' checked/>Manager<br/>
        Username<br/>
        <input type='text' name='username'/><br/>
        E-mail<br/>
        <input type='text' name='email'/><br/>
        <input type='submit' value='Submit'/>
      </form>
    </div>
  );
};

/******************** ISSUES ********************/

const IssueSummary = (props) => {
  return (
    <div className='issue'>
      <h2>{props.relatedProject}</h2>
      <div>{props.issueSummary}</div>
      <div>{props.assignedTo}</div>
      <div style={{float: 'left'}}>{props.createdOn}</div>
      <div style={{float: 'right'}}>{props.targetResolutionDate}</div>
    </div>
  );
};

const IssueList = (props) => {

  let issueSummaries = [];

  function preload(elements) {
    elements.forEach(e => {
      issueSummaries.push(
        <IssueSummary
          key={e.issueSummary + 'key'} // needs improved but ok for now
          relatedProject={e.relatedProject}
          issueSummary={e.issueSummary}
          assignedTo={e.assignedTo}
          createdOn={e.createdOn}
          targetResolutionDate={e.targetResolutionDate} />
        );
    });
  }

  console.log(props.content);
  preload(props.content);

  return (
    <div id='issues-list'>
      {issueSummaries}
      <div className='add-new' onClick={() => props.onClick('new-issue')}>+</div>
    </div>
  );
}

const Issue = (props) => {

  return (
    <div id='issue'>
      <h2>{props.relatedProject}</h2>
      <span>&#10006;</span>
      <span
        className={props.assignedTo === null ? 'unassigned' : 'assigned'}
        style={{float: 'right'}}>
        <b>&#9679;</b>
      </span>
      <p><b>{props.issueSummary}</b></p>
      <p>{props.issueDescription}</p>
      <div>
        <h3>Assigned To</h3>
        {props.assignedTo}
      </div>
      <div>{props.resolutionSummary === null ? '' : props.resolutionSummary}</div>
      <div>
        <div>
          <h3>Target Resolution Date</h3>
          {props.targetResolutionDate}
        </div>
        <div>
          <h3>Actual Resolution Date</h3>
          {props.ActualResolutionDate === null ? 'unresolved' : props.actualResolutionDate}
        </div>
      </div>
      <div>
        <h3>Progress</h3>
        <p>{props.progress}</p>
      </div>
      <div>
        <table id='issue-status-table'>
          <tr>
            <th></th>
            <th className='issue-status-table-header'>Date</th>
            <th className='issue-status-table-header'>Person</th>
          </tr>
          <tr>
            <td className='issue-status-table-header'>Identified</td>
            <td>{props.identifiedDate}</td>
            <td>{props.identifiedBy}</td>
          </tr>
          <tr>
            <td className='issue-status-table-header'>Created</td>
            <td>{props.createdOn}</td>
            <td>{props.createdDate}</td>
          </tr>
          <tr>
            <td className='issue-status-table-header'>Last Modified</td>
            <td>{props.modifiedOn}</td>
            <td>{props.modifiedBy}</td>
          </tr>
        </table>
      </div>
      <button type='button'>Delete</button>
    </div>
  );
};

const NewIssue = () => {
  return <div>This is a NEW issue.</div>;
};

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
      content = <IssueList content={props.content}/>;
      console.log(props);
      break;
    case 'project':
      content = <Project content={props.content}/>;
      break;
    case 'new-project':
      content = <NewProject onClick={props.onClick}/>;
      break;
    case 'new-issue':
      content = <NewIssue/>;
      break;
    case 'new-person':
      content = <NewPerson/>;
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
      issues: [],
      activeProject: ''
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSummaryCol = this.toggleSummaryCol.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/projects")
      .then(response => response.json())
      .then(data => this.setState({projects: data._embedded.projects}));
  }

//  componentDidUpdate() {
//    console.log(this.state.projects);
//  }

  toggleSidebar() {
    if (this.sidebar === 'open') {
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
    const issuesList = document.getElementById('issues-list');
    if (e.target.id === 'menu-item-people') {
      this.setState({leftCol: 'projects', contentType: ''});
      projectSummaries.style.display = 'none';
      peopleSummaries.style.display = 'initial';
      issuesList.style.display = 'none';
    } else if (e.target.id === 'menu-item-projects') {
      this.setState({leftCol: 'people', contentType: ''});
      peopleSummaries.style.display = 'none';
      projectSummaries.style.display = 'initial';
      issuesList.style.display = 'initial';
    }
  }

  handleClick(itemKey, id) {
    const issuesList = document.getElementById('issues-list');

    if (itemKey.includes('view-project')) {
      let projectName = itemKey.match(/[A-Za-z0-9_ ]+(?=view-project)/)[0];
      const project = (projectName) => this.state.projects.find(p => p.projectName === projectName);
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
      fetch('http://localhost:8080/api/issues')
        .then(response => response.json())
        .then(data => {
          data = data._embedded.issues.filter(d => d.relatedProject == id);
          this.setState({
            contentType: 'issues',
            content: data
          });
        });
    }
    else if (itemKey === 'new-project') {
      this.setState({contentType: itemKey});
    }
    else if (itemKey === 'new-issue') {
      this.setState({contentType: itemKey});
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
                <PersonSummaryList onClick={this.handleClick}/>
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