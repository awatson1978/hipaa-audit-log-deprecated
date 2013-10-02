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
log_hipaa_event(log_message, log_level, ownerId);
````

And which gets implemented in calls like the following, in practice:

````javascript
log_hipaa_event("Permission granted to view " + Meteor.user().profile.name, LogLevel.Hipaa, Meteor.userId());
````


In a more realistic situation, HIPAA events will occur as parts of specific functions, usually related to adding or removing specific values to the databaes.  As an example (from a symptom tracking application), here is a function which is equivalent to 'deleting a friend'.  In this case, a user in the database is being removed from a profile's list of approached collaborators.   Note the use of hte log_hipaa_event in the callback functions to the database update functions.  

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

Also, you'll need to decide if you're going to implement hipaa logging symmetrically or allow assymetrical logging.  Best practice is probably to just go ahead and implement symmetry by default, logging two events (one for each party). 

------------------------
### HIPAA Compliant Applications

Meteor comes very close to being HIPAA compliant out-of-the-box.  The general principle of HIPAA is to protect patient privacy.  But what does that mean?  Well, each patient is an individual, and privacy implies that personal details aren't shared indiscriminately or in ways that interlocutors may become privy to. 

In practice, HIPAA compliancy boils down to three things:  individual user accounts, encrypted transmission of data, and audit logs.  It turns out that Meteor provides two of those features out-of-the-box, with the accounts-ui and force-ssl packages.  

So, putting everything together, and it appears that a recipe for a HIPAA compliant Meteor application would look something like this:

````
meteor add accounts-ui
meteor add force-ssl
mrt add hipaa-audit-log
````

------------------------
### License

MIT License. Use as you wish, including for commercial purposes.  
See license.mit.txt for full details.  


------------------------
### Support
Found this package to be useful?  Consider tipping the package maintainer for their time!  

[![Support via Gittip](https://raw.github.com/gittip/www.gittip.com/master/www/assets/gittip.png)](https://www.gittip.com/awatson1978/)  








