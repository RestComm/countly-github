var plugin = {},
  common = require('../../../api/utils/common.js'),
  log = common.log('github:api'),
  plugins = require('../../pluginManager.js');

const pluginConfigNamespace = "githubAnalytics";

// Some default values. Please replace in `Configurations` section with your values.
plugins.setConfigs(pluginConfigNamespace, {
  app_key: "4db53e3ad67d20264d6c95f50289ff39e2dbd584",
  github_secret: "12345"
});

(function (plugin) {


  //handling custom path
  plugins.register("/i/github", function(ob){

    // console.log("ORIGINAL BODY: ", ob.params.req.body);

    //get parameters
    var params = ob.params; //request params
    var validate = ob.validateUserForDataWriteAPI; //user validation

    res.writeHead(200, {'content-type': 'application/json'});
    res.end('{"ok":true}');

    //need to return true, so core does not respond that path does not exist
    return true;

  });
}(plugin));

module.exports = plugin;
