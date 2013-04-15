Hipaa =  new Meteor.Collection("hipaa");
Hipaa.allow({
    insert: function(){
        return true;
    },
    update: function () {
        return true;
    },
    remove: function(){
        return true;
    }
});


if (Meteor.isClient) {
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


