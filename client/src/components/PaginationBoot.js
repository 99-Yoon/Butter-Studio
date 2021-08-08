import { Link } from "react-router-dom";

const PaginationBoot = ({ children }) => {
  return (
    <nav aria-label="page navigation">
      <ul className="pagination justify-content-center py-3">{children}</ul>
    </nav>
  );
};

const PageItem = ({
  active = false,
  disabled = false,
  className = "",
  style,
  activeLabel = "(current)",
  children,
  ...props
}) => {
  return (
    <li
      style={style}
      className={`${className}` + " page-item " + (active ? "active " : "") + (disabled ? "disabled " : "")}
    >
      <Link to="#" className={"page-link border-0 shadow-none " + (active ? "rounded-circle text-white" : "text-dark")} {...props}>
        {children}
      </Link>
    </li>
  );
};

const createButton = (name, defaultValue, label = name) => {
  function Button({ children, ...props }) {
    return (
      <PageItem {...props}>
        <span aria-hidden="true">{children || defaultValue}</span>
        <span className="visually-hidden">{label}</span>
      </PageItem>
    );
  }

  Button.displayName = name;
  return Button;
};

PaginationBoot.First = createButton("First", <i className="bi bi-chevron-double-left"></i>);
PaginationBoot.Prev = createButton("Prev", <i className="bi bi-chevron-left"></i>);
PaginationBoot.Item = PageItem;
PaginationBoot.Next = createButton("Next", <i className="bi bi-chevron-right"></i>);
PaginationBoot.Last = createButton("Last", <i className="bi bi-chevron-double-right"></i>);

export default PaginationBoot