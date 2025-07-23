document.addEventListener("DOMContentLoaded", function () {
  const toc = document.querySelector("nav.md-nav--secondary");
  if (!toc) return;

  const toggleButton = document.createElement("button");
  toggleButton.textContent = "📑 目录";
  toggleButton.style = `
    background: var(--md-default-bg-color);
    border: 1px solid var(--md-default-fg-color--lightest);
    padding: 0.3em 0.8em;
    font-size: 0.8em;
    margin-bottom: 0.5em;
    cursor: pointer;
    border-radius: 5px;
  `;

  let visible = false;
  toggleButton.onclick = () => {
    visible = !visible;
    toc.style.display = visible ? "block" : "none";
  };

  toc.parentNode.insertBefore(toggleButton, toc);
});
