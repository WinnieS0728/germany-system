import { salesAnalyzeNavRoutes } from "@/pages/sales analyze/nav";
import { Link } from "react-router-dom";

type breadLink = {
  label: string;
  link: string;
};
export function Bread() {
  const path = location.hash.split(/[#?]/gi)[1];
  const pathArray = path.split(/\//gi);
  const newPathArray: breadLink[] = pathArray
    .map((path, index) => {
      const linkPath = pathArray.slice(0, index + 1).join("/");
      const label = salesAnalyzeNavRoutes.find((route) => route.path === path)
        ?.label;

      return {
        label: label || "",
        link: linkPath || "",
      };
    })
    .filter((path) => path.label);

  return (
    <ul className='flex gap-1'>
      {newPathArray.map((pathObj, index) => (
        <li key={index}>
          {index !== 0 && <span>/ </span>}
          <Link to={pathObj.link}>{pathObj.label}</Link>
        </li>
      ))}
    </ul>
  );
}
