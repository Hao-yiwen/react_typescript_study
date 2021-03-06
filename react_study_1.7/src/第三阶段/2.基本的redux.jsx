function createStore(state,stateChanger){
    const listeners=[];
    const subscribe=(listener)=>listeners.push(listener);
    const getState=()=>state;
    const dispatch=(action)=>{
        stateChanger(state,action)
        listeners.forEach((listeners)=>listener());
    }
    return{getState,dispatch,subscribe};
}

function renderApp(appState) {
    renderTitle(appState.title);
    renderContent(appState.content);
}

function renderTitle(title) {
    const titleDom=document.getElementById('title');
    titleDom.innerHTML=title.text;
    titleDom.style.color=content.color;
}

function renderContent(content) {
    const contentDOM=document.getElementById('content');
    contentDOM.innerHTML=content.text;
    contentDOM.style.color=content.color;
}

let appState={
    title:{
        text:'React.js 小书',
        color:'red'
    }
    ,
    content:{
        text:'React.js 小书内容',
        color:'blue'
    }
}

function stateChanger(state,action) {
    switch(action.type){
        case 'UPDATE_TITLE_TEXT':
            state.title.text=action.text
            break;
        case 'UODATE_TITLE_COLOR':
            state.title.color=action.color;
            break;
        default:
            break;
    }
}

const store=createStore(appState,stateChanger)

store.subscribe(()=>renderApp(store.getState()))

renderApp(store.getState())
store.dispatch({type:'UPDATE_TITLE_TEXT',text:'<react小书>'})
store.dispatch({type:'UPDATE_TITLE_COLOR',color:'blue'})