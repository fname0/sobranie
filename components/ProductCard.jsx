import Image from "next/image";

export default function ProductCard(props) {
    const product=props.product;

    return (
        <div className="productCardCont">
            <div className="productCard">
                <div>
                    <div className="productCardImgCont">
                        <Image src={"/productImg/"+product.id+".jpg"} alt="" loading="lazy" layout="fill" className="productCardImg"/>
                    </div>
                    <p className="bold productTitle">{product.title}</p>
                    <p className="light">{product.desc}</p>
                    <div className="productPriceCont">
                        <p className="bold productPrice">{product.price} p.</p>
                        <p className="light productMass">{product.mass} гр.</p>
                    </div>
                </div>
                {props.count === undefined ? <button className="bold addToBasketBtn" onClick={() => props.addToBasket(product.id)}>В корзину</button> :
                <div className="changeProductCountCont">
                    <div className="med productCount changeProductCount" onClick={() => props.decrease(product.id)}>-</div>
                    <div className="bold productCount">{props.count}</div>
                    <div className="med productCount changeProductCount" onClick={() => props.increase(product.id)}>+</div>
                </div>}
            </div>
        </div>
    )
}