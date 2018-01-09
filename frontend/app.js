var plugin = {};
var bodyParser = require('body-parser');

const githubWebhookPath = '/github';
const pluginConfigNamespace = "githubAnalytics";
var GithubWebHook = require('express-github-webhook');
var moment = require('moment');

var rp = require('request-promise-native');

function preparePostForCommitComments(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: data.comment.user.id,
      user_details: {
        username: data.comment.user.login,
        picture: data.comment.user.avatar_url,
        custom: data.comment.user
      },
      events: [
        {
          key: "commit_comment",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "commit_comment",
            repository: repo,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };
}

function preparePostForCreate(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "create",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "create",
            ref_type: data.ref_type,
            repository: repo,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForDelete(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "delete",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "delete",
            ref_type: data.ref_type,
            repository: repo,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForFork(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "fork",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "fork",
            repository: repo,
            fork_owner_type: data.forkee.owner.type,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForIssues(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "issues",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "issues",
            action: data.action,
            state: data.state,
            repository: repo,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForIssueComments(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "issue_comment",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "issue_comment",
            action: data.action,
            repository: repo,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForLabel(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "label",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "label",
            action: data.action,
            repository: repo,
            name: data.label.name,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForPullRequest(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "pull_request",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "pull_request",
            repository: repo,
            action: data.action,
            state: data.pull_request.state,
            merged: data.pull_request.merged,
            mergeable: data.pull_request.mergeable,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForPullRequestReview(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "pull_request_review",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "pull_request_review",
            repository: repo,
            action: data.action,
            state: data.review.state,
            pull_request: data.pull_request.url,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForPullRequestReviewComment(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "pull_request_review_comment",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "pull_request_review_comment",
            repository: repo,
            action: data.action,
            pull_request: data.pull_request.url,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForPush(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "push",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "push",
            ref: data.ref,
            repository: repo,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function preparePostForWatch(app_key, repo, data) {
  return {
    body: {
      app_key: app_key,
      device_id: ""+data.sender.id,
      user_details: {
        username: data.sender.login,
        picture: data.sender.avatar_url,
        custom: data.sender
      },
      events: [
        {
          key: "watch",
          count: 1,
          timestamp: moment().format(),
          segmentation: {
            // event_type: "watch",
            repository: repo,
            event_payload: data
          }
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };

}

function createCustomEventInBackend(options) {

  // add backend location to options
  options["method"] = "POST";
  options["uri"] = "http://localhost/i";

  rp(options)
    .then(function (parsedBody) {
      console.log("successfully pushed custom event", parsedBody)
    })
    .catch(function (err) {
      console.log("custom event push failed", err)
    });
}

(function (plugin) {

  plugin.skipCSRF = function(ob){
    return ob.req.path === githubWebhookPath;
  };

  plugin.init = function(app, countlyDb, express){

    var plugins = require('../../pluginManager.js');
    var options = { path: githubWebhookPath };

    plugins.loadConfigs(countlyDb, function(){
      options['secret'] = plugins.getConfig(pluginConfigNamespace).github_secret;

        // got secret, let's move on
        var webhookHandler = GithubWebHook(options);

        // use in your express app
        app.use(bodyParser.json()); // must use bodyParser in express
        app.use(webhookHandler); // use our middleware

        webhookHandler.on('commit_comment', function (repo, data) {
          console.log("GH commit_comment event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;
          console.log("app key: " + app_key);

          var options = preparePostForCommitComments(app_key, repo, data);


          createCustomEventInBackend(options);

        });

        webhookHandler.on('create', function (repo, data) {
          console.log("GH create event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForCreate(app_key, repo, data);


          createCustomEventInBackend(options);

        });

        webhookHandler.on('delete', function (repo, data) {
          console.log("GH delete event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForDelete(app_key, repo, data);


          createCustomEventInBackend(options);

        });

        webhookHandler.on('fork', function (repo, data) {
          console.log("GH fork event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForFork(app_key, repo, data);


          createCustomEventInBackend(options);

        });

        webhookHandler.on('issues', function (repo, data) {
          console.log("GH issues event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForIssues(app_key, repo, data);


          createCustomEventInBackend(options);

        });

        webhookHandler.on('issue_comment', function (repo, data) {
          console.log("GH issue_comment event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForIssueComments(app_key, repo, data);

          createCustomEventInBackend(options);

        });

        webhookHandler.on('label', function (repo, data) {
          console.log("GH label event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForLabel(app_key, repo, data);

          createCustomEventInBackend(options);

        });

        webhookHandler.on('pull_request', function (repo, data) {
          console.log("GH pull_request event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForPullRequest(app_key, repo, data);

          createCustomEventInBackend(options);

        });

        webhookHandler.on('pull_request_review', function (repo, data) {
          console.log("GH pull_request_review event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForPullRequestReview(app_key, repo, data);

          createCustomEventInBackend(options);

        });

        webhookHandler.on('pull_request_review_comment', function (repo, data) {
          console.log("GH pull_request_review_comment event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForPullRequestReviewComment(app_key, repo, data);

          createCustomEventInBackend(options);

        });

        webhookHandler.on('push', function (repo, data) {
          console.log("GH push event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForPush(app_key, repo, data);

          createCustomEventInBackend(options);

        });

        webhookHandler.on('watch', function (repo, data) {
          console.log("GH watch event for " + repo);

          var app_key = plugins.getConfig(pluginConfigNamespace).app_key ;

          var options = preparePostForWatch(app_key, repo, data);

          createCustomEventInBackend(options);

        });

        webhookHandler.on('error', function (err, req, res) {
          console.log("error" + err)
        });

    });


  };
}(plugin));



module.exports = plugin;