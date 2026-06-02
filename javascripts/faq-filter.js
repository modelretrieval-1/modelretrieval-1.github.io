document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("faq-filter");
  if (!input) return;

  // Build .faq-item containers dynamically from headings (h3) so we don't rely on
  // Markdown extensions. Each FAQ item is the heading plus all following nodes
  // until the next H3.
  let items = Array.from(document.querySelectorAll(".faq-item"));
  if (items.length === 0) {
    const content =
      document.querySelector(".md-content") || document.querySelector("main");
    if (!content) return;
    const headings = Array.from(content.querySelectorAll("h3"));
    headings.forEach((h, idx) => {
      const container = document.createElement("section");
      container.className = "faq-item";
      if (h.id) container.id = h.id;
      else container.id = "faq-" + idx;
      const parent = h.parentNode;
      parent.insertBefore(container, h);
      container.appendChild(h);
      let sibling = container.nextSibling;
      while (sibling && sibling.tagName !== "H3") {
        const next = sibling.nextSibling;
        container.appendChild(sibling);
        sibling = next;
      }
    });
    items = Array.from(document.querySelectorAll(".faq-item"));
  }

  // Create accessible accordion toggles for each FAQ item.
  items.forEach((item, idx) => {
    const heading = item.querySelector("h4, h3, summary");
    if (!heading) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "faq-question-toggle";
    btn.innerHTML = heading.innerHTML;
    btn.setAttribute("aria-expanded", "false");
    const answerId = (item.id ? item.id : "faq-" + idx) + "-answer";
    btn.setAttribute("aria-controls", answerId);

    // Replace heading with button
    heading.parentNode.replaceChild(btn, heading);

    // Collect remaining nodes as the answer container
    const answer = document.createElement("div");
    answer.id = answerId;
    answer.className = "faq-answer";
    let node = btn.nextSibling;
    while (node) {
      const next = node.nextSibling;
      answer.appendChild(node);
      node = next;
    }
    item.appendChild(answer);

    // Start collapsed (hidden by default)
    answer.style.display = "none";
    btn.setAttribute("aria-expanded", "false");
    item.classList.remove("open");

    // Toggle handler
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      if (expanded) {
        answer.style.display = "none";
        item.classList.remove("open");
      } else {
        answer.style.display = "";
        item.classList.add("open");
      }
    });
  });

  function normalize(s) {
    return (s || "").toString().toLowerCase();
  }

  function filter() {
    const q = normalize(input.value).trim();
    if (!q) {
      // No query: show all items but keep answers collapsed (hidden)
      items.forEach((i) => {
        i.style.display = "";
        const ans = i.querySelector(".faq-answer");
        if (ans) {
          ans.style.display = "none";
          i.classList.remove("open");
          const btn = i.querySelector(".faq-question-toggle");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });
      updateCount(items.length);
      return;
    }
    let visible = 0;
    items.forEach((i) => {
      const text = normalize(i.innerText);
      const show = text.indexOf(q) !== -1;
      i.style.display = show ? "" : "none";
      const ans = i.querySelector(".faq-answer");
      const btn = i.querySelector(".faq-question-toggle");
      if (show) {
        visible++;
        if (ans) {
          ans.style.display = "";
          i.classList.add("open");
        }
        if (btn) btn.setAttribute("aria-expanded", "true");
      } else {
        if (ans) {
          ans.style.display = "none";
          i.classList.remove("open");
        }
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
    updateCount(visible);
  }

  // match count and clear button
  const count = document.createElement("span");
  count.id = "faq-match-count";
  count.style.marginLeft = "0.8rem";
  input.parentNode.insertBefore(count, input.nextSibling);

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.textContent = "Clear";
  clearBtn.style.marginLeft = "0.6rem";
  input.parentNode.insertBefore(clearBtn, count.nextSibling);
  clearBtn.addEventListener("click", () => {
    input.value = "";
    filter();
    input.focus();
  });

  let timeout = null;
  input.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(filter, 120);
  });

  function updateCount(n) {
    count.textContent =
      n === 0 ? "No matches" : n + " match" + (n > 1 ? "es" : "");
  }
  updateCount(items.length);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const first = items.find((i) => i.style.display !== "none");
      if (first) {
        // focus first focusable element inside the first visible FAQ item
        const focusable = first.querySelector(
          'button, a, input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable) focusable.focus();
      }
    }
  });

  // Make Top Questions buttons scroll to and focus the target section.
  const topButtons = Array.from(
    document.querySelectorAll(
      ".faq-top-questions .faq-card button[data-target]",
    ),
  );
  topButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = btn.getAttribute("data-target");
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      // Smooth scroll and focus the first focusable element inside
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const focusable = target.querySelector(
          'button, a, input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable) focusable.focus();
        else if (target.firstElementChild) target.firstElementChild.focus?.();
      }, 300);
    });
  });
});
