import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import PurchaseModal from "./components/PurchaseModal/PurchaseModal";
import { useClickOutside } from "./hooks/useClickOutside";
import Account from "./pages/Account/Account";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Cart from "./pages/Cart/Cart";
import CatalogFrame from "./pages/Catalog/CatalogFrame";
import Home from "./pages/Home";
import { setModal } from "./redux/slices/categorySlice";
import { RootState } from "./redux/store";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { authService } from "./services/auth.service";
import FullProduct from "./pages/FullProduct/FullProduct";
import Favorites from "./pages/Favorites/Favorites";
import style from "../src/scss/global.module.scss";

const App: React.FC = () => {
  const modal = useSelector((state: RootState) => state.categorySlice.modal);
  const popupRef = useRef<HTMLDivElement>(null);
  const jwtToken = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useClickOutside(popupRef, () => {
    if (modal) setTimeout(() => dispatch(setModal(false)), 50);
  });

  useEffect(() => {
    if (jwtToken) {
      authService.getMe();
    }
  }, []);

  return (
    <div className={style.App}>
      <header>
        <Header />
      </header>
      <main className={style.main}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/react-tattoo-store" element={<Home />} />
          <Route path="/react-tattoo-store/cart" element={<Cart />} />
          <Route path="/react-tattoo-store/favorites" element={<Favorites />} />
          <Route
            path="/react-tattoo-store/product/:id"
            element={<FullProduct />}
          />
          <Route
            path="/react-tattoo-store/account"
            element={
              <ProtectedRoutes>
                <Account />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/react-tattoo-store/admin-dashboard"
            element={
              <ProtectedRoutes>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/react-tattoo-store/catalog/:id"
            element={<CatalogFrame />}
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
      {modal && <PurchaseModal />}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
