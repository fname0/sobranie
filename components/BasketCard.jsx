import Image from "next/image";

export default function BasketCard(props) {
    const product=props.product;

    return (
        <div className="basketCardCont">
            <Image src={"/productImg/"+product.id+".jpg"} alt="" loading="lazy" className="basketCardImg" width={70} height={70}/>
            <p className="med">{product.title}</p>
            <div className="changeBasketCountCont">
                <button className="light changeBasketCount" onClick={() => props.decrease(product.id)}>-</button>
                <div className="basketProductCount light">{props.count}</div>
                <button className="light changeBasketCount" onClick={() => props.increase(product.id)}>+</button>
            </div>
            <p className="light">{product.price*props.count} p.</p>
            <button className="basketDelete" onClick={() => props.delete(product.id)}>✕</button>
        </div>
    )
}