import './App.css';
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer.jsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';


function App() {
  return (
    <div className="App">
      <AppBar position="static" className="top-menu">
        <Toolbar>
          <Typography variant="h5" ><strong>
            Sorting Algorithm Visualizer  
          </strong>
          </Typography>
          <hr />
          <Typography variant="h6" edge="end">
            <a href="https://github.com/DevanQuinn" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'white' }}>
              by Devan Quinn
              <OpenInNewIcon  style={{verticalAlign: 'middle', height: "15px", width: "15px", marginLeft: '3px'}}/>
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <SortingVisualizer />
      <footer>
      </footer>
    </div>
  );
}

export default App;
