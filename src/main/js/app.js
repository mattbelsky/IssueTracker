import React from 'react';
import ReactDOM from 'react-dom';

const client = require('./client');

const { useState, useEffect } = React; // necessary in Codepen, otherwise can use import statement

const Project = (props) => {
    const assigned = props.assigned == "true" ? "assigned" : "unassigned";
    return (
        <div class="project">
            <h2>{props.projectName}</h2>
            <div>{props.numIssues} {props.numIssues == 1 ? "issue" : "issues"} pending</div>
            <div class={assigned}>{assigned}</div>
        </div>
    );
};

class ProjectList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
    this.load = this.load.bind(this);
  }

  load() {
    var projects = [];
    var makeProjects = (projectName, numIssues, assigned) => projects.push(
      {
        projectName: projectName,
        numIssues: numIssues,
        assigned: assigned
      }
    );
    makeProjects("Project 1", "4", "false");
    makeProjects("Project 2", "1", "true");
    makeProjects("Project 3", "0", "false");
    makeProjects("Project 4", "7", "false");
    this.setState({projects: projects});
  }

  componentWillMount() {
    this.load();
  }

  render() {
    var projects = this.state.projects.map(p =>
      <Project
        projectName={p.projectName}
        numIssues={p.numIssues}
        assigned={p.assigned} />
    );
    return (
      <div id="project-summary-list" class="left-col">
        {projects}
        <div class="add-new">+</div>
      </div>
    );
  }
};

const PersonSummary = (props) => {
  return (
    <div class="project">
      <span>{props.personName}</span>
      <span class="person-summary-role">{props.personRole}</span>
    </div>
  );
};

const PersonSummaryList = () => {
  var people = [];

  function preload(personName, personRole) {
    people.push(
      <PersonSummary
        key={personName + "key"} // needs improved but ok for now
        personName={personName}
        personRole={personRole} />
    );
  }

  function createPeople() {
    preload("Mike Holliday", "manager");
    preload("Max Power", "team member");
    preload("Midge Simpson", "team member");
  }

  createPeople();
  return (
    <div id="person-summary-list" class="left-col">
      {people}
      <div class="add-new">+</div>
    </div>
  );
}

const Person = (props) => {
  return (
    <div id="person">
      <h3>{props.personName}</h3>
      <p>{props.personRole}</p>
      <p>{props.username}</p>
      <p>{props.personEmail}</p>
    </div>
  );
};

const NewPerson = () => {
  return (
    <div id="new-person">
      <form>
        Name<br/>
        <input type="text" name="name"/><br/>
        Role<br/>
        <input type="radio" name="role" value="team-member" checked/>Team Member<br/>
        <input type="radio" name="role" value="project-lead" checked/>Project Lead<br/>
        <input type="radio" name="role" value="manager" checked/>Manager<br/>
        Username<br/>
        <input type="text" name="username"/><br/>
        E-mail<br/>
        <input type="text" name="email"/><br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

const IssueSummary = (props) => {
  return (
    <div class="issue">
      <h2>{props.relatedProject}</h2>
      <div>{props.issueSummary}</div>
      <div>{props.assignedTo}</div>
      <div style={{float: "left"}}>{props.createdOn}</div>
      <div style={{float: "right"}}>{props.targetResolutionDate}</div>
    </div>
  );
};

const IssueList = (props) => {

  var issueSummaries = [];

  function preload(relatedProject, issueSummary, assignedTo, createdOn, targetResolutionDate) {
    issueSummaries.push(
      <IssueSummary
        key={issueSummary + "key"} // needs improved but ok for now
        relatedProject={relatedProject}
        issueSummary={issueSummary}
        assignedTo={assignedTo}
        createdOn={createdOn}
        targetResolutionDate={targetResolutionDate} />
    );
  }

  function createIssueSummaries() {
    preload("1", "not working", "Marky", "10/01/2019", "12/01/2019");
    preload("2", "not working", "Mikey", "10/02/2019", "12/01/2019");
    preload("3", "no worko", "Jose", "9/15/2019", "11/15/2019");
  }

  createIssueSummaries();
  return (
    <div id="issues-list">
      {issueSummaries}
      <div class="add-new">+</div>
    </div>
  );
}

const Issue = (props) => {

  return (
    <div id="issue">
      <h2>{props.relatedProject}</h2>
      <span>&#10006;</span>
      <span
        class={props.assignedTo === null ? "unassigned" : "assigned"}
        style={{float: "right"}}>
        <b>&#9679;</b>
      </span>
      <p><b>{props.issueSummary}</b></p>
      <p>{props.issueDescription}</p>
      <div>
        <h3>Assigned To</h3>
        {props.assignedTo}
      </div>
      <div>{props.resolutionSummary === null ? "" : props.resolutionSummary}</div>
      <div>
        <div>
          <h3>Target Resolution Date</h3>
          {props.targetResolutionDate}
        </div>
        <div>
          <h3>Actual Resolution Date</h3>
          {props.ActualResolutionDate === null ? "unresolved" : props.actualResolutionDate}
        </div>
      </div>
      <div>
        <h3>Progress</h3>
        <p>{props.progress}</p>
      </div>
      <div>
        <table id="issue-status-table">
          <tr>
            <th></th>
            <th class="issue-status-table-header">Date</th>
            <th class="issue-status-table-header">Person</th>
          </tr>
          <tr>
            <td class="issue-status-table-header">Identified</td>
            <td>{props.identifiedDate}</td>
            <td>{props.identifiedBy}</td>
          </tr>
          <tr>
            <td class="issue-status-table-header">Created</td>
            <td>{props.createdOn}</td>
            <td>{props.createdDate}</td>
          </tr>
          <tr>
            <td class="issue-status-table-header">Last Modified</td>
            <td>{props.modifiedOn}</td>
            <td>{props.modifiedBy}</td>
          </tr>
        </table>
      </div>
      <button type="button">Delete</button>
    </div>
  );
};

const LoginDialog = () => {
  return (
    <div id="login">
      <form>
        Email:<br/>
        <input type="text"/><br/>
        Password:<br/>
        <input type="text"/><br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

const TopBar = (props) => {
  return (
    <div id="top-bar">
      <span>Welcome {props.name}</span>
      <span id="logout">Logout</span>
    </div>
  );
};

const SideBar = (props) => {
  return (
    <div id={"sidebar-" + props.toggle} onClick={props.onClickSidebar}>
      <b>></b><br/>
      <div id="sidebar-text">
        <a href="javascript:;" id="menu-item-people" class="sidebar-menu"
          onClick={props.onClickPeople}>People</a><br/>
        <a href="" id="menu-item-projects" class="sidebar-menu">Projects</a>
      </div>
    </div>
  );
};

const App = () => {

  const [sidebar, setSidebar] = useState("closed");
  const [leftCol, setLeftCol] = useState("projects");
  const [mainWidth, setMainWidth] = useState("wide");

  function toggleSidebar() {
    if (sidebar === "open") {
      setSidebar("closed");
      document.getElementById("sidebar-open").setAttribute("id", "sidebar-closed");
      document.getElementById("main-narrow").setAttribute("id", "main-wide");
    } else {
      setSidebar("open");
      document.getElementById("sidebar-closed").setAttribute("id", "sidebar-open");
      document.getElementById("main-wide").setAttribute("id", "main-narrow");
    }
  };

  function toggleLeftCol(e) {
    const projectSummaries = document.getElementById("project-summary-list");
    const peopleSummaries = document.getElementById("person-summary-list");
    const issuesList = document.getElementById("issues-list");
    if (e.target.id === "menu-item-people") {
      setLeftCol("projects");
      projectSummaries.style.display = "none";
      peopleSummaries.style.display = "initial";
      issuesList.style.display = "none";
    } else if (e.target.id === "menu-item-projects") {
      setLeftCol("people");
      peopleSummaries.style.display = "none";
      projectSummaries.style.display = "initial";
      issuesList.style.display = "initial";
    }
  }

  return (
    <div>
      <SideBar
        onClickSidebar={() => toggleSidebar()} toggle={sidebar}
        onClickPeople={(e) => toggleLeftCol(e)}/>
      <div id={"main-" + mainWidth}>
        <TopBar/>
        <div id="content">
          <ProjectList/>
          <PersonSummaryList/>
          <IssueList/>
        </div>
      </div>
    </div>
    // <LoginDialog/>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));

