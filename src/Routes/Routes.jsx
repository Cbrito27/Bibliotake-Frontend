import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { RentBook } from "../components/RentBook";
import { BookPrincipal } from "../pages/BookPrincipal";
const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<BookPrincipal />} />
          <Route path="libro/:idLibro" element={<RentBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { MyRoutes };
