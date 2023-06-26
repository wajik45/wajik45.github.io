// EVENT BINDING
// READY
document.onreadystatechange = _ => {
    ready();
}
// LOAD
window.onload = _ => {
    // AOS
    aos.load();
}
// SUBMIT
window.onsubmit = e => {
    e.preventDefault();
    // FORM
    form.submit();
}
// SCROLL
window.onscroll = _ => {
    // PANAH ATAS
    panahAtas.scroll();
    // AOS
    aos.scroll();
}
// CLICK
window.onclick = ({ target }) => {
    // MENU
    menu.click(target);
    // FORM
    form.click(target);
    // PANAH ATAS
    panahAtas.click(target);
}

/* READY */
const ready = _ => {
    const loader = document.getElementById('loader');
    if (document.readyState !== 'complete') {
        return loader.innerHTML = '<span class="loader-dua"></span>';
    }
    return loader.innerHTML = '';
}

/* COPYRIGHT FOOTER */
(_ => {
    return {
        tahun: new Date().getFullYear(),
        copyright: document.querySelector('.footer .row-dua .copyright'),
        tampil: function () {
            this.copyright.innerHTML = `&copy; copyright ${this.tahun}`;
        }
    }
})().tampil();

/* HANDLE PANAH ATAS */
const panahAtas = {
    panahAtas: document.querySelector('.panah-atas'),
    scroll: function () {
        if (window.scrollY >= 100) this.panahAtas.classList.add('return');
        if (window.scrollY < 100) this.panahAtas.classList.remove('return');
    },
    click: function (target) {
        if (target === this.panahAtas) scrollTo(0, 0);
    }
}

/* HANDLE MENU */
class HandleMenu {
    constructor (navbarMenu) {
        this.navbarMenu = navbarMenu;
        this.navbarNav = this.navbarMenu.previousElementSibling;
        this.ul = this.navbarNav.firstElementChild;
    }
    toggleMenu () {
        this.navbarMenu.classList.toggle('close');
        this.navbarNav.classList.toggle('return');
        for (let i = 0; i < this.navbarMenu.children.length; i++) {
            this.navbarMenu.children[i].classList.toggle('close');
        }
    }
}
class Menu extends HandleMenu {
    constructor (navbarMenu) {
        super(navbarMenu);
    }
    click (target) {
        if (
            target === this.navbarMenu ||
            target === this.navbarMenu.children[0] ||
            target === this.navbarMenu.children[1] ||
            target === this.navbarMenu.children[2]
            )
        {
            return this.toggleMenu();
        }
        if (this.navbarNav.classList.contains('return')) {
            if (
                target !== this.navbarNav &&
                target !== this.ul &&
                !target.classList.contains('navbar-a')
                )
            {
                return this.toggleMenu();
            }
        }
    }
}
/* HANDLE ALERT & FORM */
class HandleAlert {
    constructor (alertKonten) {
        this.alertKonten = alertKonten;
    }
    alert (pesan = '', warna = '') {
        this.alertKonten.innerHTML = `
            <div class="alert ${warna} muncul">
                <p>${pesan}</p>
                <i class="bi bi-x alert-close"></i>
            </div>
        `;
    }
}
class HandleForm extends HandleAlert {
    constructor (form) {
        super(form.firstElementChild);
        this.form = form;
        this.button = this.form.lastElementChild;
        this.url = 'https://script.google.com/macros/s/AKfycbyY8VE_n0LM2wfImAqU1tIj7OX9gfYAvuHrDXDt2_kZLsprPbWhPiWXWv_lOlVykYf3qg/exec';
    }
    validasi () {
        const nama = this.form.nama;
        const email = this.form.email;
        const pesan = this.form.pesan;

        if (nama.value.length < 3 || email.value.length < 3 || pesan.value.length < 3 ) {
            this.alert('Isi semua form minimal 3 karakter!', 'kuning');
            return false;
        }
        if (sessionStorage.getItem('kirim') === 'terkirim') {
            this.alert('Anda sudah mengirimkan pesan!', 'merah');
            return false;
        }
        if (this.form.classList.contains('submit')) {
            return false;
        }
        this.form.classList.add('submit');
        this.button.innerHTML = '<span class="loader"></span>';
        return true;
    }
    berhasil () {
        this.alert('Terima kasih! pesan anda sudah kami terima', 'ijo');
        sessionStorage.setItem('kirim', 'terkirim');
        this.button.innerHTML = 'Kirim';
        this.form.reset();
    }
    gagal () {
        this.alert('Error, gagal mengirim pesan!', 'merah');
        this.form.classList.remove('submit');
        this.button.innerHTML = 'Kirim';
        this.form.reset();
    }
}
class Form extends HandleForm {
    constructor (form) {
        super(form)
    }
    async kirim () {
        try {
            await fetch(this.url, { method: 'POST', body: new FormData(this.form) });
            this.berhasil();
        }
        catch (error) {
            this.gagal();
        }
    }
    async submit () {
        if (!this.validasi()) {
            this.validasi();
            return;
        }
        this.validasi();
        await this.kirim();
    }
    click (target) {
        if (target.classList.contains('alert-close')) {
            this.alertKonten.firstElementChild.classList.remove('muncul');
        }
    }
}
/* HANDLE AOS */
class HandleAos {
    // KAPAN AOS BEREAKSI
    elementInView (el) {
        const elementTop = Math.round(el.getBoundingClientRect().top);
        return elementTop <= window.innerHeight;
    }
    // WAKTU TUNGGU
    tunggu (ms) {
        return new Promise(resolve => {
            setTimeout(_ => {
                resolve();
            }, ms);
        });
    }
    // REAKSI AOS
    async toggleClass (el, loop = false, add = true, ms = 150) {
        if (loop) {
            for (let i = 0; i < el.length; i++) {
                if (add) el[i].classList.add('return');
                if (!add) el[i].classList.remove('return');
                await this.tunggu(ms);
            }
        } else {
            if (add) el.classList.add('return');
            if (!add) el.classList.remove('return');
        }
    }
    // KONDISI ELEMENT
    kondisiElement (el, loop = false, add = true, array = false, index = 0, pecah = false, ms = 150) {
        this.elementInView(array ? el[index] : el) && this.toggleClass(pecah ? el[index] : el, loop, add, ms);
    }
}
class ElementAos extends HandleAos {
    aosJumbotron () {
        const jumbotronText = document.querySelectorAll('.jumbotron-text');
        const jumbotronImg = document.querySelector('.jumbotron-img');
        this.toggleClass(jumbotronImg, false, true);
        this.toggleClass(jumbotronText, true, true);
    }
    aosTentang () {
        const tentangTextHeader = document.querySelectorAll('.tentang-text-header');
        const tentangImg = document.querySelector('.tentang-img');
        const tentangText = document.querySelector('.tentang-text');
        const tentangIcon = document.querySelectorAll('.tentang-icon');
    
        // PAKE ELSE KALO MAO ANIMASI LAGI PAS KEATAS
        this.kondisiElement(tentangImg, false, true, false);
        this.kondisiElement(tentangText, false, true, false);

        this.kondisiElement(tentangTextHeader, true, true, true, 0);
        this.kondisiElement(tentangIcon, true, true, true, 0);
    }
    aosSkills () {
        const skillsTextHeader = document.querySelectorAll('.skills-text-header');
        const skillsPersen = document.querySelectorAll('.skills .persen');
        
        this.kondisiElement(skillsTextHeader, true, true, true, 0);
        for (let i = 0; i < skillsPersen.length; i++) {
            this.kondisiElement(skillsPersen, false, true, true, i, true);
        }
    }
    aosPortfolio () {
        const portfolioTextHeader = document.querySelectorAll('.portfolio-text-header');
        const portfolioCol = document.querySelectorAll('.portfolio .col');

        this.kondisiElement(portfolioTextHeader, true, true, true, 0);
        for (let i = 0; i < portfolioCol.length; i++) {
            this.kondisiElement(portfolioCol, false, true, true, i, true);
        }
    }
}
class Aos extends ElementAos {
    load () {
        this.aosJumbotron();
    }
    scroll () {
        this.aosTentang();
        this.aosSkills();
        this.aosPortfolio();
    }
}
const aos = new Aos();
const menu = new Menu(document.querySelector('.navbar-menu'));
const form = new Form(document.querySelector('.kontak form'));