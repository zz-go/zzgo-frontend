import axios from 'axios'
import router from '../router'
import moment from 'moment'
import { Alert } from 'element-ui';

let editorial_api_baseUrl = 'https://planner.agentur-loop.com';

let editorial_api = axios.create({
	baseURL: editorial_api_baseUrl
});

export const actions = {
	
	// handle all kinds of requests
	sendrequest: (context, params) => {

		// grab organisation and client from url if set in params
		if(params.hasOwnProperty('org_client') && params['org_client']){
			delete params['org_client'];
			params['organisation'] = router.history.current.params.org;
			params['client'] = router.history.current.params.client;
		}

		var endpoint = context.state['api_' + params.api];
		//console.log(endpoint)
		// replace inline url params
		if(params.hasOwnProperty('organisation')){		endpoint = endpoint.replace('<ORGANISATION>', params['organisation']);		delete params['organisation'];	}
		if(params.hasOwnProperty('client')){			endpoint = endpoint.replace('<CLIENT>', params['client']);					delete params['client'];		}
		if(params.hasOwnProperty('post')){				endpoint = endpoint.replace('<POST>', params['post']);						delete params['post'];			}
		if(params.hasOwnProperty('commentid')){			endpoint = endpoint.replace('<COMMENT>', params['commentid']);				delete params['commentid'];		}
		if(params.hasOwnProperty('topicid')){			endpoint = endpoint.replace('<TOPIC>', params['topicid']);					delete params['topicid'];		}
		if(params.hasOwnProperty('channelid')){			endpoint = endpoint.replace('<CHANNEL>', params['channelid']);				delete params['channelid'];		}
		if(params.hasOwnProperty('asset')){				endpoint = endpoint.replace('<ASSET>', params['asset']);					delete params['asset'];			}
		if(params.hasOwnProperty('userid')){			endpoint = endpoint.replace('<USER_ID>', params['userid']);					delete params['userid'];		}
		if(params.hasOwnProperty('roleid')){			endpoint = endpoint.replace('<ROLE_ID>', params['roleid']);					delete params['roleid'];		}

		
		var method = 'get';
		if(params.hasOwnProperty('method')) method = params['method'];

		var headers = {};
		if(params.hasOwnProperty('auth')) headers['Authorization'] = 'Bearer ' + sessionStorage.getItem("usertoken");

		var that = params['this'];
		delete params['this'];
		delete params['api'];
		if(params.hasOwnProperty('auth')) delete params['auth'];
		if(params.hasOwnProperty('method')) delete params['method'];


		// add get parameters to url
		if(method == 'get' && params.hasOwnProperty('get')){
			var get = params['get'].join('&');
			endpoint = endpoint + '?' + get;
			delete params['get'];
		}

		return new Promise((resolve, rej) => {

			axios({
				method: method,
				url: editorial_api_baseUrl + endpoint,
				data: params,
				headers: headers
			})
			.then(response => {
				
				// empty response, check if needed for specific requests
				if(typeof response.data == 'object' && response.data.length < 1 && method != 'delete' && endpoint.indexOf('password-reset') < 0){
					// if request was delete, resolve it
				} else {
					resolve(response.data.data);
				}

			// catch errors
			}).catch(function(e){

				// not allowed request, redirect to login
				if(typeof e.response !== 'undefined' && e.response.status == 403 && (typeof router.history.current.params.org !== 'undefined' || router.history.current.path == '/')){

					router.push('/login');

				// do nothing for now, outside login and not allowed request
				} else if(typeof e.response !== 'undefined' && e.response.status == 403 && typeof router.history.current.params.org === 'undefined'){
					
				// request error, show message
				} else {

					var senddata = {};
					senddata['env'] = that;
					senddata['type'] = 'error';

					if(typeof e.response.data.error.message != 'string'){

						var msg = '';

						Object.getOwnPropertyNames(e.response.data.error.message).forEach(key => {
							msg += e.response.data.error.message[key][0] + ' ';
						});

						senddata['message'] = msg;

					} else {
						senddata['message'] = e.response.data.error.message;
					}

					context.dispatch('shownotification', senddata);	
				}

			})

		})

	},


	// save posts
	savepost: (context, params) => {
		
		var error = false;
		var that = params['this'];

		var senddata = params;
		senddata['auth'] = true;
		senddata['org_client'] = true;
		senddata['method'] = (params['post'] != 'new') ? 'put' : 'post';
		senddata['api'] = (params['post'] == 'new') ? 'posts' : 'post';

		if(params['post'] == 'new') delete params['post'];


		var now = moment();
		var date = moment(senddata['post_at']).add(11, 'hours');


		// date is in the past
		if(false && date.unix() < now.unix()) {

			var senddata = {};
			senddata['env'] = that;
			senddata['type'] = 'error';
			senddata['message'] = 'Error saving data, selected date is in the past!';
			return senddata;

		// mandatory fields missing
		} else if(senddata['channel_id'].length < 1 || senddata['post_type'].length < 1 || senddata['post_at'].length < 8) {

			var senddata = {};
			senddata['env'] = that;
			senddata['type'] = 'error';
			senddata['message'] = 'Error saving data, please fill all mandatory fields!';
			return senddata;

		// save if all fine
		} else {
			
			return new Promise((resolve, rej) => {

				context.dispatch('sendrequest', senddata)
				.then(data => {
					
					var senddata = {};
					senddata['env'] = that;
					senddata['type'] = 'success';
					senddata['message'] = 'Data saved!';
					senddata['response'] = data;
					resolve(senddata);
		
				})
	
			});

		}

	},


	deletepost: (context, params) => {

		var that = params['this'];

		var senddata = params;
		senddata['api'] = 'post';
		senddata['auth'] = true;
		senddata['org_client'] = true;
		senddata['method'] = 'delete';
		
		return new Promise((resolve, rej) => {

			context.dispatch('sendrequest', senddata)
			.then(data => {
				
				var senddata = {};
				senddata['env'] = that;
				senddata['type'] = 'success';
				senddata['message'] = 'Post successfully deleted!';

				context.dispatch('shownotification', senddata);
				resolve();
	
			})

		})

	},


	approve_post: (context, params) => {

		var that = params['this'];

		var senddata = params;
		senddata['api'] = 'post_approve';
		senddata['auth'] = true;
		senddata['org_client'] = true;
		senddata['method'] = 'patch';

		return new Promise((resolve, rej) => {

			context.dispatch('sendrequest', senddata)
			.then(data => {
				
				var senddata = {};
				senddata['env'] = that;
				senddata['type'] = 'success';

				if(data.approved){
					senddata['message'] = 'Post successfully approved!';
				} else {
					senddata['message'] = 'Post successfully disapproved!';
				}				

				context.dispatch('shownotification', senddata);
				resolve();
	
			})

		})

	},



	// fetch posts
	fetchposts: (context, params) => {

		var senddata = params;
		senddata['api'] = 'posts';
		senddata['auth'] = true;

		senddata['organisation'] = context.state.organisation.slug;
		senddata['client'] = context.state.client.slug;

		return new Promise((resolve, rej) => {

			context.dispatch('sendrequest', senddata)
			.then(data => {
				
				context.commit('set_posts', data);
	
			})

		})

	},

	fetchpost: (context, params) => {

		var senddata = params;
		senddata['api'] = 'post';
		senddata['auth'] = 'true';

		senddata['organisation'] = context.state.organisation.slug;
		senddata['client'] = context.state.client.slug;

		return new Promise((resolve, rej) => {

			context.dispatch('sendrequest', senddata)
			.then(data => {
				
				resolve(data)
	
			})

		})

	},

	fetchpostsfrommonth: (context, params) => {

		context.dispatch('prepare_date', {month:params['month'],year:params['year']})
		.then(data => {

			var senddata = {};
			senddata['get'] = new Array();
			senddata['get'].push('month=' + data);
			senddata['this'] = params['this'];
			
			context.dispatch('fetchposts', senddata);

		});

	},

	fetchinitposts: (context, param) => {

		if(context.state.client != false && context.state.organisation != false){

			var senddata = {};
			senddata['this'] = param;
			senddata['month'] = context.state.sel_month;
			senddata['year'] = context.state.sel_year;

			context.dispatch('fetchpostsfrommonth', senddata);

		}

	},

	// fetch user data
	fetchuserdata: (context, params) => {

		var senddata = {};
		senddata['api'] = 'userdata';
		senddata['auth'] = true;
		senddata['this'] = params['this'];
		senddata['method'] = 'get';

		return new Promise((resolve, rej) => {

			context.dispatch('sendrequest', senddata)
			.then(data => {
		
				context.commit('set_user', data);
	
			})

		})

	},

	// fetch organisation
	fetchorganisation: (context, params) => {

		var senddata = params;
		senddata['api'] = 'organisation';
		senddata['auth'] = true;
		senddata['method'] = 'get';

		var organisation = senddata.organisation;
		var that = senddata['this'];

		context.dispatch('sendrequest', senddata)
			.then(data => {

				context.commit('set_organisation', data);
				
				// get clients when organisation is fetched
				var senddata = {};
				senddata['organisation'] = organisation;
				senddata['this'] = that;
				context.dispatch('fetchorganisationclients', senddata);

			})

	},

	// fetch clients from organisation
	fetchorganisationclients: (context, params) => {

		var senddata = params;
		senddata['api'] = 'organisation_clients';
		senddata['auth'] = true;
		senddata['method'] = 'get';

		context.dispatch('sendrequest', senddata)
			.then(data => {

				context.commit('set_clients', data);

			})

	},

	// fetch clients from organisation
	fetchclient: (context, params) => {

		var senddata = params;
		senddata['api'] = 'client';
		senddata['auth'] = true;
		senddata['method'] = 'get';

		context.dispatch('sendrequest', senddata)
			.then(data => {

				context.commit('set_client', data);

			})

	},

	// log user out
	logout: (context, env) => {

		var senddata = {};
		senddata['api'] = 'logout';
		senddata['this'] = env;
		senddata['auth'] = true;

		context.dispatch('sendrequest', senddata)
			.then(data => {
				
				sessionStorage.removeItem("expires_at");
				sessionStorage.removeItem("usertoken");
				
				context.commit('set_user', false);
				router.push('/login');

			})	

	},


	// pop up notification
	shownotification: (context, params) => {

		params.env.$message({
			showClose: true,
			message: params.message,
			type: params.type,
		});

	},



	// add comment
	comments: (context, params) => {

		var senddata = params;
		senddata['api'] = 'posts_comment';
		senddata['auth'] = true;

		senddata['organisation'] = context.state.organisation.slug;
		senddata['client'] = context.state.client.slug;

		var post_id = senddata['post'];
		var that = senddata['this'];

		return new Promise((resolve, rej) => {

			context.dispatch('sendrequest', senddata)
			.then(data => {
				
				Object.getOwnPropertyNames(context.state.posts).forEach(key => {
					if(context.state.posts[key].id == post_id){
						context.state.posts[key].comments.data.push(data)
						that.post_comment[post_id] = '';
					}
				});

			})

		})		

	},

	comment: (context, params) => {

		var senddata = params;
		senddata['api'] = 'posts_comment_edit';
		senddata['auth'] = true;

		senddata['organisation'] = context.state.organisation.slug;
		senddata['client'] = context.state.client.slug;

		return new Promise((resolve, rej) => {

			context.dispatch('sendrequest', senddata);

		})	

	},

	get_comments_for_post: (context, params) => {

		// var senddata = params;
		// senddata['api'] = 'posts_comment';
		// senddata['method'] = 'get';
		// senddata['auth'] = true;

		// senddata['organisation'] = context.state.organisation.slug;
		// senddata['client'] = context.state.client.slug;		

	},



	// show sidebar to add post
	add_post: (context, params) => {

		// if post id passed, edit existing post
		if(params.hasOwnProperty('id')){
			context.commit('set_config_sidebar_editid', params.id);
		} else {
			context.commit('set_config_sidebar_editid', false);
			context.commit('set_config_sidebar_date', params);
		}

		context.commit('set_config_show_postsidebar', true);

	},

	prepare_date: (context, params) => {

		var month = params['month'] + 1;
		if(month < 10) month = '0' + month;
		return month + '-' + params['year'];

	},

	calculate_date: (context, date) => {

		context.commit('set_sel_year', date.getFullYear());
		context.commit('set_sel_month', date.getMonth());

	},

	preset_channels(context) {
			
		var help_channels = [];

		context.state.client.channels.data.forEach(function (value, key) {
			var helpdata = {};
			helpdata.value = value.id;
			helpdata.label = value.handle + ' (' + value.platform + ')';
			helpdata.platform = value.platform;
			help_channels.push(helpdata);
		});

		context.commit('set_channels', help_channels);

	},

	preset_topics(context) {

		var help_topics = [];

		context.state.client.topics.data.forEach(function(value, key){
			var helpdata = {};
			helpdata.value = value.topic;
			help_topics.push(helpdata);
		});

		context.commit('set_topics', help_topics);

	},


	// handle redirects after login
	user_logged_in(context, env) {

		// after successful login forward to organisation dashboard, if only 1 organisation, bring user directly there
		var organisation_count = Object.keys(context.state.user.organisations).length;

		// user doesnt have access to any organisation
		if(organisation_count < 1){

			context.dispatch('logout', env);

		// redirect to only organisation
		} else if(organisation_count < 2){

			var organisation = context.state.user.organisations[Object.keys(context.state.user.organisations)[0]];
			router.push('/' + organisation.slug);

		// show organisation overview
		} else {

			router.push('/');

		}

	},



	// block ui with overall DIV
	switch_block_ui(context, value) {

		context.commit('set_block_ui', value);

	},

}