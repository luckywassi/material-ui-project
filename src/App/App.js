import SideMenu from '../Components/SideMenu';
import Header from '../Components/Header';
import { CssBaseline, makeStyles } from '@material-ui/core';
import Employees from '../pages/Employees/Employees';

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '150px',
    width: '100%',
  },
});

function App() {
  const { appMain } = useStyles();
  return (
    <>
      <SideMenu />
      <div className={appMain}>
        <Header />
        <Employees />
      </div>
      <CssBaseline />
    </>
  );
}

export default App;
