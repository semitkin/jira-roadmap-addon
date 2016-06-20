// Canned functionality for JIRA Activity
 $(function() {
     "use strict";

     // Get parameters from query string
     // and stick them in an object
     function getQueryParams(qs) {
         qs = qs.split("+").join(" ");

         var params = {}, tokens,
             re = /[?&]?([^=]+)=([^&]*)/g;

         while (tokens = re.exec(qs)) {
             params[decodeURIComponent(tokens[1])] =
                 decodeURIComponent(tokens[2]);
         }

         return params;
     }

     AP.define('JiraActivity', {
	 /*
         buildProjectTable: function(projects, selector) {

             var params = getQueryParams(document.location.search);
             var baseUrl = params.xdm_e + params.cp;

             function buildTableAndReturnTbody(hostElement) {
                 var projTable = hostElement.append('table')
                     .classed({'project': true, 'aui': true});

                 // table > thead > tr, as needed below
                 var projHeadRow = projTable.append("thead").append('div').classed({'tr': true});
                 // Empty header
                 projHeadRow.append('div').classed({'th': true});
                 // Now for the next column
                 projHeadRow.append('div').classed({'th': true}).text("Key");
                 projHeadRow.append('div').classed({'th': true}).text("Name");

                 return projTable.append("tbody");
             }

             var projectBaseUrl = baseUrl + "/browse/";

             var rootElement = d3.select(selector);
             var projBody = buildTableAndReturnTbody(rootElement);

             // For each data item in projects
             var row = projBody.selectAll("tr")
                 .data(projects)
                 .enter()
                 .append('div').classed({'tr': true});

             // Add a td for the avatar, stick a span in it
             row.append('div').classed({'td': true}).append('span')
                 // Set the css classes for this element
                 .classed({'aui-avatar': true, 'aui-avatar-xsmall': true})
                 .append('span')
                 .classed({'aui-avatar-inner': true})
                 .append('img')
                 // Set the atribute for the img element inside this td > span > span
                 .attr('src', function(item) { return item.avatarUrls["16x16"] });

             // Add a td for the project key
             row.append('div').classed({'td': true}).append('span')
                 .classed({'project-key': true, 'aui-label': true})
                 // set the content of the element to be some text
                 .text(function(item) { return item.key; });

             // And finally, a td for the project name & link
             row.append('div').classed({'td': true}).append('span')
                 .classed({'project-name': true})
                 .append("a")
                 // make the name a link to the project
                 .attr('href', function(item) { return projectBaseUrl + item.key; })
                 // since we're in the iframe, we need to set _top
                 .attr('target', "_top")
                 .text(function(item) { return item.name; });
         },
		 */
		 
		 buildIssuesTable: function(issues, selector, updateOnly) {

             var params = getQueryParams(document.location.search);
             var baseUrl = params.xdm_e + params.cp;

             function buildTableAndReturnTbody(hostElement) {
                 var projTable = hostElement.append('div').classed({'aui': true, 'table': true});

                 // table > thead > tr, as needed below
                 var projHeadRow = projTable.append('div').classed({'thead': true});
                 // Empty header for avatar
                 projHeadRow.append('div').classed({'th': true});
                 projHeadRow.append('div').classed({'th': true});
                 // Now for the next column
                 //projHeadRow.append('div').classed({'th': true}).text("ID");
                 projHeadRow.append('div').classed({'th': true}).text("Key");
                 projHeadRow.append('div').classed({'th': true}).text("Summary");
				 projHeadRow.append('div').classed({'th': true}).text("Priority");
				 projHeadRow.append('div').classed({'th': true}).text("Team");
				 projHeadRow.append('div').classed({'th': true}).text("Assignee");
				 projHeadRow.append('div').classed({'th': true}).text("Spec %");
				 projHeadRow.append('div').classed({'th': true}).text("Estimate");
				 projHeadRow.append('div').classed({'th': true}).text("Done %");
				 projHeadRow.append('div').classed({'th': true}).text("Remains");
				 projHeadRow.append('div').classed({'th': true}).text(""); //Issues

                 return projTable;
             }

             var projectBaseUrl = baseUrl + "/browse/";

             var rootElement = d3.select(selector);
			 
             var projBody;
			 if (updateOnly) {
			 } else {
			    projBody = buildTableAndReturnTbody(rootElement);
			 }

			
			
             // For each data item in issues
			 var entry = projBody.selectAll("tr")
                 .data(issues.issues)
                 .enter();
			 var row = entry
                 .append('div').classed({'tr': true});
				


             // Add a td for the avatar, stick a span in it
             row.append('div').classed({'td': true})
				.append('span').classed({'plus': true}).html('+')
				.on("click", function() {
					var $trsub = $(this).parents('.tr').find('.tr-sub');
					var $plus = $(this);
					if ($trsub.hasClass('hidden')) {
						$trsub.removeClass('hidden');
						$plus.html('&#8211;');
					} else {
						$trsub.addClass('hidden');
						$plus.html('+');
					}
				});
             row.append('div').classed({'td': true}).append('span')
                 // Set the css classes for this element
                 .classed({'aui-avatar': true, 'aui-avatar-xsmall': true})
                 .append('span')
                 .classed({'aui-avatar-inner': true})
                 .append('img')
                 // Set the atribute for the img element inside this td > span > span
                 .attr('src', function(item) { return item.fields.issuetype.iconUrl });

             // Add a td for the issue key
            //row.append('div').classed({'td': true}).append('span')
            //     .text(function(item) { return item.id; });
            row.append('div').classed({'td': true}).append('a')
				.attr('target', 'blank')
				.attr('href', function(item) { return 'https://nimblecommerce.atlassian.net/browse/' + item.key; })
                .text(function(item) { return item.key; });
				 
            row.append('div').classed({'td': true}).append('span').classed({'summary': true})
                .text(function(item) { return item.fields.summary; });
            row.append('div').classed({'td': true}).append('span')
                 .text(function(item) { return item.fields.priority.name; });
			row.append('div').classed({'td': true}).append('span')
                 .text(function(item) { return item.fields.customfield_10300 != null ? item.fields.customfield_10300[0].value : ''; });
			row.append('div').classed({'td': true}).append('span')
                .text(function(item) { return item.fields.assignee != null ? item.fields.assignee.displayName : ''; });
			row.append('div').classed({'td': true}).append('span')
                 .text(function(item) { return item.fields.customfield_10601; });
				 
			row.append('div').classed({'td': true, 'total-1-td': true}).append('span').classed({'total-1': true})
				.text(function(item) { return '...'; });
			row.append('div').classed({'td': true, 'total-2-td': true}).append('span').classed({'total-2': true})
				.text(function(item) { return '...'; });
			row.append('div').classed({'td': true, 'total-3-td': true}).append('span').classed({'total-3': true})
				.text(function(item) { return '...'; });
				
			row.each(function(item) {
					//console.log(item);
					var _this = this;

					AP.require(['request', 'JiraActivity'], function(request, JiraActivity) {
						request({
							url: '/rest/api/2/search',
							type: 'POST',
							data: JSON.stringify({jql : '"Epic Link"=' + item.key}), //+ ' and issuekey=NA-130'}),
							success: function(response) {
								// Convert the string response to JSON
								response = JSON.parse(response);
								
								//console.log(item.key);
								//console.log(response);
								//console.log(row);
								//console.log('2:' + _this);
								//console.log('response.total:' + response.total);
								
								
								var allIssues = response.issues;
								var unresolvedIssues = response.issues.filter(a => a.fields.resolution == null);
								
								var total_progress = allIssues
										.map(a => a.fields.aggregateprogress.progress)
										.reduce(function(a, b) { return a + b; }, 0) / 3600;
								
								var total_remain = unresolvedIssues
										.map(a => a.fields.aggregateprogress.total - a.fields.aggregateprogress.progress)
										.reduce(function(a, b) { return a + b; }, 0) / 3600;
										
								var total_total = total_progress + total_remain;
								
								/*
								var totals = issues.map(a => (a.fields.aggregatetimeestimate || 0) : 0);
								//var totalsForPrint = issues.map(a => a.key + ":" + (a.fields.resolution != null ? a.fields.aggregatetimeestimate || 0 : 0));
								//var totalsForPrint = issues.map(a => a.key + ":" + (a.fields.aggregatetimeestimate || 0));
								//var totalsForPrint = issues.map(a => a.key + ":" + (a.fields.resolution != null ? a.fields.aggregatetimeestimate || 0 : 0));
								//var totalsForPrint = issues.map(a => a.key + ":" + (a.fields.resolution != null ? a.fields.resolution.name : 'NULL'));
								//console.log(totalsForPrint);
								var total_estimate = totals.reduce(function(a, b) { return a + b; }) / 3600;

								var totals = issues.map(a => a.fields.aggregatetimeoriginalestimate || 0);
								var total_originalestimate = totals.reduce(function(a, b) { return a + b; }) / 3600;

								var totals = issues.map(a => a.fields.aggregatetimespent || 0);
								var total_spent = totals.reduce(function(a, b) { return a + b; }) / 3600;
								
								//var totals = issues.map(a => a.fields.timeestimate || 0);
								//var total_ownestimate = totals.reduce(function(a, b) { return a + b; }) / 3600;
								*/
								var round = function(a) { return Math.round(a*10)/10; };
								
								//d3.select(_this).append('div').classed({'td': true}).html(
								/*d3.select(_this).select('.total-remaining-td').append('div').classed({'td': true}).html(
									round(total_total) + 'h | ' + ((total_progress > 0) ? (Math.round(100 * total_progress / total_total)) : 0) + '% | ' + round(total_remain) + 'h'
								);*/
								/*row.append('div').classed({'td': true}).html(
									round(total_total) + 'h | ' + ((total_progress > 0) ? (Math.round(100 * total_progress / total_total)) : 0) + '% | ' + round(total_remain) + 'h'
								);*/
								
								d3.select(_this).select('.total-1').html(
									round(total_total) + 'h'
								);
								d3.select(_this).select('.total-2').html(
									((total_progress > 0) ? (Math.round(100 * total_progress / total_total)) : 0) + '%'
								);
								d3.select(_this).select('.total-3').html(
									round(total_remain) + 'h'
								);
								//d3.select(_this).select('.tr-sub')
								//	.append('div').classed({'td': true})
								//	.append('div').classed({'td': true}).html('TEST');
									
								var subrow = d3.select(_this).selectAll('.tr-sub')
									.data(unresolvedIssues)
									.enter()
									.append('div').classed({'tr-sub': true, 'hidden': true})
									//.append('div').classed({'td': true})
									//.append('div').classed({'table': true})
									//.append('div').classed({'tr': true})
									;
								//subrow.append('div').classed({'td': true})
								//	.append('div').classed({'td': true}).html('TEST');
								
								
								// Add a td for the avatar, stick a span in it
								subrow.append('div').classed({'td': true});
								subrow.append('div').classed({'td': true}).append('span')
									 // Set the css classes for this element
									 .classed({'aui-avatar': true, 'aui-avatar-xsmall': true})
									 .append('span')
									 .classed({'aui-avatar-inner': true})
									 .append('img')
									 // Set the atribute for the img element inside this td > span > span
									 .attr('src', function(item) { return item.fields.issuetype.iconUrl });

								 // Add a td for the issue key
								//subrow.append('div').classed({'td': true}).append('span')
								//     .text(function(item) { return item.id; });
								subrow.append('div').classed({'td': true}).append('a')
									.attr('target', 'blank')
									.attr('href', function(item) { return 'https://nimblecommerce.atlassian.net/browse/' + item.key; })
									.text(function(item) { return item.key; });
									 
								subrow.append('div').classed({'td': true}).append('span')
									 .text(function(item) { return item.fields.summary; });
								subrow.append('div').classed({'td': true}).append('span')
									 .text(function(item) { return item.fields.priority.name; });
								subrow.append('div').classed({'td': true}).append('span')
									 .text(function(item) { return item.fields.customfield_10300 != null ? item.fields.customfield_10300[0].value : ''; });
								subrow.append('div').classed({'td': true}).append('span')
									.text(function(item) { return item.fields.assignee != null ? item.fields.assignee.displayName : ''; });
								subrow.append('div').classed({'td': true}).append('span')
									 .text(function(item) { return '' });
									 
								var progress = allIssues
										.map(a => a.fields.aggregateprogress.progress)
										.reduce(function(a, b) { return a + b; }, 0) / 3600;
								
								var total_remain = unresolvedIssues
										.map(a => a.fields.aggregateprogress.total - a.fields.aggregateprogress.progress)
										.reduce(function(a, b) { return a + b; }, 0) / 3600;
										
								var total_total = total_progress + total_remain;
								
								subrow.append('div').classed({'td': true}).append('span').classed({'total-1': true})
									.text(function(item) { return round(item.fields.aggregateprogress.total / 3600) + 'h'; });
								subrow.append('div').classed({'td': true}).append('span').classed({'total-2': true})
									.text(function(item) { return ((item.fields.aggregateprogress.progress > 0) ? (Math.round(100 * item.fields.aggregateprogress.progress / item.fields.aggregateprogress.total)) : 0) + '%'; });
								subrow.append('div').classed({'td': true}).append('span').classed({'total-3': true})
									.text(function(item) { return round((item.fields.aggregateprogress.total - item.fields.aggregateprogress.progress) / 3600) + 'h'; });
								
								
								//console.log(d3.select(_this)[0].parentNode);
								
								/*
								d3.select(_this).html(
									Math.round(total_progress,1) + 'h progress, ' 
									+ Math.round(total_total,1) + 'h total || '
									+ Math.round(total_estimate,1) + 'h estimate, '
									+ Math.round(total_originalestimate,1) + 'h originalestimate, '
									+ Math.round(total_spent,1) + 'h spent'
									//+ Math.round(total_ownestimate,1) + 'h ownestimate'
									);
								*/
								/*
								d3.select(_this).selectAll("span")
									 .data([123])
									 .enter()
									 .append("span")
									 .text(response.total);
								*/
								/*d3.selectAll(_this)
									 .data([response.total])
									 .enter()
									 .append("span")
									 .text(function(item) { return '33333'; } );*/
							},
							error: function(response) {
								console.log("Error loading API (" + uri + ")");
								console.log(arguments);
							},
							contentType: "application/json"
						});
					});

					/*
					setInterval(function() {
						d3.select(_this).selectAll("span")
							 .data([123])
							 .enter()
							 .append("span")
							 .text(item.key);
					}, 1500);				
					*/
					/*d3.select(this).selectAll("span")
						 .data([123])
						 .enter()
						 .append("span")
						 .text(item.key);*/
				});
				
				row.append('div').classed({'td': true}).append('a')
					.attr('target', 'blank')
					.attr('href', function(item) { return 'https://nimblecommerce.atlassian.net/issues/?jql="Epic%20Link"%3D' + item.key; })
					.text('Issues >');
				row.append('div').classed({'tr-sub': true}); //.text(function(item) { return '...'; });
				
				
				//.on("click", function() {
				  /*d3.select(this).selectAll("span")
						 .data([123])
						 .enter()
						 .append("span")
						 .text('!!!!!!!!');*/
				  //alert("CLICK");
				  //d3.event.stopPropagation();
				  
				  /*
				  var _this = this;
				  console.log('1: ' + _this);
				  AP.require(['request', 'JiraActivity'], function(request, JiraActivity) {
						request({
							url: '/rest/api/2/search',
							type: 'POST',
							data: JSON.stringify({jql : '"Epic Link"=' + 'NA-123'}),
							success: function(response) {
								// Convert the string response to JSON
								response = JSON.parse(response);
								
								//console.log(response);
								//console.log(row);
								console.log('2:' + _this);
								console.log('response.total:' + response.total);
								
								
								//_this does not work!!!
								
								d3.selectAll(_this)
									 .data([response.total])
									 .enter()
									 .append("span")
									 .text(function(item) { return '33333'; } );
							},
							error: function(response) {
								console.log("Error loading API (" + uri + ")");
								console.log(arguments);
							},
							contentType: "application/json"
						});
					});
					*/
				//});
				 
			//console.log(row);
			//row.selectAll('.total-remaining').data([123]).enter().append("span").text(function(d) { return d; });
				
         }
     });
 });
 

