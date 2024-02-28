import { newPost } from "./utils/new-post.mjs";
import { args } from "./utils/args.mjs";


args(process.argv.slice(2)).parse().then((args) => {
    if (args.title && args.description && args.tags) {
        newPost(args.title, args.description, args.tags);
    }
});

