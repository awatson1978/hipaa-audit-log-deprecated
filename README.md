Meteor package that provides HIPAA logging and audit features for Meteor Apps.

------------------------
### **NOTE:  This package is pre-release!  Totally alpha; subject to change; etc.**

You've stumbled upon one of my projects before I've published it.  Use at your own risk.  


------------------------
### Installation

Once released on Atmosphere, one would install the hipaa-audit-log package from the command line, like so:

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
### Controllers - Logging Clinically Significant Events

Next, you'll want to actually log a clinically significant privacy event.  The basic syntax looks something like this:

````javascript
log_hipaa_event(log_message, log_level, owner);
````

And which gets implemented in calls like the following, in practice:

````javascript
log_hipaa_event("Permission granted to view " + Meteor.user().profile.name, LogLevel.Hipaa, Meteor.userId());
````


In a more realistic situation, HIPAA events will occur as parts of specific functions, usually related to adding or removing specific values to the databaes.  As an example, here is a function from a symptom tracking application, which is equivalent to 'deleting a friend'.  In this case, a user in the database is being removed from a profile's list of approached collaborators.   Note the use of hte log_hipaa_event in the callback to the database updates.  

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

Also, you'll need to decide if you're going to implement event symmetry between the participants.  You should implement symmetry by default, and be careful about asymmetrical auditing configurations.
