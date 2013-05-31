Hipaa =  new Meteor.Collection("hipaa");
Hipaa.allow({
    insert: function(){
        return true;
    },
    // once written, people should be able to change the audit log
    update: function () {
        return false;
    },
    // once written, people should be able to change the audit log
    remove: function(){
        return false;
    }
});


if (Meteor.isClient) {
    Meteor.subscribe('hipaa');

    Template.hipaaLog.hipaaAudit = function () {
        return Hipaa.find();
    }
    Template.hipaaEntry.entry_timestamp = function(){
        return new Date(this.timestamp).format("yyyy, mmm d, ddd, HH:MM Z");
    }
}

if(Meteor.isServer) {
    Meteor.startup(function () {
        console.log('Meteor.startup...');
        if (Hipaa.find().count() == 0) {
            console.log('No events in hipaa audit log!  Initializing audit log...');

            var eventId = Hipaa.insert({
                owner: 'System',
                loglevel: LogLevel.Hipaa,
                text: "Initializing audit log.",
                timestamp: new Date().getTime()
            });

            console.log(eventId);
        }
    });



    Meteor.publish('hipaa', function () {
        return Hipaa.find();
    });
}


