// LOADING
document.addEventListener("readystatechange", () => {
  const loaderWrapper = document.querySelector(".loader-wrapper");

  if (document.readyState !== "complete") {
    loaderWrapper.classList.add("disable");
  }
});

document.querySelector("footer .footer-year").innerHTML =
  new Date().getFullYear();

// TO-TOP
const toTop = {
  element: document.querySelector(".to-top"),

  scroll() {
    window.addEventListener("scroll", () => {
      if (scrollY > 100) return this.element.classList.add("return");

      this.element.classList.remove("return");
    });
  },

  click() {
    this.element.addEventListener("click", () => {
      scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  },

  run() {
    this.scroll();
    this.click();
  },
};

toTop.run();

// NAVBAR
class Navbar {
  #navbarNav = document.querySelector(".navbar .navbar-nav");
  #navbarUl = this.#navbarNav.firstElementChild;
  #navbarLink = [...this.#navbarUl.children].map(
    (item) => item.firstElementChild
  );
  #navbarMenu = this.#navbarNav.nextElementSibling;
  #contentTop = document.querySelectorAll(".content-top");

  #handleLink() {
    let view = "home";

    function elementInView(element) {
      const elementTop = element.getBoundingClientRect().top;

      return elementTop <= window.innerHeight;
    }

    function includes(element, type) {
      return element.className.includes(type);
    }

    function checkView(element) {
      if (includes(element, "home")) {
        view = "home";
      } else if (includes(element, "about")) {
        view = "about";
      } else if (includes(element, "skills")) {
        view = "skills";
      } else if (includes(element, "portfolio")) {
        view = "portfolio";
      } else {
        view = "contact";
      }
    }

    const setView = () => {
      this.#contentTop.forEach((item) => {
        elementInView(item) && checkView(item);
      });
    };

    const toggleClass = () => {
      this.#navbarLink.forEach((item) => {
        item.classList.remove("show");
        includes(item, view) && item.classList.add("show");
      });
    };

    function setAll() {
      setView();
      toggleClass();
    }

    setAll();

    document.addEventListener("scroll", () => setAll());
  }

  #handleMenu() {
    const toggleClass = () => {
      this.#navbarNav.classList.toggle("return");
      this.#navbarMenu.classList.toggle("close");

      [...this.#navbarMenu.children].forEach((item) => {
        item.classList.toggle("close");
      });
    };

    this.#navbarMenu.addEventListener("click", () => toggleClass());

    document.addEventListener("click", ({ target }) => {
      if (this.#navbarNav.classList.contains("return")) {
        if (
          target !== this.#navbarNav &&
          target !== this.#navbarUl &&
          target !== this.#navbarMenu &&
          !target.classList.contains("navbar-span") &&
          !target.classList.contains("navbar-icon") &&
          !target.classList.contains("navbar-download")
        ) {
          toggleClass();
        }
      }
    });
  }

  run() {
    this.#handleLink();
    this.#handleMenu();
  }
}

new Navbar().run();

// ABOUT
function setUmur() {
  const umur = document.querySelector(".about .umur");
  const dob = new Date("02/28/2005");
  const monthDiff = Date.now() - dob.getTime();
  const ageDt = new Date(monthDiff);
  const year = ageDt.getUTCFullYear();
  const age = Math.abs(year - 1970);

  umur.innerHTML = `${age}`;
}

setUmur();

// SKILLS
const skills = {
  data: [
    {
      src: "assets/img/icons/skills/cdr.png",
      name: "CorelDRAW",
    },
    {
      src: "assets/img/icons/skills/html.png",
      name: "HTML",
    },
    {
      src: "assets/img/icons/skills/css.png",
      name: "CSS",
    },
    {
      src: "assets/img/icons/skills/js.png",
      name: "JavaScript",
    },
    {
      src: "assets/img/icons/skills/ts.png",
      name: "TypeScript",
    },
    {
      src: "assets/img/icons/skills/bootstrap.png",
      name: "Bootstrap",
    },
    {
      src: "assets/img/icons/skills/tailwindcss.png",
      name: "TailwindCSS",
    },
    {
      src: "assets/img/icons/skills/react.png",
      name: "ReactJS",
    },
    {
      src: "assets/img/icons/skills/express.png",
      name: "ExpressJS",
    },
  ],

  run() {
    this.data.forEach((item) => {
      document.querySelector(".skills .row-2").innerHTML += `
        <div class="col" title="${item.name}">
          <img src="${item.src}" alt="${item.name}" />
          <p>${item.name}</p>
        </div>
      `;
    });
  },
};

skills.run();

// PORTFOLIO
const portfolio = {
  data: [
    {
      src: "assets/img/icons/projects/wpap.jpg",
      name: "WPAP Art",
      url: "https://pinterest.com/wajik_45/",
      technologies: [
        {
          src: "assets/img/icons/skills/cdr.png",
          name: "CorelDRAW",
        },
      ],
    },
    {
      src: "assets/img/icons/projects/wajiquran.jpg",
      name: "Al-Qur'an Digital",
      url: "https://wajiquran.vercel.app/",
      technologies: [
        {
          src: "assets/img/icons/skills/sass.png",
          name: "SASS",
        },
        {
          src: "assets/img/icons/skills/react.png",
          name: "ReactJS",
        },
      ],
    },
    {
      src: "assets/img/icons/projects/wajik-gulir.jpg",
      name: "Library Animasi sederhana",
      url: "https://github.com/wajik45/wajik-gulir",
      technologies: [
        {
          src: "assets/img/icons/skills/ts.png",
          name: "TypeScript",
        },
      ],
    },
    {
      src: "assets/img/icons/projects/portfolio.jpg",
      name: "Website Portfolio",
      url: "https://wajik45.github.io/",
      technologies: [
        {
          src: "assets/img/icons/skills/html.png",
          name: "HTML",
        },
        {
          src: "assets/img/icons/skills/css.png",
          name: "CSS",
        },
        {
          src: "assets/img/icons/skills/js.png",
          name: "JavaScript",
        },
      ],
    },
    {
      src: "assets/img/icons/projects/wajik-anime.jpg",
      name: "Streaming Anime",
      url: "https://wajik-anime.vercel.app",
      technologies: [
        {
          src: "assets/img/icons/skills/tailwindcss.png",
          name: "TailwindCSS",
        },
        {
          src: "assets/img/icons/skills/ts.png",
          name: "TypeScript",
        },
        {
          src: "assets/img/icons/skills/react.png",
          name: "ReactJS",
        },
      ],
    },
    {
      src: "assets/img/icons/projects/undangan.jpg",
      name: "Website Undangan",
      url: "https://wajik45.github.io/undangan/",
      technologies: [
        {
          src: "assets/img/icons/skills/html.png",
          name: "HTML",
        },
        {
          src: "assets/img/icons/skills/css.png",
          name: "CSS",
        },
        {
          src: "assets/img/icons/skills/js.png",
          name: "JavaScript",
        },
      ],
    },
  ],

  run() {
    this.data.forEach((item) => {
      document.querySelector(".portfolio .row-2").innerHTML += `
        <div data-wajik="swipe-up-tr(40px)">
          <a href="${item.url}" class="col" target="_blank">
            <img class="main" src="${item.src}" alt="${item.name}" />
            <h5>${item.name}</h5>
            <div class="technologies">
              ${item.technologies
                .map((technology) => {
                  return `
                    <img src="${technology.src}" alt="${technology.name}" />
                  `;
                })
                .join("")}
            </div>
          </a>
        </div>
      `;
    });
  },
};

portfolio.run();

// FORM
class Form {
  #form = document.querySelector(".contact .row-3 form");
  #forms = document.querySelectorAll(".contact .row-3 form .form");
  #button = this.#form.lastElementChild.firstElementChild;
  #url =
    "https://script.google.com/macros/s/AKfycbyY8VE_n0LM2wfImAqU1tIj7OX9gfYAvuHrDXDt2_kZLsprPbWhPiWXWv_lOlVykYf3qg/exec";
  #click = false;

  #alert({ message, color }) {
    const element = this.#form.parentElement.previousElementSibling;

    element.innerHTML = `
      <div class="${color}">
        <p>${message}</p>
        <div class="alert-close">✖</div>
      </div>
    `;
  }

  #alertClose() {
    document.addEventListener("click", ({ target }) => {
      if (target.classList.contains("alert-close")) {
        target.parentElement.remove();
      }
    });
  }

  #isEmpty() {
    if (
      this.#forms[0].value.length < 3 ||
      this.#forms[1].value.length < 3 ||
      this.#forms[2].value.length < 3
    ) {
      return true;
    }

    return false;
  }

  #send() {
    this.#click = true;

    this.#button.innerHTML = `
      <span class="loader-sm"></span>
      <span>Mengirim</span>
    `;

    localStorage.removeItem("exp");
  }

  #isValid() {
    if (this.#click) return false;

    if (this.#isEmpty()) {
      this.#alert({
        message: "Masukkan minimal 3 karakter!",
        color: "orange",
      });

      return false;
    }

    if (Number(localStorage.getItem("exp")) > Date.now()) {
      this.#alert({
        message: "Tunggu beberapa saat untuk mengirimkan pesan kembali!",
        color: "orange",
      });

      return false;
    }

    return true;
  }

  #success() {
    this.#click = false;

    this.#button.innerHTML = "<span>Kirim</span>";

    this.#alert({
      message: "Terima kasih, pesan anda sudah kami terima 😘😊",
      color: "green",
    });

    this.#form.reset();

    localStorage.setItem("exp", Date.now() + 60000);
  }

  #error(error) {
    this.#alert({
      message: `Error: ${error.message}!`,
      color: "red",
    });

    this.#click = false;

    this.#button.innerHTML = "<span>Kirim</span>";
  }

  #submit() {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!this.#isValid()) return;

      this.#send();

      try {
        await fetch(this.#url, {
          method: "POST",
          body: new FormData(this.#form),
        });

        this.#success();
      } catch (error) {
        this.#error(error);
      }
    });
  }

  run() {
    this.#submit();
    this.#alertClose();
  }
}

new Form().run();
