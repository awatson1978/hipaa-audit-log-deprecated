Hipaa =  new Meteor.Collection("hipaa");
Hipaa.allow({
    insert: function(){
        return true;
    },
    update: function () {
        return false;
    },
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

if (Meteor.isServer) {
    Meteor.publish('hipaa', function () {
        return Hipaa.find();
    });
}


