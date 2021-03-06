const initialState = {
    status: false,
    storage: [],
    posts: [],
    arrayOfForums: [],
    post: "",
    logged: false,
    updatedPost: {post: {}, attitudeDto: {}},
    updatedComment: {comment: {}, attitudeDto: {}},
    comments: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SEARCH_FORUM_BY_NAME':
            return {
                ...state,
                arrayOfForums: action.payload
            };
        case 'FETCH_ALL_FORUM_NAMES':
            return {
                ...state,
                storage: action.payload
            };
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: state.posts.concat(action.payload)
            };
        case 'LOG_IN':
            return {
                ...state,
                status: action.payload,
            };
        case 'RESET':
            return {
                ...state,
                posts: []
            };
        case 'POST_BY_ID':
            let a;
            state.posts.forEach(e => {
                if (parseInt(e.content[0].id) === parseInt(action.payload)) {
                    a = e.content[0];
                }
            });
            return {...state, post: a};
        case 'FETCHED_POST_BY_ID':
            return {
                ...state,
                post: action.payload
            };
        case 'POST_UPDATE':
            return {
                ...state,
                updatedPost: action.payload
            };
        case 'COMMENT_UPDATE':
            return {
                ...state,
                updatedComment: action.payload
            };
        case 'FETCH_COMMENTS':
            return {
                ...state,
                comments: action.payload
            };
        case 'CREATED_COMMENT':
            let arr = JSON.parse(JSON.stringify(state.comments));
            arr.content.push(action.payload);
            return {
                ...state,
                comments: arr,
            };
        case 'CREATED_FORUM':
            let map = JSON.parse(JSON.stringify(state.storage));
            map[Object.keys(action.payload)[0]]=action.payload[Object.keys(action.payload)[0]]
            return {
                ...state,
                storage:map
            };
        case 'DELETED_POST':
            let possts = JSON.parse(JSON.stringify(state.posts));
            console.log(possts)
            possts = possts.filter(u=>{
                console.log(u)
                if(u.content[0].post.id!==action.payload){return true;}
                    else return false
            });
            return {...state,posts:possts};


        default:
            return state
    }

}