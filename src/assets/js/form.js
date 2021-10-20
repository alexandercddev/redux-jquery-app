/** 
 * @author alexandercddev
 * @description  
 * @date 19/octubre/2021
**/

import { formReducer } from "../../containers/formReducer.js";
import { tableReducer } from "../../containers/tableReducer.js";
import { user } from '../../utils/user.js'


$(document).ready( () => { 
    const formReducerStore = Redux.createStore(formReducer);
    const tableReducerStore = Redux.createStore(tableReducer);  

    const update = ({ value, name }) => {
        formReducerStore.dispatch({ 
            type: 'update', 
            payload: {
                value,
                name
            }  
        });
    } 
    
    $('#firstName').on('input', ({ target }) => {
        update(target);
    });
     
    $('#lastName').on('input', ({ target }) => {
        update(target);
    }); 

    $('#phone').on('input', ({ target }) => {
        update(target);
        console.log(target)
    });
    
    $('#tableUsers').on('click', 'tbody tr button.delete', (event) => {
        const { target } = event;
        const key = $(target).data('key'); 
        tableReducerStore.dispatch({ 
            type: 'delete', 
            payload: key
        }); 
    });
    
    $('#form').submit((e) => { 
        e.preventDefault();  
        const formData = formReducerStore.getState(); 
        const key =  new Date().getTime();  
        tableReducerStore.dispatch({ 
            type: 'add', 
            payload: {
                ...formData,
                key
            }
        }); 
    });
    
    formReducerStore.subscribe(() => {
        let { lastName, firstName, phone } = formReducerStore.getState(); 
        $('#firstNameText').html(firstName);
        $('#lastNameText').html(lastName); 
        $('#phoneText').html(phone);  
    });
    
    tableReducerStore.subscribe(() => {
        const data = tableReducerStore.getState();  
        let html = ``;
        $.each(data, (index, { key, lastName, firstName, phone }) => {
            html += `
                <tr> 
                    <td>${index + 1}</td> 
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${phone}</td>
                    <td>
                        <button data-key="${key}" type="button" class="delete"> x </button>
                    </td>
                </tr>
            `;
        });
        $('#tableUsers > tbody').html( html );
    });

    tableReducerStore.dispatch({ 
        type: 'initial', 
        payload: user
    }); 
});

