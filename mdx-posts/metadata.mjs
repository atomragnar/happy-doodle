import { mdxFile } from "./utils/mdx.mjs";

const path = ".\\data\\posts\\1708366441267.mdx";


mdxFile(path).parseFrontmatter().then((fm) => {
    console.log(fm);
});
