import ItemToolBar from "./components/ItemToolBar/ItemToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import AddNew from "./containers/AddNew/AddNew.tsx";
import FullPost from "./containers/FullPost/FullPost.tsx";
import NotFound from "./components/NotFound/NoFound.tsx";
import NewsList from "./containers/NewsLIst/NewsList.tsx";

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
              <Route path='/full-post/:id' element={
                  <FullPost/>
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
