type MenuItem = {
  url: string; //ссылка
  name: string; //название страницы
};

export type NavbarProps = {
  menuElements?: MenuItem[];
};

import './Navbar.scss'; // импорт стилей

const Navbar: React.FC<NavbarProps> = ({ menuElements }: NavbarProps) => {
  if (!menuElements) {
    menuElements = [
      { url: '/products', name: 'Products' },
      { url: '/categories', name: 'categories' },
    ];
  }

  return (
    <div className="Navbar">
      {menuElements.map((elm) => (
        <a href={elm.url} key={elm.name}>
          {elm.name}
        </a>
      ))}
    </div>
  );
};

// Экспортируем компонент
export default Navbar;
