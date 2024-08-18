import Logo from "../NavBar/Logo";
import CustomLink from "../Footer/CustomLink";
export default function Footer() {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      <aside>
        <Logo />
        <p className=" font-bold tracking-tight">
          Crypto App Ltd.
          <br />
          Providing since 2011
        </p>
      </aside>
      <nav>
        <h6 className="footer-title text-xl tracking-tight">Crypto</h6>
        <CustomLink>Home</CustomLink>
        <CustomLink>Exchanges</CustomLink>
        <CustomLink>News</CustomLink>
      </nav>
      <nav>
        <h6 className="footer-title text-xl tracking-tight">Legal</h6>
        <CustomLink>Terms of use</CustomLink>
        <CustomLink>Privacy policy</CustomLink>
        <CustomLink>Cookie policy</CustomLink>
      </nav>
    </footer>
  );
}
