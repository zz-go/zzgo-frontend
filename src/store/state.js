var init_date = new Date();
var init_month = init_date.getMonth();
var init_year = init_date.getFullYear();

export const state = {
	config_show_navigation: false,



	



	config_show_postsidebar: false,
	config_sidebar_editid: false,
	config_sidebar_date: {},

	months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
	weekday: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

	user: false,
	organisation: false,
	client: false,
	clients: false,
	channels: false,
	topics: false,

	posts: false,
	sel_year: init_year,
	sel_month: init_month,

	block_ui: false,


	


	


	api_login: '/api/v1/sign-in',
	api_logout: '/api/v1/sign-out',
	api_password_reset: '/api/v1/password-reset',
	api_password_request: '/api/v1/request-password-reset',
	api_register: '/api/v1/register',
	api_userrole: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/settings/users/<USER_ID>/set-role/<ROLE_ID>',

	api_userdata: '/api/v1/users/me/dashboard',
	api_organisation: '/api/v1/organisations/<ORGANISATION>',
	api_organisation_clients: '/api/v1/organisations/<ORGANISATION>/clients',
	
	api_posts: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/posts',
	api_post: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/posts/<POST>',
	api_post_approve: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/posts/<POST>/approve',
	api_posts_comment: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/posts/<POST>/comments',
	api_posts_comment_edit: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/posts/<POST>/comments/<COMMENT>',

	api_clients: '/api/v1/organisations/<ORGANISATION>/clients',
	api_client: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>',
	api_client_users: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/settings/users',
	api_client_user: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/settings/users/<USER_ID>',

	api_topics: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/topics',
	api_topic: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/topics/<TOPIC>',

	api_channels: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/channels',
	api_channel: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/channels/<CHANNEL>',

	api_assets: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/posts/<POST>/assets',
	api_asset: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/posts/<POST>/assets/<ASSET>',

	api_invites: '/api/v1/organisations/<ORGANISATION>/clients/<CLIENT>/settings/users/invites',



	
	





	platforms: [{
		value: 'facebook',
		label: 'Facebook'
	}, {
		value: 'instagram',
		label: 'Instagram'
	}, {
		value: 'twitter',
		label: 'Twitter'
	}],

	posttypes: {
		facebook: [{
			value: 'picturepost',
			label: 'Picture Post'
		}, {
			value: 'linkpost',
			label: 'Link Post'
		}, {
			value: 'videopost',
			label: 'Video Post'
		}, {
			value: 'gallery',
			label: 'Gallery'
		}],
		instagram: [{
			value: 'picturepost',
			label: 'Picture Post'
		}, {
			value: 'gallery',
			label: 'Gallery'
		}, {
			value: 'videopost',
			label: 'Video Post'
		}, {
			value: 'story',
			label: 'Story'
		}],
		twitter: [{
			value: 'textpost',
			label: 'Text Post'
		}, {
			value: 'picturepost',
			label: 'Picture Post'
		}, {
			value: 'videopost',
			label: 'Video Post'
		}],
	},

	objectives: [{
		value: 'conversions',
		label: 'Conversions'
	}, {
		value: 'traffic_and_clicks',
		label: 'Traffic & Clicks'
	}, {
		value: 'post_engagement',
		label: 'Post Engagement'
	}, {
		value: 'video_views',
		label: 'Video Views'
	}, {
		value: 'reach_and_awareness',
		label: 'Reach & Awareness'
	}, {
		value: 'app_installs',
		label: 'App Installs'
	}],
}