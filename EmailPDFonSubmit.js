// SSG Joseph Dunn PDF Lead Report
// This script creates an emailed PDF document upon submission of answers from a form to spreadsheet
// Create your form, spreadsheet, and doc template
// Get template from Google Docs and name it
var docTemplate = "1_OIkWcyIgVAnEoclnaYsqGT05JcGv6P-mIyxbRdfpsI"; // *** replace with your google doc template ID ***
var docName = "Letter";

// When Form Gets submitted
function onFormSubmit(e) {
//Get information from form and set as variables
var email_address = "joseph.dunn@thtbc.com"; 
var tstamp = e.values[0];
var name = e.values[1];
var phone = e.values[2];
var email = e.values[3];
var il = e.values[4];
var interests = e.values[5];

// Get document template, copy it as a new temp doc, and save the Doc’s id
var copyId = DriveApp.getFileById(docTemplate)
.makeCopy(docName+' for '+name)
.getId();
// Open the temporary document
var copyDoc = DocumentApp.openById(copyId);
// Get the document’s body section
var copyBody = copyDoc.getActiveSection();

// Replace place holder keys,in our google doc template
copyBody.replaceText('keyTime_Stamp', tstamp);
copyBody.replaceText('keyName', name);
copyBody.replaceText('keyPhone_Number', phone);
copyBody.replaceText('keyEmail', email);
copyBody.replaceText('keyInterest_Level', il);
copyBody.replaceText('keyInterests', interests);

// Save and close the temporary document
copyDoc.saveAndClose();

// Convert temporary document to PDF
var pdf = DriveApp.getFileById(copyId).getAs("application/pdf");

// Attach PDF and send the email
var subject = "Lead Contact Report (PDF)";
var body = "Here is the Lead form for " + name + "";
MailApp.sendEmail(email_address, subject, body, {htmlBody: body, attachments: pdf});

// Delete temp file
DriveApp.getFileById(copyId).setTrashed(true);
}
