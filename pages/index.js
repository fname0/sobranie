import Image from 'next/image';
import Seo from '../components/Seo';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cookies from "universal-cookie";
import BasketCard from '../components/BasketCard';

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
    const [cookie, setCookie] = useState();
    const [basket, setBasket] = useState({});
    const [basketLength, setBasketLength] = useState(0);
    const [isBasketOpened, setIsBasketOpened] = useState(false);
    const [priceSum, setPriceSum] = useState(0);
    const [lastScrollHeight, setLastScrollHeight] = useState(0);
    const [delivery, setDelivery] = useState(true);
    const [openedImgId, setOpenedImgId] = useState(0);

    useEffect(() => {
        const cookie = new Cookies();
        setCookie(cookie);
        setBasket(cookie.get('basket') === undefined ? {} : cookie.get('basket'));
        setBasketLength(cookie.get('basket') === undefined ? 0 : Object.values(cookie.get('basket')).reduce((a, b) => a + b, 0));
        setIsDesktop(window.innerWidth > window.innerHeight);
        setPriceSum(cookie.get('priceSum') === undefined ? 0 : parseInt(cookie.get('priceSum')));
    }, [])

    const uploadPhone = function (e) {
        e.preventDefault();
    }

    const addToBasket = (id) => {
        let basketTemp = basket;
        basketTemp[id] = 1;
        cookie.set('basket', basketTemp);
        setBasket(basketTemp);
        setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
        cookie.set('priceSum', priceSum+parseInt(products[id].price));
        setPriceSum(priceSum+parseInt(products[id].price));
    }

    const decreaseProductCount = (id) => {
        let basketTemp = basket;
        if (basket[id] === 1) {delete basketTemp[id];if (isBasketOpened && Object.keys(basketTemp).length === 0) {setIsBasketOpened(false);setTimeout(() => {
            scrollTo(0, lastScrollHeight);
        }, 1)}}
        else {basketTemp[id]-=1}
        setBasket(basketTemp);
        setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
        cookie.set('basket', basketTemp);
        cookie.set('priceSum', priceSum-parseInt(products[id].price));
        setPriceSum(priceSum-parseInt(products[id].price));
    }

    const increaseProductCount = (id) => {
        let basketTemp = basket;
        basketTemp[id]+=1;
        setBasket(basketTemp);
        setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
        cookie.set('basket', basketTemp);
        cookie.set('priceSum', priceSum+parseInt(products[id].price));
        setPriceSum(priceSum+parseInt(products[id].price));
    }

    const deleteFromBasket = (id) => {
        let basketTemp = basket;
        cookie.set('priceSum', priceSum-(parseInt(products[id].price)*parseInt(basketTemp[id])));
        setPriceSum(priceSum-(parseInt(products[id].price)*parseInt(basketTemp[id])));
        delete basketTemp[id];
        if (isBasketOpened && Object.keys(basketTemp).length === 0) {setIsBasketOpened(false);setTimeout(() => {
            scrollTo(0, lastScrollHeight);
        }, 1)}
        setBasket(basketTemp);
        setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
        cookie.set('basket', basketTemp);
    }

  return (
    <div className="App" id="app">
        <Seo title="Ресторан-кафе Собрание" description="Ресторан-кафе №1 в Каменск-Шахтинском" keywords="ресторан"/>

        {isBasketOpened ?
        <div>
            <div className="bold backToMainBtn" onClick={() => {setIsBasketOpened(false);setTimeout(() => {
                scrollTo(0, lastScrollHeight);
            }, 1)}}>← Главная</div>

            <div className={isDesktop ? "basketContDesktop" : "basketContMobile"}>
                <div className="bold basketTitle">Ваш заказ: </div>
                <br />
                <div className="blackLine"></div>
                <br />
                {Object.entries(products).filter(name => basket[name[1].id] !== undefined).map((product) => (
                <BasketCard
                    key={product[1].id}
                    product={product[1]}
                    addToBasket={addToBasket}
                    count={basket[product[1].id]}
                    decrease={decreaseProductCount}
                    increase={increaseProductCount}
                    delete={deleteFromBasket}
                />
                ))}
                <div className="blackLine"></div>
                <br />
                <div className="med medPriceSum">Сумма: {priceSum} р.</div>
                <form action="#" onSubmit={uploadPhone}>
                    <input type="num" placeholder='Телефон' className='med basketFormInput' required/>
                    <input type="text" placeholder='Имя' className='med basketFormInput' required/>
                    <input type="num" placeholder='Время доставки' className='med basketFormInput' required/>
                    <div className='radioBasketCont'>
                        <input type="radio" id="dostavka" className='radioBasket' name='basketOption' defaultChecked onChange={(e) => setDelivery(e.target.checked)}/>
                        <label for="contactChoice1" className='light mr'>Доставка курьером</label>
                        
                        <input type="radio" id="samovyvoz" className='radioBasket' name='basketOption' onChange={(e) => setDelivery(!e.target.checked)}/>
                        <label for="contactChoice2" className='light'>Самовывоз</label>
                    </div>
                    {delivery ? 
                    <input type="text" placeholder='Адрес доставки' className='med basketFormInput' required/> : 
                    <label>
                    <input list="adreses" placeholder='Адрес самовывоза' className='med basketFormInput' required/>
                    <datalist id="adreses">
                        <option value="пр. Карла-Маркса 62, Каменск-Шахтинский"/>
                        <option value="ул. Чехова 43, Каменск-Шахтинский"/>
                    </datalist></label>}
                    <br />
                    <br />
                    {delivery ? 
                    <label>
                    <div className="med medPriceSum">Сумма: {priceSum} р.</div>
                    <div className="med medPriceSum">Доставка: {priceSum >= 1000 ? 0 : 150} р.</div>
                    <div className="bold priceSum">Итог: {priceSum + (priceSum >= 1000 ? 0 : 150)} р.</div></label> :
                    <div className="bold priceSum">Итог: {priceSum} р.</div>}
                    <button className="bold basketSendBtn" type='submit'>Оформить заказ</button>
                </form>
            </div>
        </div>
        :
        <div>
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

        {basketLength === 0 ? null : <div className="basketBtnCont" onClick={() => {setLastScrollHeight(document.documentElement.scrollTop);setIsBasketOpened(true);scrollTo(0, 0)}}>
            <svg role="img" className="basketBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M44 18h10v45H10V18h10z"></path><path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M22 24V11c0-5.523 4.477-10 10-10s10 4.477 10 10v13"></path></svg>
        </div> }
        {basketLength === 0 ? null : <div className="med basketCount">{basketLength}</div> }

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
            alt="search image"
            onClick={() => setSearchValue(searchValueTemp)}/>
            </div>

            <div className="products">
                {Object.entries(products).filter(name => cat === "Все" ? true : cat === name[1].cat).filter(name => searchValue.toLowerCase().split(' ').every(v => (name[1].title+" "+name[1].desc).toLowerCase().includes(v))).map((product) => (
                <ProductCard
                    key={product[1].id}
                    product={product[1]}
                    addToBasket={addToBasket}
                    count={basket[product[1].id]}
                    decrease={decreaseProductCount}
                    increase={increaseProductCount}
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
                <img src="/gallery/1.jpg" alt="photo" className='photo' onClick={() => {setOpenedImgId(1); document.documentElement.style.setProperty('--overflowY', "hidden")}}/>
                <img src="/gallery/2.jpg" alt="photo" className='photo' onClick={() => {setOpenedImgId(2); document.documentElement.style.setProperty('--overflowY', "hidden")}}/>
                <img src="/gallery/3.jpg" alt="photo" className='photo' onClick={() => {setOpenedImgId(3); document.documentElement.style.setProperty('--overflowY', "hidden")}}/>
                <img src="/gallery/4.jpg" alt="photo" className='photo' onClick={() => {setOpenedImgId(4); document.documentElement.style.setProperty('--overflowY', "hidden")}}/>
                <img src="/gallery/5.jpg" alt="photo" className='photo' onClick={() => {setOpenedImgId(5); document.documentElement.style.setProperty('--overflowY', "hidden")}}/>
                <img src="/gallery/6.jpg" alt="photo" className='photo' onClick={() => {setOpenedImgId(6); document.documentElement.style.setProperty('--overflowY', "hidden")}}/>
                <img src="/gallery/7.jpg" alt="photo" className='photo' onClick={() => {setOpenedImgId(7); document.documentElement.style.setProperty('--overflowY', "hidden")}}/>
                <img src="/gallery/8.jpg" alt="photo" className='photo' onClick={() => {setOpenedImgId(8); document.documentElement.style.setProperty('--overflowY', "hidden")}}/>
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
                        <input type="num" placeholder='Телефон' className='med formInput' required/>
                        <input type="text" placeholder='Имя' className='med formInput' required/>
                        <textarea type="text" placeholder='Текст заявки' className='med formInput largeInput' required/>
                        <button className="bold formBtn" type='submit' style={{maxWidth: '300px'}}>Отправить заявку</button>
                    </form>
            </div>
        </div>
        </div>}

        {openedImgId === 0 ? null :  
        <div className="fullImgCont" onClick={() => {setOpenedImgId(0); document.documentElement.style.setProperty("--overflowY", "auto")}}>
            <div className="fullImg">
            <Image
            priority
            src={'/gallery/'+openedImgId+'.jpg'}
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,iBG[yG9G01%201t7M|~o_300M|~pWTIUt7t7xuWBIp-:oIRlxujEWBM}oeoL%MIo9Gj?kCR+j]tRIUxt%MozWBafbIWAae'
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            alt="opened image"
            style={{zIndex: -1}}
            />
            </div>
        </div> }
    </div>
  )
}
