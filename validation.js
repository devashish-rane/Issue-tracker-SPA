// for validating the form data
const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
};

const issueFieldType = {
    id: 'required',
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
};

function validateIssue(issue) {
    for (const field in issueFieldType) {
        //check extra field and delete it
        const type = issueFieldType[field];
        if (!type) {
            delete issue[field];
        //if required unavailable then throw error
        } else if (type === 'required' && !issue[field]) {
            return `${field} is required.`;
        }
        }
     
        //if issue isn't valid throw error
    if (!validIssueStatus[issue.status])
        return `${issue.status} is not a valid status.`;

    return null;  //if all correct return null
    }


    exports.validateIssue = validateIssue;