import { Link } from "react-router-dom";
import lalasiaLogo from "../../assets/lalasia_logo.svg";
import backetLogo from "../../assets/basket_logo.svg";
import loginLogo from "../../assets/login_logo.svg";
import styles from "./Navbar.module.scss";

type MenuItem = {
  url: string; //ссылка
  name: string; //название страницы
};

const Navbar = () => {
  const menuElements: MenuItem[] = [
    { url: "/", name: "Home" },
    { url: "/products", name: "Products" },
    { url: "/categories", name: "Categories" },
    { url: "/contacts", name: "About us" },
  ];

  return (
    <div className={styles.Navbar}>
      <div className={styles.left}>
        <Link to="/">
          <img src={lalasiaLogo} />
        </Link>
      </div>
      <nav className={styles.center}>
        {menuElements.map((elm) => (
          <Link to={elm.url} key={elm.name} className={styles.menuItem}>
            {elm.name}
          </Link>
        ))}
      </nav>
      <div className={styles.right}>
        <div>
          <a href="#">
            <img src={backetLogo} style={{ marginRight: "20px" }} />
          </a>
          <a href="#">
            <img src={loginLogo} style={{ marginRight: "60px" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

// Экспортируем компонент
export default Navbar;
