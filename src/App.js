import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/header/component';
import SiteFooter from './components/footer/component';
import './App.css';

// Import your page components as needed
import HomePage from './pages/page';
import CollaboratePage from './pages/Collaborate/page';
import EventPage from './pages/Event/page';
import ContactPage from './pages/Contact_Us/page';
import FacilitateInnovationPage from './pages/Our_Services/Facilitate_Innovation/page';
import TechAssessmentPage from './pages/Our_Services/Tech_Assessment/page';
import IPRManagementPage from './pages/Our_Services/IPR_Management/page';
import TechLicensingPage from './pages/Our_Services/Tech_Licensing/page';
import StartupFacilitationPage from './pages/Our_Services/Startup_Facilitation/page';
import FacultyResourcesPage from './pages/Resources/Faculty/page';
import PartnerResourcesPage from './pages/Resources/Partner/page';
import StudentResourcesPage from './pages/Resources/Student/page';
import OurResearchPage from './pages/Technology/Our_research/page';
import OurTechPage from './pages/Technology/Our_tech/page';
import ExploreTechnologiesPage from './pages/Technology/Explore/page';
import TechDetail from './pages/Technology/TechDetail/TechDetail';

function App() {

  return (
      <Router>
        {/* Global header appears on every page */}
        <SiteHeader />
        
        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Collaborate" element={<CollaboratePage />} />
          <Route path="/Event" element={<EventPage />} />
          <Route path="/Contact_Us" element={<ContactPage />} />

          {/* Services routes */}
          <Route path="/Services/Facilitate_Innovation" element={<FacilitateInnovationPage />} />
          <Route path="/Services/Tech_Assessment" element={<TechAssessmentPage />} />
          <Route path="/Services/IPR_Management" element={<IPRManagementPage />} />
          <Route path="/Services/Tech_Licensing" element={<TechLicensingPage />} />
          <Route path="/Services/Startup_Facilitation" element={<StartupFacilitationPage />} />

          {/* Resources routes */}
          <Route path="/Resources/Faculty" element={<FacultyResourcesPage />} />
          <Route path="/Resources/Partner" element={<PartnerResourcesPage />} />
          <Route path="/Resources/Student" element={<StudentResourcesPage />} />

          {/* Technology routes */}
          <Route path="/Our_Research" element={<OurResearchPage />} />
          <Route path="/Our_Technology" element={<OurTechPage />} />
          <Route path="/Explore_Technologies" element={<ExploreTechnologiesPage />} />
          <Route path="/tech/:id" element={<TechDetail />} />
        </Routes>

        {/* Global footer appears on every page */}
        <SiteFooter />
      </Router>
  );
}

export default App;
