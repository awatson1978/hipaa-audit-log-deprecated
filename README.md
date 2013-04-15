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
### Data/Document Model

Second, add the audioSoundsTemplate to your application, which adds all the necessary audio objects to the DOM.  

````
    {{> audioSoundsTemplate }}
````

------------------------
### Controllers

Third, add the following line to any event you want to play a click. 
````
    document.getElementById('clickAudioClip').play();  
````


For instance, you might have a reactive template wired up like this:

````js
    Template.sampleListItem.events({  
        'click': function(evt){  
            document.getElementById('clickAudioClip').play();  
            // do something fancy when clicked...
        }  
    });  
````
