Meteor package that provides HIPAA logging and audit features for Meteor Apps.

------------------------
### **NOTE:  This package is pre-release!  Totally alpha; subject to change; etc.**

You've stumbled upon one of my projects before I've published it.  Use at your own risk.  


------------------------
### Installation

First, install the hipaa-audit-log package from the command line, like so:

````
mrt add hipaa-audit-log
````


------------------------
### Data Model

At installation, a Mongo collection is created named 'Hipaa', which users can find and insert into, but cannot update or remove.  This makes it an audit log that people can refer to later to find out what clinically relevant privacy events have occurred.

------------------------
### Document Object Model

You'll want to add the hipaaLog template to your application somewhere, which will display the Hipaa Audit Log.

````html
<div>
  {{> hipaaLog }}
</div>
````

------------------------
### Controllers - Logging to the HIPAA Audit Log

Next, you'll want to actually log a clinically significant privacy event.  The basic syntax looks something like this:
````javascript
log_hipaa_event("Permission granted to view " + Meteor.user().profile.name, LogLevel.Hipaa, this._id);
````


For instance, you might have a reactive template wired up like this:

````js
Template.userCardTemplate.events({
  'click .carewatch-data .destroy': function (evt, tmpl) {
      if(confirm("Are you sure you want to remove " + this.name + " from your carewatch list?")){
          Meteor.users.update(this._id, {$pull: { 'profile.collaborators': {
              _id: Meteor.user()._id,
              name: Meteor.user().profile.name
          } }},function(){
              log_hipaa_event(Meteor.user().profile.name + " left your collaboration group.", LogLevel.Hipaa, this._id);
          });
          Meteor.users.update(Meteor.userId(), {$pull: { 'profile.carewatch': this }}, function(){
              log_hipaa_event("You stopped following " + Meteor.user().profile.name, LogLevel.Hipaa, Meteor.userId());          
          });
      }
  }
});
````
