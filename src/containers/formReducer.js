/** 
 * @author alexandercddev
 * @description  
 * @date 19/octubre/2021
**/

export const formReducer = (state = {}, action) => { 
    switch (action?.type) {
        case 'update': 
            return ({
                ...state, 
                [action.payload.name]: action.payload.value
            }); 
        default: return state
    }
}
