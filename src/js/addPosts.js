import {on} from "delegated-events";
const wp = require('./wordpress')

export default {
  init: () => {
    on("click", "#posts-init", (evt) => {
      const category = document.getElementById("posts-init").dataset.key;
      
      // TODO: use variable 'category' instead of 'bradford' value below
      wp
      .getPostsByLocation('bradford', 2, 0, true)
      .then((posts) => {
        const container = document.getElementById("posts-container");

        posts.posts.forEach((element) => {
          container.innerHTML += `<div class=\"cta\"><h1 class=\"h2\">${element.title.rendered}</h1><p>${element.short_excerpt}</p><a class="btn btn--mhp-yellow cta__link"href="${element.link}">Read more</a></div>`;
        });

        if (posts.posts && posts.posts.length) {
          const btn = document.getElementById("all-posts-btn");
          btn.style.display = 'inline-block';
          btn.href = posts.taxonomy.link;
        }
      });
    });
  }
};