const toggleBtn = document.querySelector(".toggle-btn");
const navigationContainer = document.querySelector(".navigation-container");

const shortenLinkBtn = document.querySelector(".submit-link");
const error = document.querySelector(".error");

const shortenedLinksContainer = document.querySelector(
  ".shortened-links_container"
);

toggleBtn.addEventListener("click", () => {
  navigationContainer.classList.toggle("show-menu");
});

shortenLinkBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputValue = document.querySelector("#shorten-link").value;

  if (inputValue === "") {
    error.innerHTML = "Please input a valid url";
    return;
  }

  // fetchLink(inputValue).then(res => console.log(res))
  try {
    fetchLink(inputValue).then((res) => {
      const shortenedLink = document.createElement("div");
      shortenedLink.classList.add("shortened-links_item");
      shortenedLink.innerHTML = `
            <p class='original-links'>${res.result.original_link}</p>
            <div class="underline"></div>
            <div class="shortened-links">
              <p>${res.result.short_link}</p>
              <button class='copy-btn'>Copy</button>
          </div>`;

      shortenedLinksContainer.appendChild(shortenedLink);

      const copyBtn = document.querySelectorAll(".copy-btn");

      copyBtn.forEach((elem) =>
        elem.addEventListener("click", (e) => {
          
          const textElement =
          e.target.parentElement.firstElementChild.textContent;
          
          copyText(textElement)
          elem.innerHTML = "Copied!";
          elem.classList.add("copied");
        })
      );
      error.innerHTML = "";
    });
  } catch (e) {
    console.log(e);
    error.innerHTML = "Please input a valid url";
  }
});

async function fetchLink(val) {
  const data = await fetch(`https://api.shrtco.de/v2/shorten?url=${val}`);
  const res = await data.json();
  return res;
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.log(error);
  }
};
