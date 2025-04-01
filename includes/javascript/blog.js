document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("blog-posts");

    fetch("https://dev.to/api/articles?per_page=5")
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postHTML = `
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.description ? post.description.substring(0, 100) : "No description available"}...</p>
                            <a href="https://dev.to/${post.user.username}/${post.slug}" class="btn btn-primary" target="_blank">Read More</a>
                        </div>
                    </div>
                `;
                blogContainer.innerHTML += postHTML;
            });
        })
        .catch(error => console.error("Error fetching blog posts:", error));
});
