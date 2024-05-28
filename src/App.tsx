import FilesContainer from './Components/Files/FilesContainer';
import FileUploader from './Components/FileUploader';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';

import './styles/app.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className="main-layout">{children}</div>;
};

const App = () => {
  return (
    <MainLayout>
      <Header />
      <FilesContainer />
      <FileUploader />
      <ToastContainer />
    </MainLayout>
  )
}

export default App;
