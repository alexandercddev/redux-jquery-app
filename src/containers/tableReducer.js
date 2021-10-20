/** 
 * @author alexandercddev
 * @description  
 * @date 19/octubre/2021
**/ 

export const tableReducer = (state = [], action) => {  
    switch (action?.type) {
        case 'initial':
            return action.payload;
        case 'add': 
            return [ ...state, action.payload]; 
        case 'delete': 
            return state.filter( item => item.key !== action.payload);
        case 'toggle':
            return state.map( item => (
                ( item.id === action.payload )
                ? {...item, done: !item.done}
                : item
            ));
        default: return state
    }
}
