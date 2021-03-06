function createStore(stateChanger){
  let state=null;
  const listeners=[];
  const subscribe=(listener)=>listeners.push(listener);
  const getState=()=>state;
  const dispatch=(action)=>{
      state=stateChanger(state,action)
      listeners.forEach((listener)=>listener());
  }
  dispatch({})
  return{getState,dispatch,subscribe};
}

function renderApp(newAppState,oldAppState={}) {
  if(newAppState===oldAppState) return
  console.log('render app');
  renderTitle(newAppState.title,oldAppState.title);
  renderContent(newAppState.content,oldAppState.content);
}

function renderTitle(newTitle,oldTitle={}) {
  if(newTitle===oldTitle) return
  console.log('render title');
  const titleDom=document.getElementById('title');
  titleDom.innerHTML=newTitle.text;
  titleDom.style.color=newTitle.color;
}

function renderContent(newContent,oldContent={}) {
  if(newContent===oldContent) return
  console.log('render content');
  const contentDOM=document.getElementById('content');
  contentDOM.innerHTML=newContent.text;
  contentDOM.style.color=newContent.color;
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

function stateChanger (state, action) {

  if(!state){
    return{
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
  }

  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return{
        ...state,
        title:{
          ...state.title,
          text:action.text
        }
      }
      break
    case 'UPDATE_TITLE_COLOR':
      return{
        ...state,
        title:{
          ...state.title,
          color:action.color
        }
      }
      break
    default:
      break
  }
}

// const store=createStore(appState,stateChanger)

const store=createStore(stateChanger)

let oldState=store.getState();

store.subscribe(()=>
  {
    const newState=store.getState();
    renderApp(newState,oldState)
    oldState=newState
  }
)

renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) 
// renderApp(store.getState())