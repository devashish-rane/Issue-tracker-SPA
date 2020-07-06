class IssueAdd extends React.Component{
    constructor(){
        super();
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerSubmit(e){
        e.preventDefault();
        let form = document.forms.issueAdd; //name same  as component's form 
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date(),
            });
            console.log("created");
            
            //after adding the values clear the form for next input
            form.owner.value = ""; form.title.value = "";
    }

    render(){
        return (
            <div>
                <form name="issueAdd" onSubmit={this.handlerSubmit} method="post" >
                    <input className="input" type="text" name="owner" placeholder="Owner" />
                    <input className    ="input" type="text" name="title" placeholder="Title" />
                    <button>Add Issue </button>
                </form>    
            </div>
        );
    }
}





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
       this.state = {issues : []};
       
    //    this.createTestIssue=this.createTestIssue.bind(this)
    //    setTimeout( this.createTestIssue,2000);

       //for transfering the method to child it must be bind to origin class
       this.createIssue=this.createIssue.bind(this);
   
   } 
   
   componentDidMount(){
       this.loadData();  
   }
   
   loadData() {
    //    tried to model server data
    // setTimeout(() => {
    // this.setState({ issues: data });
    // }, 500);
      fetch("/issues").then(response=>{
          return response.json();
      }).then(data=>{
        console.log("Total count of records:", data._metadata.total_issues);
        //NOTE : my process all entries of data using 
        //forEach or map callback
                                        //if not included cause toDateString function N.D error due to
                                        //dates being undefined
                                        data.clientDataFeed.forEach(issue => {
                                        issue.created = new Date(issue.created);
                                        if (issue.completionDate)
                                        issue.completionDate = new Date(issue.completionDate);
                                        });
        this.setState({issues : data.clientDataFeed});
      }).catch(err=>{
        console.log(err);
      });   
    }
   
   createIssue(newIssue){
    //    let tempIssueList = this.state.issues.slice();
    //    newIssue.id = this.state.issues.length +1 ;
    //    tempIssueList.push(newIssue);
    //    this.setState({ issues  : tempIssueList });
    fetch('/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssue),
        }).then(response => {
            if(response.ok) {
                            response.json()
                            .then(updatedIssue=>{
                                updatedIssue.created = new Date(updatedIssue.created);
                                if (updatedIssue.completionDate)
                                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                                const newIssues = this.state.issues.concat(updatedIssue); //concat combine two opeations slice and push
                                this.setState({ issues: newIssues });
                                 }); //updateIssue closed
            }  
            else{
                response.json().then(error => {
                    alert("Failed to add issue: " + error.message)
                    });
            } 
                                                 
        }).catch(err => {
            alert("Error in sending data to server: " + err.message);
        });
   }

//    createTestIssue(){
//        this.createIssue({
//         status: 'New', owner: 'Pieta', created: new Date(),
//         title: 'Completion date should be optional',
//         });
//    }

   render(){
       return (
           <div>
               <h1>Issue Tracker</h1>
               <hr/>
               <IssueAdd createIssue={this.createIssue} />
               {/* <button onClick={this.createTestIssue}>Add Issue</button> */}
               <IssueFilter/>
               <IssueTable issues = {this.state.issues} />
           </div>
       );
   }
}




let root = document.getElementById("root");
ReactDOM.render(<IssueTracker/> , root);


// //Demo server data
// const data = [
//     {
//     id: 1, status: 'Open', owner: 'Ravan',
//     created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
//     title: 'Error in console when clicking Add',
//     },
//     {
//     id: 2, status: 'Assigned', owner: 'Eddie',
//     created: new Date('2016-08-16'), effort: 14, 
//    completionDate: new Date('2016-08-30'),
//     title: 'Missing bottom border on panel',
//     }
// ];
