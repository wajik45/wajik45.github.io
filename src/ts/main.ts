// FOOTER
((): void => {
   const year: number = new Date().getFullYear();
   const footerText = <HTMLParagraphElement>(
      document.querySelector("footer .footer-text")!
   );
   footerText.innerHTML = `
        &copy; copyright ${year} | built with
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill inline-block text-red-500" viewBox="0 0 16 16">
        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
        </svg>
        by <a href="https://instagram.com/wajik45" target="_blank" class="font-semibold hover:text-slate-400 transition">Haikal</a>
    `;
})();

// TENTANG
((): void => {
   const tentangAge = <HTMLSpanElement>(
      document.querySelector("#tentang .tentang-age")!
   );
   const now: number = Date.now();
   const born: Date = new Date("02/28/2005");
   const age: number = new Date(now).getFullYear() - born.getFullYear();
   tentangAge.innerHTML = `${age}`;
})();

// LISTS
class Lists {
   private async getData(): Promise<any> {
      return await fetch("./assets/data/lists.json").then((res) => res.json());
   }
   private async navbar() {
      const data = await this.getData();
      type List = {
         href: string;
         textContent: string;
      };
      const list: List[] = data.lists.navbar;
      const el = <HTMLDivElement>(
         document.querySelector("#navbar .navbar-list")!
      );
      list.forEach((item) => {
         el.innerHTML += `
            <a
               href="${item.href}"
               class="ml-7 transition hover:text-slate-400 m-md:ml-0 m-md:my-3"
               >${item.textContent}</a
            >
         `;
      });
   }
   private async skills() {
      const data = await this.getData();
      type List = {
         src: string;
         title: string;
         description: string;
      };
      const list: List[] = data.lists.skills;
      const el = <HTMLDivElement>(
         document.querySelector("#skills .skills-list")!
      );
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
   }
   private async portfolio() {
      const data = await this.getData();
      type Tech = {
         src: string;
         alt: string;
         width: string;
      };
      type List = {
         title: string;
         src: string;
         width: string;
         technologies: Tech[];
         href: string;
      };
      const list: List[] = data.lists.portfolio;
      const el = <HTMLDivElement>(
         document.querySelector("#portfolio .portfolio-list")!
      );
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
   }
   public async run(): Promise<void> {
      await this.navbar();
      await this.skills();
      await this.portfolio();
   }
}
new Lists().run();

// HANDLE TO TOP
class HandleToTop {
   private toTop = <HTMLDivElement>document.querySelector("#to-top")!;
   private click(): void {
      this.toTop.addEventListener("click", (): void => {
         scrollTo({ top: 0 });
      });
   }
   private scroll(): void {
      document.addEventListener("scroll", (): void => {
         if (scrollY > 100) return this.toTop.classList.add("return");
         return this.toTop.classList.remove("return");
      });
   }
   public run(): void {
      this.click();
      this.scroll();
   }
}
new HandleToTop().run();

// HANDLE NAVBAR
class NavbarElements {
   protected navbarNav = <HTMLDivElement>(
      document.querySelector("#navbar .navbar-nav")!
   );
   protected navbarMenu = <HTMLDivElement>(
      document.querySelector("#navbar .navbar-menu")!
   );
   protected childMenu: HTMLCollection = this.navbarMenu.children;
}
class HandleNavbar extends NavbarElements {
   private toggleClass(): void {
      this.navbarNav.classList.toggle("return");
      this.navbarMenu.classList.toggle("return");
      for (let i: number = 0; i < this.childMenu.length; i++) {
         this.childMenu[i].classList.toggle("return");
      }
   }
   private menuOnClick(): void {
      this.navbarMenu.addEventListener("click", (): void => {
         this.toggleClass();
      });
   }
   private documentOnClick(): void {
      document.addEventListener("click", ({ target }: Event): void => {
         if (this.navbarNav.classList.contains("return")) {
            if (
               target !== this.navbarMenu &&
               target !== this.navbarNav &&
               target !== this.navbarNav.firstElementChild &&
               target !== this.childMenu[0] &&
               target !== this.childMenu[1] &&
               target !== this.childMenu[2] &&
               (target as Element).localName !== "a"
            ) {
               this.toggleClass();
            }
         }
      });
   }
   private click(): void {
      this.menuOnClick();
      this.documentOnClick();
   }
   public run(): void {
      this.click();
   }
}
new HandleNavbar().run();

// HANDLE FORM
class FormAlerts {
   private el = <HTMLDivElement>document.querySelector("#form-alert")!;
   protected alert(className: "merah" | "ijo", textContent: string): void {
      this.el.innerHTML = `
            <div class="text-center min-w-[50%] min-h-[48px] my-2 relative py-3 px-6 rounded-md flex ${className}">
                <p class="m-auto">${textContent}</p>
                <span class="alert-close absolute top-1 right-2 text-sm cursor-pointer">✖</span>
            </div>
        `;
   }
   protected alertClose(): void {
      this.el.innerHTML = "";
   }
   protected alertCloseOnClick(target: EventTarget | null): void {
      if ((target as Element).classList.contains("alert-close")) {
         this.alertClose();
      }
   }
}
class FormElements extends FormAlerts {
   protected form = <HTMLFormElement>document.querySelector("#form")!;
   protected nama = <HTMLInputElement>this.form.nama!;
   protected email = <HTMLInputElement>this.form.email!;
   protected pesan = <HTMLTextAreaElement>this.form.pesan!;
   protected button = <HTMLButtonElement>(
      document.querySelector("#form-button")!
   );
}
class HandleForm extends FormElements {
   private url: string =
      "https://script.google.com/macros/s/AKfycbyY8VE_n0LM2wfImAqU1tIj7OX9gfYAvuHrDXDt2_kZLsprPbWhPiWXWv_lOlVykYf3qg/exec";
   private isClicked: boolean = false;
   private buttonLoader(loading: boolean) {
      this.button.innerHTML = `
            ${loading ? '<span class="loader"></span>' : ""}
            <span>${loading ? "Mengirim" : "Kirim"}</span>
        `;
   }
   private conditionalSubmit(): boolean {
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
   private success(): void {
      sessionStorage.setItem("submit", "true");
      this.alert("ijo", "Terima kasih pesan anda sudah kami terima 😊");
      this.buttonLoader(false);
      this.form.reset();
   }
   private error(error: any): void {
      this.alert("merah", error.message);
      this.buttonLoader(false);
   }
   private submit(): void {
      this.form.addEventListener("submit", async (e: Event) => {
         e.preventDefault();
         if (!this.conditionalSubmit()) return;
         try {
            await fetch(this.url, {
               method: "POST",
               body: new FormData(this.form),
            });
            this.success();
         } catch (error: unknown) {
            this.error(error);
         }
      });
   }
   private click(): void {
      document.addEventListener("click", ({ target }: Event) => {
         this.alertCloseOnClick(target);
      });
   }
   public run(): void {
      this.click();
      this.submit();
   }
}
new HandleForm().run();

// HANDLE AOS
class HandleAos {
   private elementInView = (el: HTMLElement): boolean => {
      const elementTop: number = el.getBoundingClientRect().top;
      return (
         elementTop <=
         (window.innerHeight || document.documentElement.clientHeight)
      );
   };
   private wait(duration: number): Promise<any> {
      return new Promise((resolve: any) => {
         setTimeout(() => resolve(), duration);
      });
   }
   private toggleClass(el: HTMLElement, type: "add" | "remove"): void {
      if (type === "add") return el.classList.add("return");
      return el.classList.remove("return");
   }
   private toggleClassLoop(
      el: NodeListOf<HTMLElement>,
      index: number,
      type: "add" | "remove"
   ): void {
      if (type === "add") return el[index].classList.add("return");
      return el[index].classList.remove("return");
   }
   private navbarOnLoad(): void {
      const navbar = <HTMLDivElement>document.querySelector("#navbar")!;
      this.toggleClass(navbar, "add");
   }
   private async jumbotronOnLoad(): Promise<void> {
      const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
         "#jumbotron .jumbotron-animation"
      )!;
      this.toggleClassLoop(elements, elements.length - 1, "add");
      for (let i: number = 0; i < elements.length; i++) {
         await this.wait(150);
         i !== elements.length - 1 && this.toggleClassLoop(elements, i, "add");
      }
   }
   private async aos(
      elements: NodeListOf<HTMLElement>,
      wait?: boolean,
      waitClassName?: string
   ): Promise<void> {
      for (let i: number = 0; i < elements.length; i++) {
         if (this.elementInView(elements[i])) {
            this.toggleClassLoop(elements, i, "add");
            wait &&
               elements[i].classList.contains(`${waitClassName}`) &&
               (await this.wait(150));
         } else {
            this.toggleClassLoop(elements, i, "remove");
         }
      }
   }
   private async tentangAos(): Promise<void> {
      const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
         "#tentang .tentang-aos"
      );
      this.aos(elements, true, "tentang-icon");
   }
   private skillsAos(): void {
      const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
         "#skills .skills-aos"
      );
      this.aos(elements);
   }
   private portfolioAos(): void {
      const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
         "#portfolio .portfolio-aos"
      );
      this.aos(elements);
   }
   private load(): void {
      window.addEventListener("load", () => {
         this.navbarOnLoad();
         this.jumbotronOnLoad();
      });
   }
   private scroll(): void {
      document.onscroll = async (): Promise<void> => {
         this.tentangAos();
         this.skillsAos();
         this.portfolioAos();
      };
   }
   public run(): void {
      this.load();
      this.scroll();
   }
}
new HandleAos().run();
