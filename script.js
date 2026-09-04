document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".like-btn");
    const postMedia = document.querySelector(".post-media");
    if (!likeBtn) return;

    const likesCountSpan = likeBtn.querySelector(".likes-count");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    let isLiked = false;
    let baseLikes = 0;

    // Inicializa o texto com 0
    if (likesCountSpan) {
        likesCountSpan.textContent = "0";
    }

    // Formata números (ex: 1000 -> 1.0K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Adiciona curtida
    function addLike() {
        if (!isLiked) {
            baseLikes++;
            isLiked = true;
            likeBtn.classList.add("liked");

            if (likesCountSpan) {
                likesCountSpan.textContent = formatLikes(baseLikes);
            }

            // Animação no coração
            const svg = likeBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.4)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        }
    }

    // Clique no botão de curtida (Alterna curtir/descurtir)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (isLiked) {
            isLiked = false;
            baseLikes = Math.max(0, baseLikes - 1);
            likeBtn.classList.remove("liked");
            if (likesCountSpan) {
                likesCountSpan.textContent = formatLikes(baseLikes);
            }
        } else {
            addLike();
        }
    });

    // Clique na imagem principal
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Clique no botão de salvar
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }
});