console.log(window.Redux)

const {createStore}=window.Redux;

// state
const initialState=JSON.parse(localStorage.getItem('HOBBY_LIST'))||[];

// reducerHobby
const reducerHobby=(state=initialState ,action)=> {
    switch (action.type) {
        case "ADD_HOBBY":
            const newList=[...state];
            newList.push(action.payload);
            return newList;
            break;
    
        default:
            return state;
            break;
    }
}

// store
const store = createStore(reducerHobby);

// action

// formInput

const formInput= document.querySelector("#hobbyFormID");
    if(formInput){
        const handleFormInput=(e)=>{
            e.preventDefault();

            const inputText = document.querySelector("#inputID")
            if(!inputText) return ;
                console.log(inputText.value);
            const action={
                type:"ADD_HOBBY",
                payload:inputText.value
            }
            store.dispatch(action);
        
            formInput.reset();
      
    }
    formInput.addEventListener('submit',handleFormInput)

}

const renderHobbyList=(hobbyList)=>{

     if(!Array.isArray(hobbyList)|| hobbyList.length === 0) return ;
     const ulElement= document.querySelector("#hobbyListID");
     ulElement.innerHTML="";

     if(ulElement){
         for(const hobby of hobbyList)
         {
            const liElement=document.createElement("li");
            liElement.textContent=hobby;
            ulElement.appendChild(liElement);
        }
     }
}

// render initial
const initialHobby = store.getState();
renderHobbyList(initialHobby);

store.subscribe(()=>{
    const newListHobby=store.getState();
    renderHobbyList(newListHobby)
    localStorage.setItem("HOBBY_LIST",JSON.stringify(newListHobby))
})
// console.log(store.subscribe)

