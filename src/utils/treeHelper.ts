import { Node } from "../models/Node";

export function buildDecisionTree(): Node {
    const root = new Node("Mua gì?");

    // ===== Level 2 =====
    const dienTu = new Node("Điện tử");
    const quanAo = new Node("Quần áo");
    const phuKien = new Node("Phụ kiện");

    root.children.push(dienTu, quanAo, phuKien);

    // ===== Level 3 =====
    const laptop = new Node("Laptop");
    const phone = new Node("Điện thoại");
    const tablet = new Node("Tablet");

    dienTu.children.push(laptop, phone, tablet);

    const ao = new Node("Áo");
    const quan = new Node("Quần");
    const giay = new Node("Giày");

    quanAo.children.push(ao, quan, giay);

    const dongHo = new Node("Đồng hồ");
    const taiNghe = new Node("Tai nghe");

    phuKien.children.push(dongHo, taiNghe);

    // ===== Level 4 (Brand) =====
    // Laptop
    const apple = new Node("Apple");
    const dell = new Node("Dell");
    const hp = new Node("HP");

    laptop.children.push(apple, dell, hp);

    // Phone
    const samsung = new Node("Samsung");
    const xiaomi = new Node("Xiaomi");
    const iphone = new Node("iPhone");

    phone.children.push(samsung, xiaomi, iphone);

    // Áo
    const nike = new Node("Nike");
    const adidas = new Node("Adidas");

    ao.children.push(nike, adidas);

    // Giày
    const puma = new Node("Puma");
    const converse = new Node("Converse");

    giay.children.push(puma, converse);

    // Tai nghe
    const sony = new Node("Sony");
    const jbl = new Node("JBL");

    taiNghe.children.push(sony, jbl);

    // ===== Level 5 (Products) =====

    // Apple (Laptop)
    apple.children.push(
        new Node("MacBook Air M1"),
        new Node("MacBook Air M2"),
        new Node("MacBook Pro M3")
    );

    // Dell
    dell.children.push(
        new Node("Dell XPS 13"),
        new Node("Dell Inspiron 15"),
        new Node("Dell Gaming G15")
    );

    // HP
    hp.children.push(
        new Node("HP Pavilion"),
        new Node("HP Envy"),
        new Node("HP Omen")
    );

    // Samsung Phone
    samsung.children.push(
        new Node("Galaxy S23"),
        new Node("Galaxy S24"),
        new Node("Galaxy A54")
    );

    // Xiaomi
    xiaomi.children.push(
        new Node("Redmi Note 13"),
        new Node("Xiaomi 13 Pro"),
        new Node("Poco X5")
    );

    // iPhone
    iphone.children.push(
        new Node("iPhone 13"),
        new Node("iPhone 14"),
        new Node("iPhone 15 Pro")
    );

    // Nike áo
    nike.children.push(
        new Node("Áo Nike Dri-FIT"),
        new Node("Áo Nike Running"),
        new Node("Áo Nike Sport")
    );

    // Adidas áo
    adidas.children.push(
        new Node("Áo Adidas Training"),
        new Node("Áo Adidas Originals")
    );

    // Puma giày
    puma.children.push(
        new Node("Puma RS-X"),
        new Node("Puma Suede Classic")
    );

    // Converse giày
    converse.children.push(
        new Node("Converse Chuck 70"),
        new Node("Converse Run Star")
    );

    // Sony tai nghe
    sony.children.push(
        new Node("Sony WH-1000XM5"),
        new Node("Sony WF-1000XM4")
    );

    // JBL tai nghe
    jbl.children.push(
        new Node("JBL Tune 510BT"),
        new Node("JBL Live 660NC")
    );

    return root;
}