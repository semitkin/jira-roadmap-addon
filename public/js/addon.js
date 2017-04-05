/* add-on script */
// MyAddon functionality
$(function() {
 // Call REST API via the iframe
 // Bridge functionality
 // JiraActivity is registered by an external script that was included
 /*
 AP.require(['request', 'JiraActivity'], function(request, JiraActivity) {
     request({
         url: '/rest/api/2/project',
         success: function(response) {
             // Convert the string response to JSON
             response = JSON.parse(response);

             // Call your helper function to build the
             // table, now that you have the data
             JiraActivity.buildProjectTable(response, ".projects");
         },
         error: function(response) {
             console.log("Error loading API (" + uri + ")");
             console.log(arguments);
         },
         contentType: "application/json"
     });
 });
 */
 /*
 AP.require(['request', 'JiraActivity'], function(request, JiraActivity) {
     request({
         url: '/rest/api/2/filter/10802',
         success: function(response) {
             // Convert the string response to JSON
             response = JSON.parse(response);
			 
			 var jql = response.jql;

			 //alert(jql);
			 
			 var params = {jql: jql};

			 AP.require(['request', 'JiraActivity'], function(request, JiraActivity) {
				 request({
					 url: '/rest/api/2/search',
					 type: 'POST',
					 data: JSON.stringify(params),
					 success: function(response) {
						 // Convert the string response to JSON
						 response = JSON.parse(response);
						 
						 

						 //alert("success!");
						 // Call your helper function to build the
						 // table, now that you have the data
						 JiraActivity.buildIssuesTable(response, ".issues");
					 },
					 error: function(response) {
						 console.log("Error loading API (" + uri + ")");
						 console.log(arguments);
					 },
					 contentType: "application/json"
				 });
			 });
		 },
         error: function(response) {
             console.log("Error loading API (" + uri + ")");
             console.log(arguments);
         },
         contentType: "application/json"
     });
 });
 
 */
 
 //AJS.$(".select2").auiSelect2();
 
 updateTable();

});

 
 function updateTable(team) {
 
 d3.select(".issues").html("");
 
		//var jql = 'Sprint = 28 '+ (team ? 'AND "NC Team" = "'+team+'"' : '') + ' AND status not in ("ready for merge", Done, Closed, Resolved, "In QA Review") AND project = "NimbleCommerce Core" ORDER BY assignee ASC, priority DESC, remainingEstimate DESC, summary ASC, key ASC';
		
		var jql = /*"issuekey = NA-123 AND */"issuetype=Epic " + (team ? 'AND "NC Team" = "'+team+'"' : '') + ' AND status not in ("On Hold", Done, Closed, Resolved) ORDER BY priority DESC, "NC Team" ASC, remainingEstimate DESC, summary ASC, key ASC';
		alert(jql);
	
	var params = {jql: jql};
 
 			 AP.require(['request', 'JiraActivity'], function(request, JiraActivity) {
				 request({
					 url: '/rest/api/2/search',
					 type: 'POST',
					 data: JSON.stringify(params),
					 success: function(response) {
						 // Convert the string response to JSON
						 response = JSON.parse(response);
						 console.log(response);
						 

						 // Call your helper function to build the
						 // table, now that you have the data
						 JiraActivity.buildIssuesTable(response, ".issues");
					 },
					 error: function(response) {
						 console.log("Error loading API (" + uri + ")");
						 console.log(arguments);
					 },
					 contentType: "application/json"
				 });
			 });

 }