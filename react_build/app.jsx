class IssueAdd extends React.Component{
    render(){
        return (
            <h1>This is IssueAdd</h1>
        );
    }
}

//Demo server data
const data = [
    {
    id: 1, status: 'Open', owner: 'Ravan',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add',
    },
    {
    id: 2, status: 'Assigned', owner: 'Eddie',
    created: new Date('2016-08-16'), effort: 14, 
   completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
    }
];




class IssueFilter extends React.Component{
    render(){
        return (
            <h1>This is IssueFilter</h1>
        );
    }
}



class IssueRow extends React.Component {
    render() {
    const borderedStyle = {border: "1px solid silver"};
    const issue = this.props.issue;  //getting data from Table
    return (
        <tr id="issueRows"  >
            <td style={borderedStyle}>{issue.id}</td>
            <td style={borderedStyle}>{issue.status}</td>
            <td style={borderedStyle}>{issue.owner}</td>
            <td style={borderedStyle}>{issue.created.toDateString()}</td>
            <td style={borderedStyle}>{issue.effort}</td>
            <td style={borderedStyle}>{issue.completionDate ?   issue.completionDate.toDateString() : ''}</td>
            <td style={borderedStyle}>{issue.title}</td>
        </tr>
    )
    }
}


class IssueTable extends React.Component{
    render(){
               
        const issueRowList = this.props.issues.map(issue =>  { 
           return  <IssueRow key={issue.id} issue = {issue}/>  }
             );
        
        


        //local  CSS styles
        const borderedStyle = {border: "1px solid silver", padding: 6};
        return (
            <table id="issueTable" style={{borderCollapse: "collapse"}}>
                <thead>
                  <tr>
                    <th style={borderedStyle}>ID</th>
                    <th style={borderedStyle} >Status</th>
                    <th style={borderedStyle} >Owner</th>
                    <th style={borderedStyle} >Created</th>
                    <th style={borderedStyle} >Efforts</th>
                    <th style={borderedStyle} >Completion Date</th>
                    <th style={borderedStyle} >Title</th>
                  </tr>  
                </thead>

                <tbody>
                    {issueRowList}
                </tbody>
            </table>
        );
    }
}




class IssueTracker extends React.Component{
   constructor(){
       super();
       this.state = {issues : data};

       setTimeout( this.createTestIssue.bind(this),2000);
   } 
   
   
   
   createIssue(newIssue){
       let tempIssueList = this.state.issues.slice();
       newIssue.id = this.state.issues.length +1 ;
       tempIssueList.push(newIssue);
       this.setState({ issues  : tempIssueList });
   }

   createTestIssue(){
       this.createIssue({
        status: 'New', owner: 'Pieta', created: new Date(),
        title: 'Completion date should be optional',
        });
   }

   render(){
       return (
           <div>
               <h1>Issue Tracker</h1>
               <hr/>
               <IssueAdd/>
               <IssueFilter/>
               <IssueTable issues = {this.state.issues} />
           </div>
       );
   }
}




let root = document.getElementById("root");
ReactDOM.render(<IssueTracker/> , root);