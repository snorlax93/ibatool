// import { Outlet, Link } from "react-router-dom";
// import Header from "../components/Header";

// const sections = [
//   { title: "Home", url: "/" },
//   { title: "Episodes", url: "/episodes" },
//   { title: "Topics", url: "" },
//   { title: "Users", url: "#" },
// ];

// const Layout = () => {
//   return (
//     <>
//       <Header title="Blog" sections={sections} />
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/episodes">Episodes</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//           <li>
//             <Link to="/users">Users</Link>
//           </li>
//         </ul>
//       </nav>

//       <Outlet />
//     </>
//   );
// };

// export default Layout;
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Container from "@mui/material/Container";

const sections = [
  { title: "Home", url: "/" },
  { title: "Episodes", url: "/episodes" },
  { title: "Topics", url: "/topics" },
  { title: "Users", url: "/users" },
];

const getTitle = () => {
  let title = window.location.href.split("/")[3].toUpperCase();
  if (title === "") {
    title = "HOME";
  }
  return title;
};

const Layout = () => {
  return (
    <>
      <Container component="header" maxWidth="lg">
        <Header title={getTitle()} sections={sections} />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
