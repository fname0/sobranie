import Image from 'next/image';
import Seo from '../components/Seo';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';


export default function Index() {
    const [isDesktop, setIsDesktop] = useState(false);
    const products = {"1": {"id": "1", "title": "Цезарь с курицей", "mass": "220", "price": "350","desc":"Микс салата, томаты черри, гренки, соус Цезарь, сыр твёрдый","cat":"Салаты"},
    "2": {"id": "2", "title": "Салат из свежих овощей", "mass": "300", "price": "320", "desc": "Томаты, огурцы, болгарский перец, редис, лук репчатый, зелень","cat":"Салаты"},
    "3": {"id": "3", "title": "Удон с курицей", "mass": "270", "price": "350", "desc": "Лапша пшеничная, филе куриное, чеснок, перец болгарский, лук, цукими, морковь, соус терияки, соус унаги, кунжут","cat":"Паста"},
    "4": {"id": "4", "title": "Стейк из сёмги", "mass": "100", "price": "750","desc":"","cat":"Мангал"},
    "5": {"id": "5", "title": "Греческий салат", "mass": "280", "price": "380", "desc": "Микс салата, томаты, огурцы, болгарский перец, лук, маслины, сыр Фета, бальзамическая заправка","cat":"Салаты"},
    "6": {"id": "6", "title": "Чизкейк в ассортименте", "mass": "100", "price": "320","desc":"","cat":"Десерты"}}
    const [cat, setCat] = useState("Все");
    let searchValueTemp = "";
    const [searchValue, setSearchValue] = useState("");
    const [dropdownMenuOpened, setDropdownMenuOpened] = useState(false);

    useEffect(() => {
        setIsDesktop(window.innerWidth > window.innerHeight);
    }, [])

    const uploadPhone = function (e) {
        e.preventDefault();
    }

  return (
    <div className="App">
        <Seo title="Ресторан-кафе Собрание" description="Шаблон для сайта ресторана" keywords="ресторан"/>

        {isDesktop ? <header>
            <div className="navbar">
                <ul className="links">
                    <li className="link" onClick={() => {document.querySelector("#main").scrollIntoView({behavior: "smooth"})}}>Главное</li>
                    <li className="link" onClick={() => {document.querySelector("#menu").scrollIntoView({behavior: "smooth"})}}>Меню</li>
                    <li className="link" onClick={() => {document.querySelector("#delivery").scrollIntoView({behavior: "smooth"})}}>Доставка</li>
                    <li className="link" onClick={() => {document.querySelector("#reserve").scrollIntoView({behavior: "smooth"})}}>Бронь стола</li>
                    <li className="link" onClick={() => {document.querySelector("#gallery").scrollIntoView({behavior: "smooth"})}}>Галерея</li>
                    <li className="link" onClick={() => {document.querySelector("#contacts").scrollIntoView({behavior: "smooth"})}}>Контакты</li>
                </ul>
                <button className="navbarBtn" onClick={() => {document.querySelector("#contacts").scrollIntoView({behavior: "smooth"})}}>Заказать звонок</button>
            </div>
        </header> : <Image
            src='/burger.svg'
            width={60}
            height={60}
            alt="menu burger"
            className="toogleNavbar"
            onClick={() => {setDropdownMenuOpened(!dropdownMenuOpened)}}
            />}

        {dropdownMenuOpened ? <div className="dropdownNavbar">
                <ul className="dropdownLinks">
                    <li className="bold dropdownLink" onClick={() => {document.querySelector("#main").scrollIntoView({behavior: "smooth"})}}>Главное</li>
                    <li className="bold dropdownLink" onClick={() => {document.querySelector("#menu").scrollIntoView({behavior: "smooth"})}}>Меню</li>
                    <li className="bold dropdownLink" onClick={() => {document.querySelector("#delivery").scrollIntoView({behavior: "smooth"})}}>Доставка</li>
                    <li className="bold dropdownLink" onClick={() => {document.querySelector("#reserve").scrollIntoView({behavior: "smooth"})}}>Бронь стола</li>
                    <li className="bold dropdownLink" onClick={() => {document.querySelector("#gallery").scrollIntoView({behavior: "smooth"})}}>Галерея</li>
                    <li className="bold dropdownLink" onClick={() => {document.querySelector("#contacts").scrollIntoView({behavior: "smooth"})}}>Контакты</li>
                </ul>
        </div> : null }

        <div className="heroWrapper" id="main">
            <Image
            priority
            src='/bg.webp'
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,iBG[yG9G01%201t7M|~o_300M|~pWTIUt7t7xuWBIp-:oIRlxujEWBM}oeoL%MIo9Gj?kCR+j]tRIUxt%MozWBafbIWAae'
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="hero image"
            />
        </div>

        <div className="heroFilter"></div>

        <div className="heroTextCont">
            <div className="med heroTextMed">Европейская кухня</div>
            <div className="bold heroTextBold">Ресторан-кафе №1 в Каменск-Шахтинском</div>
            <div className="reg heroTextLight">Работаем по будням с 11:00 / Сытные бизнес-ланчи / Атмосферная веранда с кальяном / Быстрая доставка на дом</div>
            <button className="bold heroBtn" onClick={() => {document.querySelector("#menu").scrollIntoView({behavior: "smooth"})}}>ПЕРЕЙТИ К МЕНЮ</button>
        </div>

        <div className="menuCont" id="menu">
            <div className="med menuTitle">Меню ресторана</div>
            <div className="light menuText">Окунитесь в мир европейской кухни и попробуйте сытные и вкусные бизнес-ланчи</div>
            <div className="catsCont">
                <div className={cat==="Все"?"med cat active":"med cat"} onClick={() => {setCat("Все")}}>Все</div>
                <div className={cat==="Салаты"?"med cat active":"med cat"} onClick={() => {setCat("Салаты")}}>Салаты</div>
                <div className={cat==="Паста"?"med cat active":"med cat"} onClick={() => {setCat("Паста")}}>Паста</div>
                <div className={cat==="Десерты"?"med cat active":"med cat"} onClick={() => {setCat("Десерты")}}>Десерты</div>
                <div className={cat==="Мангал"?"med cat active":"med cat"} onClick={() => {setCat("Мангал")}}>Мангал</div>
            </div>

            <div className="searchInputCont">
                <input type="text" className="reg searchInput" placeholder='Поиск...'  onKeyDown={(e) => {searchValueTemp=e.target.value;e.key==="Enter"?setSearchValue(searchValueTemp):null}}/>
                <Image
            src='/search.svg'
            width={30}
            height={30}
            className='searchBtn'
            alt="search image"/>
            </div>

            <div className="products">
                {Object.entries(products).filter(name => cat === "Все" ? true : cat === name[1].cat).filter(name => searchValue.toLowerCase().split(' ').every(v => (name[1].title+" "+name[1].desc).toLowerCase().includes(v))).map((product) => (
                <ProductCard
                    key={product[1].id}
                    product={product[1]}
                />
                ))}
            </div>
        </div>

        <div className="deliveryCont" id="delivery">
            <div className="med deliveryTitle">Информация о доставке</div>
            <div className="redLine"></div>
            <div className="light deliveryText">Мы доставляем заказы в любую точку г. Каменск-Шахтинский</div>
            <div className="light deliveryText">Доставка бесплатная при заказе от 1000 рублей</div>
            <div className="light deliveryText">При заказе от 2000 рублей Вас будут радовать две бесплатные бутылочки Колы</div>
            <button className="bold deliveryBtn" onClick={() => {document.querySelector("#contacts").scrollIntoView({behavior: "smooth"})}}>Заказать доставку</button>
        </div>

        <div className="reserveCont" id="reserve">
        <Image
            priority
            src='/reserved.jpg'
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,iBG[yG9G01%201t7M|~o_300M|~pWTIUt7t7xuWBIp-:oIRlxujEWBM}oeoL%MIo9Gj?kCR+j]tRIUxt%MozWBafbIWAae'
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="reserved table image"
            style={{zIndex: -1}}
            />
            <div className="reserveTextCont">
                <div className="med deliveryTitle">Вы также можете зарезервировать стол</div>
                <br /><br />
                <div className="redLine"></div>
                <div className="light deliveryText">Обратитесь к нам по одному из наших контактов или оставьте заявку ниже и мы подберём для Вас лучшее место</div>
                <button className="bold deliveryBtn" onClick={() => {document.querySelector("#contacts").scrollIntoView({behavior: "smooth"})}}>Резервировать стол</button>
                {isDesktop ? <div><br /><br /></div>:null}
            </div>
        </div>
        
        <div className="menuCont" id="gallery">
            <div className="med menuTitle">Галерея ресторана</div>
            <div className="light menuText">Посетив наш ресторан, вы получите незабываемые впечатления от атмосферы и вкусной европейской кухни</div>
            <div className="galleryCont">
                <img src="/gallery/1.jpg" alt="photo" className='photo'/>
                <img src="/gallery/2.jpg" alt="photo" className='photo'/>
                <img src="/gallery/3.jpg" alt="photo" className='photo'/>
                <img src="/gallery/4.jpg" alt="photo" className='photo'/>
                <img src="/gallery/5.jpg" alt="photo" className='photo'/>
                <img src="/gallery/6.jpg" alt="photo" className='photo'/>
                <img src="/gallery/7.jpg" alt="photo" className='photo'/>
                <img src="/gallery/8.jpg" alt="photo" className='photo'/>
            </div>
        </div>

        <div className="contacts" id="contacts">
            <div className="med contactsTitle">Наши контакты</div>
            <div className="light contactsText">Вы можете связаться с нами по любому из нижеперечисленных контактов или оставить заявку, чтобы заказать еду или зарезервировать столик</div>
            <div className="contactsAndFormCont">
                    <div className="contactsCont">
                        <a href="tel:+7-863-657-96-96" className="light contact">+7 (863) 657 96 96</a>
                        <a href="tel:+7-928-192-49-01" className="light contact">+7 (928) 192 49 01</a>
                        <div className="light contact">пр. Карла-Маркса 62, Каменск-Шахтинский</div>
                    </div>
                    <form action="#" onSubmit={uploadPhone} className="contactsCont">
                        <input type="num" placeholder='Телефон' className='med formInput'/>
                        <input type="text" placeholder='Имя' className='med formInput'/>
                        <textarea type="text" placeholder='Текст заявки' className='med formInput largeInput'/>
                        <button className="bold formBtn" type='submit' style={{maxWidth: '300px'}}>Отправить заявку</button>
                    </form>
            </div>
        </div>
    </div>
  )
}