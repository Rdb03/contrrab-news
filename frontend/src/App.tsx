import ItemToolBar from "./components/ItemToolBar/ItemToolBar.tsx";
import NewsList from "./components/NewsLIst/NewsList.tsx";
import {Route, Routes} from "react-router-dom";
import NotFound from "./NotFound/NoFound.tsx";
import AddNew from "./components/AddNew/AddNew.tsx";

const App = () => {
  return (
    <>
      <header>
        <ItemToolBar/>
      </header>
      <main>
          <Routes>
              <Route path='/' element={
                  <NewsList/>
              }/>
              <Route path='/add-news' element={
                <AddNew/>
              }/>
              <Route path="*" element={
                  <NotFound/>
              }/>
          </Routes>
      </main>
    </>
  )
};

export default App
