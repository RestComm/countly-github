var request = require('supertest');
var should = require('should');
var testUtils = require("../../test/testUtils");
request = request(testUtils.url);

var APP_KEY = "";
var API_KEY_ADMIN = "";
var APP_ID = "";
var DEVICE_ID = "1234567890";

describe('Testing GitHub Analytics', function(){
	function githubWebhookCreateEventBody() {
   return '{\n' +
     '  "ref": "RESTCOMM-1384",\n' +
     '  "ref_type": "branch",\n' +
     '  "master_branch": "master",\n' +
     '  "description": "The Open Source Cloud Communications Platform",\n' +
     '  "pusher_type": "user",\n' +
     '  "repository": {\n' +
     '    "id": 5455458,\n' +
     '    "name": "Restcomm-Connect",\n' +
     '    "full_name": "RestComm/Restcomm-Connect",\n' +
     '    "owner": {\n' +
     '      "login": "RestComm",\n' +
     '      "id": 667380,\n' +
     '      "avatar_url": "https://avatars3.githubusercontent.com/u/667380?v=4",\n' +
     '      "gravatar_id": "",\n' +
     '      "url": "https://api.github.com/users/RestComm",\n' +
     '      "html_url": "https://github.com/RestComm",\n' +
     '      "followers_url": "https://api.github.com/users/RestComm/followers",\n' +
     '      "following_url": "https://api.github.com/users/RestComm/following{/other_user}",\n' +
     '      "gists_url": "https://api.github.com/users/RestComm/gists{/gist_id}",\n' +
     '      "starred_url": "https://api.github.com/users/RestComm/starred{/owner}{/repo}",\n' +
     '      "subscriptions_url": "https://api.github.com/users/RestComm/subscriptions",\n' +
     '      "organizations_url": "https://api.github.com/users/RestComm/orgs",\n' +
     '      "repos_url": "https://api.github.com/users/RestComm/repos",\n' +
     '      "events_url": "https://api.github.com/users/RestComm/events{/privacy}",\n' +
     '      "received_events_url": "https://api.github.com/users/RestComm/received_events",\n' +
     '      "type": "Organization",\n' +
     '      "site_admin": false\n' +
     '    },\n' +
     '    "private": false,\n' +
     '    "html_url": "https://github.com/RestComm/Restcomm-Connect",\n' +
     '    "description": "The Open Source Cloud Communications Platform",\n' +
     '    "fork": false,\n' +
     '    "url": "https://api.github.com/repos/RestComm/Restcomm-Connect",\n' +
     '    "forks_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/forks",\n' +
     '    "keys_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/keys{/key_id}",\n' +
     '    "collaborators_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/collaborators{/collaborator}",\n' +
     '    "teams_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/teams",\n' +
     '    "hooks_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/hooks",\n' +
     '    "issue_events_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/issues/events{/number}",\n' +
     '    "events_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/events",\n' +
     '    "assignees_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/assignees{/user}",\n' +
     '    "branches_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/branches{/branch}",\n' +
     '    "tags_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/tags",\n' +
     '    "blobs_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/git/blobs{/sha}",\n' +
     '    "git_tags_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/git/tags{/sha}",\n' +
     '    "git_refs_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/git/refs{/sha}",\n' +
     '    "trees_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/git/trees{/sha}",\n' +
     '    "statuses_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/statuses/{sha}",\n' +
     '    "languages_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/languages",\n' +
     '    "stargazers_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/stargazers",\n' +
     '    "contributors_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/contributors",\n' +
     '    "subscribers_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/subscribers",\n' +
     '    "subscription_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/subscription",\n' +
     '    "commits_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/commits{/sha}",\n' +
     '    "git_commits_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/git/commits{/sha}",\n' +
     '    "comments_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/comments{/number}",\n' +
     '    "issue_comment_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/issues/comments{/number}",\n' +
     '    "contents_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/contents/{+path}",\n' +
     '    "compare_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/compare/{base}...{head}",\n' +
     '    "merges_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/merges",\n' +
     '    "archive_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/{archive_format}{/ref}",\n' +
     '    "downloads_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/downloads",\n' +
     '    "issues_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/issues{/number}",\n' +
     '    "pulls_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/pulls{/number}",\n' +
     '    "milestones_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/milestones{/number}",\n' +
     '    "notifications_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/notifications{?since,all,participating}",\n' +
     '    "labels_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/labels{/name}",\n' +
     '    "releases_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/releases{/id}",\n' +
     '    "deployments_url": "https://api.github.com/repos/RestComm/Restcomm-Connect/deployments",\n' +
     '    "created_at": "2012-08-17T17:47:44Z",\n' +
     '    "updated_at": "2017-12-27T11:16:18Z",\n' +
     '    "pushed_at": "2018-01-03T08:39:56Z",\n' +
     '    "git_url": "git://github.com/RestComm/Restcomm-Connect.git",\n' +
     '    "ssh_url": "git@github.com:RestComm/Restcomm-Connect.git",\n' +
     '    "clone_url": "https://github.com/RestComm/Restcomm-Connect.git",\n' +
     '    "svn_url": "https://github.com/RestComm/Restcomm-Connect",\n' +
     '    "homepage": "http://www.restcomm.com/",\n' +
     '    "size": 160175,\n' +
     '    "stargazers_count": 168,\n' +
     '    "watchers_count": 168,\n' +
     '    "language": "Java",\n' +
     '    "has_issues": true,\n' +
     '    "has_projects": true,\n' +
     '    "has_downloads": true,\n' +
     '    "has_wiki": true,\n' +
     '    "has_pages": false,\n' +
     '    "forks_count": 172,\n' +
     '    "mirror_url": null,\n' +
     '    "archived": false,\n' +
     '    "open_issues_count": 781,\n' +
     '    "license": null,\n' +
     '    "forks": 172,\n' +
     '    "open_issues": 781,\n' +
     '    "watchers": 168,\n' +
     '    "default_branch": "master"\n' +
     '  },\n' +
     '  "organization": {\n' +
     '    "login": "RestComm",\n' +
     '    "id": 667380,\n' +
     '    "url": "https://api.github.com/orgs/RestComm",\n' +
     '    "repos_url": "https://api.github.com/orgs/RestComm/repos",\n' +
     '    "events_url": "https://api.github.com/orgs/RestComm/events",\n' +
     '    "hooks_url": "https://api.github.com/orgs/RestComm/hooks",\n' +
     '    "issues_url": "https://api.github.com/orgs/RestComm/issues",\n' +
     '    "members_url": "https://api.github.com/orgs/RestComm/members{/member}",\n' +
     '    "public_members_url": "https://api.github.com/orgs/RestComm/public_members{/member}",\n' +
     '    "avatar_url": "https://avatars3.githubusercontent.com/u/667380?v=4",\n' +
     '    "description": "The only open source Full Stack Communications Platform as a Service (cPaaS)."\n' +
     '  },\n' +
     '  "sender": {\n' +
     '    "login": "maria-farooq",\n' +
     '    "id": 17044714,\n' +
     '    "avatar_url": "https://avatars1.githubusercontent.com/u/17044714?v=4",\n' +
     '    "gravatar_id": "",\n' +
     '    "url": "https://api.github.com/users/maria-farooq",\n' +
     '    "html_url": "https://github.com/maria-farooq",\n' +
     '    "followers_url": "https://api.github.com/users/maria-farooq/followers",\n' +
     '    "following_url": "https://api.github.com/users/maria-farooq/following{/other_user}",\n' +
     '    "gists_url": "https://api.github.com/users/maria-farooq/gists{/gist_id}",\n' +
     '    "starred_url": "https://api.github.com/users/maria-farooq/starred{/owner}{/repo}",\n' +
     '    "subscriptions_url": "https://api.github.com/users/maria-farooq/subscriptions",\n' +
     '    "organizations_url": "https://api.github.com/users/maria-farooq/orgs",\n' +
     '    "repos_url": "https://api.github.com/users/maria-farooq/repos",\n' +
     '    "events_url": "https://api.github.com/users/maria-farooq/events{/privacy}",\n' +
     '    "received_events_url": "https://api.github.com/users/maria-farooq/received_events",\n' +
     '    "type": "User",\n' +
     '    "site_admin": false\n' +
     '  }\n' +
     '}';
 }

  describe('Writing Create Branch', function(){
    it('should succeed', function(done){
      API_KEY_ADMIN = testUtils.get("API_KEY_ADMIN");
      APP_ID = testUtils.get("APP_ID");
      APP_KEY = testUtils.get("APP_KEY");
      request
        .post('/github?api_key='+API_KEY_ADMIN)
        .set('content-type', 'application/json')
        .set('X-GitHub-Delivery', 'ad2e0de0-f061-11e7-8c28-5237fc4915a1')
        .set('X-GitHub-Event', 'create')
        .set('X-Hub-Signature', 'sha1=c4d750930ee81c8ed70dc30ad478fb8e9a14277b')
        .send(githubWebhookCreateEventBody())
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          var ob = JSON.parse(res.text);
          ob.should.have.property('success', true);
          setTimeout(done, 100)
        });
    });
  });

  describe('Writing Create Branch with Invalid Signature', function(){
    it('should fail with 400 bad request', function(done){
      API_KEY_ADMIN = testUtils.get("API_KEY_ADMIN");
      APP_ID = testUtils.get("APP_ID");
      APP_KEY = testUtils.get("APP_KEY");
      request
        .post('/github?api_key='+API_KEY_ADMIN)
        .set('content-type', 'application/json')
        .set('X-GitHub-Delivery', 'ad2e0de0-f061-11e7-8c28-5237fc4915a1')
        .set('X-GitHub-Event', 'create')
        .set('X-Hub-Signature', 'sha1=c4d750930ee81c8ed70dc30ad478fb8e9xxxxxxx')
        .send(githubWebhookCreateEventBody())
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          var ob = JSON.parse(res.text);
					ob.should.have.property('error', 'Failed to verify signature');
          setTimeout(done, 100)
        });
    });
  });

  describe('Writing Create Branch with Invalid API Key', function(){
    it('should fail with 401 unauthorized', function(done){
      API_KEY_ADMIN = testUtils.get("API_KEY_ADMIN");
      APP_ID = testUtils.get("APP_ID");
      APP_KEY = testUtils.get("APP_KEY");
      request
        .post('/github?api_key=not_the_correct_key')
        .set('content-type', 'application/json')
        .set('X-GitHub-Delivery', 'ad2e0de0-f061-11e7-8c28-5237fc4915a1')
        .set('X-GitHub-Event', 'create')
				.set('X-Hub-Signature', 'sha1=c4d750930ee81c8ed70dc30ad478fb8e9a14277b')
        .send(githubWebhookCreateEventBody())
        .expect(401)
        .end(function(err, res){
          if (err) return done(err);
          // var ob = JSON.parse(res.text);
          // ob.should.have.property('success', true);
          setTimeout(done, 100)
        });
    });
  });

  describe('Writing Create Branch without API Key', function(){
    it('should fail with bad request', function(done){
      API_KEY_ADMIN = testUtils.get("API_KEY_ADMIN");
      APP_ID = testUtils.get("APP_ID");
      APP_KEY = testUtils.get("APP_KEY");
      request
        .post('/github')
        .set('content-type', 'application/json')
        .set('X-GitHub-Delivery', 'ad2e0de0-f061-11e7-8c28-5237fc4915a1')
        .set('X-GitHub-Event', 'create')
				.set('X-Hub-Signature', 'sha1=c4d750930ee81c8ed70dc30ad478fb8e9a14277b')
        .send(githubWebhookCreateEventBody())
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          // var ob = JSON.parse(res.text);
          // ob.should.have.property('success', true);
          setTimeout(done, 100)
        });
    });
  });

	describe('Writing Create Branch with wrong content-type setting', function(){
   it('should fail with 400 bad request', function(done){
     API_KEY_ADMIN = testUtils.get("API_KEY_ADMIN");
     APP_ID = testUtils.get("APP_ID");
     APP_KEY = testUtils.get("APP_KEY");
     request
       .post('/github?api_key='+API_KEY_ADMIN)
       .set('content-type', 'application/x-www-form-urlencoded')
       .set('X-GitHub-Delivery', 'ad2e0de0-f061-11e7-8c28-5237fc4915a1')
       .set('X-GitHub-Event', 'create')
       .set('X-Hub-Signature', 'sha1=c4d750930ee81c8ed70dc30ad478fb8e9a14277b')
       .send(githubWebhookCreateEventBody())
       .expect(400)
       .end(function(err, res){
         if (err) return done(err);
         var ob = JSON.parse(res.text);
         ob.should.have.property('error', 'Failed to verify signature');
         setTimeout(done, 100)
       });
   });
 });

	describe('Writing Create Branch with missing X-Github-Event header', function(){
   it('should fail with 400 bad request', function(done){
     API_KEY_ADMIN = testUtils.get("API_KEY_ADMIN");
     APP_ID = testUtils.get("APP_ID");
     APP_KEY = testUtils.get("APP_KEY");
     request
       .post('/github?api_key='+API_KEY_ADMIN)
       .set('content-type', 'application/json')
       .set('X-GitHub-Delivery', 'ad2e0de0-f061-11e7-8c28-5237fc4915a1')
       // .set('X-GitHub-Event', 'create') // omitting on purpose
       .set('X-Hub-Signature', 'sha1=c4d750930ee81c8ed70dc30ad478fb8e9a14277b')
       .send(githubWebhookCreateEventBody())
       .expect(400)
       .end(function(err, res){
         if (err) return done(err);
         var ob = JSON.parse(res.text);
         ob.should.have.property('error', 'No events found in the request');
         setTimeout(done, 100)
       });
   });
 });

  describe('reset app', function(){
    it('should reset data', function(done){
      var params = {app_id:APP_ID};
      request
        .get('/i/apps/reset?api_key='+API_KEY_ADMIN+"&args="+JSON.stringify(params))
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          var ob = JSON.parse(res.text);
          setTimeout(done, 5000)
        });
    });
  });
  describe('verify empty browser', function(){
    it('should have no browsers', function(done){
      request
        .get('/o?api_key='+API_KEY_ADMIN+'&app_id='+APP_ID+'&method=browser')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          var ob = JSON.parse(res.text);
          ob.should.be.empty;
          setTimeout(done, 100)
        });
    });
  });

});