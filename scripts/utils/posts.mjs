import { file } from "./utils.mjs";

const dataPath = "./data/posts/";

class Post {
    date = new Date();
    id = new Date().getTime();
    title = "";
    description = "";
    tags = [];

    constructor(title, description, tags) {
        this.title = title;
        this.description = description;
        this.tags = tags.split(",");
    }

    toMDX() {
        return `---
title: ${this.title}
date: ${this.date.toISOString()}
description: ${this.description}
tags: ${this.tags.join(", ")}
---
# ${this.title}
`;
    }

    async Save() {
        const filename = `${dataPath}${this.id}.mdx`;
        const myFile = file(filename);

        myFile.exists().then((exists) => {
            if (exists) {
                console.error("File already exists.");
                return;
            }
            const content = this.toMDX();
            myFile.write(content).then(() => {
                console.log(`Post created: ${filename}`);
            });
        });
    }


}

export async function newPost(title, description, tags) {
    const post = new Post(title, description, tags);
    await post.Save();
}
