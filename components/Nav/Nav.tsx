import { data } from "@/lib/dataParsed";
import classes from "./Nav.module.scss";
import { Section } from "./Section";

export const Nav = () => {
  return (
    <nav>
      {Object.keys(data).map((url) => (
        <Section url={url} activeClass={classes.active} />
      ))}
    </nav>
  );
};
