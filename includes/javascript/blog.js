document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("blog-posts");

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postHTML = `
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                            <a href="#" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                `;
                blogContainer.innerHTML += postHTML;
            });
        })
        .catch(error => console.error("Error fetching blog posts:", error));
});
