import './App.css';
import Sidebar from './Sidebar';

function AppSide(props) {
console.log("props", props.tabChange)
  return (
    <div className='App'>
      <Sidebar tabChange={props.tabChange}/>
    </div>
  );
}

export default AppSide;
