function Header() {
  return (
    <header className="d-flex align-items-center">
      <span className="logo">
        <img src={require("../../images/logo.jpg")} alt="logo" />
      </span>
      <span className="title">Adam Nicol</span>
    </header>
  );
}

export default Header;
