Package.describe({
  summary: "hipaa-audit-log provides logging and auditing features for clinically significant events related to user account usage."
});

Package.on_use(function (api) {
    api.use('templating', 'client');
    api.add_files('hipaa.audit.html', "client");
    api.add_files('hipaa.audit.js', ["client","server"]);

    // the server needs to log HIPAA events also!
    api.add_files('hipaa.logging.js', ["client","server"]);
});
