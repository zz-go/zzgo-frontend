export const mutations = {
    
	set_config_show_navigation(state, val){
        state.config_show_navigation = val;
    },
    








    
	set_user(state, val){ 
        state.user = val;
    },
    
	set_organisation(state, val){ 
        state.organisation = val;
    },
    
	set_client(state, val){ 
        state.client = val;
    },
    
	set_clients(state, val){ 
        state.clients = val;
    },
	remove_clients(state, val){
        for(var i=0; i<state.clients.length; i++){
            if(state.clients[i].slug == val){
                state.clients.splice(i, 1);
                break;
            }
        }
    },
    
	set_posts(state, val){ 
        state.posts = val;
    },
    
	set_sel_year(state, val){ 
        state.sel_year = val;
    },
    
	set_sel_month(state, val){ 
        state.sel_month = val;
    },
    
	set_config_sidebar_editid(state, val){ 
        state.config_sidebar_editid = val;
    },
    
	set_config_sidebar_date(state, val){ 
        state.config_sidebar_date = val;
    },
    
	set_channels(state, val){ 
        state.channels = val;
    },
    
	set_topics(state, val){ 
        state.topics = val;
    },
    
	set_block_ui(state, val){ 
        state.block_ui = val;
    }

}