let defaultState = {
    addMode: false,
    editMode: true,
    saveContact: false,
    listContact: [],
    selectedID: null,
    notItemsMsg: true,
    notFoundMsg: false,
}

export default function reducer(state = defaultState, action) {
    let items;
    switch (action.type) {
        case "ADD_CONTACT":
             return { ...state, addMode: true, editMode: false };
        case "EDIT_CONTACT":
            return { ...state, addMode: false, editMode: true };
        case "EDIT_CONTACT_LIST":
            let findItem = state.listContact.find(elem => elem.id === action.payload.id);
            state.listContact.splice(state.listContact.indexOf(findItem), 1, action.payload);
            return { ...state }
        case "SAVE_CONTACT": 
            return { ...state, saveContact: !state.saveContact };
        case "ADD_CONTACT_LIST":
            return { ...state, listContact: action.payload };
        case "SEND_CONTACT_LIST":
            let list = [...state.listContact];
            list.push(action.payload);
            return { ...state, listContact: list };
        case "UPDATE_SELECT_CONTACT":
            return { ...state, selectedID: action.payload };
        case "REMOVE_CONTACT":
            items = state.listContact.filter(elem => elem.id !== action.payload);
            if (items.length === 0)
                return { ...state, listContact: items, addMode: true, editMode: false }
            return { ...state, listContact: items, selectedID: state.listContact[0].id }
        case "NOTFOUND_MESSAGE":
            return { ...state, notFoundMsg: action.payload }
        case "NOTITEMS_MESSAGE":
            return { ...state, notItemsMsg: action.payload }
        default:
            return state;
    }
}
