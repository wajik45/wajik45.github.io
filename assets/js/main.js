"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// FOOTER
(() => {
    const year = new Date().getFullYear();
    const footerText = (document.querySelector("footer .footer-text"));
    footerText.innerHTML = `
        &copy; copyright ${year} | built with
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill inline-block text-red-500" viewBox="0 0 16 16">
        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
        </svg>
        by <a href="https://instagram.com/wajik45" target="_blank" class="font-semibold hover:text-slate-400 transition">Haikal</a>
    `;
})();
// TENTANG
(() => {
    const tentangAge = (document.querySelector("#tentang .tentang-age"));
    const now = Date.now();
    const born = new Date("02/28/2005");
    const age = new Date(now).getFullYear() - born.getFullYear();
    tentangAge.innerHTML = `${age}`;
})();
// LISTS
class Lists {
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch("./assets/data/lists.json").then((res) => res.json());
        });
    }
    navbar() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getData();
            const list = data.lists.navbar;
            const el = (document.querySelector("#navbar .navbar-list"));
            list.forEach((item) => {
                el.innerHTML += `
            <a
               href="${item.href}"
               class="ml-7 transition hover:text-slate-400 m-md:ml-0 m-md:my-3"
               >${item.textContent}</a
            >
         `;
            });
        });
    }
    skills() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getData();
            const list = data.lists.skills;
            const el = (document.querySelector("#skills .skills-list"));
            list.forEach((item) => {
                el.innerHTML += `
            <div
               class="skills-card skills-aos w-64 p-6 rounded-md shadow-dikit-be m-sm:w-full"
            >
               <img
                  src="${item.src}"
                  alt="${item.title}"
                  class="w-16 m-md:w-14"
               />
               <h3 class="my-4 text-lg font-semibold">${item.title}</h3>
               <p class="text-sm">${item.description}</p>
            </div>
         `;
            });
        });
    }
    portfolio() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getData();
            const list = data.lists.portfolio;
            const el = (document.querySelector("#portfolio .portfolio-list"));
            list.forEach((item) => {
                el.innerHTML += `
         <div
            class="portfolio-card portfolio-aos w-[340px] max-w-[340px] flex p-2 flex-col items-center rounded-md shadow-dikit-be"
         >
            <h3 class="my-3 text-xl font-semibold">${item.title}</h3>
            <img
               src="${item.src}"
               alt="${item.title}"
               width="${item.width}"
               class="my-3 rounded-sm"
            />
            <div class="flex my-3 gap-4">
               ${item.technologies
                    .map((tech) => {
                    return `
                        <img
                           src="${tech.src}"
                           alt="${tech.alt}"
                           width="${tech.width}"
                        />
                     `;
                })
                    .join("")}
            </div>
            <a
               href="${item.href}"
               target="_blank"
               class="my-3 border border-slate-200 py-1 px-3 rounded-sm transition hover:text-slate-400 hover:border-slate-400"
               >Kunjungi ↗</a
            >
         </div>
         `;
            });
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navbar();
            yield this.skills();
            yield this.portfolio();
        });
    }
}
new Lists().run();
// HANDLE TO TOP
class HandleToTop {
    constructor() {
        this.toTop = document.querySelector("#to-top");
    }
    click() {
        this.toTop.addEventListener("click", () => {
            scrollTo({ top: 0 });
        });
    }
    scroll() {
        document.addEventListener("scroll", () => {
            if (scrollY > 100)
                return this.toTop.classList.add("return");
            return this.toTop.classList.remove("return");
        });
    }
    run() {
        this.click();
        this.scroll();
    }
}
new HandleToTop().run();
// HANDLE NAVBAR
class NavbarElements {
    constructor() {
        this.navbarNav = (document.querySelector("#navbar .navbar-nav"));
        this.navbarMenu = (document.querySelector("#navbar .navbar-menu"));
        this.childMenu = this.navbarMenu.children;
    }
}
class HandleNavbar extends NavbarElements {
    toggleClass() {
        this.navbarNav.classList.toggle("return");
        this.navbarMenu.classList.toggle("return");
        for (let i = 0; i < this.childMenu.length; i++) {
            this.childMenu[i].classList.toggle("return");
        }
    }
    menuOnClick() {
        this.navbarMenu.addEventListener("click", () => {
            this.toggleClass();
        });
    }
    documentOnClick() {
        document.addEventListener("click", ({ target }) => {
            if (this.navbarNav.classList.contains("return")) {
                if (target !== this.navbarMenu &&
                    target !== this.navbarNav &&
                    target !== this.navbarNav.firstElementChild &&
                    target !== this.childMenu[0] &&
                    target !== this.childMenu[1] &&
                    target !== this.childMenu[2] &&
                    target.localName !== "a") {
                    this.toggleClass();
                }
            }
        });
    }
    click() {
        this.menuOnClick();
        this.documentOnClick();
    }
    run() {
        this.click();
    }
}
new HandleNavbar().run();
// HANDLE FORM
class FormAlerts {
    constructor() {
        this.el = document.querySelector("#form-alert");
    }
    alert(className, textContent) {
        this.el.innerHTML = `
            <div class="text-center min-w-[50%] min-h-[48px] my-2 relative py-3 px-6 rounded-md flex ${className}">
                <p class="m-auto">${textContent}</p>
                <span class="alert-close absolute top-1 right-2 text-sm cursor-pointer">✖</span>
            </div>
        `;
    }
    alertClose() {
        this.el.innerHTML = "";
    }
    alertCloseOnClick(target) {
        if (target.classList.contains("alert-close")) {
            this.alertClose();
        }
    }
}
class FormElements extends FormAlerts {
    constructor() {
        super(...arguments);
        this.form = document.querySelector("#form");
        this.nama = this.form.nama;
        this.email = this.form.email;
        this.pesan = this.form.pesan;
        this.button = (document.querySelector("#form-button"));
    }
}
class HandleForm extends FormElements {
    constructor() {
        super(...arguments);
        this.url = "https://script.google.com/macros/s/AKfycbyY8VE_n0LM2wfImAqU1tIj7OX9gfYAvuHrDXDt2_kZLsprPbWhPiWXWv_lOlVykYf3qg/exec";
        this.isClicked = false;
    }
    buttonLoader(loading) {
        this.button.innerHTML = `
            ${loading ? '<span class="loader"></span>' : ""}
            <span>${loading ? "Mengirim" : "Kirim"}</span>
        `;
    }
    conditionalSubmit() {
        if (sessionStorage.getItem("submit") === "true") {
            this.alert("merah", `Anda sudah mengirimkan pesan!`);
            return false;
        }
        if (this.isClicked) {
            return false;
        }
        this.isClicked = true;
        this.buttonLoader(true);
        return true;
    }
    success() {
        sessionStorage.setItem("submit", "true");
        this.alert("ijo", "Terima kasih pesan anda sudah kami terima 😊");
        this.buttonLoader(false);
        this.form.reset();
    }
    error(error) {
        this.alert("merah", error.message);
        this.buttonLoader(false);
    }
    submit() {
        this.form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (!this.conditionalSubmit())
                return;
            try {
                yield fetch(this.url, {
                    method: "POST",
                    body: new FormData(this.form),
                });
                this.success();
            }
            catch (error) {
                this.error(error);
            }
        }));
    }
    click() {
        document.addEventListener("click", ({ target }) => {
            this.alertCloseOnClick(target);
        });
    }
    run() {
        this.click();
        this.submit();
    }
}
new HandleForm().run();
// HANDLE AOS
class HandleAos {
    constructor() {
        this.elementInView = (el) => {
            const elementTop = el.getBoundingClientRect().top;
            return (elementTop <=
                (window.innerHeight || document.documentElement.clientHeight));
        };
    }
    wait(duration) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), duration);
        });
    }
    toggleClass(el, type) {
        if (type === "add")
            return el.classList.add("return");
        return el.classList.remove("return");
    }
    toggleClassLoop(el, index, type) {
        if (type === "add")
            return el[index].classList.add("return");
        return el[index].classList.remove("return");
    }
    navbarOnLoad() {
        const navbar = document.querySelector("#navbar");
        this.toggleClass(navbar, "add");
    }
    jumbotronOnLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = document.querySelectorAll("#jumbotron .jumbotron-animation");
            this.toggleClassLoop(elements, elements.length - 1, "add");
            for (let i = 0; i < elements.length; i++) {
                yield this.wait(150);
                i !== elements.length - 1 && this.toggleClassLoop(elements, i, "add");
            }
        });
    }
    aos(elements, wait, waitClassName) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < elements.length; i++) {
                if (this.elementInView(elements[i])) {
                    this.toggleClassLoop(elements, i, "add");
                    wait &&
                        elements[i].classList.contains(`${waitClassName}`) &&
                        (yield this.wait(150));
                }
                else {
                    this.toggleClassLoop(elements, i, "remove");
                }
            }
        });
    }
    tentangAos() {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = document.querySelectorAll("#tentang .tentang-aos");
            this.aos(elements, true, "tentang-icon");
        });
    }
    skillsAos() {
        const elements = document.querySelectorAll("#skills .skills-aos");
        this.aos(elements);
    }
    portfolioAos() {
        const elements = document.querySelectorAll("#portfolio .portfolio-aos");
        this.aos(elements);
    }
    load() {
        window.addEventListener("load", () => {
            this.navbarOnLoad();
            this.jumbotronOnLoad();
        });
    }
    scroll() {
        document.onscroll = () => __awaiter(this, void 0, void 0, function* () {
            this.tentangAos();
            this.skillsAos();
            this.portfolioAos();
        });
    }
    run() {
        this.load();
        this.scroll();
    }
}
new HandleAos().run();
